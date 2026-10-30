/*
 * Moteur du jeu, module publish : Publication : version hachée, carnet de réponses chiffré, SQL des secrets, fichier game.js.
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

  // Version publiable : réponses et code organisation remplacés par leurs hachages.
  // Le code d'accès au dashboard (adminCode) n'est pas publié, même haché ; les clés d'équipe non plus (voir secretsSql).
  function publish(game) {
    const out = JSON.parse(JSON.stringify(game));
    const salt = (out.settings && out.settings.salt) || out.id;
    allSteps(out).forEach(({ step }) => {
      if (step.answers) {
        step.h = step.answers.map((a) => hash(normalize(a), salt));
        delete step.answers;
      }
    });
    Object.keys(out.teams || {}).forEach((t) => { delete out.teams[t].key; });
    const s = out.settings || {};
    if (s.masterCode) { s.masterHash = hash(normalize(s.masterCode), salt); delete s.masterCode; }
    delete s.adminCode;
    return out;
  }

  // ---------- carnet de réponses pour l'organisation ----------

  // Réponses en clair de chaque étape (clé = step.key de buildPath), code organisation et clés des équipes (pour leurs QR codes)
  function answerBook(game) {
    const answers = {};
    Object.keys(game.zones || {}).forEach((zoneId) => {
      ['A', 'B'].forEach((v) => {
        (game.zones[zoneId][v] || []).forEach((step, i) => { if (step.answers) answers[`z${zoneId}-${v}-${i}`] = step.answers; });
      });
    });
    ((game.final && game.final.steps) || []).forEach((step, i) => { if (step.answers) answers[`final-${i}`] = step.answers; });
    const teamKeys = {};
    Object.keys(game.teams || {}).forEach((t) => { if (game.teams[t].key) teamKeys[t] = game.teams[t].key; });
    return { answers, masterCode: (game.settings && game.settings.masterCode) || '', teamKeys };
  }

  // SQL à exécuter dans Supabase : clés des équipes (table team_secrets, lue seulement par les fonctions team_*) et
  // copie de ces clés pour le dashboard (table organiser_book, lisible par l'organisateur seulement : QR codes des équipes).
  // À ne jamais publier : supabase-equipes.sql est ignoré par git. Les réponses n'y sont pas (elles sont chiffrées dans game.js).
  function secretsSql(game) {
    const q = (v) => `'${String(v).replace(/'/g, "''")}'`;
    const rows = Object.keys(game.teams || {}).filter((t) => game.teams[t].key)
      .map((t) => `  (${q(t)}, ${q(game.teams[t].key)})`);
    const lines = [
      '-- Généré à partir de contenu.js : ne pas publier. À coller dans Supabase : SQL Editor > New query > Run.',
      '-- À refaire seulement si vous changez une équipe ou sa clé (pas pour modifier les énigmes).',
      'delete from public.team_secrets;',
    ];
    if (rows.length) lines.push('insert into public.team_secrets (team, token) values', rows.join(',\n') + ';');
    lines.push(
      '',
      'insert into public.organiser_book (id, data) values (1, ' + q(JSON.stringify({ teamKeys: answerBook(game).teamKeys })) + '::jsonb)',
      'on conflict (id) do update set data = excluded.data;',
      '');
    return lines.join('\n');
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

  // game.js : version publiée + carnet de réponses chiffré par le code d'accès au dashboard.
  // Les clés d'équipe n'y sont pas : elles ne sont que dans Supabase.
  async function publishedFile(game) {
    const out = publish(game);
    const code = game.settings && game.settings.adminCode;
    if (code) {
      const { answers, masterCode } = answerBook(game);
      out.answerBook = await encryptJSON({ answers, masterCode }, code);
    }
    return '/* Fichier généré à partir de contenu.js : ne pas modifier à la main. */\n' +
      'window.GAME = ' + JSON.stringify(out, null, 2) + ';\n';
  }

  return { publish, answerBook, secretsSql, encryptJSON, decryptJSON, publishedFile };
});
