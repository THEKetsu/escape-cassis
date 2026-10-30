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

  // Clé secrète de l'équipe (lue dans son QR code), gardée à part de la progression : elle n'est jamais envoyée au serveur
  // En local, contenu.js la donne directement
  function teamKey(team) {
    team = team || (A.state && A.state.team);
    if (!team) return '';
    return localStorage.getItem(STORE + ':cle:' + team) || (GAME.teams[team] && GAME.teams[team].key) || '';
  }

  function setTeamKey(team, key) {
    localStorage.setItem(STORE + ':cle:' + team, key);
  }

  function save() {
    A.state.updatedAt = Date.now();
    localStorage.setItem(STORE, JSON.stringify(A.state));
    A.push();
  }

  Object.assign(A, { load, newState, setState, save, teamKey, setTeamKey });
  setState(load());
})();
