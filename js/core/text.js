/*
 * Moteur du jeu, module text : Réponses : normalisation, hachage et vérification des saisies.
 * Logique pure, sans DOM. Module UMD : Node (require) ou navigateur (window.Engine).
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else {
    const E = root.Engine = root.Engine || {};
    Object.assign(E, factory(E));
  }
})(typeof self !== 'undefined' ? self : this, function () {
  const STEP_TYPES = ['info', 'text', 'number', 'qcm', 'multi', 'order', 'zip', 'image-choice', 'qr', 'gps', 'tap'];
  const SYNONYMS = { ST: 'SAINT', STE: 'SAINTE' };

  // "l'Église St-Michel" -> ["L", "EGLISE", "SAINT", "MICHEL"]
  function words(input) {
    return String(input == null ? '' : input)
      .toUpperCase()
      .replace(/Œ/g, 'OE')
      .replace(/Æ/g, 'AE')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^A-Z0-9]+/g, ' ')
      .trim()
      .split(' ')
      .filter(Boolean)
      .map((w) => SYNONYMS[w] || w);
  }

  // Espaces, tirets, accents et casse ignorés : "Saint-Michel" === "SAINT MICHEL"
  function normalize(input) {
    return words(input).join('');
  }

  // cyrb53 : hachage rapide et synchrone (fonctionne aussi en file://).
  // Il cache les réponses aux curieux, ce n'est pas de la cryptographie.
  function hash(str, salt) {
    const s = String(salt || '') + '|' + str;
    let h1 = 0xdeadbeef;
    let h2 = 0x41c6ce57;
    for (let i = 0; i < s.length; i++) {
      const ch = s.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (h2 >>> 0).toString(16).padStart(8, '0') + (h1 >>> 0).toString(16).padStart(8, '0');
  }

  // En mode "contains", toute suite de mots consécutifs de la saisie est testée :
  // "c'est l'église saint michel" contient "SAINT MICHEL".
  function candidates(input, match) {
    const w = words(input);
    if (match !== 'contains') return [w.join('')];
    const out = [];
    for (let i = 0; i < w.length; i++) {
      for (let j = i + 1; j <= w.length; j++) out.push(w.slice(i, j).join(''));
    }
    return out;
  }

  function answerHashes(step, salt) {
    if (step.h) return step.h;
    return (step.answers || []).map((a) => hash(normalize(a), salt));
  }

  // step.groups : [[mots synonymes], [mots synonymes]…] : la saisie est bonne si elle contient, pour chaque groupe,
  // au moins un de ses mots (ex. [['CROSSE', 'BATON'], ['POISSON', 'POISSONS']]). Publié haché (step.gh).
  function groupHashes(step, salt) {
    if (step.gh) return step.gh;
    return (step.groups || []).map((g) => g.map((w) => hash(normalize(w), salt)));
  }

  function checkAnswer(input, step, salt) {
    const expected = answerHashes(step, salt);
    if (candidates(input, step.match).some((c) => c && expected.includes(hash(c, salt)))) return true;
    const groups = groupHashes(step, salt);
    if (!groups.length) return false;
    const typed = new Set(words(input).map((w) => hash(w, salt)));
    return groups.every((g) => g.some((h) => typed.has(h)));
  }

  // Code en clair (contenu.js local) ou haché (game.js publié)
  function codeMatches(input, plain, hashed, salt) {
    const value = normalize(input);
    if (!value) return false;
    if (hashed) return hash(value, salt) === hashed;
    return !!plain && value === normalize(plain);
  }

  return { STEP_TYPES, words, normalize, hash, candidates, checkAnswer, codeMatches };
});
