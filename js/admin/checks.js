/* Contrôle avant le départ (et pendant la partie) : ce qui est prêt, ce qui reste à vérifier. */
(function () {
  const A = window.EscapeAdmin;
  if (!A) return;
  const { E, Sync, GAME, S, teamIds, VERSION } = A;
  const { esc } = window.Util;

  // Marqueurs laissés dans le contenu pour dire « à remplacer »
  const PLACEHOLDER = /\[DÉMO|\[lieu à définir|\[N°|point-de-vue-/;
  const provisional = E.allSteps(GAME).filter(({ step }) => PLACEHOLDER.test(JSON.stringify(step))).map(({ where }) => where);
  const rulesProvisional = PLACEHOLDER.test(S.rules || '');

  // La table de session existe-t-elle ? (sinon « Effacer » ne remet pas les téléphones à zéro)
  async function checkSessionTable() {
    try {
      A.sessionTable = (await Sync.loadEpoch()) ? 'ok' : 'absent';
    } catch (e) {
      A.sessionTable = 'erreur';
    }
    A.render();
  }

  function items(infos) {
    const list = [];
    const add = (level, text) => list.push({ level, text });
    // 1. serveur
    if (!A.lastFetch && !A.fetchError) add('info', 'Connexion à Supabase en cours…');
    else if (A.fetchError) add('err', `Supabase ne répond pas : ${esc(A.fetchError)}`);
    else add('ok', 'Supabase répond.');
    // 2. table de session
    if (A.sessionTable === 'absent') add('warn', 'Table <code>game_session</code> absente : relancez <code>supabase.sql</code>, sinon « Effacer toutes les données » ne remet pas les téléphones à zéro.');
    else if (A.sessionTable === 'ok') add('ok', 'Remise à zéro des téléphones disponible.');
    // 3. équipes connectées
    const seen = infos.filter((i) => i.row);
    const missing = infos.filter((i) => !i.row).map((i) => i.team.name || i.t);
    if (A.lastFetch) {
      if (!seen.length) add('warn', 'Aucune équipe n\'est encore connectée : chaque capitaine doit scanner son QR code.');
      else add(missing.length ? 'info' : 'ok', `${seen.length}/${infos.length} équipes connectées${missing.length ? ` (pas encore : ${esc(missing.join(', '))})` : '.'}`);
    }
    // 4. parties en cours (reste de test ?)
    const started = infos.filter((i) => i.st && i.st.startedAt);
    if (started.length) add('info', `${started.length} équipe${started.length > 1 ? 's ont' : ' a'} une partie en cours. Avant le départ : « Effacer toutes les données ».`);
    // 5. versions
    const outdated = infos.filter((i) => i.st && i.st.version && VERSION !== 'dev' && i.st.version !== VERSION);
    if (VERSION === 'dev') add('info', 'Version locale (« dev ») : pas de game.js publié.');
    else if (outdated.length) add('warn', `${outdated.length} téléphone${outdated.length > 1 ? 's' : ''} sur une ancienne version (${esc(outdated.map((i) => i.t).join(', '))}) : recharger la page.`);
    else add('ok', `Version du jeu : ${esc(VERSION)}.`);
    // 6. parcours
    if (A.parcoursConflicts.length) add('warn', `${A.parcoursConflicts.length} conflit${A.parcoursConflicts.length > 1 ? 's' : ''} de parcours (voir la vue Parcours).`);
    else add('ok', 'Parcours : aucun conflit de zone.');
    // 7. contenu provisoire
    if (provisional.length || rulesProvisional) {
      const where = provisional.slice(0, 4).map(esc).join(' · ');
      add('warn', `Contenu provisoire à remplacer${provisional.length ? ` (${provisional.length} étape${provisional.length > 1 ? 's' : ''} : ${where}${provisional.length > 4 ? '…' : ''})` : ''}${rulesProvisional ? ' · consignes de l\'accueil à compléter (numéro de l\'organisation)' : ''}.`);
    } else add('ok', 'Aucun contenu provisoire.');
    // 8. carte
    const noPos = Object.keys(GAME.zones).filter((z) => GAME.zones[z].lat == null).map((z) => 'zone ' + z).concat(GAME.final && GAME.final.lat == null ? ['finale'] : []);
    if (noPos.length) add('warn', `Pas de position sur la carte pour : ${noPos.join(', ')}.`);
    // 9. fichiers et carnet
    if (A.leaked) add('err', 'contenu.js est en ligne : les réponses sont lisibles par tous.');
    add(A.book ? 'ok' : 'warn', A.book ? 'Carnet de réponses chargé.' : 'Carnet de réponses non chargé (code d\'accès à ressaisir ?).');
    return list;
  }

  const ICON = { ok: '✅', info: 'ℹ️', warn: '⚠️', err: '🚨' };

  function checksHtml(infos) {
    const list = items(infos);
    const issues = list.filter((i) => i.level === 'warn' || i.level === 'err').length;
    if (A.checksOpen === undefined && A.lastFetch) A.checksOpen = issues > 0; // ouvert d'office seulement s'il y a quelque chose à voir
    return `<section class="checks"><details ${A.checksOpen ? 'open' : ''}>
      <summary>${issues ? `⚠️ ${issues} point${issues > 1 ? 's' : ''} à vérifier` : '✅ Tout est prêt'} <small>contrôle avant le départ</small></summary>
      <ul>${list.map((i) => `<li class="${i.level}">${ICON[i.level]} ${i.text}</li>`).join('')}</ul>
    </details></section>`;
  }

  Object.assign(A, { checksHtml, checkSessionTable });
})();
