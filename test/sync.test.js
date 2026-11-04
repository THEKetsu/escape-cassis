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
  const intervals = [];
  const A = {
    Sync: {
      enabled: true,
      saveState: async (s) => { events.push('save'); return s; },
      loadTeam: async () => (serverRow.present ? { data: {} } : null),
      loadEpoch: async () => serverRow.epoch || null, // null : table game_session absente
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
    localStorage: { setItem() {}, getItem: () => null },
    document: { hidden: false, addEventListener: (n, f) => { listeners[n] = f; }, getElementById: () => null },
    setTimeout: (f) => f(), clearTimeout() {}, setInterval: (f, ms) => { intervals.push([f, ms]); }, navigator: {}, Date, JSON, Promise,
  });
  return { A, events, listeners, intervals };
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

test('session effacée : repérée au bout de 10 s même après un rechargement de la page', async () => {
  const server = { present: false };
  const { A, events, intervals } = loadNetwork(server);
  await tick(); await tick(); // contrôle fait au chargement de la page, avant le marqueur
  A.state.synced = true; // marqueur gardé avec la partie : le téléphone avait déjà enregistré sa partie avant le rechargement
  const check = intervals.find(([, ms]) => ms === 10000)[0];
  check();
  await tick(); await tick(); await tick();
  assert.strictEqual(A.state.startedAt, null);
  assert.ok(events.includes('toast'));
  assert.strictEqual(events.filter((e) => e === 'save').length, 1); // seule la ligne « prête » du nouvel état est créée
});

test('session toujours présente sur le serveur : rien ne change', async () => {
  const { A, events, intervals } = loadNetwork({ present: true });
  A.state.synced = true;
  intervals.find(([, ms]) => ms === 10000)[0]();
  await tick(); await tick();
  assert.strictEqual(A.state.startedAt, 1000);
  assert.ok(!events.includes('toast'));
});

test('numéro de session : un téléphone dont le numéro a changé repart de zéro, même si la ligne de l\'équipe existe encore', async () => {
  // cas du deuxième téléphone d'une même équipe : le premier a déjà recréé la ligne après l'effacement
  const server = { present: true, epoch: 'nouvelle' };
  const { A, events, intervals } = loadNetwork(server);
  A.state.epoch = 'ancienne';
  intervals.find(([, ms]) => ms === 10000)[0]();
  await tick(); await tick(); await tick();
  assert.strictEqual(A.state.startedAt, null);
  assert.strictEqual(A.state.epoch, 'nouvelle'); // adopte le nouveau numéro
  assert.ok(events.includes('toast'));
});

test('numéro de session : un téléphone qui n\'en a pas encore adopte le numéro courant sans rien perdre', async () => {
  const { A, events, intervals } = loadNetwork({ present: true, epoch: 'courante' });
  intervals.find(([, ms]) => ms === 10000)[0]();
  await tick(); await tick();
  assert.strictEqual(A.state.startedAt, 1000);
  assert.strictEqual(A.state.epoch, 'courante');
  assert.ok(!events.includes('toast'));
});

test('numéro de session : même numéro = la partie continue ; réinitialisation manuelle possible', async () => {
  const { A, events, intervals } = loadNetwork({ present: true, epoch: 'x' });
  A.state.epoch = 'x';
  intervals.find(([, ms]) => ms === 10000)[0]();
  await tick(); await tick();
  assert.strictEqual(A.state.startedAt, 1000);
  A.endSession(); // bouton « réinitialiser » protégé par le code organisation
  assert.strictEqual(A.state.startedAt, null);
  assert.strictEqual(A.state.team, 'E1');
});

test('organisateur : « effacer » change d\'abord le numéro de session, puis supprime les lignes', async () => {
  const { Sync, calls } = loadSync((url, options) => (options.method === 'PATCH' ? { json: [{ epoch: 'e' }] } : { json: [] }));
  await Sync.resetAll();
  assert.ok(calls[0].url.includes('game_session?id=eq.1') && calls[0].options.method === 'PATCH');
  assert.ok(calls[0].body.epoch.length > 5);
  assert.deepStrictEqual(calls.slice(1).map((c) => c.options.method), ['DELETE', 'DELETE']);
});

