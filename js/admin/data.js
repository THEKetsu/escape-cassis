/* Données : lecture de la progression sur Supabase et statut de chaque équipe. */
(function () {
  const A = window.EscapeAdmin;
  if (!A) return;
  const { E, Sync, GAME, S, paths, OFFLINE_MS } = A;

  async function refresh() {
    try {
      const list = await Sync.loadAll();
      A.rows = {};
      list.forEach((r) => { A.rows[r.team] = { state: r.data && r.data.state, updatedAt: Date.parse(r.updated_at) }; });
      A.lastFetch = Date.now();
      A.fetchError = null;
    } catch (e) {
      A.fetchError = e.message;
    }
    A.render();
    A.renderPanel(); // position de l'équipe affichée en tête de conversation
  }

  function teamInfo(t) {
    const row = A.rows[t];
    const st = row && row.state;
    const path = paths[t];
    const now = Date.now();
    const info = { t, st, path, row, team: GAME.teams[t] };
    if (!st || !st.startedAt) {
      info.status = row ? 'registered' : 'idle';
      return info;
    }
    info.step = path[st.stepIndex];
    info.stepSec = st.finishedAt ? 0 : Math.round((now - st.stepStartedAt) / 1000);
    info.elapsed = E.elapsedSeconds(st, now);
    info.total = info.elapsed + (st.penalty || 0);
    if (st.finishedAt) info.status = 'done';
    else if (now - row.updatedAt > OFFLINE_MS) info.status = 'offline';
    else if (info.stepSec > (S.stuckMinutes || 12) * 60) info.status = 'stuck';
    else info.status = 'playing';
    return info;
  }

  const STATUS = {
    idle: ['⏳', 'Pas connectée', 'idle'],
    registered: ['📱', 'Prête', 'idle'],
    playing: ['🏃', 'En jeu', 'playing'],
    stuck: ['🆘', 'Bloquée ?', 'stuck'],
    offline: ['📵', 'Sans signal', 'offline'],
    done: ['🏁', 'Arrivée', 'done'],
  };

  Object.assign(A, { refresh, teamInfo, STATUS });
})();
