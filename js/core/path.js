/*
 * Moteur du jeu, module path : Parcours : variante d'une équipe, liste à plat de ses étapes, parcours du contenu.
 * Logique pure, sans DOM. Module UMD : Node (require) ou navigateur (window.Engine).
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else {
    const E = root.Engine = root.Engine || {};
    Object.assign(E, factory(E));
  }
})(typeof self !== 'undefined' ? self : this, function () {
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

  return { variantFor, buildPath, allSteps, stepImages };
});