test('organisateur : sans table game_session, les lignes sont quand même effacées et l\'avertissement est remonté', async () => {
  const { Sync, calls } = loadSync((url, options) => (options.method === 'PATCH' ? { json: [] } : { json: [] }));
  await assert.rejects(Sync.resetAll(), /ne seront pas remis à zéro/);
  assert.strictEqual(calls.filter((c) => c.options.method === 'DELETE').length, 2);
});

test('téléphone : table game_session absente (404) = ancien comportement, pas d\'erreur', async () => {
  const { Sync } = loadSync(() => ({ status: 404, json: { code: 'PGRST205' } }));
  assert.strictEqual(await Sync.loadEpoch(), null);
});

test('organisateur : message collectif envoyé en une seule requête, un message par équipe', async () => {
  const { Sync, calls } = loadSync((url, options) => ({ json: JSON.parse(options.body).map((m, i) => Object.assign({ id: i + 1 }, m)) }));
  const saved = await Sync.sendMessages([{ team: 'E1', sender: 'admin', body: 'rdv 17h' }, { team: 'E2', sender: 'admin', body: 'rdv 17h' }]);
  assert.strictEqual(calls.length, 1);
  assert.ok(Array.isArray(calls[0].body) && calls[0].body.length === 2);
  assert.deepStrictEqual(saved.map((m) => m.team), ['E1', 'E2']);
});

test('session : lecture du départ (salle d\'attente), table absente et colonne absente', async () => {
  const wait = loadSync(() => ({ json: [{ epoch: 'e1', started_at: null }] }));
  const waiting = await wait.Sync.loadSession(); // salle d'attente
  assert.strictEqual(waiting.epoch, 'e1');
  assert.strictEqual(waiting.startedAt, null);
  assert.ok(wait.calls[0].url.includes('select=epoch,started_at'));
  const running = loadSync(() => ({ json: [{ epoch: 'e1', started_at: '2026-11-04T14:00:00Z' }] }));
  assert.strictEqual((await running.Sync.loadSession()).startedAt, '2026-11-04T14:00:00Z');
  assert.strictEqual(await loadSync(() => ({ status: 404, json: {} })).Sync.loadSession(), null); // pas de table
  const noColumn = loadSync((url) => (url.includes('started_at') ? { status: 400, json: { code: '42703' } } : { json: [{ epoch: 'e1' }] }));
  const old = await noColumn.Sync.loadSession(); // supabase.sql pas relancé
  assert.strictEqual(old.epoch, 'e1');
  assert.strictEqual(old.startedAt, undefined);
});

test('organisateur : démarrer la partie enregistre l\'heure du départ ; terminer la remet en salle d\'attente', async () => {
  const start = loadSync((url, options) => ({ json: [{ epoch: 'e', started_at: JSON.parse(options.body).started_at }] }));
  const at = await start.Sync.startGame();
  assert.strictEqual(start.calls[0].options.method, 'PATCH');
  assert.ok(Date.parse(at) > 0 && Date.now() - Date.parse(at) < 5000);
  // terminer : nouveau numéro et started_at remis à vide
  const end = loadSync((url, options) => (options.method === 'PATCH' ? { json: [{ epoch: 'n' }] } : { json: [] }));
  await end.Sync.resetAll();
  assert.strictEqual(end.calls[0].body.started_at, null);
  // serveur sans colonne started_at : le numéro de session est quand même changé
  let first = true;
  const old = loadSync((url, options) => {
    if (options.method !== 'PATCH') return { json: [] };
    if (first) { first = false; return { status: 400, json: {} }; }
    return { json: [{ epoch: 'n' }] };
  });
  await old.Sync.resetAll();
  const patches = old.calls.filter((c) => c.options.method === 'PATCH');
  assert.strictEqual(patches.length, 2);
  assert.ok(!('started_at' in patches[1].body));
  await assert.rejects(loadSync(() => ({ status: 400, json: {} })).Sync.startGame(), /colonne started_at absente/);
});
