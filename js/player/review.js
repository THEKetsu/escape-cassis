/* « Revoir l'étape précédente » : relecture seule (énoncé et message de réussite), la progression n'est pas modifiée. */
(function () {
  const A = window.EscapePlayer;
  if (!A) return;
  const { $app } = A;
  const esc = window.Util.esc;

  function showReview() {
    const state = A.state;
    if (!state || !A.path || !state.startedAt || state.stepIndex < 1) return;
    const prev = A.path[state.stepIndex - 1];
    const s = prev.success || {};
    const letters = prev.type === 'zip' && state.zipLetters
      ? `<p class="zip-found">Lettres rencontrées : <b>${esc(state.zipLetters.split('').join(' '))}</b></p>` : '';
    const overlay = document.createElement('div');
    overlay.className = 'overlay review';
    overlay.innerHTML = `
      <div class="review-box">
        <header><b>↩ Étape précédente</b><button class="btn close">✕ Fermer</button></header>
        <article class="card">
          <div class="kicker"><span>📍 ${esc(prev.zoneName)}</span><span>Énigme ${prev.zoneStep + 1}/${prev.zoneSteps}</span></div>
          <h1>${esc((prev.title || '').replace(/^\s*✅\s*/u, ''))}</h1>
          <div class="text">${A.tpl(prev.text)}</div>
          ${A.imagesHtml(prev.images)}
          ${s.text ? `<div class="review-ok"><h2>${esc((s.title || 'Réussi').replace(/^\s*✅\s*/u, ''))}</h2>${A.tpl(s.text)}${letters}</div>` : letters}
        </article>
        <p class="review-note">Lecture seule : votre progression n'est pas modifiée.</p>
      </div>`;
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.closest('.close')) overlay.remove();
    });
    document.body.appendChild(overlay);
  }

  $app.addEventListener('click', (e) => {
    if (e.target.closest('[data-action="review"]')) showReview();
  });

  Object.assign(A, { showReview });
})();
