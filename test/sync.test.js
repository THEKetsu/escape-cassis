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
