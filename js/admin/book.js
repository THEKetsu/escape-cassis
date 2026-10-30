/* Carnet de réponses : en clair en local, sinon déchiffré avec le code d'accès. */
(function () {
  const A = window.EscapeAdmin;
  if (!A) return;
  const { E, Sync, GAME, S, CODE_KEY } = A;
  const { esc } = window.Util;

  // En local, contenu.js donne tout en clair. En ligne, les réponses sont dans game.js, chiffrées par le code d'accès
  // (answerBook), et les clés des équipes (pour leurs QR codes) dans la table organiser_book de Supabase,
  // lisible seulement par le compte organisateur.
  A.book = window.GAME_SOURCE ? E.answerBook(GAME) : null;
  let bookError = '';

  async function loadBook() {
    if (A.book) return true;
    const code = sessionStorage.getItem(CODE_KEY);
    if (!GAME.answerBook) bookError = 'Ce game.js ne contient pas les réponses : régénérez-le avec node outils/publier.js (adminCode renseigné).';
    else if (!code) bookError = 'Saisissez à nouveau le code d\'accès pour déchiffrer les réponses.';
    else {
      try {
        A.book = Object.assign({ teamKeys: {} }, await E.decryptJSON(GAME.answerBook, code));
        bookError = '';
      } catch (e) {
        bookError = 'Réponses illisibles avec ce code d\'accès.';
      }
    }
    if (A.book) {
      try {
        const remote = await Sync.loadBook();
        A.book.teamKeys = (remote && remote.teamKeys) || {};
      } catch (e) { /* les QR codes signaleront les clés manquantes */ }
    }
    A.render();
    A.renderPanel();
    return !!A.book;
  }

  const TYPE_ICONS = { info: 'ℹ️', text: '✏️', number: '🔢', qcm: '☑️', 'image-choice': '🖼️', qr: '📷', gps: '📡', tap: '👆' };

  // Ce qu'il faut répondre / faire à une étape, en clair
  function solution(step, key) {
    const answers = (A.book && A.book.answers[key]) || [];
    const list = answers.length
      ? `<b>${esc(answers[0])}</b>${answers.length > 1 ? ` <small>(aussi : ${answers.slice(1).map(esc).join(', ')})</small>` : ''}`
      : '';
    switch (step.type) {
      case 'info': return `<small>pas de réponse : bouton « ${esc(step.button || 'Continuer')} »</small>`;
      case 'tap': return `toucher l'image à <b>${step.target.x} % / ${step.target.y} %</b> <small>(largeur / hauteur, rayon ${step.target.r} %)</small>`;
      case 'gps': return `se rendre à <b>${step.lat}, ${step.lng}</b> <small>(${step.radius || 40} m)</small>${list ? `<br>code de secours : ${list}` : ''}`;
      default: return list || '<small class="err">réponse indisponible</small>';
    }
  }

  function stepSolution(step) {
    return step ? solution(step, step.key) : '';
  }

  function bookHtml() {
    const stepRow = (step, key, i) => `
      <li><span class="step-no">${i + 1}</span><div>
        <div>${TYPE_ICONS[step.type] || ''} <b>${esc(step.title || '')}</b>${i === 0 && key.startsWith('z') ? ' <small>(mène à la zone)</small>' : ''}</div>
        <div class="answer-line">${solution(step, key)}</div>
        ${(step.hints || []).length ? `<details><summary>${step.hints.length} indice(s)</summary><ol>${step.hints.map((h) => `<li>${h}</li>`).join('')}</ol></details>` : ''}
      </div></li>`;
    const zones = Object.keys(GAME.zones).map((z) => {
      const zone = GAME.zones[z];
      return `<section class="book-zone"><h3>${esc(z)} · ${esc(zone.name)}</h3><div class="book-variants">
        ${['A', 'B'].filter((v) => zone[v]).map((v) => `<div><h4>Variante ${v}</h4><ol class="book-steps">
          ${zone[v].map((step, i) => stepRow(step, `z${z}-${v}-${i}`, i)).join('')}</ol></div>`).join('')}
      </div></section>`;
    }).join('');
    const final = GAME.final && GAME.final.steps.length
      ? `<section class="book-zone"><h3>🏁 ${esc(GAME.final.name || 'Final')}</h3><ol class="book-steps">
          ${GAME.final.steps.map((step, i) => stepRow(step, `final-${i}`, i)).join('')}</ol></section>` : '';
    return `<p>🔑 Code organisation (fait passer une étape, +${E.formatDuration(S.skipPenalty || 0)}) : <b>${esc(A.book.masterCode || '–')}</b></p>${zones}${final}`;
  }

  function showBook() {
    const overlay = document.createElement('div');
    overlay.className = 'qr-overlay';
    const fill = () => {
      overlay.querySelector('.book-body').innerHTML = A.book ? bookHtml()
        : `<p class="err">${esc(bookError || 'Chargement…')}</p>`;
    };
    overlay.innerHTML = `
      <div class="qr-panel book">
        <header><h2>🔑 Réponses des énigmes</h2><button data-close>✕ Fermer</button></header>
        <p class="muted">À garder pour l'organisation : ne laissez pas cet écran à la vue des joueurs.</p>
        <div class="book-body"></div>
      </div>`;
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.closest('[data-close]')) overlay.remove();
    });
    fill();
    if (!A.book) loadBook().then(fill);
    document.body.appendChild(overlay);
  }

  Object.assign(A, { loadBook, stepSolution, showBook });
})();
