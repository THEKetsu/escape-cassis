const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Charge js/shared/sync.js avec un fetch simulé : on vérifie ce qui part vers Supabase, pas Supabase lui-même
function loadSync(respond, key = 'sb_publishable_test') {
  const calls = [];
  const window = { CONFIG: { supabase: { url: 'https://x.supabase.co/', key } } };
  const fetch = async (url, options = {}) => {
    calls.push({ url, options, body: options.body && JSON.parse(options.body) });
    const { status = 200, json = {} } = await respond(url, options, calls.length);
    return { ok: status < 400, status, json: async () => json, text: async () => JSON.stringify(json) };
  };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'js', 'shared', 'sync.js'), 'utf8'),
    { window, fetch, Date, JSON });
  return { Sync: window.Sync, calls };
}

test('progression : enregistrée et relue avec la clé publique seule', async () => {
  const { Sync, calls } = loadSync(() => ({ json: [{ data: { state: { team: 'E1' } }, updated_at: 'x' }] }));
  await Sync.saveState({ team: 'E1' });
  assert.ok(calls[0].url.startsWith('https://x.supabase.co/rest/v1/progress'));
  assert.strictEqual(calls[0].body.team, 'E1');
  assert.strictEqual(calls[0].options.headers.apikey, 'sb_publishable_test');
  assert.strictEqual(calls[0].options.headers.Authorization, undefined); // clé « publishable » : pas de Bearer
  const row = await Sync.loadTeam('E1');
  assert.strictEqual(row.data.state.team, 'E1');
  assert.ok((await Sync.loadAll()).length === 1);
});

test('ancienne clé anon (JWT) : envoyée aussi en Bearer', async () => {
  const { Sync, calls } = loadSync(() => ({ json: [] }), 'eyJabc');
  await Sync.loadAll();
  assert.strictEqual(calls[0].options.headers.Authorization, 'Bearer eyJabc');
});

test('tchat : envoi, lecture depuis un id, effacement', async () => {
  const { Sync, calls } = loadSync(() => ({ json: [{ id: 7, team: 'E1' }] }));
  const msg = await Sync.sendMessage({ team: 'E1', sender: 'team', body: 'salut' });
  assert.strictEqual(msg.id, 7);
  await Sync.loadMessages('E1', 5);
  assert.ok(calls[1].url.includes('team=eq.E1&id=gt.5'));
  await Sync.deleteAll();
  assert.deepStrictEqual(calls.slice(2).map((c) => c.options.method), ['DELETE', 'DELETE']);
});

test('sans configuration Supabase : désactivé', () => {
  const { Sync } = loadSync(() => ({}), '');
  assert.strictEqual(Sync.enabled, false);
});

// Charge js/player/network.js avec un faux joueur et un faux serveur
function loadNetwork(serverRow) {
  const events = [];
  const A = {
    Sync: {
      enabled: true,
      saveState: async (s) => { events.push('save'); return s; },
      loadTeam: async () => (serverRow.present ? { data: {} } : null),
    },
    STORE: 'escape:t', HEARTBEAT_MS: 30000, LIVE: false,
    state: { team: 'E1', startedAt: 1000, stepIndex: 3 },
    newState: (team) => ({ team, startedAt: null, stepIndex: 0 }),
    setState(s) { this.state = s; },
    save() { events.push('local-save'); this.push(); },
    render: () => events.push('render'),
    toast: () => events.push('toast'),
    load: () => null,
  };
  const listeners = {};
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'js', 'player', 'network.js'), 'utf8'), {
    window: { EscapePlayer: A, addEventListener() {} },
    document: { hidden: false, addEventListener: (n, f) => { listeners[n] = f; }, getElementById: () => null },
    setTimeout: (f) => f(), clearTimeout() {}, setInterval() {}, navigator: {}, Date, JSON, Promise,
  });
  return { A, events, listeners };
}
const tick = () => new Promise((r) => setImmediate(r));

test('session effacée : le téléphone déjà synchronisé revient à l\'accueil, sans réécrire la ligne', async () => {
  const server = { present: true };
  const { A, events } = loadNetwork(server);
  A.push(); // première écriture : la ligne existe ensuite sur le serveur
  await tick(); await tick();
  assert.deepStrictEqual(events, ['save']);
  server.present = false; // l'organisateur efface tout
  events.length = 0;
  A.push();
  await tick(); await tick(); await tick();
  assert.strictEqual(A.state.startedAt, null); // retour à l'accueil, même équipe
  assert.strictEqual(A.state.team, 'E1');
  assert.ok(events.includes('toast') && events.includes('render'));
  assert.strictEqual(events.filter((e) => e === 'save').length, 1); // seule la ligne « prête » du nouvel état est créée
});

test('téléphone jamais synchronisé (hors ligne depuis le début) : sa partie n\'est pas effacée', async () => {
  const { A, events } = loadNetwork({ present: false });
  A.push();
  await tick(); await tick();
  assert.strictEqual(A.state.startedAt, 1000);
  assert.deepStrictEqual(events, ['save']);
});
