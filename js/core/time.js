/*
 * Moteur du jeu, module time : Temps : pénalités d'indices, durées et formatage.
 * Logique pure, sans DOM. Module UMD : Node (require) ou navigateur (window.Engine).
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else {
    const E = root.Engine = root.Engine || {};
    Object.assign(E, factory(E));
  }
})(typeof self !== 'undefined' ? self : this, function () {
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

  return { hintPenalty, elapsedSeconds, totalSeconds, formatDuration };
});
