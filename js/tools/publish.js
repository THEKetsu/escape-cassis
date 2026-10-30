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
          Le code d'accès du dashboard, les clés des équipes et le carnet de réponses n'y figurent pas : ils vont dans
          <code>supabase-equipes.sql</code> (à coller dans Supabase, à ne jamais publier).</p>
        <button class="primary" data-action="download">⬇️ Télécharger game.js</button>
        <button data-action="download-sql">⬇️ Télécharger supabase-equipes.sql</button>
        <p class="muted">Remplacez l'ancien <code>game.js</code> du dossier par celui-ci, puis envoyez-le sur GitHub.</p>
      </section>`;
  }

  function save(name, content, type) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([content], { type }));
    a.download = name;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  const download = () => save('game.js', E.publishedFile(GAME), 'text/javascript');
  const downloadSql = () => save('supabase-equipes.sql', E.secretsSql(GAME), 'text/plain');

  T.publishSection = publishSection;
  T.download = download;
  T.downloadSql = downloadSql;
})();
