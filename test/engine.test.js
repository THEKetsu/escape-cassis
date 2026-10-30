// Lancer : node --test test/
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const E = require('../js/core/index.js');

function loadGame() {
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'contenu.js'), 'utf8'), sandbox);
  return sandbox.window.GAME_SOURCE;
}

test('normalisation : casse, accents, tirets, St', () => {
  assert.strictEqual(E.normalize("l'Église St-Michel"), 'LEGLISESAINTMICHEL');
  assert.strictEqual(E.normalize('  saint   michel '), E.normalize('SAINT-MICHEL'));
  assert.strictEqual(E.normalize('Cœur'), 'COEUR');
  assert.strictEqual(E.normalize('1 890'), '1890');
});

test('réponse exacte avec variantes', () => {
  const step = { answers: ['SAINT MICHEL', 'EGLISE SAINT MICHEL'] };
  assert.ok(E.checkAnswer('saint-michel', step, 's'));
  assert.ok(E.checkAnswer('Église St Michel', step, 's'));
  assert.ok(!E.checkAnswer('michel', step, 's'));
  assert.ok(!E.checkAnswer('', step, 's'));
});

test('mode contains : réponse noyée dans une phrase', () => {
  const step = { answers: ['SAINT MICHEL'], match: 'contains' };
  assert.ok(E.checkAnswer("c'est l'église saint-michel !", step, 's'));
  assert.ok(!E.checkAnswer('saint pierre', step, 's'));
});

test('la version publiée valide les mêmes réponses sans les contenir', async () => {
  const game = loadGame();
  const pub = E.publish(game);
  const src = game.zones[2].A[0];
  const out = pub.zones[2].A[0];
  assert.strictEqual(out.answers, undefined);
  assert.ok(E.checkAnswer('Eglise Saint-Michel', out, pub.settings.salt));
  assert.ok(E.checkAnswer('Eglise Saint-Michel', src, game.settings.salt));
  const file = await E.publishedFile(game);
  assert.ok(!file.includes('"answers"'));
  assert.ok(!file.includes('"masterCode"'));
  assert.ok(!file.includes(game.settings.adminCode));
  assert.ok(!file.includes('CALANQUE"')); // masterCode
  assert.ok(E.codeMatches('calanque', undefined, pub.settings.masterHash, pub.settings.salt));
  // le code d'accès au dashboard n'est publié ni en clair ni haché : aucun moyen de le tester hors ligne sans déchiffrer le carnet
  assert.strictEqual(pub.settings.adminHash, undefined);
  assert.ok(!file.includes('adminHash'));
  assert.ok(!E.codeMatches('autre', undefined, pub.settings.masterHash, pub.settings.salt));
});

test('carnet de réponses : chiffré dans game.js, lisible avec le code admin seulement', async () => {
  const game = loadGame();
  const book = JSON.parse(JSON.stringify(E.answerBook(game))); // tableaux issus de vm : autre prototype
  assert.deepStrictEqual(book.answers['z3-A-1'], ['FOURNIL']);
  assert.deepStrictEqual(book.answers['final-1'], ['ARRIVEE']);
  assert.strictEqual(book.answers['z3-B-1'], undefined); // étape info : pas de réponse
  assert.strictEqual(book.masterCode, 'CALANQUE');
  const sandbox = { window: {} };
  vm.runInNewContext(await E.publishedFile(game), sandbox);
  const box = sandbox.window.GAME.answerBook;
  // casse et espaces ignorés, comme pour la saisie du code ; les clés d'équipe ne sont pas dans le carnet publié
  const opened = await E.decryptJSON(box, ' ' + game.settings.adminCode.toUpperCase() + ' ');
  assert.deepStrictEqual(opened, { answers: book.answers, masterCode: book.masterCode });
  await assert.rejects(E.decryptJSON(box, 'mauvais-code'));
});

