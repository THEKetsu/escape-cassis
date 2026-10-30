/*
 * Moteur du jeu, module validate : Contrôle du contenu et simulation de l'occupation des zones.
 * Logique pure, sans DOM. Module UMD : Node (require) ou navigateur (window.Engine).
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(Object.assign({}, require('./text.js'), require('./path.js'), require('./geo.js')));
  else {
    const E = root.Engine = root.Engine || {};
    Object.assign(E, factory(E));
  }
})(typeof self !== 'undefined' ? self : this, function (E) {
  const { STEP_TYPES, normalize, variantFor, allSteps, zonePoint } = E;

  function validate(game) {
    const errors = [];
    const warnings = [];
    const zoneIds = Object.keys(game.zones || {});
    const teamIds = Object.keys(game.teams || {});
    if (!game.id) errors.push('game.id manquant');
    if (!teamIds.length) errors.push('Aucune équipe définie');

    teamIds.forEach((t) => {
      const team = game.teams[t];
      if (!team.key) warnings.push(`Équipe ${t} : pas de clé (key) : le téléphone ne pourra pas se synchroniser avec le dashboard`);
      else if (!/^[A-Za-z0-9_-]{12,}$/.test(team.key)) errors.push(`Équipe ${t} : la clé (key) doit faire au moins 12 caractères parmi lettres, chiffres, - et _`);
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

    // Carte du dashboard : dès qu'une zone a une position, les autres devraient en avoir une
    const located = zoneIds.filter((z) => zonePoint(game, z));
    if (located.length) {
      zoneIds.filter((z) => !zonePoint(game, z))
        .forEach((z) => warnings.push(`Zone ${z} : lat/lng manquants, ses équipes n'apparaîtront pas sur la carte`));
      if (game.final && !zonePoint(game, 'final')) warnings.push('Final : lat/lng manquants, les équipes arrivées n\'apparaîtront pas sur la carte');
    }

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

  return { validate, simulate };
});
