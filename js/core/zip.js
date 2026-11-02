/*
 * Moteur du jeu, module zip : grille « Zip » (un chemin continu par toutes les cases, des repères à traverser dans l'ordre).
 * Logique pure, sans DOM. Module UMD : Node (require) ou navigateur (window.Engine).
 *
 * Une grille (step.zip) :
 *   size    : côté de la grille (7)
 *   marks   : repères dans l'ordre à suivre [{ at: [ligne, colonne], icon }] ; le chemin commence au premier et finit au dernier
 *   walls   : murs [ligne, colonne, 'D' | 'R'] : mur sous la case (D) ou à droite de la case (R)
 *   letters : une chaîne par ligne, '.' pour une case sans lettre
 * Un chemin est la liste des cases traversées, chaque case étant numérotée ligne × size + colonne.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else {
    const E = root.Engine = root.Engine || {};
    Object.assign(E, factory(E));
  }
})(typeof self !== 'undefined' ? self : this, function () {
  function zipModel(zip) {
    const size = zip.size;
    const walls = new Set();
    (zip.walls || []).forEach(([r, c, side]) => {
      const a = r * size + c;
      const b = side === 'R' ? a + 1 : a + size;
      walls.add(a + '|' + b);
      walls.add(b + '|' + a);
    });
    const marks = (zip.marks || []).map((m) => m.at[0] * size + m.at[1]);
    const markIndex = new Map(marks.map((cell, i) => [cell, i]));
    const neighbours = [];
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const a = r * size + c;
        const list = [];
        if (r > 0) list.push(a - size);
        if (r < size - 1) list.push(a + size);
        if (c > 0) list.push(a - 1);
        if (c < size - 1) list.push(a + 1);
        neighbours[a] = list.filter((b) => !walls.has(a + '|' + b));
      }
    }
    return { size, total: size * size, marks, markIndex, neighbours };
  }

  // Lettres rencontrées, dans l'ordre du chemin
  function zipLetters(zip, cells) {
    return cells.map((cell) => {
      const ch = ((zip.letters || [])[Math.floor(cell / zip.size)] || '')[cell % zip.size];
      return ch && ch !== '.' ? ch : '';
    }).join('');
  }

  // Un chemin est-il une solution ? { ok, reason } avec reason : start, move, incomplete, order, end
  function zipCheck(zip, cells) {
    const m = zipModel(zip);
    if (!cells.length || cells[0] !== m.marks[0]) return { ok: false, reason: 'start' };
    const seen = new Set([cells[0]]);
    let nextMark = 1;
    for (let i = 1; i < cells.length; i++) {
      const cell = cells[i];
      if (seen.has(cell) || !m.neighbours[cells[i - 1]].includes(cell)) return { ok: false, reason: 'move' };
      seen.add(cell);
      if (m.markIndex.has(cell)) {
        if (m.markIndex.get(cell) !== nextMark) return { ok: false, reason: 'order' };
        nextMark++;
      }
    }
    if (cells.length < m.total) return { ok: false, reason: 'incomplete', missing: m.total - cells.length };
    if (cells[cells.length - 1] !== m.marks[m.marks.length - 1]) return { ok: false, reason: 'end' };
    return { ok: true };
  }

  // Cases où le chemin en cours a le droit d'aller : pas de case déjà prise, pas de mur, repères dans l'ordre,
  // dernier repère seulement en toute dernière case
  function zipMoves(zip, cells) {
    const m = zipModel(zip);
    const seen = new Set(cells);
    const last = cells[cells.length - 1];
    let nextMark = 1;
    cells.forEach((cell) => { if (m.markIndex.has(cell) && cell !== m.marks[0]) nextMark++; });
    return m.neighbours[last].filter((cell) => {
      if (seen.has(cell)) return false;
      const mi = m.markIndex.get(cell);
      if (mi !== undefined && mi !== nextMark) return false;
      if (cell === m.marks[m.marks.length - 1] && cells.length !== m.total - 1) return false;
      return true;
    });
  }

  // Cherche les chemins valides (au plus `limit`) : sert à vérifier une grille et à donner la solution à l'organisation
  function zipSolve(zip, limit) {
    const m = zipModel(zip);
    const N = m.total;
    const start = m.marks[0];
    const end = m.marks[m.marks.length - 1];
    const visited = new Uint8Array(N);
    const path = [start];
    const found = [];
    visited[start] = 1;

    // Toutes les cases libres sont encore joignables, et aucune n'est une impasse (sauf l'arrivée)
    function feasible(cur) {
      const stack = [cur];
      const reach = new Uint8Array(N);
      reach[cur] = 1;
      let count = 0;
      while (stack.length) {
        const a = stack.pop();
        m.neighbours[a].forEach((b) => {
          if (!visited[b] && !reach[b]) { reach[b] = 1; count++; stack.push(b); }
        });
      }
      if (count !== N - path.length) return false;
      for (let u = 0; u < N; u++) {
        if (visited[u]) continue;
        const free = m.neighbours[u].filter((b) => !visited[b] || b === cur).length;
        if (free < (u === end ? 1 : 2)) return false;
      }
      return true;
    }

    function dfs(cur, nextMark) {
      if (found.length >= limit) return;
      if (path.length === N) {
        if (cur === end) found.push(path.slice());
        return;
      }
      for (const nb of m.neighbours[cur]) {
        if (visited[nb]) continue;
        const mi = m.markIndex.get(nb);
        if (mi !== undefined && mi !== nextMark) continue;
        if (nb === end && path.length !== N - 1) continue;
        visited[nb] = 1;
        path.push(nb);
        if (feasible(nb)) dfs(nb, mi !== undefined ? nextMark + 1 : nextMark);
        path.pop();
        visited[nb] = 0;
      }
    }
    dfs(start, 1);
    return found;
  }

  return { zipModel, zipLetters, zipCheck, zipMoves, zipSolve };
});