test('clés d\'équipe : jamais dans game.js, seulement dans le SQL à coller dans Supabase', async () => {
  const game = loadGame();
  const keys = Object.keys(game.teams).map((t) => game.teams[t].key);
  assert.ok(keys.every((k) => /^[A-Za-z0-9_-]{12,}$/.test(k)));
  assert.strictEqual(new Set(keys).size, keys.length);
  const file = await E.publishedFile(game);
  keys.forEach((k) => assert.ok(!file.includes(k)));
  assert.strictEqual(E.publish(game).teams.E1.key, undefined);
  assert.strictEqual(E.answerBook(game).teamKeys.E1, game.teams.E1.key);
  const sql = E.secretsSql(game);
  // organiser_book ne reçoit que les clés d'équipe (pour les QR codes du dashboard) : ni réponses, ni code d'accès
  assert.ok(sql.includes('insert into public.organiser_book') && sql.includes('teamKeys'));
  assert.ok(!sql.includes('FOURNIL') && !sql.includes('CALANQUE') && !sql.includes(game.settings.adminCode));
  keys.forEach((k) => assert.ok(sql.includes(`'${k}'`)));
  assert.ok(sql.includes("('E1', '" + game.teams.E1.key + "')"));
  // clé absente ou trop courte : avertissement / erreur de validation
  game.teams.E1.key = '';
  assert.ok(E.validate(game).warnings.some((w) => w.includes('Équipe E1') && w.includes('clé')));
  game.teams.E1.key = 'court';
  assert.ok(E.validate(game).errors.some((e) => e.includes('Équipe E1') && e.includes('clé')));
});

test('le contenu de démo est valide', () => {
  const { errors } = E.validate(loadGame());
  assert.deepStrictEqual(errors, []);
});

test('parcours : ordre des zones et variante de chaque équipe', () => {
  const game = loadGame();
  const p6 = E.buildPath(game, 'E6');
  const zones = [...new Set(p6.map((s) => s.zoneId))];
  assert.deepStrictEqual(zones, ['1', '5', '4', '3', '2', 'final']);
  assert.ok(p6.filter((s) => s.zoneId !== 'final').every((s) => s.variant === 'B'));
  const keys = p6.map((s) => s.key);
  assert.strictEqual(new Set(keys).size, keys.length);
});

test('circuits : au plus 2 équipes par zone, jamais la même variante ensemble', () => {
  E.simulate(loadGame()).forEach((byZone) => {
    Object.values(byZone).forEach((here) => {
      assert.ok(here.length <= 2);
      assert.strictEqual(new Set(here.map((h) => h.variant)).size, here.length);
    });
  });
});

test('pénalités et durées', () => {
  const game = { settings: { hintPenalties: [60, 120] } };
  assert.strictEqual(E.hintPenalty(game, {}, 0), 60);
  assert.strictEqual(E.hintPenalty(game, {}, 5), 120);
  assert.strictEqual(E.hintPenalty(game, { hintPenalties: [30] }, 0), 30);
  const st = { startedAt: 1_000, finishedAt: 3_726_000, penalty: 120 };
  assert.strictEqual(E.totalSeconds(st, 9e9), 3845);
  assert.strictEqual(E.formatDuration(3845), '1:04:05');
  assert.strictEqual(E.formatDuration(65), '01:05');
});

test('étape tap : zone circulaire corrigée du ratio de l\'image', () => {
  const target = { x: 50, y: 42, r: 10 };
  assert.ok(E.hitTarget(50, 42, target, 0.87));
  assert.ok(E.hitTarget(57, 45, target, 0.87));
  assert.ok(!E.hitTarget(10, 10, target, 0.87));
  // 10 % de hauteur sur une image deux fois plus large que haute = 5 % de largeur
  assert.ok(E.hitTarget(50, 60, target, 0.5));
});

test('badges déduits du journal', () => {
  const game = loadGame();
  const path = E.buildPath(game, 'E1');
  const zone1 = path.filter((p) => p.zoneId === '1');
  const log = zone1.map((p) => ({ key: p.key, type: p.type, sec: 120, hints: 0, wrong: 0, skipped: false }));
  let ids = E.earnedBadges({ log }, path).map((b) => b.id);
  assert.deepStrictEqual(ids, ['brain', 'perfect']);
  log[0].sec = 20;
  log[1].wrong = 2;
  ids = E.earnedBadges({ log }, path).map((b) => b.id);
  assert.deepStrictEqual(ids, ['flash', 'brain']);
  log[1].hints = 1;
  assert.deepStrictEqual(E.earnedBadges({ log }, path).map((b) => b.id), ['flash']);
});

