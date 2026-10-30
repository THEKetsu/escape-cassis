/* Alerte si contenu.js (réponses en clair) a été publié par erreur. */
(function () {
  const A = window.EscapeAdmin;
  if (!A) return;

  let leak = null;
  function checkLeak() {
    if (leak === null && location.protocol.startsWith('http') && !/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) {
      leak = false;
      fetch('contenu.js', { method: 'HEAD', cache: 'no-store' }).then((r) => { leak = r.ok; A.render(); }, () => {});
    }
    if (leak) {
      document.getElementById('warn').innerHTML =
        '<p class="leak">🚨 contenu.js est en ligne : les réponses sont lisibles par tous. Supprimez-le du dépôt GitHub !</p>';
    }
  }

  Object.assign(A, { checkLeak });
})();
