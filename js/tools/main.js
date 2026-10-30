/* Outils : rendu de la page et actions (chargé en dernier). */
(function () {
  const T = window.EscapeTools;
  if (!T) return;

  T.$c.innerHTML = T.verifSection() + T.circuitsSection() + T.publishSection() + T.teamCards() + T.checkpointCards();
  T.checkImages();

  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    if (el.dataset.action === 'download') T.download();
    if (el.dataset.action === 'print') {
      document.body.dataset.print = el.dataset.target;
      window.print();
    }
  });
})();