test('classement : arrivées au temps, puis avancement', () => {
  const game = loadGame();
  const now = 10_000_000;
  const ranked = E.rankTeams(game, {
    E1: { startedAt: 1, stepIndex: 3, penalty: 0 },
    E2: { startedAt: 1, stepIndex: 13, finishedAt: 5_000_000, penalty: 600 },
    E3: { startedAt: 1, stepIndex: 13, finishedAt: 5_000_000, penalty: 0 },
    E4: { startedAt: 1, stepIndex: 8, penalty: 0 },
    E5: { startedAt: null },
  }, now);
  assert.deepStrictEqual(ranked.map((r) => r.team), ['E3', 'E2', 'E4', 'E1']);
  // E5 a deux étapes de plus qu'E6 (ajoutées ici, quel que soit le contenu) : E5 est juste devant E6
  // en proportion, mais à un index plus bas
  game.zones[1].A.push({ type: 'info', title: 'x' }, { type: 'info', title: 'y' });
  const len5 = E.buildPath(game, 'E5').length;
  const len6 = E.buildPath(game, 'E6').length;
  assert.strictEqual(len5, len6 + 2);
  const mixed = E.rankTeams(game, {
    E6: { startedAt: 1, stepIndex: 8, penalty: 0 },
    E5: { startedAt: 1, stepIndex: Math.floor(8 / len6 * len5) + 1, penalty: 0 },
  }, now);
  assert.deepStrictEqual(mixed.map((r) => r.team), ['E5', 'E6']);
});

test('distance GPS', () => {
  const d = E.distance(43.2131, 5.5357, 43.2140, 5.5357);
  assert.ok(d > 95 && d < 105);
});

test('tchat : messages non lus de l\'autre côté', () => {
  const msgs = [
    { id: 1, sender: 'team' }, { id: 2, sender: 'admin' }, { id: 3, sender: 'team' }, { id: 5, sender: 'team' },
  ];
  assert.strictEqual(E.unreadCount(msgs, 0, 'team'), 3);
  assert.strictEqual(E.unreadCount(msgs, 3, 'team'), 1);
  assert.strictEqual(E.unreadCount(msgs, 1, 'admin'), 1);
  assert.strictEqual(E.unreadCount(msgs, 5, 'team'), 0);
  assert.strictEqual(E.unreadCount(undefined, 0, 'team'), 0);
});

