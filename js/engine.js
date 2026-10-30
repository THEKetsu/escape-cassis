/*
 * Moteur du jeu : logique pure, sans DOM.
 * Utilisé par le jeu, le dashboard, la page outils et les tests Node.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.Engine = api;
})(typeof self !== 'undefined' ? self : this, function () {
  const STEP_TYPES = ['info', 'text', 'number', 'qcm', 'image-choice', 'qr', 'gps', 'tap'];
  const SYNONYMS = { ST: 'SAINT', STE: 'SAINTE' };

  // "l'Église St-Michel" -> ["L", "EGLISE", "SAINT", "MICHEL"]
  function words(input) {
    return String(input == null ? '' : input)
      .toUpperCase()
      .replace(/Œ/g, 'OE')
      .replace(/Æ/g, 'AE')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^A-Z0-9]+/g, ' ')
      .trim()
      .split(' ')
      .filter(Boolean)
      .map((w) => SYNONYMS[w] || w);
  }

  // Espaces, tirets, accents et casse ignorés : "Saint-Michel" === "SAINT MICHEL"
  function normalize(input) {
    return words(input).join('');
  }

  // cyrb53 : hachage rapide et synchrone (fonctionne aussi en file://).
  // Il cache les réponses aux curieux, ce n'est pas de la cryptographie.
  function hash(str, salt) {
    const s = String(salt || '') + '|' + str;
    let h1 = 0xdeadbeef;
    let h2 = 0x41c6ce57;
    for (let i = 0; i < s.length; i++) {
      const ch = s.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (h2 >>> 0).toString(16).padStart(8, '0') + (h1 >>> 0).toString(16).padStart(8, '0');
  }

  // En mode "contains", toute suite de mots consécutifs de la saisie est testée :
  // "c'est l'église saint michel" contient "SAINT MICHEL".
  function candidates(input, match) {
    const w = words(input);
    if (match !== 'contains') return [w.join('')];
    const out = [];
    for (let i = 0; i < w.length; i++) {
      for (let j = i + 1; j <= w.length; j++) out.push(w.slice(i, j).join(''));
    }
    return out;
  }

  function answerHashes(step, salt) {
    if (step.h) return step.h;
    return (step.answers || []).map((a) => hash(normalize(a), salt));
  }

  function checkAnswer(input, step, salt) {
    const expected = answerHashes(step, salt);
    return candidates(input, step.match).some((c) => c && expected.includes(hash(c, salt)));
  }

  // Code en clair (contenu.js local) ou haché (game.js publié)
  function codeMatches(input, plain, hashed, salt) {
    const value = normalize(input);
    if (!value) return false;
    if (hashed) return hash(value, salt) === hashed;
    return !!plain && value === normalize(plain);
  }

  function variantFor(team, zoneId) {
    const v = team.variant;
    if (v && typeof v === 'object') return v[zoneId] || 'A';
    return v || 'A';
  }

  // Liste à plat des étapes d'une équipe : ses zones dans l'ordre de son circuit, puis le final.
  function buildPath(game, teamId) {
    const team = game.teams[teamId];
    if (!team) return null;
    const steps = [];
    team.circuit.forEach((zoneId, zoneIndex) => {
      const zone = game.zones[zoneId];
      const variant = variantFor(team, zoneId);
      if (!zone || !zone[variant]) throw new Error(`Zone ${zoneId} / variante ${variant} introuvable (équipe ${teamId})`);
      zone[variant].forEach((step, i) => {
        steps.push(Object.assign({}, step, {
          key: `z${zoneId}-${variant}-${i}`,
          zoneId: String(zoneId),
          zoneName: zone.name,
          zoneIndex,
          zoneStep: i,
          zoneSteps: zone[variant].length,
          variant,
        }));
      });
    });
    const final = game.final || { steps: [] };
    final.steps.forEach((step, i) => {
      steps.push(Object.assign({}, step, {
        key: `final-${i}`,
        zoneId: 'final',
        zoneName: final.name || 'Final',
        zoneIndex: team.circuit.length,
        zoneStep: i,
        zoneSteps: final.steps.length,
        variant: '',
      }));
    });
    return steps;
  }

  // Coût de l'indice n° level (0 = premier indice)
  function hintPenalty(game, step, level) {
    const list = step.hintPenalties || (game.settings && game.settings.hintPenalties) || [];
    if (!list.length) return 0;
    return list[Math.min(level, list.length - 1)];
  }

  function elapsedSeconds(state, now) {
    if (!state || !state.startedAt) return 0;
    return Math.max(0, Math.round(((state.finishedAt || now) - state.startedAt) / 1000));
  }

  function totalSeconds(state, now) {
    return elapsedSeconds(state, now) + ((state && state.penalty) || 0);
  }

  function formatDuration(sec) {
    sec = Math.max(0, Math.round(sec || 0));
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    const mm = String(m).padStart(2, '0');
    const ss = String(s).padStart(2, '0');
    return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
  }

  // Distance en mètres entre deux points GPS (haversine)
  function distance(lat1, lng1, lat2, lng2) {
    const R = 6371000;
    const rad = (d) => (d * Math.PI) / 180;
    const dLat = rad(lat2 - lat1);
    const dLng = rad(lng2 - lng1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(a));
  }

  // Étape "tap" : x, y en % de l'image, r en % de la largeur ; ratio = hauteur / largeur
  function hitTarget(x, y, target, ratio) {
    const dx = x - target.x;
    const dy = (y - target.y) * (ratio || 1);
    return Math.sqrt(dx * dx + dy * dy) <= target.r;
  }

  const BADGES = [
    { id: 'flash', icon: '⚡', name: 'Éclair', desc: 'Une énigme résolue en moins de 45 s' },
    { id: 'brain', icon: '🧠', name: 'Autonomes', desc: 'Une zone terminée sans indice' },
    { id: 'perfect', icon: '🎯', name: 'Sans faute', desc: 'Une zone sans indice ni erreur' },
    { id: 'explorer', icon: '🧭', name: 'Explorateurs', desc: 'Toutes les zones terminées' },
    { id: 'legend', icon: '👑', name: 'Légendes', desc: 'Jeu terminé sans aucun indice' },
  ];

  // Badges gagnés, déduits du journal des étapes validées
  function earnedBadges(state, path) {
    const log = (state && state.log) || [];
    const earned = new Set();
    if (log.some((l) => l.type !== 'info' && !l.skipped && l.sec < 45)) earned.add('flash');
    const zones = {};
    path.forEach((p) => { if (p.zoneId !== 'final') (zones[p.zoneId] = zones[p.zoneId] || []).push(p.key); });
    let zonesDone = 0;
    Object.keys(zones).forEach((z) => {
      const entries = zones[z].map((k) => log.find((l) => l.key === k));
      if (entries.some((e) => !e)) return;
      zonesDone++;
      const clean = entries.every((e) => !e.hints && !e.skipped);
      if (clean) earned.add('brain');
      if (clean && entries.every((e) => !e.wrong)) earned.add('perfect');
    });
    if (zonesDone && zonesDone === Object.keys(zones).length) earned.add('explorer');
    if (state && state.finishedAt && !state.hintsTotal && !state.skips) earned.add('legend');
    return BADGES.filter((b) => earned.has(b.id));
  }

  // Classement : arrivées au temps final, puis équipes en jeu par avancement (en %, les circuits
  // n'ayant pas tous le même nombre d'étapes)
  function rankTeams(game, states, now) {
    return Object.keys(game.teams)
      .map((t) => ({ team: t, state: states[t] }))
      .filter((r) => r.state && r.state.startedAt)
      .map((r) => {
        const done = !!r.state.finishedAt;
        const progress = done ? 1 : r.state.stepIndex / buildPath(game, r.team).length;
        return Object.assign(r, { total: totalSeconds(r.state, now), done, progress });
      })
      .sort((a, b) => (b.done - a.done) || (a.done ? a.total - b.total : (b.progress - a.progress) || (a.total - b.total)));
  }

  function allSteps(game) {
    const out = [];
    Object.keys(game.zones || {}).forEach((zoneId) => {
      ['A', 'B'].forEach((v) => {
        (game.zones[zoneId][v] || []).forEach((step, i) => out.push({ step, where: `Zone ${zoneId}${v} étape ${i + 1}` }));
      });
    });
    ((game.final && game.final.steps) || []).forEach((step, i) => out.push({ step, where: `Final étape ${i + 1}` }));
    return out;
  }

  function stepImages(step) {
    const imgs = [].concat(step.images || [], step.image || []);
    (step.options || []).forEach((o) => o && o.img && imgs.push(o.img));
    if (step.success && step.success.images) imgs.push(...step.success.images);
    return imgs;
  }

  function validate(game) {
    const errors = [];
    const warnings = [];
    const zoneIds = Object.keys(game.zones || {});
    const teamIds = Object.keys(game.teams || {});
    if (!game.id) errors.push('game.id manquant');
    if (!teamIds.length) errors.push('Aucune équipe définie');

    teamIds.forEach((t) => {
      const team = game.teams[t];
      if (!Array.isArray(team.circuit) || !team.circuit.length) return errors.push(`Équipe ${t} : circuit vide`);
      const seen = new Set();
      team.circuit.forEach((z) => {
        const key = String(z);
        if (seen.has(key)) errors.push(`Équipe ${t} : zone ${z} présente deux fois`);
        seen.add(key);
        const zone = game.zones[key];
        const v = variantFor(team, key);
        if (!zone) errors.push(`Équipe ${t} : zone ${z} inexistante`);
        else if (!zone[v] || !zone[v].length) errors.push(`Équipe ${t} : zone ${z} n'a pas de variante ${v}`);
      });
      const missing = zoneIds.filter((z) => !seen.has(z));
      if (missing.length) warnings.push(`Équipe ${t} ne visite pas la/les zone(s) ${missing.join(', ')}`);
    });

    allSteps(game).forEach(({ step, where }) => {
      if (!STEP_TYPES.includes(step.type)) return errors.push(`${where} : type "${step.type}" inconnu`);
      if (!step.title) warnings.push(`${where} : pas de titre`);
      const hasAnswers = (step.answers && step.answers.length) || (step.h && step.h.length);
      if (['text', 'number', 'qcm', 'image-choice', 'qr'].includes(step.type) && !hasAnswers) errors.push(`${where} : aucune réponse acceptée`);
      if (['qcm', 'image-choice'].includes(step.type)) {
        if (!step.options || step.options.length < 2) errors.push(`${where} : il faut au moins 2 options`);
        else if (step.answers) {
          const labels = step.options.map((o) => normalize(typeof o === 'string' ? o : o.label));
          step.answers.forEach((a) => {
            if (!labels.includes(normalize(a))) errors.push(`${where} : la réponse "${a}" ne correspond à aucune option`);
          });
        }
      }
      if (step.type === 'tap') {
        const t = step.target || {};
        if (!step.image) errors.push(`${where} : image manquante`);
        if (typeof t.x !== 'number' || typeof t.y !== 'number' || typeof t.r !== 'number') errors.push(`${where} : target { x, y, r } manquant`);
      }
      if (step.type === 'gps') {
        if (typeof step.lat !== 'number' || typeof step.lng !== 'number') errors.push(`${where} : lat/lng manquants`);
        if (!hasAnswers) warnings.push(`${where} : pas de code de secours si le GPS est imprécis`);
      }
    });
    return { errors, warnings };
  }

  // Occupation théorique des zones : créneau n = n-ième zone de chaque circuit.
  function simulate(game) {
    const teamIds = Object.keys(game.teams);
    const slots = Math.max(...teamIds.map((t) => game.teams[t].circuit.length));
    const result = [];
    for (let s = 0; s < slots; s++) {
      const byZone = {};
      teamIds.forEach((t) => {
        const team = game.teams[t];
        const z = team.circuit[s];
        if (z == null) return;
        (byZone[z] = byZone[z] || []).push({ team: t, variant: variantFor(team, String(z)) });
      });
      result.push(byZone);
    }
    return result;
  }

  // Version publiable : réponses et codes remplacés par leurs hachages
  function publish(game) {
    const out = JSON.parse(JSON.stringify(game));
    const salt = (out.settings && out.settings.salt) || out.id;
    allSteps(out).forEach(({ step }) => {
      if (step.answers) {
        step.h = step.answers.map((a) => hash(normalize(a), salt));
        delete step.answers;
      }
    });
    const s = out.settings || {};
    if (s.masterCode) { s.masterHash = hash(normalize(s.masterCode), salt); delete s.masterCode; }
    if (s.adminCode) { s.adminHash = hash(normalize(s.adminCode), salt); delete s.adminCode; }
    return out;
  }

  function publishedFile(game) {
    return '/* Fichier généré à partir de contenu.js : ne pas modifier à la main. */\n' +
      'window.GAME = ' + JSON.stringify(publish(game), null, 2) + ';\n';
  }

  return {
    STEP_TYPES, words, normalize, hash, candidates, checkAnswer, codeMatches,
    variantFor, buildPath, hintPenalty, elapsedSeconds, totalSeconds, formatDuration,
    distance, hitTarget, BADGES, earnedBadges, rankTeams, allSteps, stepImages, validate, simulate, publish, publishedFile,
  };
});
