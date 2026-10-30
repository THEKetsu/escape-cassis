/* Outils : 3. génération et téléchargement de game.js. */
(function () {
  const T = window.EscapeTools;
  if (!T) return;
  const { E, GAME } = T;

  function publishSection() {
    return `
      <section id="publier" class="no-print">
        <h2>3. Publication</h2>
        <p>Génère <code>game.js</code> : le contenu du jeu dont les réponses et les codes sont remplacés par des empreintes.
          C'est ce fichier (et jamais <code>contenu.js</code>) qu'il faut envoyer sur GitHub.
          Les réponses y sont aussi chiffrées par <code>adminCode</code>, pour la vue « Réponses » du dashboard :
          choisissez un code d'accès long et difficile à deviner.</p>
        <button class="primary" data-action="download">⬇️ Télécharger game.js</button>
        <p class="muted">Remplacez l'ancien <code>game.js</code> du dossier par celui-ci, puis envoyez-le sur GitHub.</p>
      </section>`;
  }

  async function download() {
    let file;
    try {
      file = await E.publishedFile(GAME);
    } catch (e) {
      return alert(e.message);
    }
    const blob = new Blob([file], { type: 'text/javascript' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'game.js';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  T.publishSection = publishSection;
  T.download = download;
})();
