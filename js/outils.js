/*
 * Outils de préparation (à ouvrir en local, à côté de contenu.js).
 */
(function () {
  const E = window.Engine;
  const GAME = window.GAME_SOURCE;
  const CONFIG = window.CONFIG || {};
  const $c = document.getElementById('content');

  if (!GAME) {
    $c.innerHTML = '<p class="leak">contenu.js introuvable : ouvrez cette page depuis le dossier du jeu, sur votre ordinateur.</p>';
    return;
  }

  const base = (CONFIG.publicUrl || '').replace(/\/?$/, '/');
  const urlConfigured = base && !base.includes('VOTRE-PSEUDO');

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  // QR code généré localement (js/qrcode.js) : aucun service externe, les codes ne sortent pas du poste
  function qr(data) {
    return `<div class="qr-img">${window.QR.svg(data)}</div>`;
  }

  const urlWarning = urlConfigured ? '' :
    '<p class="warning no-print">⚠️ <code>publicUrl</code> n\'est pas renseignée dans config.js : ces QR codes pointent vers une adresse d\'exemple et ne fonctionneront pas.</p>';

  // ---------- 1. vérification ----------

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

  // ---------- 2. circuits ----------

  function circuitsSection() {
    const zoneIds = Object.keys(GAME.zones);
    const slots = E.simulate(GAME);
    const rows = slots.map((byZone, s) => `<tr><th>Créneau ${s + 1}</th>${zoneIds.map((z) => {
      const here = byZone[z] || [];
      const variants = here.map((h) => h.variant);
      const clash = variants.length !== new Set(variants).size;
      const cls = here.length > 2 ? 'bad' : clash ? 'mid' : '';
      return `<td class="${cls}">${here.map((h) => `<span class="tag">${esc(h.team)} ${h.variant}</span>`).join('')}</td>`;
    }).join('')}</tr>`).join('');
    return `
      <section id="circuits" class="no-print">
        <h2>2. Répartition théorique des équipes</h2>
        <p class="muted">Créneau n = n-ième zone de chaque équipe, en supposant que toutes avancent au même rythme.
          <span class="legend bad">plus de 2 équipes</span> <span class="legend mid">même variante en même temps</span></p>
        <div class="table-wrap"><table class="sim">
          <tr><th></th>${zoneIds.map((z) => `<th>Zone ${esc(z)}<br><small>${esc(GAME.zones[z].name)}</small></th>`).join('')}</tr>
          ${rows}
        </table></div>
      </section>`;
  }

  // ---------- 3. publication ----------

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

  // ---------- 4. QR équipes ----------

  function teamCards() {
    const cards = Object.keys(GAME.teams).map((t) => {
      const url = `${base}?equipe=${encodeURIComponent(t)}`;
      const team = GAME.teams[t];
      return `
        <div class="qr-card">
          <h3>${esc(GAME.title)}</h3>
          <div class="qr-team">${esc(team.name || t)}</div>
          ${qr(url)}
          <p>Capitaine : scannez ce code avec l'appareil photo de votre téléphone.</p>
          <small>${esc(url)}</small>
        </div>`;
    }).join('');
    return `
      <section id="qr-equipes">
        <h2 class="no-print">4. QR codes des équipes <button data-action="print" data-target="qr-equipes">🖨️ Imprimer</button></h2>
        ${urlWarning}
        <p class="muted no-print">Si un téléphone tombe en panne, un autre membre de l'équipe rescanne le même QR code : il pourra reprendre la partie (avec le dashboard activé).</p>
        <div class="qr-grid">${cards}</div>
      </section>`;
  }

  // ---------- 5. QR checkpoints ----------

  function checkpointCards() {
    const cards = [];
    Object.keys(GAME.zones).forEach((z) => ['A', 'B'].forEach((v) => (GAME.zones[z][v] || []).forEach((step, i) => {
      if (step.type !== 'qr' || !step.answers) return;
      const code = step.answers[0];
      cards.push(`
        <div class="qr-card">
          ${qr(`${base}?scan=${encodeURIComponent(code)}`)}
          <div class="qr-code">${esc(code)}</div>
          <small class="no-print">Zone ${esc(z)}${v} étape ${i + 1} : ${esc(step.title)}</small>
        </div>`);
    })));
    return `
      <section id="qr-checkpoints">
        <h2 class="no-print">5. QR codes à cacher sur le terrain <button data-action="print" data-target="qr-checkpoints">🖨️ Imprimer</button></h2>
        ${urlWarning}
        <p class="muted no-print">Un par étape de type <code>qr</code>. Le code écrit dessous permet de le saisir à la main.</p>
        <div class="qr-grid">${cards.join('') || '<p class="muted">Aucune étape de type qr.</p>'}</div>
      </section>`;
  }

  // ---------- rendu ----------

  $c.innerHTML = verifSection() + circuitsSection() + publishSection() + teamCards() + checkpointCards();
  checkImages();

  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    if (el.dataset.action === 'download') download();
    if (el.dataset.action === 'print') {
      document.body.dataset.print = el.dataset.target;
      window.print();
    }
  });
})();
