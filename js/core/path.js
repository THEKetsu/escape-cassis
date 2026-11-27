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
      let photo = ''; // l'image du lieu reste affichée sur les écrans suivants de la zone
      zone[variant].forEach((step, i) => {
        const built = Object.assign({}, step, {
          key: `z${zoneId}-${variant}-${i}`,
          zoneId: String(zoneId),
          zoneName: zone.name,
          zoneIndex,
          zoneStep: i,
          zoneSteps: zone[variant].length,
          variant,
        });
        // step.after : texte, réponses, indices propres à la zone qui suit dans le circuit de l'équipe
        // (clé = numéro de la zone suivante, ou « final » si c'est la dernière) : une énigme qui révèle la destination
        // donne ainsi la bonne destination à chaque équipe
        const afterKey = zoneIndex === team.circuit.length - 1 ? 'final' : String(team.circuit[zoneIndex + 1]);
        if (step.after && step.after[afterKey]) Object.assign(built, step.after[afterKey], { afterOverride: afterKey });
        delete built.after;
        if (built.photo) photo = built.photo; else if (photo) built.photo = photo;
        // {{zone}} : rang de la zone dans le circuit de l'équipe (« Mission 1 », « Mission 2 »…), pas son numéro dans contenu.js
        ['title', 'text'].forEach((f) => { if (typeof built[f] === 'string') built[f] = built[f].split('{{zone}}').join(String(zoneIndex + 1)); });
        steps.push(built);
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
      ['A', 'B', 'C'].forEach((v) => {
        (game.zones[zoneId][v] || []).forEach((step, i) => out.push({ step, where: `Zone ${zoneId}${v} étape ${i + 1}` }));
      });
    });
    ((game.final && game.final.steps) || []).forEach((step, i) => out.push({ step, where: `Final étape ${i + 1}` }));
    // énigme de la mission finale, commune à toutes les équipes (hors parcours : jouée après le chrono)
    if (game.final && game.final.finale) out.push({ step: game.final.finale, where: 'Mission finale' });
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
