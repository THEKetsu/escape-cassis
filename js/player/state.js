/* État du joueur : lecture, création et sauvegarde locale. */
(function () {
  const A = window.EscapePlayer;
  if (!A) return;
  const { E, GAME, STORE } = A;

  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(STORE));
      return s && GAME.teams[s.team] ? s : null;
    } catch (e) {
      return null;
    }
  }

  function newState(team) {
    return {
      team, teamName: '', startedAt: null, finishedAt: null,
      stepIndex: 0, stepStartedAt: null, phase: 'step',
      hints: {}, hintsTotal: 0, penalty: 0, skips: 0, wrong: 0, wrongOnStep: 0,
      log: [], updatedAt: Date.now(),
    };
  }

  function setState(s) {
    A.state = s;
    A.path = s ? E.buildPath(GAME, s.team) : null;
  }

  // Identifiant de ce téléphone, gardé hors de la progression : le serveur sait quel appareil joue pour l'équipe
  function deviceId() {
    let id = localStorage.getItem('escape:device');
    if (!id) {
      id = Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem('escape:device', id);
    }
    return id;
  }

  function save() {
    A.state.device = A.deviceId;
    A.state.updatedAt = Date.now();
    localStorage.setItem(STORE, JSON.stringify(A.state));
    A.push();
  }

  A.deviceId = deviceId();
  Object.assign(A, { load, newState, setState, save });
  setState(load());
})();
