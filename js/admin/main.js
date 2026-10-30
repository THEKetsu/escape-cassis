/* Point d'entrée : barrière d'accès, délégation des clics, rafraîchissements périodiques. */
(function () {
  const A = window.EscapeAdmin;
  if (!A) return;
  const { E, Sync, GAME, $root, teamIds, REFRESH_MS, CODE_KEY } = A;

  // ---------- accès ----------

  // Le code d'accès est le mot de passe du compte organisateur Supabase (sous sa forme normalisée : sans casse, tirets
  // ni espaces). Seul Supabase le vérifie : aucune empreinte du code n'est publiée dans game.js. Le même code
  // déchiffre le carnet de réponses (answerBook de game.js).
  function gate() {
    if (!Sync.enabled) return start(); // affiche « Dashboard non configuré »
    if (sessionStorage.getItem('admin:' + GAME.id) === 'ok' && Sync.hasSession()) return start();
    $root.innerHTML = `
      <form class="gate">
        <h1>🧭 Dashboard</h1>
        <input type="password" placeholder="Code d'accès" autofocus>
        <button>Entrer</button>
        <p class="err"></p>
      </form>`;
    $root.querySelector('form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.target;
      const err = form.querySelector('.err');
      const button = form.querySelector('button');
      const value = form.querySelector('input').value;
      button.disabled = true;
      err.textContent = '';
      try {
        await Sync.signIn(E.normalize(value));
      } catch (error) {
        err.textContent = error.invalidLogin ? 'Code incorrect' : 'Connexion au serveur impossible : ' + error.message;
        button.disabled = false;
        return;
      }
      sessionStorage.setItem('admin:' + GAME.id, 'ok');
      sessionStorage.setItem(CODE_KEY, value); // déchiffre le carnet de réponses, le temps de l'onglet
      start();
    });
  }

  function start() {
    if (!Sync.enabled) {
      $root.innerHTML = `<div class="gate"><h1>Dashboard non configuré</h1>
        <p>Renseignez <code>supabase.url</code> et <code>supabase.key</code> dans <code>config.js</code> (voir README).</p></div>`;
      return;
    }
    Sync.onAuthLost = () => { // session expirée ou refusée : retour à la saisie du code
      sessionStorage.removeItem('admin:' + GAME.id);
      location.reload();
    };
    $root.addEventListener('click', async (e) => {
      const action = e.target.closest('[data-action]');
      if (action && action.dataset.action === 'refresh') return A.refresh();
      if (action && action.dataset.action === 'qr') return A.showQr();
      if (action && action.dataset.action === 'book') return A.showBook();
      if (action && action.dataset.action === 'zoom-in') return A.zoomMap(1);
      if (action && action.dataset.action === 'zoom-out') return A.zoomMap(-1);
      if (action && action.dataset.action === 'zoom-fit') return A.zoomMap(0);
      if (action && action.dataset.action === 'map-full') {
        A.mapFull = !A.mapFull;
        return A.render();
      }
      if (action && action.dataset.action === 'select') {
        A.selected = A.selected === action.dataset.team ? null : action.dataset.team;
        return A.render();
      }
      if (action && action.dataset.action === 'chat') return A.openChat(action.dataset.team);
      if (action && action.dataset.action === 'chat-next') return A.openChat(teamIds.find((t) => A.unread(t)));
      if (action && action.dataset.action === 'wipe') {
        if (!confirm('Effacer la progression et les messages de TOUTES les équipes sur le serveur ?')) return;
        if (!confirm('Vraiment ? (à faire avant le jeu, après les tests)')) return;
        try { await Sync.deleteAll(); } catch (err) { alert(err.message); }
        A.closeChat();
        A.msgs = {};
        return A.refresh();
      }
      const row = e.target.closest('tr.team');
      if (row) {
        const t = row.dataset.team;
        A.open.has(t) ? A.open.delete(t) : A.open.add(t);
        A.render();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && A.mapFull) {
        A.mapFull = false;
        A.render();
      }
    });
    A.refresh();
    A.pollChat();
    A.loadBook();
    setInterval(A.refresh, REFRESH_MS);
    setInterval(A.render, 1000);
  }

  gate();
})();
