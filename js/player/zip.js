/* Étape « zip » : grille à parcourir au doigt (un chemin par toutes les cases, repères dans l'ordre, murs). */
(function () {
  const A = window.EscapePlayer;
  if (!A) return;
  const { E, GAME, $app } = A;
  const esc = window.Util.esc;

  const ICONS = {
    croix: '<path d="M12 3v18M6 9h12"/>',
    oculus: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',
    portail: '<path d="M6 21V12a6 6 0 0 1 12 0v9"/>',
    baies: '<path d="M3 21v-7a4.5 4.5 0 0 1 9 0v7M12 21v-7a4.5 4.5 0 0 1 9 0v7"/>',
    clocher: '<path d="M5 21V11l7-6 7 6v10z"/><circle cx="12" cy="14" r="2.5"/>',
  };
  const NAMES = { croix: 'la croix', oculus: 'l\'oculus', portail: 'le portail', baies: 'les baies', clocher: 'le clocher' };
  const storeKey = (step) => `${A.STORE}:zip:${step.key}`;

  let cells = []; // chemin en cours (cases numérotées ligne × size + colonne)
  let dragging = null;
  let lastHit = -1;
  let ignoring = false; // geste commencé sur une case déjà tracée (hors bout du chemin) : il ne modifie rien

  const current = () => {
    const step = A.state && A.path && A.state.startedAt ? A.current() : null;
    return step && step.type === 'zip' ? step : null;
  };

  function load(step) {
    try {
      const saved = JSON.parse(localStorage.getItem(storeKey(step)));
      return Array.isArray(saved) ? saved : [];
    } catch (e) {
      return [];
    }
  }

  function store(step) {
    if (cells.length) localStorage.setItem(storeKey(step), JSON.stringify(cells));
    else localStorage.removeItem(storeKey(step));
  }

  // Une nouvelle session efface aussi les chemins en cours
  function clearZip() {
    Object.keys(localStorage).filter((k) => k.startsWith(A.STORE + ':zip:')).forEach((k) => localStorage.removeItem(k));
    cells = [];
  }

  const pointsOf = (z) => cells.map((cell) => `${(cell % z.size) + 0.5},${Math.floor(cell / z.size) + 0.5}`).join(' ');

  function zipHtml(step) {
    const z = step.zip;
    const n = z.size;
    cells = load(step);
    const markAt = new Map(z.marks.map((m) => [m.at[0] * n + m.at[1], m.icon]));
    const body = [];
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        const icon = markAt.get(r * n + c);
        const letter = ((z.letters || [])[r] || '')[c];
        const inner = icon ? `<svg viewBox="0 0 24 24" aria-label="${esc(icon)}">${ICONS[icon] || ''}</svg>`
          : letter && letter !== '.' ? `<b>${esc(letter)}</b>` : '';
        body.push(`<div class="zc${icon ? ' mark' : ''}${icon && r * n + c === z.marks[0].at[0] * n + z.marks[0].at[1] ? ' start' : ''}">${inner}</div>`);
      }
    }
    const walls = (z.walls || []).map(([r, c, side]) => side === 'R'
      ? `<line x1="${c + 1}" y1="${r}" x2="${c + 1}" y2="${r + 1}"/>`
      : `<line x1="${c}" y1="${r + 1}" x2="${c + 1}" y2="${r + 1}"/>`).join('');
    return `
      <div class="zip-board" style="--n:${n}">
        ${body.join('')}
        <span class="zip-ok" hidden aria-label="Chemin valide">✓</span>
        <svg class="zip-lines" viewBox="0 0 ${n} ${n}" preserveAspectRatio="none">
          <g class="zip-walls">${walls}</g>
          <polyline id="zip-path" points="${pointsOf(z)}"/>
        </svg>
      </div>
      <p class="zip-info"><span id="zip-count"></span> <span class="zip-letters">Lettres : <b id="zip-letters"></b></span></p>
      <p class="help">Glissez le doigt de case en case, depuis le bout de votre chemin. Il est gardé sur ce téléphone. « Annuler » recule d\'une case.</p>
      <div class="zip-actions">
        <button class="btn" data-action="zip-undo">↩ Annuler</button>
        <button class="btn" data-action="zip-clear">Effacer</button>
      </div>
      <button class="btn primary big zip-validate" data-action="zip-validate">Valider mon chemin</button>`;
  }

  // Met à jour compteur, lettres et tracé après chaque changement du chemin
  function refresh() {
    const step = current();
    if (!step) return;
    const z = step.zip;
    const line = document.getElementById('zip-path');
    if (!line) return;
    line.setAttribute('points', pointsOf(z));
    // chemin valide : coche verte sur la grille, et le bouton passe au vert
    const valid = E.zipCheck(z, cells).ok;
    const board = document.querySelector('.zip-board');
    if (board) board.classList.toggle('valid', valid);
    const badge = document.querySelector('.zip-ok');
    if (badge) badge.hidden = !valid;
    const button = document.querySelector('.zip-validate');
    if (button) {
      button.classList.toggle('valid', valid);
      button.textContent = valid ? '✅ Chemin valide : continuer' : 'Valider mon chemin';
    }
    document.getElementById('zip-count').textContent = `${cells.length} / ${z.size * z.size} cases`;
    document.getElementById('zip-letters').textContent = E.zipLetters(z, cells).split('').join(' ') || '–';
    store(step);
  }

  function moveTo(step, cell) {
    const z = step.zip;
    const start = z.marks[0].at[0] * z.size + z.marks[0].at[1];
    if (!cells.length) {
      if (cell === start) cells.push(cell);
      return;
    }
    const i = cells.indexOf(cell);
    if (i >= 0) {
      if (i < cells.length - 1) cells.length = i + 1; // retour en arrière
      return;
    }
    if (E.zipMoves(z, cells).includes(cell)) cells.push(cell);
  }

  function touch(e, board) {
    const step = current();
    if (!step) return;
    const n = step.zip.size;
    const rect = board.getBoundingClientRect();
    const col = Math.floor(((e.clientX - rect.left) / rect.width) * n);
    const row = Math.floor(((e.clientY - rect.top) / rect.height) * n);
    if (col < 0 || row < 0 || col >= n || row >= n) return;
    const cell = row * n + col;
    // Un geste ne peut reprendre qu'au bout du chemin (ou sur une case voisine libre) : toucher une ancienne case, par exemple
    // en voulant faire défiler la page, ne raccourcit plus le chemin. Pour reculer : glisser en arrière depuis le bout, ou « Annuler ».
    if (lastHit === -1 && cells.length && cell !== cells[cells.length - 1] && cells.includes(cell)) ignoring = true;
    if (ignoring) {
      lastHit = cell;
      return;
    }
    if (cell === lastHit) return;
    // un geste rapide peut sauter des cases : on les parcourt une à une quand il reste sur la même ligne ou colonne
    if (lastHit >= 0) {
      const r0 = Math.floor(lastHit / n);
      const c0 = lastHit % n;
      if (r0 === row || c0 === col) {
        const dr = Math.sign(row - r0);
        const dc = Math.sign(col - c0);
        for (let r = r0 + dr, c = c0 + dc; (r !== row + dr || c !== col + dc) && r >= 0 && c >= 0 && r < n && c < n; r += dr, c += dc) moveTo(step, r * n + c);
      } else moveTo(step, cell);
    } else moveTo(step, cell);
    lastHit = cell;
    refresh();
  }

  $app.addEventListener('pointerdown', (e) => {
    const board = e.target.closest('.zip-board');
    if (!board) return;
    e.preventDefault();
    lastHit = -1;
    ignoring = false;
    dragging = { board, id: e.pointerId };
    try { board.setPointerCapture(e.pointerId); } catch (err) { /* pas de capture : on suit quand même les mouvements */ }
    touch(e, board);
  });
  $app.addEventListener('pointermove', (e) => {
    if (dragging && e.pointerId === dragging.id) touch(e, dragging.board);
  });
  ['pointerup', 'pointercancel'].forEach((name) => $app.addEventListener(name, () => { dragging = null; lastHit = -1; ignoring = false; }));

  const WHY = {
    start: () => 'Commencez par le premier repère.',
    move: () => 'Ce chemin n\'est pas valable : il repasse sur une case ou traverse un mur.',
    order: () => 'Les repères ne sont pas traversés dans le bon ordre.',
    end: (z) => `Le chemin doit se terminer sur ${NAMES[z.marks[z.marks.length - 1].icon] || 'le dernier repère'}.`,
    incomplete: (z, res) => `Il reste ${res.missing} case${res.missing > 1 ? 's' : ''} à parcourir : toutes les cases doivent être utilisées.`,
  };

  function validate() {
    const step = current();
    if (!step || Date.now() < A.cooldownUntil) return;
    const res = E.zipCheck(step.zip, cells);
    if (!res.ok) {
      const first = cells.length ? '' : NAMES[step.zip.marks[0].icon];
      A.wrongAnswer();
      return A.feedback('❌ ' + (first ? `Commencez par ${first} : posez le doigt dessus.` : WHY[res.reason](step.zip, res)), 'bad');
    }
    A.state.zipLetters = E.zipLetters(step.zip, cells);
    cells = [];
    store(step);
    A.solve(step, false);
  }

  $app.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    const step = current();
    if (!el || !step) return;
    if (el.dataset.action === 'zip-undo') { cells.pop(); refresh(); }
    if (el.dataset.action === 'zip-clear' && (cells.length < 6 || confirm('Effacer tout le chemin tracé ?'))) { cells = []; refresh(); }
    if (el.dataset.action === 'zip-validate') validate();
  });

  // Les éléments de l'étape viennent d'être dessinés : on remplit compteur et lettres
  new MutationObserver(() => { if (document.getElementById('zip-path') && !document.getElementById('zip-count').textContent) refresh(); })
    .observe($app, { childList: true, subtree: true });

  Object.assign(A, { zipHtml, clearZip });
})();
