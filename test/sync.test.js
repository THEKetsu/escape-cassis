const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Charge js/shared/sync.js avec un fetch simulé : on vérifie ce qui part vers Supabase, pas Supabase lui-même
function loadSync(respond, config) {
  const calls = [];
  const store = {};
  const window = {
    CONFIG: { supabase: Object.assign({ url: 'https://x.supabase.co/', key: 'sb_publishable_test', adminEmail: 'orga@example.fr' }, config) },
    sessionStorage: { getItem: (k) => store[k] || null, setItem: (k, v) => { store[k] = v; }, removeItem: (k) => { delete store[k]; } },
  };
  const fetch = async (url, options = {}) => {
    calls.push({ url, options, body: options.body && JSON.parse(options.body) });
    const { status = 200, json = {} } = await respond(url, options, calls.length);
    return { ok: status < 400, status, json: async () => json, text: async () => JSON.stringify(json) };
  };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'js', 'shared', 'sync.js'), 'utf8'),
    { window, fetch, atob: (s) => Buffer.from(s, 'base64').toString('binary'), Date, JSON });
  return { Sync: window.Sync, calls, store };
}

const b64url = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
const jwt = (payload) => `${b64url({ alg: 'HS256' })}.${b64url(payload)}.sig`;
const login = (role) => ({ json: { access_token: jwt({ app_metadata: role ? { role } : {} }), refresh_token: 'r1', expires_in: 3600 } });

test('joueur : passe par les fonctions rpc avec la clé d\'équipe, sans jeton organisateur', async () => {
  const { Sync, calls } = loadSync(() => ({ json: [{ data: { state: { team: 'E1' } }, updated_at: 'x' }] }));
  const row = await Sync.teamLoad('E1', 'cle-equipe-1234');
  assert.strictEqual(row.data.state.team, 'E1');
  assert.strictEqual(calls[0].url, 'https://x.supabase.co/rest/v1/rpc/team_load');
  assert.deepStrictEqual(calls[0].body, { p_team: 'E1', p_token: 'cle-equipe-1234' });
  assert.strictEqual(calls[0].options.headers.apikey, 'sb_publishable_test');
  assert.strictEqual(calls[0].options.headers.Authorization, undefined);
});

test('joueur : sans clé d\'équipe, rien n\'est envoyé', async () => {
  const { Sync, calls } = loadSync(() => ({}));
  await assert.rejects(Sync.teamSave({ team: 'E1' }, ''), /Clé de l'équipe absente/);
  await assert.rejects(Sync.teamSend('E1', 'salut', null, ''), /Clé de l'équipe absente/);
  assert.strictEqual(calls.length, 0);
});

test('organisateur : connexion, puis jeton envoyé sur les lectures', async () => {
  const { Sync, calls } = loadSync((url) => (url.includes('/auth/v1/token') ? login('organisateur') : { json: [] }));
  assert.ok(!Sync.hasSession());
  await Sync.signIn('S5ZWS7A7');
  assert.deepStrictEqual(calls[0].body, { email: 'orga@example.fr', password: 'S5ZWS7A7' });
  assert.ok(calls[0].url.endsWith('/auth/v1/token?grant_type=password'));
  assert.ok(Sync.hasSession());
  await Sync.loadAll();
  assert.ok(calls[1].options.headers.Authorization.startsWith('Bearer '));
  assert.strictEqual(calls[1].url, 'https://x.supabase.co/rest/v1/progress?select=team,data,updated_at');
});

test('organisateur : un compte sans le rôle est refusé', async () => {
  const { Sync } = loadSync(() => login(null));
  await assert.rejects(Sync.signIn('x'), /rôle « organisateur »/);
  assert.ok(!Sync.hasSession());
});

test('organisateur : lecture sans session = session expirée, avertissement envoyé', async () => {
  const { Sync, calls } = loadSync(() => ({}));
  let lost = 0;
  Sync.onAuthLost = () => { lost++; };
  await assert.rejects(Sync.loadAll(), /Session organisateur expirée/);
  assert.strictEqual(lost, 1);
  assert.strictEqual(calls.length, 0);
});

test('organisateur : jeton rafraîchi avant expiration, 401 = retour à la connexion', async () => {
  let n = 0;
  const { Sync, calls, store } = loadSync((url) => {
    if (url.includes('grant_type=password')) return { json: Object.assign(login('organisateur').json, { expires_in: 10 }) }; // sous la marge de 60 s
    if (url.includes('grant_type=refresh_token')) return { json: Object.assign(login('organisateur').json, { refresh_token: 'r2' }) };
    return n++ ? { json: [] } : { status: 401, json: { message: 'JWT expired' } };
  });
  let lost = 0;
  Sync.onAuthLost = () => { lost++; };
  await Sync.signIn('code');
  await assert.rejects(Sync.loadAll(), /401/);
  assert.ok(calls.some((c) => c.url.includes('grant_type=refresh_token') && c.body.refresh_token === 'r1'));
  assert.strictEqual(lost, 1);
  assert.ok(!Sync.hasSession());
  assert.strictEqual(store['escape:session'], undefined);
});

test('organisateur : mauvais mot de passe signalé comme tel, carnet lu avec le jeton', async () => {
  const { Sync, calls } = loadSync((url) => {
    if (url.includes('grant_type=password')) {
      return calls.filter((c) => c.url.includes('grant_type=password')).length > 1
        ? login('organisateur') : { status: 400, json: { error_code: 'invalid_credentials', msg: 'Invalid login credentials' } };
    }
    return { json: [{ data: { masterCode: 'X', answers: {} } }] };
  });
  await assert.rejects(Sync.signIn('faux'), (e) => e.invalidLogin === true);
  assert.ok(!Sync.hasSession());
  await Sync.signIn('bon');
  assert.strictEqual((await Sync.loadBook()).masterCode, 'X');
  assert.strictEqual(calls[calls.length - 1].url, 'https://x.supabase.co/rest/v1/organiser_book?id=eq.1&select=data');
});
