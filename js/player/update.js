/* Nouvelle partie publiée : rechargement automatique des téléphones. */
(function () {
  const A = window.EscapePlayer;
  if (!A) return;
  const { GAME } = A;

  // Si game.js a changé d'id (remise à zéro), on recharge pour repartir sur la nouvelle partie.
  // Uniquement sur le site publié : en local, contenu.js remplace game.js.
  function checkNewGame() {
    if (window.GAME_SOURCE || !/^https?:/.test(location.protocol)) return;
    fetch('game.js', { cache: 'no-store' })
      .then((r) => (r.ok ? r.text() : ''))
      .then((txt) => {
        const m = /"id":\s*"([^"]*)"/.exec(txt);
        if (m && m[1] !== GAME.id) location.reload();
      })
      .catch(() => {});
  }
  document.addEventListener('visibilitychange', () => { if (!document.hidden) checkNewGame(); });
  setInterval(checkNewGame, 60000);
})();
