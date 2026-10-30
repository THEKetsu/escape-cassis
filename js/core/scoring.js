/*
 * Moteur du jeu, module scoring : Score : badges, classement et messages non lus.
 * Logique pure, sans DOM. Module UMD : Node (require) ou navigateur (window.Engine).
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(Object.assign({}, require('./path.js'), require('./time.js')));
  else {
    const E = root.Engine = root.Engine || {};
    Object.assign(E, factory(E));
  }
})(typeof self !== 'undefined' ? self : this, function (E) {
  const { buildPath, totalSeconds } = E;

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

  // Tchat : messages de l'autre côté (sender = 'team' ou 'admin') arrivés après le dernier lu
  function unreadCount(messages, readId, sender) {
    return (messages || []).filter((m) => m.sender === sender && m.id > (readId || 0)).length;
  }

  return { BADGES, earnedBadges, rankTeams, unreadCount };
});
