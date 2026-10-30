/*
 * Dashboard organisation : lit la table Supabase toutes les 10 s.
 * Le code d'accès est une simple barrière : les données (progression) ne sont pas sensibles.
 *
 * context.js crée l'espace de noms window.EscapeAdmin (A) partagé par les autres fichiers de js/admin/ :
 * constantes du jeu et état modifiable (une variable réassignée dans un autre fichier vit ici, sur A).
 */
(function () {
  const E = window.Engine;
  const GAME = window.GAME_SOURCE || window.GAME;
  if (!GAME) return;
  const S = GAME.settings || {};
  const teamIds = Object.keys(GAME.teams);

  window.EscapeAdmin = {
    E,
    Sync: window.Sync,
    GAME,
    S,
    SALT: S.salt || GAME.id,
    CODE_KEY: 'admin:code:' + GAME.id,
    $root: document.getElementById('admin'),
    REFRESH_MS: 10000,
    OFFLINE_MS: 90000,
    baseTitle: document.title,
    teamIds,
    paths: Object.fromEntries(teamIds.map((t) => [t, E.buildPath(GAME, t)])),

    // état modifiable
    rows: {},
    lastFetch: null,
    fetchError: null,
    open: new Set(),   // équipes dont le détail est déplié
    msgs: {},          // messages par équipe
    mapFull: false,    // carte en plein écran
    selected: null,    // équipe mise en avant (clic dans la liste)
    book: null,        // carnet de réponses en clair (voir book.js)
  };
})();
