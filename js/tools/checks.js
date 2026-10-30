/* Outils : 1. vérification du contenu et des images. */
(function () {
  const T = window.EscapeTools;
  if (!T) return;
  const { E, GAME, urlConfigured, esc } = T;

  function verifSection() {
    const { errors, warnings } = E.validate(GAME);
    const list = (items, cls) => items.map((x) => `<li class="${cls}">${esc(x)}</li>`).join('');
    const teams = Object.keys(GAME.teams).map((t) => {
      let n = '?';
      try { n = E.buildPath(GAME, t).length; } catch (e) { /* déjà signalé */ }
      return `<li>${esc(GAME.teams[t].name)} : ${n} étapes</li>`;
    }).join('');
    return `
      <section id="verif" class="no-print">
        <h2>1. Vérification du contenu</h2>
        ${errors.length ? `<ul class="issues">${list(errors, 'error')}</ul>` : '<p class="ok">✅ Aucune erreur bloquante.</p>'}
        ${warnings.length ? `<ul class="issues">${list(warnings, 'warning')}</ul>` : ''}
        <ul id="img-check" class="issues"><li>Vérification des images…</li></ul>
        <details><summary>Nombre d'étapes par équipe</summary><ul>${teams}</ul></details>
        ${urlConfigured ? '' : '<p class="warning">⚠️ <code>publicUrl</code> n\'est pas renseignée dans config.js : les QR codes pointeront vers une mauvaise adresse.</p>'}
      </section>`;
  }

  function checkImages() {
    const srcs = new Set();
    E.allSteps(GAME).forEach(({ step }) => E.stepImages(step).forEach((s) => srcs.add(s)));
    const missing = [];
    let pending = srcs.size;
    const done = () => {
      const el = document.getElementById('img-check');
      el.innerHTML = missing.length
        ? missing.map((s) => `<li class="error">Image introuvable : ${esc(s)}</li>`).join('')
        : `<li class="ok-li">✅ ${srcs.size} image(s) trouvée(s).</li>`;
    };
    if (!pending) return done();
    srcs.forEach((src) => {
      const img = new Image();
      img.onload = () => { if (--pending === 0) done(); };
      img.onerror = () => { missing.push(src); if (--pending === 0) done(); };
      img.src = src;
    });
  }

  T.verifSection = verifSection;
  T.checkImages = checkImages;
})();
