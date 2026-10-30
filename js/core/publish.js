/*
 * Moteur du jeu, module publish : Publication : version hachée, carnet de réponses chiffré, fichier game.js.
 * Logique pure, sans DOM. Module UMD : Node (require) ou navigateur (window.Engine).
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(Object.assign({}, require('./text.js'), require('./path.js')));
  else {
    const E = root.Engine = root.Engine || {};
    Object.assign(E, factory(E));
  }
})(typeof self !== 'undefined' ? self : this, function (E) {
  const { hash, normalize, allSteps } = E;

  // Version publiable : réponses et codes remplacés par leurs hachages
  function publish(game) {
    const out = JSON.parse(JSON.stringify(game));
    const salt = (out.settings && out.settings.salt) || out.id;
    allSteps(out).forEach(({ step }) => {
      if (step.answers) {
        step.h = step.answers.map((a) => hash(normalize(a), salt));
        delete step.answers;
      }
    });
    const s = out.settings || {};
    if (s.masterCode) { s.masterHash = hash(normalize(s.masterCode), salt); delete s.masterCode; }
    if (s.adminCode) { s.adminHash = hash(normalize(s.adminCode), salt); delete s.adminCode; }
    return out;
  }

  // ---------- carnet de réponses pour l'organisation ----------

  // Réponses en clair de chaque étape (clé = step.key de buildPath) et code organisation
  function answerBook(game) {
    const answers = {};
    Object.keys(game.zones || {}).forEach((zoneId) => {
      ['A', 'B'].forEach((v) => {
        (game.zones[zoneId][v] || []).forEach((step, i) => { if (step.answers) answers[`z${zoneId}-${v}-${i}`] = step.answers; });
      });
    });
    ((game.final && game.final.steps) || []).forEach((step, i) => { if (step.answers) answers[`final-${i}`] = step.answers; });
    return { answers, masterCode: (game.settings && game.settings.masterCode) || '' };
  }

  // Chiffrement AES-GCM, clé dérivée du code (PBKDF2) : Web Crypto, navigateur comme Node.
  // Aussi solide que le code choisi : un code court se devine par essais successifs.
  const PBKDF2_ITERATIONS = 250000;
  const toB64 = (bytes) => (typeof btoa === 'function'
    ? btoa(String.fromCharCode(...bytes)) : Buffer.from(bytes).toString('base64'));
  const fromB64 = (s) => (typeof atob === 'function'
    ? Uint8Array.from(atob(s), (c) => c.charCodeAt(0)) : new Uint8Array(Buffer.from(s, 'base64')));

  async function deriveKey(code, salt) {
    const subtle = globalThis.crypto && globalThis.crypto.subtle;
    if (!subtle) throw new Error('Chiffrement indisponible dans ce navigateur (page à ouvrir en https ou en local)');
    const base = await subtle.importKey('raw', new TextEncoder().encode(normalize(code)), 'PBKDF2', false, ['deriveKey']);
    return subtle.deriveKey({ name: 'PBKDF2', salt, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
      base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
  }

  async function encryptJSON(value, code) {
    const salt = globalThis.crypto.getRandomValues(new Uint8Array(16));
    const iv = globalThis.crypto.getRandomValues(new Uint8Array(12));
    const key = await deriveKey(code, salt);
    const data = await globalThis.crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(JSON.stringify(value)));
    return { salt: toB64(salt), iv: toB64(iv), data: toB64(new Uint8Array(data)) };
  }

  // Rejette si le code est faux (AES-GCM vérifie l'intégrité)
  async function decryptJSON(box, code) {
    const key = await deriveKey(code, fromB64(box.salt));
    const data = await globalThis.crypto.subtle.decrypt({ name: 'AES-GCM', iv: fromB64(box.iv) }, key, fromB64(box.data));
    return JSON.parse(new TextDecoder().decode(data));
  }

  // game.js : version publiée + carnet de réponses chiffré par le code d'accès au dashboard
  async function publishedFile(game) {
    const out = publish(game);
    const code = game.settings && game.settings.adminCode;
    if (code) out.answerBook = await encryptJSON(answerBook(game), code);
    return '/* Fichier généré à partir de contenu.js : ne pas modifier à la main. */\n' +
      'window.GAME = ' + JSON.stringify(out, null, 2) + ';\n';
  }

  return { publish, answerBook, encryptJSON, decryptJSON, publishedFile };
});
