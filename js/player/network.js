/* Synchro avec le dashboard (Supabase) : envoi de la progression, heartbeat, position GPS, onglets multiples. */
(function () {
  const A = window.EscapePlayer;
  if (!A) return;
  const { Sync, STORE, HEARTBEAT_MS, LIVE } = A;

  // Session effacée par l'organisation : la ligne de l'équipe a disparu du serveur alors que ce téléphone l'y avait
  // déjà enregistrée. On ne l'écrit pas de nouveau : le téléphone repart de l'accueil de la même équipe.
  // (Une erreur réseau ne compte pas : hors connexion, la partie continue.)
  let synced = false;

  async function sessionEnded() {
    const state = A.state;
    if (!synced || !state) return false;
    try {
      return !(await Sync.loadTeam(state.team));
    } catch (e) {
      return false;
    }
  }

  function endSession() {
    const team = A.state.team;
    const wasPlaying = !!A.state.startedAt;
    synced = false;
    if (A.clearZip) A.clearZip();
    A.remote = null;
    A.remoteLive = false;
    A.setState(A.newState(team));
    A.save();
    A.render();
    if (wasPlaying) A.toast('<span class="toast-icon">🔄</span><div><b>Partie réinitialisée</b><small>L\'organisation a effacé la session : retour à l\'accueil.</small></div>');
  }

  async function checkSession() {
    if (Sync.enabled && await sessionEnded()) endSession();
  }

  let pushTimer = null;
  function push() {
    if (!Sync.enabled || !A.state) return;
    clearTimeout(pushTimer);
    pushTimer = setTimeout(async () => {
      if (await sessionEnded()) return endSession();
      Sync.saveState(A.state).then(() => { synced = true; setNet(true); }, () => setNet(false));
    }, 300);
  }

  function setNet(ok) {
    A.online = ok;
    const el = document.getElementById('net');
    if (el) {
      el.className = 'net ' + (ok ? 'ok' : 'ko');
      el.title = ok ? 'Synchronisé' : 'Hors connexion : la progression est gardée sur le téléphone';
    }
  }

  // ---------- position en direct (carte du dashboard, si settings.liveLocation) ----------

  let liveDenied = false;
  let lastPositionAsk = 0;

  // Relevé ponctuel plutôt qu'un suivi continu : moins gourmand en batterie, assez pour situer l'équipe
  function updatePosition() {
    const state = A.state;
    if (!LIVE || liveDenied || !state || !state.startedAt || state.finishedAt) return;
    if (Date.now() - lastPositionAsk < 10000) return;
    lastPositionAsk = Date.now();
    navigator.geolocation.getCurrentPosition((p) => {
      const state = A.state;
      if (!state || !state.startedAt || state.finishedAt) return;
      state.pos = {
        lat: +p.coords.latitude.toFixed(5), lng: +p.coords.longitude.toFixed(5),
        acc: Math.round(p.coords.accuracy || 0), at: Date.now(),
      };
      A.save();
    }, (err) => {
      if (err.code === err.PERMISSION_DENIED) liveDenied = true; // l'équipe a refusé : position déduite de l'avancement
    }, { enableHighAccuracy: true, maximumAge: 15000, timeout: 20000 });
  }

  Object.assign(A, { push, setNet, updatePosition });

  setInterval(() => {
    if (A.state && A.state.startedAt && !A.state.finishedAt) {
      push();
      updatePosition();
    } else {
      checkSession(); // partie finie ou pas commencée : pas d'envoi, mais on repère quand même une session effacée
    }
  }, HEARTBEAT_MS);

  window.addEventListener('online', push);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) checkSession(); });

  // Un QR code scanné ouvre un nouvel onglet : les onglets se tiennent à jour mutuellement
  window.addEventListener('storage', (e) => {
    if (e.key === STORE) {
      const next = A.load();
      // un simple relevé de position ne doit pas redessiner l'écran (réponse en cours de saisie)
      const progress = (s) => s && JSON.stringify(Object.assign({}, s, { pos: null, updatedAt: null }));
      const changed = progress(next) !== progress(A.state);
      A.setState(next);
      if (changed) A.render();
    }
  });
})();
