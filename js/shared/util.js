/* Petits utilitaires partagés par le jeu, le dashboard et les outils. */
(function () {
  // Échappe le texte avant de l'insérer dans une chaîne HTML.
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  window.Util = { esc };
})();
