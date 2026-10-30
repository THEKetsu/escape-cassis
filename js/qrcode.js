/*
 * Générateur de QR codes autonome (aucun service externe, fonctionne hors ligne).
 * Mode octet (UTF-8), correction d'erreur M (~15 %), versions 1 à 10 : jusqu'à 213 octets,
 * largement assez pour une URL de jeu. D'après l'algorithme de la norme ISO/IEC 18004.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.QR = api;
})(typeof self !== 'undefined' ? self : this, function () {
  // Niveau M : [codewords d'erreur par bloc, [nb blocs, octets de données par bloc], ...]
  const EC_M = [null,
    [10, [1, 16]], [16, [1, 28]], [26, [1, 44]], [18, [2, 32]], [24, [2, 43]],
    [16, [4, 27]], [18, [4, 31]], [22, [2, 38], [2, 39]], [22, [3, 36], [2, 37]], [26, [4, 43], [1, 44]],
  ];
  const ALIGN = [null, [], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50]];

  function dataCapacity(v) {
    return EC_M[v].slice(1).reduce((n, [count, len]) => n + count * len, 0);
  }

  // ---------- Reed-Solomon sur GF(256) ----------

  function gfMul(x, y) {
    let z = 0;
    for (let i = 7; i >= 0; i--) {
      z = (z << 1) ^ ((z >>> 7) * 0x11d);
      z ^= ((y >>> i) & 1) * x;
    }
    return z;
  }

  function rsDivisor(degree) {
    const result = new Array(degree).fill(0);
    result[degree - 1] = 1;
    let root = 1;
    for (let i = 0; i < degree; i++) {
      for (let j = 0; j < degree; j++) {
        result[j] = gfMul(result[j], root);
        if (j + 1 < degree) result[j] ^= result[j + 1];
      }
      root = gfMul(root, 2);
    }
    return result;
  }

  function rsRemainder(data, divisor) {
    const result = divisor.map(() => 0);
    data.forEach((b) => {
      const factor = b ^ result.shift();
      result.push(0);
      divisor.forEach((coef, i) => { result[i] ^= gfMul(coef, factor); });
    });
    return result;
  }

  // ---------- encodage des données ----------

  function utf8(text) {
    if (typeof TextEncoder !== 'undefined') return Array.from(new TextEncoder().encode(text));
    return Array.from(unescape(encodeURIComponent(text)), (c) => c.charCodeAt(0));
  }

  function codewords(bytes, version) {
    const bits = [];
    const put = (val, len) => { for (let i = len - 1; i >= 0; i--) bits.push((val >>> i) & 1); };
    put(0b0100, 4); // mode octet
    put(bytes.length, version < 10 ? 8 : 16);
    bytes.forEach((b) => put(b, 8));
    const capacityBits = dataCapacity(version) * 8;
    put(0, Math.min(4, capacityBits - bits.length));
    put(0, (8 - (bits.length % 8)) % 8);
    const data = [];
    for (let i = 0; i < bits.length; i += 8) data.push(parseInt(bits.slice(i, i + 8).join(''), 2));
    for (let pad = 0xec; data.length < dataCapacity(version); pad ^= 0xec ^ 0x11) data.push(pad);

    // découpage en blocs, correction d'erreur, entrelacement
    const [ecLen, ...groups] = EC_M[version];
    const divisor = rsDivisor(ecLen);
    const blocks = [];
    let k = 0;
    groups.forEach(([count, len]) => {
      for (let b = 0; b < count; b++) {
        const d = data.slice(k, k += len);
        blocks.push({ d, ec: rsRemainder(d, divisor) });
      }
    });
    const out = [];
    const maxLen = Math.max(...blocks.map((b) => b.d.length));
    for (let i = 0; i < maxLen; i++) blocks.forEach((b) => { if (i < b.d.length) out.push(b.d[i]); });
    for (let i = 0; i < ecLen; i++) blocks.forEach((b) => out.push(b.ec[i]));
    return out;
  }

  // ---------- matrice ----------

  function build(version, data, mask) {
    const size = version * 4 + 17;
    const modules = Array.from({ length: size }, () => new Array(size).fill(false));
    const fn = Array.from({ length: size }, () => new Array(size).fill(false));
    const set = (x, y, dark) => { modules[y][x] = dark; fn[y][x] = true; };

    for (let i = 0; i < size; i++) {
      set(6, i, i % 2 === 0);
      set(i, 6, i % 2 === 0);
    }
    [[3, 3], [size - 4, 3], [3, size - 4]].forEach(([cx, cy]) => {
      for (let dy = -4; dy <= 4; dy++) {
        for (let dx = -4; dx <= 4; dx++) {
          const x = cx + dx;
          const y = cy + dy;
          const dist = Math.max(Math.abs(dx), Math.abs(dy));
          if (x >= 0 && x < size && y >= 0 && y < size) set(x, y, dist !== 2 && dist !== 4);
        }
      }
    });
    const pos = ALIGN[version];
    pos.forEach((ax, i) => pos.forEach((ay, j) => {
      const corner = (i === 0 && j === 0) || (i === 0 && j === pos.length - 1) || (i === pos.length - 1 && j === 0);
      if (corner) return;
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) set(ax + dx, ay + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
      }
    }));

    const drawFormat = (m) => {
      const value = (0 << 3) | m; // niveau M = 00
      let rem = value;
      for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
      const bits = ((value << 10) | rem) ^ 0x5412;
      const bit = (i) => ((bits >>> i) & 1) === 1;
      for (let i = 0; i <= 5; i++) set(8, i, bit(i));
      set(8, 7, bit(6));
      set(8, 8, bit(7));
      set(7, 8, bit(8));
      for (let i = 9; i < 15; i++) set(14 - i, 8, bit(i));
      for (let i = 0; i < 8; i++) set(size - 1 - i, 8, bit(i));
      for (let i = 8; i < 15; i++) set(8, size - 15 + i, bit(i));
      set(8, size - 8, true);
    };
    drawFormat(mask);

    if (version >= 7) {
      let rem = version;
      for (let i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1f25);
      const bits = (version << 12) | rem;
      for (let i = 0; i < 18; i++) {
        const dark = ((bits >>> i) & 1) === 1;
        const a = size - 11 + (i % 3);
        const b = Math.floor(i / 3);
        set(a, b, dark);
        set(b, a, dark);
      }
    }

    // placement en zigzag depuis le coin inférieur droit
    let i = 0;
    for (let right = size - 1; right >= 1; right -= 2) {
      if (right === 6) right = 5;
      for (let vert = 0; vert < size; vert++) {
        for (let j = 0; j < 2; j++) {
          const x = right - j;
          const upward = ((right + 1) & 2) === 0;
          const y = upward ? size - 1 - vert : vert;
          if (!fn[y][x] && i < data.length * 8) {
            modules[y][x] = ((data[i >>> 3] >>> (7 - (i & 7))) & 1) === 1;
            i++;
          }
        }
      }
    }

    const MASKS = [
      (x, y) => (x + y) % 2 === 0,
      (x, y) => y % 2 === 0,
      (x) => x % 3 === 0,
      (x, y) => (x + y) % 3 === 0,
      (x, y) => (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0,
      (x, y) => ((x * y) % 2) + ((x * y) % 3) === 0,
      (x, y) => (((x * y) % 2) + ((x * y) % 3)) % 2 === 0,
      (x, y) => (((x + y) % 2) + ((x * y) % 3)) % 2 === 0,
    ];
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) if (!fn[y][x] && MASKS[mask](x, y)) modules[y][x] = !modules[y][x];
    }
    return modules;
  }

  // Pénalités de la norme (simplifiées pour la règle 3) : sert seulement à choisir le masque le plus lisible
  function penalty(m) {
    const size = m.length;
    let score = 0;
    const lines = [];
    for (let i = 0; i < size; i++) {
      lines.push(m[i]);
      lines.push(m.map((row) => row[i]));
    }
    lines.forEach((line) => {
      let run = 1;
      for (let i = 1; i <= size; i++) {
        if (i < size && line[i] === line[i - 1]) run++;
        else {
          if (run >= 5) score += run - 2;
          run = 1;
        }
      }
      const s = line.map((d) => (d ? 1 : 0)).join('');
      score += 40 * ((s.match(/(?=1011101(0000)?)/g) || []).length + (s.match(/(?=00001011101)/g) || []).length);
    });
    let dark = 0;
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (m[y][x]) dark++;
        if (x < size - 1 && y < size - 1 && m[y][x] === m[y][x + 1] && m[y][x] === m[y + 1][x] && m[y][x] === m[y + 1][x + 1]) score += 3;
      }
    }
    score += Math.floor(Math.abs((dark * 20) / (size * size) - 10)) * 10;
    return score;
  }

  function matrix(text) {
    const bytes = utf8(String(text));
    let version = 1;
    while (version <= 10 && dataCapacity(version) < bytes.length + (version < 10 ? 2 : 3)) version++;
    if (version > 10) throw new Error('Texte trop long pour un QR code (213 octets max)');
    const data = codewords(bytes, version);
    let best = null;
    for (let mask = 0; mask < 8; mask++) {
      const m = build(version, data, mask);
      const p = penalty(m);
      if (!best || p < best.p) best = { m, p };
    }
    return best.m;
  }

  function svg(text, margin) {
    const m = matrix(text);
    const q = margin == null ? 4 : margin;
    const n = m.length + q * 2;
    let d = '';
    m.forEach((row, y) => row.forEach((dark, x) => { if (dark) d += `M${x + q} ${y + q}h1v1h-1z`; }));
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges">` +
      `<rect width="${n}" height="${n}" fill="#fff"/><path d="${d}" fill="#000"/></svg>`;
  }

  return { matrix, svg };
});
