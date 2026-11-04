/* Contrôle avant le départ (et pendant la partie) : tuiles vertes / orange / rouges, détail seulement pour ce qui coince. */
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

  const plural = (n, one, many) => `${n} ${n > 1 ? many : one}`;

  // Une tuile : icône, libellé, valeur courte, état (ok, info, warn, err) et, si ça coince, l'explication
  function items(infos) {
    const list = [];
    const add = (icon, label, value, level, detail) => list.push({ icon, label, value, level, detail });

    if (!A.lastFetch && !A.fetchError) add('📡', 'Serveur', 'connexion…', 'info');
    else if (A.fetchError) add('📡', 'Serveur', 'ne répond pas', 'err', `Supabase ne répond pas : ${esc(A.fetchError)}`);
    else add('📡', 'Serveur', 'répond', 'ok');

    if (A.sessionTable === 'absent') add('🔄', 'Remise à zéro', 'table absente', 'warn', 'Table <code>game_session</code> absente : relancez <code>supabase.sql</code>, sinon « Terminer la partie » ne remet pas les téléphones à zéro.');
    else if (A.sessionTable === 'ok') add('🔄', 'Remise à zéro', 'disponible', 'ok');
    else add('🔄', 'Remise à zéro', 'vérification…', 'info');

    const seen = infos.filter((i) => i.row);
    const missing = infos.filter((i) => !i.row).map((i) => i.team.name || i.t);
    if (!A.lastFetch) add('👥', 'Équipes', '…', 'info');
    else if (!seen.length) add('👥', 'Équipes', `0/${infos.length}`, 'warn', 'Aucune équipe n\'est encore connectée : chaque capitaine doit scanner son QR code.');
    else add('👥', 'Équipes', `${seen.length}/${infos.length}`, missing.length ? 'info' : 'ok', missing.length ? `Pas encore connectées : ${esc(missing.join(', '))}.` : '');

    const started = infos.filter((i) => i.st && i.st.startedAt);
    add('🧹', 'Base de données', started.length ? plural(started.length, 'partie en cours', 'parties en cours') : 'propre', started.length ? 'info' : 'ok',
      started.length ? 'Des parties sont déjà en cours (reste de test ?). Avant le départ : « Terminer la partie » pour repartir d\'une base propre.' : '');

    const outdated = infos.filter((i) => i.st && i.st.version && VERSION !== 'dev' && i.st.version !== VERSION);
    if (VERSION === 'dev') add('🏷️', 'Version', 'locale (dev)', 'info', 'Version locale : pas de game.js publié.');
    else if (outdated.length) add('🏷️', 'Version', plural(outdated.length, 'ancienne', 'anciennes'), 'warn', `Téléphones sur une ancienne version : ${esc(outdated.map((i) => i.t).join(', '))}. Recharger la page.`);
    else add('🏷️', 'Version', VERSION.replace(/^\d+\./, ''), 'ok');

    const n = A.parcoursConflicts.length;
    add('🧭', 'Parcours', n ? plural(n, 'conflit', 'conflits') : 'sans conflit', n ? 'warn' : 'ok', n ? 'Conflits de zone : voir la vue Parcours plus bas.' : '');

    if (provisional.length || rulesProvisional) {
      const total = provisional.length + (rulesProvisional ? 1 : 0);
      add('✍️', 'Contenu', plural(total, 'à finir', 'à finir'), 'warn',
        `Contenu provisoire à remplacer${provisional.length ? ` (${esc(provisional.slice(0, 4).join(' · '))}${provisional.length > 4 ? '…' : ''})` : ''}${rulesProvisional ? ' · consignes de l\'accueil à compléter (numéro de l\'organisation)' : ''}.`);
    } else add('✍️', 'Contenu', 'complet', 'ok');

    const noPos = Object.keys(GAME.zones).filter((z) => GAME.zones[z].lat == null).map((z) => 'zone ' + z).concat(GAME.final && GAME.final.lat == null ? ['finale'] : []);
    add('📍', 'Carte', noPos.length ? plural(noPos.length, 'lieu sans position', 'lieux sans position') : 'complète', noPos.length ? 'warn' : 'ok',
      noPos.length ? `Pas de position sur la carte pour : ${esc(noPos.join(', '))}.` : '');

    add('🔒', 'contenu.js', A.leaked ? 'EN LIGNE' : 'non publié', A.leaked ? 'err' : 'ok', A.leaked ? 'contenu.js est en ligne : les réponses sont lisibles par tous. Supprimez-le du dépôt GitHub.' : '');
    add('🔑', 'Réponses', A.book ? 'chargées' : 'non chargées', A.book ? 'ok' : 'warn', A.book ? '' : 'Carnet de réponses non chargé (code d\'accès à ressaisir ?).');
    return list;
  }

  function checksHtml(infos) {
    const list = items(infos);
    const issues = list.filter((i) => i.level === 'warn' || i.level === 'err');
    const good = list.filter((i) => i.level === 'ok').length;
    if (A.checksOpen === undefined && A.lastFetch) A.checksOpen = issues.length > 0; // ouvert d'office seulement s'il y a quelque chose à voir
    const tiles = list.map((i) => `<div class="ck ${i.level}" title="${esc((i.detail || '').replace(/<[^>]+>/g, ''))}">
        <span class="ck-icon">${i.icon}</span>
        <span class="ck-text"><b>${esc(i.label)}</b><small>${esc(i.value)}</small></span>
        <i class="ck-dot"></i>
      </div>`).join('');
    const notes = issues.map((i) => `<li class="${i.level}">${i.icon} ${i.detail}</li>`).join('');
    return `<section class="checks"><details ${A.checksOpen ? 'open' : ''}>
      <summary>
        <span>${issues.length ? `⚠️ ${plural(issues.length, 'point à vérifier', 'points à vérifier')}` : '✅ Tout est prêt'}</span>
        <span class="ck-bar" title="${good} sur ${list.length} contrôles au vert"><i style="width:${Math.round(good / list.length * 100)}%"></i></span>
        <small>${good}/${list.length}</small>
      </summary>
      <div class="ck-grid">${tiles}</div>
      ${notes ? `<ul class="ck-notes">${notes}</ul>` : ''}
    </details></section>`;
  }

  Object.assign(A, { checksHtml, checkSessionTable });
})();
