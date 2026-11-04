/* Synchro avec le dashboard (Supabase) : envoi de la progression, heartbeat, position GPS, onglets multiples. */
(function () {
  const A = window.EscapePlayer;
  if (!A) return;
  const { Sync, STORE, HEARTBEAT_MS, LIVE } = A;
  const SESSION_CHECK_MS = 10000;

  // Numéro de session : l'organisateur le change à chaque « Terminer la partie » (table game_session).
  // Un téléphone qui a un autre numéro que le serveur repart de zéro, même si la ligne de son équipe a été recréée entre-temps
  // par un autre téléphone de la même équipe. Au premier contact un téléphone adopte le numéro courant : il ne perd rien.
  // Sans table game_session (supabase.sql pas relancé), on se rabat sur la disparition de la ligne de l'équipe.
  // Une erreur réseau ne compte jamais comme une fin de session : hors connexion, la partie continue.
  // Renvoie null si la session continue, sinon { epoch } (le numéro à adopter après la remise à zéro).
  async function sessionEnded() {
    const state = A.state;
    if (!state) return null;
    let epoch;
    try {
      epoch = await Sync.loadEpoch();
    } catch (e) {
      return null;
    }
    if (epoch) {
      if (!state.epoch) {
        state.epoch = epoch;
        localStorage.setItem(STORE, JSON.stringify(state));
        return null;
      }
      return state.epoch !== epoch ? { epoch } : null;
    }
    if (!state.synced) return null;
    try {
      return (await Sync.loadTeam(state.team)) ? null : { epoch: null };
    } catch (e) {
      return null;
    }
  }

  function endSession(ended) {
    const team = A.state.team;
    const wasPlaying = !!A.state.startedAt;
    if (A.clearZip) A.clearZip();
    A.remote = null;
    A.remoteLive = false;
    A.setState(A.newState(team));
    if (ended && ended.epoch) A.state.epoch = ended.epoch;
    A.save();
    A.render();
    if (wasPlaying) A.toast('<span class="toast-icon">🔄</span><div><b>Partie réinitialisée</b><small>La session a été remise à zéro : retour à l\'accueil.</small></div>');
  }

  async function checkSession() {
    if (!Sync.enabled) return;
    const ended = await sessionEnded();
    if (ended) endSession(ended);
  }

  let pushTimer = null;
  function push() {
    if (!Sync.enabled || !A.state) return;
    A.state.version = A.VERSION; // le dashboard repère les téléphones restés sur une ancienne version
    clearTimeout(pushTimer);
    pushTimer = setTimeout(async () => {
      const ended = await sessionEnded();
      if (ended) return endSession(ended);
      Sync.saveState(A.state).then(() => {
        if (!A.state.synced) {
          A.state.synced = true;
          localStorage.setItem(STORE, JSON.stringify(A.state)); // sans nouvel envoi
        }
        setNet(true);
      }, () => setNet(false));
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

  Object.assign(A, { push, setNet, updatePosition, endSession });

  setInterval(() => {
    // signal de vie aussi à l'accueil et en salle d'attente : le dashboard sait quelles équipes sont réellement là
    if (A.state && !A.state.finishedAt) {
      push();
      if (A.state.startedAt) updatePosition();
    }
  }, HEARTBEAT_MS);

  // Session effacée par l'organisation : repérée vite, quel que soit l'écran (en jeu, accueil, fin de partie)
  setInterval(checkSession, SESSION_CHECK_MS);
  checkSession();

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
