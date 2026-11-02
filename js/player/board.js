/* Classement en direct. */
(function () {
  const A = window.EscapePlayer;
  if (!A) return;
  const { E, Sync, GAME } = A;
  const esc = window.Util.esc;

  async function loadRanking() {
    const rows = await Sync.loadAll();
    const states = {};
    rows.forEach((r) => { if (r.data && r.data.state) states[r.team] = r.data.state; });
    states[A.state.team] = A.state; // toujours la version locale la plus fraîche
    return E.rankTeams(GAME, states, Date.now());
  }

  function showBoard() {
    const s = A.sheet('<h2>🏆 Classement en direct</h2><div class="board"><p class="help">Chargement…</p></div><button class="btn" data-close>Fermer</button>');
    loadRanking().then((ranked) => {
      const box = s.el.querySelector('.board');
      box.innerHTML = ranked.map((r, i) => {
        const pct = Math.round(r.progress * 100);
        return `<div class="board-row ${r.team === A.state.team ? 'me' : ''}">
          <span class="rank">${i < 3 ? ['🥇', '🥈', '🥉'][i] : i + 1}</span>
          <span class="avatar">${A.avatar(r.team)}</span>
          <div class="board-main"><b>${esc(A.teamName(r.team, r.state.teamName))}</b>
            <div class="bar-mini"><i style="width:${pct}%"></i></div></div>
          <span class="board-time">${r.done ? E.formatDuration(r.total) : pct + ' %'}</span>
        </div>`;
      }).join('') || '<p class="help">Aucune équipe partie.</p>';
    }, () => {
      s.el.querySelector('.board').innerHTML = '<p class="help">Classement indisponible hors connexion.</p>';
    });
  }

  Object.assign(A, { loadRanking, showBoard });
})();
