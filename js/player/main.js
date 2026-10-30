/* Démarrage : paramètres de l'URL (?reset, ?equipe, ?scan), puis premier affichage. */
(function () {
  const A = window.EscapePlayer;
  if (!A) return;
  const { GAME, STORE } = A;

  const params = new URLSearchParams(location.search);
  if (params.has('reset') && confirm('Effacer la progression enregistrée sur ce téléphone ?')) {
    localStorage.removeItem(STORE);
    A.setState(null);
  }
  const urlTeam = params.get('equipe');
  if (urlTeam) {
    if (!GAME.teams[urlTeam]) {
      alert(`Équipe « ${urlTeam} » inconnue.`);
    } else if (!A.state) {
      A.setState(A.newState(urlTeam));
      A.save();
    } else if (A.state.team !== urlTeam &&
      confirm(`Ce téléphone joue déjà pour ${A.teamName(A.state.team, A.state.teamName)}.\nPasser à ${A.teamName(urlTeam)} ? La progression actuelle sera perdue sur ce téléphone.`)) {
      A.setState(A.newState(urlTeam));
      A.save();
    }
  }
  if (A.state && A.state.startedAt) A.pendingScan = params.get('scan');
  if (location.search) history.replaceState(null, '', location.pathname);
  if (A.state && A.state.startedAt) A.preloadImages();
  A.render();
  A.pollChat();
  A.updatePosition();
})();
