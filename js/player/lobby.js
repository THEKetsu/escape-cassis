/* Salle d'attente : l'équipe est inscrite, elle voit les autres équipes et attend le départ donné par l'organisation. */
(function () {
  const A = window.EscapePlayer;
  if (!A) return;
  const { E, Sync, GAME, $app } = A;
  const esc = window.Util.esc;

  const POLL_MS = 2000;
  let timer = null;

  function stopLobby() {
    clearInterval(timer);
    timer = null;
  }

  // Les équipes du jeu, avec le nom saisi par celles qui ont rejoint la salle d'attente
  function teamsHtml(rows) {
    const states = {};
    (rows || []).forEach((r) => { if (r.data && r.data.state) states[r.team] = r.data.state; });
    states[A.state.team] = A.state; // toujours la version locale de ma propre équipe
    return Object.keys(GAME.teams).map((t) => {
      const st = states[t];
      const ready = !!(st && (st.joined || st.startedAt));
      const name = ready ? A.teamName(t, st.teamName) : (GAME.teams[t].name || t);
      return `<li class="${ready ? 'ready' : ''} ${t === A.state.team ? 'me' : ''}">
        <span class="avatar">${A.avatar(t)}</span>
        <span><b>${esc(name)}</b><small>${t === A.state.team ? 'vous · ' : ''}${ready ? '✅ prête' : 'pas encore arrivée'}</small></span>
      </li>`;
    }).join('');
  }

  function update(rows) {
    const list = document.getElementById('lobby-teams');
    if (!list) return;
    list.innerHTML = teamsHtml(rows);
    const ready = list.querySelectorAll('li.ready').length;
    document.getElementById('lobby-count').textContent = `${ready} équipe${ready > 1 ? 's' : ''} sur ${list.children.length} dans la salle d'attente`;
  }

  async function poll() {
    if (!A.state || A.state.startedAt || !A.state.joined) return stopLobby();
    try {
      const [session, rows] = await Promise.all([Sync.loadSession(), Sync.loadAll()]);
      if (E.lobbyDecision(session, false) === 'begin') {
        stopLobby();
        return A.begin(); // l'organisation a donné le départ
      }
      update(rows);
    } catch (e) {
      update(null); // hors connexion : on garde l'écran et on réessaie
    }
  }

  function renderLobby() {
    const state = A.state;
    A.setTheme(A.FINAL_COLOR);
    $app.innerHTML = `
      <main class="card lobby anim">
        <div class="team-badge"><span class="avatar big">${A.avatar(state.team)}</span>${esc(A.teamName(state.team, state.teamName))}</div>
        <h1 class="display">Vous êtes inscrits !</h1>
        <p class="lead">En attente du départ donné par l'organisation…</p>
        <div class="waiting" aria-hidden="true"><i></i><i></i><i></i></div>
        <p id="lobby-count" class="lobby-count"></p>
        <ul id="lobby-teams" class="lobby-teams"></ul>
        <p class="help">Gardez cet écran ouvert : la partie démarre toute seule.</p>
      </main>`;
    update(null);
    stopLobby();
    poll();
    timer = setInterval(poll, POLL_MS);
  }

  document.addEventListener('visibilitychange', () => { if (!document.hidden && timer) poll(); });

  Object.assign(A, { renderLobby, stopLobby });
})();
