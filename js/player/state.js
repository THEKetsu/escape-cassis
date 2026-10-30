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

  function save() {
    A.state.updatedAt = Date.now();
    localStorage.setItem(STORE, JSON.stringify(A.state));
    A.push();
  }

  Object.assign(A, { load, newState, setState, save });
  setState(load());
})();
