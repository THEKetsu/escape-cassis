/*
 * Moteur du jeu, module publish : Publication : version hachée, carnet de réponses, SQL des secrets, fichier game.js.
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
  // Le code d'accès au dashboard (adminCode) et les clés d'équipe ne sont pas publiés du tout :
  // ils vivent côté Supabase (voir secretsSql).
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

  // SQL à exécuter dans Supabase : clés des équipes (table team_secrets) et carnet de réponses (table organiser_book).
  // Ces tables ne sont lisibles ni par la clé publique ni par les téléphones : seulement par le compte organisateur
  // (carnet) ou par les fonctions team_* (clés). À ne jamais publier : supabase-equipes.sql est ignoré par git.
  function secretsSql(game) {
    const q = (v) => `'${String(v).replace(/'/g, "''")}'`;
    const rows = Object.keys(game.teams || {}).filter((t) => game.teams[t].key)
      .map((t) => `  (${q(t)}, ${q(game.teams[t].key)})`);
    const lines = [
      '-- Généré à partir de contenu.js : ne pas publier. À coller dans Supabase : SQL Editor > New query > Run.',
      '-- Les équipes retirées de contenu.js perdent leur accès.',
      'delete from public.team_secrets;',
    ];
    if (rows.length) lines.push('insert into public.team_secrets (team, token) values', rows.join(',\n') + ';');
    lines.push(
      '',
      '-- Carnet de réponses du dashboard (vue « Réponses » et clés des QR codes) : lisible par l\'organisateur seulement.',
      'insert into public.organiser_book (id, data) values (1, ' + q(JSON.stringify(answerBook(game))) + '::jsonb)',
      'on conflict (id) do update set data = excluded.data;',
      '');
    return lines.join('\n');
  }

  // game.js : version publiée, sans aucun secret du dashboard
  function publishedFile(game) {
    return '/* Fichier généré à partir de contenu.js : ne pas modifier à la main. */\n' +
      'window.GAME = ' + JSON.stringify(publish(game), null, 2) + ';\n';
  }

  return { publish, answerBook, secretsSql, publishedFile };
});