test('carte : position d\'une équipe déduite de son avancement', () => {
  const step = { type: 'info' };
  const game = {
    teams: { T: { circuit: [1, 2], variant: 'A' } },
    zones: {
      1: { name: 'Un', lat: 43.0, lng: 5.0, A: [step, step] },
      2: { name: 'Deux', lat: 43.2, lng: 5.4, A: [step, step] },
    },
    final: { name: 'Fin', steps: [step] },
  };
  const path = E.buildPath(game, 'T');
  assert.strictEqual(E.teamLocation(game, path, { startedAt: null }), null);
  // 1re étape : en route vers la zone 1, sans point de départ connu
  let loc = E.teamLocation(game, path, { startedAt: 1, stepIndex: 0 });
  assert.deepStrictEqual([loc.lat, loc.lng, loc.enRoute, loc.from], [43.0, 5.0, true, null]);
  // sur place dans la zone 1
  loc = E.teamLocation(game, path, { startedAt: 1, stepIndex: 1 });
  assert.deepStrictEqual([loc.zoneId, loc.enRoute], ['1', false]);
  // en route de la zone 1 vers la zone 2 : à mi-chemin
  loc = E.teamLocation(game, path, { startedAt: 1, stepIndex: 2 });
  assert.ok(loc.enRoute && Math.abs(loc.lat - 43.1) < 1e-9 && Math.abs(loc.lng - 5.2) < 1e-9);
  // final sans position : inconnue, comme une équipe arrivée
  assert.strictEqual(E.teamLocation(game, path, { startedAt: 1, stepIndex: 4 }), null);
  assert.strictEqual(E.teamLocation(game, path, { startedAt: 1, finishedAt: 2, stepIndex: 5 }), null);
  game.final.lat = 43.1;
  game.final.lng = 5.1;
  loc = E.teamLocation(game, path, { startedAt: 1, finishedAt: 2, stepIndex: 5 });
  assert.deepStrictEqual([loc.zoneId, loc.lat], ['final', 43.1]);
  // position GPS du téléphone : prioritaire tant qu'elle a moins de 2 min, sinon position déduite
  const now = 10_000_000;
  const live = { startedAt: 1, stepIndex: 2, pos: { lat: 43.15, lng: 5.3, acc: 12, at: now - 30_000 } };
  loc = E.teamLocation(game, path, live, now);
  assert.deepStrictEqual([loc.live, loc.lat, loc.acc, loc.zoneId, loc.enRoute], [true, 43.15, 12, '2', true]);
  loc = E.teamLocation(game, path, live, now + E.LIVE_MAX_AGE);
  assert.ok(!loc.live && Math.abs(loc.lat - 43.1) < 1e-9);
  // validation : une zone sans position est signalée dès qu'une autre en a une
  delete game.zones[2].lat;
  assert.ok(E.validate(game).warnings.some((w) => w.startsWith('Zone 2 : lat/lng')));
});

test('carte : zoom et tuiles qui englobent tous les points', () => {
  const game = loadGame();
  const points = Object.keys(game.zones).map((z) => E.zonePoint(game, z));
  const view = E.mapView(points, 800, 420);
  assert.ok(view.zoom >= 15 && view.zoom <= 18);
  points.forEach((p) => {
    const { x, y } = view.project(p);
    assert.ok(x >= 40 && x <= 760 && y >= 40 && y <= 380, `${x},${y}`);
  });
  // les tuiles couvrent tout le cadre
  assert.ok(view.tiles.every((t) => t.z === view.zoom));
  assert.ok(Math.min(...view.tiles.map((t) => t.left)) <= 0 && Math.max(...view.tiles.map((t) => t.left + 256)) >= 800);
  assert.ok(Math.min(...view.tiles.map((t) => t.top)) <= 0 && Math.max(...view.tiles.map((t) => t.top + 256)) >= 420);
  assert.strictEqual(E.mapView([], 800, 420), null);
  // zoom imposé (boutons + / −) : même centre, plafonné à 19
  const closer = E.mapView(points, 800, 420, { zoom: view.zoom + 1 });
  assert.strictEqual(closer.zoom, view.zoom + 1);
  const c = (v) => v.project({ lat: (Math.min(...points.map((p) => p.lat)) + Math.max(...points.map((p) => p.lat))) / 2, lng: (Math.min(...points.map((p) => p.lng)) + Math.max(...points.map((p) => p.lng))) / 2 });
  assert.ok(Math.abs(c(closer).x - 400) < 1 && Math.abs(c(closer).y - 210) < 2);
  assert.strictEqual(E.mapView(points, 800, 420, { zoom: 25 }).zoom, 19);
  // bande réservée à gauche : tous les points restent à sa droite
  const side = E.mapView(points, 800, 420, { left: 250 });
  points.forEach((p) => assert.ok(side.project(p).x >= 250 + 40 - 1));
  // échelle cohérente avec la distance GPS : 100 m mesurés = 100 m dessinés (à 1 % près)
  const a = view.project({ lat: 43.2131, lng: 5.5357 });
  const b = view.project({ lat: 43.2140, lng: 5.5357 });
  const drawn = Math.hypot(a.x - b.x, a.y - b.y) * view.metersPerPixel(43.2135);
  const real = E.distance(43.2131, 5.5357, 43.2140, 5.5357);
  assert.ok(Math.abs(drawn - real) / real < 0.01, `${drawn} vs ${real}`);
});
