/*
 * Application joueurs : un téléphone par équipe.
 * Progression gardée dans le navigateur (localStorage) et envoyée au dashboard si Supabase est configuré.
 *
 * context.js crée l'espace de noms window.EscapePlayer (« A » dans les autres fichiers) :
 * constantes du jeu et état partagé. Les fichiers suivants y ajoutent leurs fonctions.
 */
(function () {
  const GAME = window.GAME_SOURCE || window.GAME;
  const $app = document.getElementById('app');

  if (!GAME) {
    $app.innerHTML = '<main class="card"><h1>Jeu introuvable</h1><p>game.js (ou contenu.js en local) n\'a pas pu être chargé.</p></main>';
    return;
  }

  const E = window.Engine;
  const Sync = window.Sync;
  const S = GAME.settings || {};

  window.EscapePlayer = {
    E, Sync, GAME, S, $app,
    SALT: S.salt || GAME.id,
    STORE: 'escape:' + GAME.id,
    HEARTBEAT_MS: 30000,
    ZONE_COLORS: ['#1d8fb3', '#e76f51', '#2a9d8f', '#7b5ea7', '#d98b1f', '#3d7dd8', '#c2457a', '#5a8f29'],
    FINAL_COLOR: '#0b3954',
    AVATARS: ['🐬', '🦀', '🐙', '🐚', '⛵', '🐟', '🦑', '🌊', '🐠', '⚓'],
    leaderboard: Sync.enabled && S.showLeaderboard !== false,
    LIVE: !!S.liveLocation && Sync.enabled && !!navigator.geolocation,

    // état partagé, réassigné par les autres fichiers
    state: null,
    path: null,
    cooldownUntil: 0,
    tick: null,
    remote: null, // progression trouvée sur le serveur, proposée à la reprise
    pendingScan: null, // code lu dans un QR de checkpoint (?scan=…), propre à cet onglet
    online: null,
  };
})();
