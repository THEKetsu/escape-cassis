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
  const src = game.zones[2].B[2];
  const out = pub.zones[2].B[2];
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
  assert.deepStrictEqual(book.answers['z3-A-3'], ['FOUR BANAL', 'LE FOUR BANAL', 'FOUR']);
  assert.deepStrictEqual(book.answers['final-1'], ['TOP']);
  assert.strictEqual(book.answers['z3-B-2'], undefined); // étape info : pas de réponse
  assert.strictEqual(book.masterCode, 'CALANQUE');
  const sandbox = { window: {} };
  vm.runInNewContext(await E.publishedFile(game), sandbox);
  const box = sandbox.window.GAME.answerBook;
  // casse et espaces ignorés, comme pour la saisie du code 
  const opened = await E.decryptJSON(box, ' ' + game.settings.adminCode.toUpperCase() + ' ');
  assert.deepStrictEqual(opened, book);
  await assert.rejects(E.decryptJSON(box, 'mauvais-code'));
});

test('le contenu de démo est valide', () => {
  const { errors } = E.validate(loadGame());
  assert.deepStrictEqual(errors, []);
});

test('parcours : ordre des zones et variante de chaque équipe', () => {
  const game = loadGame();
  const p6 = E.buildPath(game, 'E6');
  const zones = [...new Set(p6.map((s) => s.zoneId))];
  assert.deepStrictEqual(zones, ['3', '5', '1', '2', '4', 'final']);
  // variante choisie zone par zone : 3B, 5A, 1A, 2A, 4A
  assert.deepStrictEqual(zones.slice(0, 5).map((z) => p6.find((s) => s.zoneId === z).variant), ['B', 'A', 'A', 'A', 'A']);
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
  const lengths = () => [E.buildPath(game, 'E5').length, E.buildPath(game, 'E6').length];
  const extra = lengths()[0] - lengths()[1] - 2;
  const pad = extra < 0 ? game.zones[3].A : game.zones[3].B; // en zone 3, E5 joue la variante A et E6 la B
  for (let i = 0; i < Math.abs(extra); i++) pad.push({ type: 'info', title: 'x' });
  const [len5, len6] = lengths();
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

test('choix multiple : réponse = options cochées dans l\'ordre, validée comme les autres réponses', () => {
  const game = loadGame();
  const step = game.zones[2].B[1];
  assert.strictEqual(step.type, 'multi');
  const salt = game.settings.salt;
  assert.ok(E.checkAnswer('SAINT-PIERRE + FRÉDÉRIC MISTRAL', step, salt));
  assert.ok(!E.checkAnswer('SAINT-PIERRE + SAINT-MICHEL', step, salt));
  assert.ok(E.checkAnswer('SAINT-PIERRE + FRÉDÉRIC MISTRAL', E.publish(game).zones[2].B[1], salt));
  step.count = 3;
  assert.ok(E.validate(game).errors.some((e) => e.includes('count')));
});

test('export fin de partie : classement puis détail des étapes, au format CSV', () => {
  const game = loadGame();
  const now = 10000000;
  const csv = E.exportCsv(game, {
    E1: { startedAt: now - 600000, finishedAt: now - 60000, penalty: 120, teamName: 'Les "Rapides"',
      log: [{ zoneName: 'Port', title: 'Étape; 1', sec: 65, hints: 1, wrong: 2, skipped: true }] },
    E2: { startedAt: null },
  }, now);
  assert.ok(csv.startsWith('\ufeffRang;Équipe;Nom;Statut'));
  const lines = csv.trim().split('\r\n');
  assert.strictEqual(lines[1], '1;E1;"Les ""Rapides""";Arrivée;09:00;02:00;11:00;1;2');
  assert.ok(lines.includes('E1;"Les ""Rapides""";Port;"Étape; 1";01:05;1;2;oui'));
  assert.ok(!csv.includes('E2')); // équipe qui n'a pas démarré : absente
});

test('classement à remettre dans l\'ordre : seule la bonne suite est acceptée, options présentées dans le désordre', () => {
  const game = loadGame();
  const salt = game.settings.salt;
  ['A', 'B'].forEach((v) => {
    const step = game.zones[3][v][1];
    assert.strictEqual(step.type, 'order');
    const right = step.answers[0].split(' + ');
    assert.deepStrictEqual(right, ['PORTAIL', 'BAIES JUMELLES', 'OCULUS', 'CROIX', 'CLOCHER / HORLOGE']);
    assert.notDeepStrictEqual(step.options, right); // l'ordre ne doit pas se lire dans l'écran
    assert.ok(E.checkAnswer(right.join(' + '), E.publish(game).zones[3][v][1], salt));
    assert.ok(!E.checkAnswer(right.slice().reverse().join(' + '), step, salt));
    assert.ok(!E.checkAnswer([right[1], right[0], ...right.slice(2)].join(' + '), step, salt));
  });
  game.zones[3].A[1].answers = ['PORTAIL + OCULUS'];
  assert.ok(E.validate(game).errors.some((e) => e.includes('toutes les options')));
});

test('zip : une seule solution par grille, lettres dans l\'ordre du chemin, règles de déplacement', () => {
  const game = loadGame();
  [['A', 'FOURBANAL'], ['B', 'MAISONDELEUROPE']].forEach(([v, word]) => {
    const step = game.zones[3][v][2];
    assert.strictEqual(step.type, 'zip');
    const z = step.zip;
    const sols = E.zipSolve(z, 5);
    assert.strictEqual(sols.length, 1); // grille bien posée : un seul chemin
    assert.strictEqual(E.zipLetters(z, sols[0]), word);
    assert.deepStrictEqual(E.zipCheck(z, sols[0]), { ok: true });
    assert.strictEqual(E.zipCheck(z, sols[0].slice(0, 30)).reason, 'incomplete');
    assert.strictEqual(E.zipCheck(z, sols[0].slice().reverse()).reason, 'start');
    // on ne démarre qu'au premier repère, puis on ne peut ni traverser un mur ni sauter un repère
    const start = z.marks[0].at[0] * z.size + z.marks[0].at[1];
    assert.ok(E.zipMoves(z, [start]).length >= 1);
    assert.ok(!E.zipMoves(z, [start]).includes(z.marks[z.marks.length - 1].at[0] * z.size + z.marks[z.marks.length - 1].at[1]));
  });
  // grille impossible : refusée à la validation du contenu
  game.zones[3].A[2].zip.walls = game.zones[3].A[2].zip.walls.concat([[3, 3, 'R'], [3, 3, 'D'], [2, 3, 'D'], [3, 2, 'R']]);
  assert.ok(E.validate(game).errors.some((e) => e.includes('aucune solution')));
});

test('zones 4 et 5 : réponses attendues, anagrammes justes (lettres retirées puis restantes)', () => {
  const game = loadGame();
  const salt = game.settings.salt;
  const ok = (step, v) => assert.ok(E.checkAnswer(v, step, salt), `${step.title} : « ${v} » devrait être accepté`);
  const ko = (step, v) => assert.ok(!E.checkAnswer(v, step, salt), `${step.title} : « ${v} » devrait être refusé`);
  const four = game.zones[4];
  ok(four.A[1], 'le fournier'); ko(four.A[1], 'boulanger');
  ok(four.B[1], four.B[1].options[2]); ko(four.B[1], four.B[1].options[0]);
  const letters = (t) => String(t).replace(/[^A-Z]/g, '').split('').sort().join('');
  const remove = (pool, rm) => { const p = letters(pool).split(''); letters(rm).split('').forEach((c) => p.splice(p.indexOf(c), 1)); return p.join(''); };
  const text = (step) => step.text.replace(/<[^>]+>/g, ' ');
  const reserve = (step) => text(step).match(/(?:^|\s)((?:[A-Z] ){9,}[A-Z])(?=\s|$)/)[1];
  const five = game.zones[5];
  [['A', 1], ['B', 2]].forEach(([v, i]) => {
    ok(five[v][i], 'Cassis'); ko(five[v][i], 'terrain de boules'); // le résultat est le mot fixe CASSIS, plus une destination
    ok(five[v][0], 'Une crosse et deux poissons'); ok(five[v][0], '1 crosse + 2 poissons'); ko(five[v][0], 'trois poissons');
    assert.ok(five[v][i].success.routing); // l'écran suivant annonce la destination propre à l'équipe
  });
  assert.strictEqual(remove(reserve(five.A[1]), 'CROSSE POISSON POISSON'), letters('CASSIS')); // 5A : il reste CASSIS
  assert.strictEqual(remove(reserve(five.B[2]), 'PORT'), letters('CASSIS')); // 5B : PORT retiré, il reste CASSIS
  assert.strictEqual(remove('SPCROES', 'CROSSE') + remove('OPSOIONS', 'POISSON') + remove('PTOISROSN', 'POISSON'), 'PORT'); // 5B : P + O + (R, T)
  ok(five.B[1], 'port');
});

test('routage : dernière zone de chaque équipe = écran « finale » ; après la zone 5, destination propre à l\'équipe', () => {
  const game = loadGame();
  Object.keys(game.zones).forEach((z) => {
    assert.ok(game.zones[z].lastSuccess && game.zones[z].lastSuccess.text, `zone ${z} : écran « dernière zone » manquant`);
    assert.ok(game.zones[z].where, `zone ${z} : lieu à annoncer manquant`);
  });
  const next = (t) => { const c = game.teams[t].circuit; const i = c.indexOf(5); return i === c.length - 1 ? 'finale' : c[i + 1]; };
  // table de routage après la Maison de l'Europe
  assert.deepStrictEqual(Object.keys(game.teams).map(next), ['finale', 2, 4, 1, 1, 1, 'finale', 2]);
  // dernière zone de chaque équipe
  assert.deepStrictEqual(Object.keys(game.teams).map((t) => game.teams[t].circuit.slice(-1)[0]), [5, 2, 1, 1, 2, 4, 5, 3]);
});

test('carte du joueur : les lieux se dévoilent au fil des énigmes résolues', () => {
  const game = loadGame();
  const team = 'E2'; // circuit 1, 3, 4, 5, 2
  const path = E.buildPath(game, team);
  const first = (zone) => path.findIndex((s) => s.zoneId === String(zone));
  const last = (zone) => path.map((s, i) => (s.zoneId === String(zone) ? i : -1)).filter((i) => i >= 0).pop();
  const show = (state) => E.revealedZones(game, team, path, Object.assign({ startedAt: 1, phase: 'step' }, state)).map((z) => z.id + ':' + z.status).join(' ');
  assert.deepStrictEqual(E.revealedZones(game, team, path, { startedAt: null }), []); // avant le départ : rien
  assert.strictEqual(show({ stepIndex: 0 }), '1:current'); // départ : seule la première zone est connue
  assert.strictEqual(show({ stepIndex: last(1) }), '1:current'); // dernière énigme pas encore résolue : rien de plus
  assert.strictEqual(show({ stepIndex: last(1), phase: 'success' }), '1:done 3:next'); // résolue : la prochaine destination apparaît
  assert.strictEqual(show({ stepIndex: first(3) }), '1:done 3:current');
  assert.strictEqual(show({ stepIndex: last(2), phase: 'success' }), '1:done 3:done 4:done 5:done 2:done final:next'); // dernière zone résolue : la finale
  assert.strictEqual(show({ stepIndex: path.length - 1, finishedAt: 5, phase: 'done' }), '1:done 3:done 4:done 5:done 2:done final:done');
});

test('salle d\'attente : seule l\'organisation donne le départ (jamais de démarrage tout seul avec un serveur)', () => {
  assert.strictEqual(E.lobbyDecision({ epoch: 'e', startedAt: null }, false), 'wait'); // départ pas encore donné
  assert.strictEqual(E.lobbyDecision({ epoch: 'e', startedAt: '2026-11-04T14:00:00Z' }, false), 'begin'); // déjà lancée : on entre directement
  assert.strictEqual(E.lobbyDecision(null, false), 'wait'); // pas de table : l'équipe n'ose pas démarrer seule
  assert.strictEqual(E.lobbyDecision({ epoch: 'e', startedAt: undefined }, false), 'wait'); // table sans colonne : idem
  assert.strictEqual(E.lobbyDecision(null, true), 'wait'); // serveur injoignable : on attend de pouvoir lire
});

test('zone 5 : la réponse est la destination propre à chaque équipe (zone suivante de son circuit, ou la finale)', () => {
  const game = loadGame();
  const pub = E.publish(game);
  const salt = game.settings.salt;
  const letters = (t) => String(t).replace(/[^A-Z]/g, '').split('').sort().join('');
  const remove = (pool, rm) => { const p = letters(pool).split(''); letters(rm).split('').forEach((c) => p.splice(p.indexOf(c), 1)); return p.join(''); };
  const reserve = (s) => s.text.replace(/<[^>]+>/g, ' ').match(/(?:^|\s)((?:[A-Z] ){9,}[A-Z])(?=\s|$)/)[1];
  const expected = { E1: 'TERRAIN DE PETANQUE', E2: 'PORT DE CASSIS', E3: 'FOUR BANAL', E4: 'PLACE BARAGNON', E5: 'PLACE BARAGNON', E6: 'PLACE BARAGNON', E7: 'TERRAIN DE PETANQUE', E8: 'PORT DE CASSIS' };
  Object.keys(expected).forEach((t) => {
    const variant = game.teams[t].variant[5];
    const zi = variant === 'A' ? 1 : 2; // étape qui donne la destination (A : réserve, B : seconde élimination)
    const find = (g) => E.buildPath(g, t).find((s) => s.zoneId === '5' && s.zoneStep === zi);
    const st = find(game);
    assert.ok(st.afterOverride, t + ' : pas de contenu propre à la zone suivante');
    // la réserve de lettres, une fois les lettres du blason (ou de PORT) retirées, donne exactement la destination
    assert.strictEqual(remove(reserve(st), variant === 'A' ? 'CROSSE POISSON POISSON' : 'PORT'), letters(expected[t]), t);
    const ps = find(pub);
    assert.ok(E.checkAnswer(expected[t], ps, salt), t + ' : ' + expected[t] + ' refusé');
    assert.ok(!E.checkAnswer('cassis', ps, salt), t + ' : CASSIS ne doit plus être la réponse');
  });
  assert.ok(E.checkAnswer('le terrain de pétanque', E.buildPath(pub, 'E1').find((s) => s.zoneId === '5' && s.zoneStep === 1), salt));
  // 2A : « Destination mystère » annonce la finale pour E2 (dernière zone), le Four Banal pour E8 (zone 4 ensuite)
  const mystery = (g, t) => E.buildPath(g, t).find((s) => s.title === 'Destination mystère');
  assert.ok(E.checkAnswer('terrains de pétanque', mystery(pub, 'E2'), salt) && !E.checkAnswer('four banal', mystery(pub, 'E2'), salt));
  assert.ok(E.checkAnswer('four banal', mystery(pub, 'E8'), salt) && !E.checkAnswer('pétanque', mystery(pub, 'E8'), salt));
  // le blason : toute formulation avec une crosse (ou un bâton) ET des poissons
  const blason = E.buildPath(pub, 'E1').find((s) => s.zoneId === '5' && s.zoneStep === 0);
  ['1 crosse + 2 poissons', 'Une crosse et deux poissons', '2 poissons et 1 crosse', 'crosse et poissons', 'un bâton et des poissons', 'je vois une crosse, un poisson et un autre poisson'].forEach((v) => assert.ok(E.checkAnswer(v, blason, salt), v));
  ['une crosse', 'deux poissons', 'trois étoiles', 'un chapeau et des fleurs'].forEach((v) => assert.ok(!E.checkAnswer(v, blason, salt), v));
  // l'arrivée finale : le code est TOP
  assert.ok(E.checkAnswer('top', E.buildPath(pub, 'E1').find((s) => s.key === 'final-1'), salt));
});

test('dernière zone : 1A, 1B, 2B et 3A mènent aux terrains de pétanque pour l\'équipe qui finit dessus', () => {
  const game = loadGame();
  const pub = E.publish(game);
  const salt = game.settings.salt;
  const at = (g, t, zone, i) => E.buildPath(g, t).find((s) => s.zoneId === String(zone) && s.zoneStep === i);
  const decode = (text, key) => text.replace(/[A-Z]/g, (c) => String.fromCharCode(((c.charCodeAt(0) - 65 - key + 26) % 26) + 65));
  const cipher = (s) => s.text.replace(/<[^>]+>/g, '|').split('|').find((x) => /^[A-Z ]{12,}$/.test(x.trim())).trim();
  // E3 finit en 1A (clé 12), E4 en 1B (clé 6) : le message se déchiffre en TERRAIN DE PETANQUE
  assert.strictEqual(decode(cipher(at(game, 'E3', 1, 2)), 12), 'TERRAIN DE PETANQUE');
  assert.strictEqual(decode(cipher(at(game, 'E4', 1, 2)), 6), 'TERRAIN DE PETANQUE');
  // E8 finit en 3A : la grille a une seule solution et ses lettres font lire TERRAIN DE PETANQUE
  const z = at(game, 'E8', 3, 2).zip;
  const sols = E.zipSolve(z, 3);
  assert.strictEqual(sols.length, 1);
  assert.strictEqual(E.zipLetters(z, sols[0]), 'TERRAINDEPETANQUE');
  assert.strictEqual(z.marks.map((m) => m.icon).join(' '), 'portail baies oculus croix clocher'); // mêmes repères, même ordre
  // les réponses de fin : terrains de pétanque, plus l'ancienne destination
  [['E3', 1, 2, 'port de cassis'], ['E4', 1, 2, 'saint michel'], ['E5', 2, 2, 'saint michel'], ['E8', 3, 3, 'four banal']].forEach(([t, zone, i, old]) => {
    const s = at(pub, t, zone, i);
    assert.strictEqual(s.afterOverride, 'final', `${t} zone ${zone}`);
    assert.ok(E.checkAnswer('les terrains de pétanque', s, salt), `${t} zone ${zone} : pétanque refusé`);
    assert.ok(!E.checkAnswer(old, s, salt), `${t} zone ${zone} : l'ancienne destination est encore acceptée`);
  });
  // les autres équipes gardent leur énigme : E1 en 1A trouve toujours le port, E2 en 3A le Four Banal, E7 en 2B Saint-Michel
  assert.ok(E.checkAnswer('port de cassis', at(pub, 'E1', 1, 2), salt));
  assert.ok(E.checkAnswer('four banal', at(pub, 'E2', 3, 3), salt));
  assert.ok(E.checkAnswer('saint michel', at(pub, 'E7', 2, 2), salt));
  assert.notDeepStrictEqual(at(game, 'E2', 3, 2).zip, z);
});

test('cohérence du parcours : chaque énigme qui révèle un lieu annonce bien la zone suivante de l\'équipe', () => {
  const game = loadGame();
  const pub = E.publish(game);
  const salt = game.settings.salt;
  const name = { 1: 'place baragnon', 2: 'port de cassis', 3: 'saint michel', 4: 'four banal', 5: 'maison de l europe', final: 'terrain de petanque' };
  const issues = [];
  Object.keys(game.teams).forEach((t) => {
    const path = E.buildPath(pub, t);
    const circuit = game.teams[t].circuit.map(String);
    circuit.forEach((z, zi) => {
      if (z === '4') return; // l'enveloppe du Four Banal donne la destination
      const next = zi === circuit.length - 1 ? 'final' : circuit[zi + 1];
      const steps = path.filter((s) => s.zoneId === z && s.h);
      const reveal = steps[steps.length - 1]; // dernière énigme à réponse de la zone : celle qui donne le lieu suivant
      const ok = E.checkAnswer(name[next], reveal, salt) || (reveal.success && reveal.success.routing);
      if (!ok) issues.push(`${t} zone ${z} n'annonce pas ${name[next]}`);
    });
  });
  assert.deepStrictEqual(issues, []);
});
