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

  // Sept tuiles seulement : icône, libellé, valeur courte, état (ok, info, warn, err) et, si ça coince, l'explication
  function items(infos) {
    const list = [];
    const add = (icon, label, value, level, detail) => list.push({ icon, label, value, level, detail });

    // 1. serveur (et table de session : sans elle, « Terminer la partie » ne remet pas les téléphones à zéro)
    if (!A.lastFetch && !A.fetchError) add('📡', 'Serveur', 'connexion…', 'info');
    else if (A.fetchError) add('📡', 'Serveur', 'ne répond pas', 'err', `Supabase ne répond pas : ${esc(A.fetchError)}`);
    else if (A.sessionTable === 'absent') add('📡', 'Serveur', 'à mettre à jour', 'warn', 'Table <code>game_session</code> absente : relancez <code>supabase.sql</code>, sinon « Terminer la partie » ne remet pas les téléphones à zéro.');
    else add('📡', 'Serveur', 'répond', 'ok');

    // 2. équipes connectées : un seul chiffre
    const seen = infos.filter((i) => i.row).length;
    if (!A.lastFetch) add('👥', 'Équipes', '…', 'info');
    else if (!seen) add('👥', 'Équipes', `0/${infos.length}`, 'warn', 'Aucune équipe n\'est encore connectée : chaque capitaine doit scanner son QR code.');
    else add('👥', 'Équipes', `${seen}/${infos.length}`, seen === infos.length ? 'ok' : 'info');

    // 3. départ
    if (A.session !== undefined) {
      if (!A.session || A.session.startedAt === undefined) add('🚦', 'Départ', 'immédiat', 'info', 'Pas de salle d\'attente : relancez <code>supabase.sql</code> pour que les équipes attendent votre départ.');
      else if (A.session.startedAt) add('🚦', 'Départ', 'donné', 'ok');
      else add('🚦', 'Départ', 'en attente', 'info', 'Les équipes attendent : cliquez « Démarrer la partie » pour donner le départ.');
    }

    // 4. version des téléphones
    const outdated = infos.filter((i) => i.st && i.st.version && VERSION !== 'dev' && i.st.version !== VERSION);
    if (VERSION === 'dev') add('🏷️', 'Version', 'locale (dev)', 'info');
    else if (outdated.length) add('🏷️', 'Version', plural(outdated.length, 'ancienne', 'anciennes'), 'warn', `Téléphones sur une ancienne version : ${esc(outdated.map((i) => i.t).join(', '))}. Recharger la page.`);
    else add('🏷️', 'Version', VERSION.replace(/^\d+\./, ''), 'ok');

    // 5. parcours
    const n = A.parcoursConflicts.length;
    add('🧭', 'Parcours', n ? plural(n, 'conflit', 'conflits') : 'sans conflit', n ? 'warn' : 'ok', n ? 'Conflits de zone : voir la vue Parcours plus bas.' : '');

    // 6. contenu : textes provisoires et lieux sans position sur la carte
    const noPos = Object.keys(GAME.zones).filter((z) => GAME.zones[z].lat == null).map((z) => 'zone ' + z).concat(GAME.final && GAME.final.lat == null ? ['finale'] : []);
    const todo = provisional.length + (rulesProvisional ? 1 : 0) + noPos.length;
    if (todo) {
      const parts = [];
      if (provisional.length) parts.push(`contenu provisoire (${esc(provisional.slice(0, 4).join(' · '))}${provisional.length > 4 ? '…' : ''})`);
      if (rulesProvisional) parts.push('consignes de l\'accueil à compléter (numéro de l\'organisation)');
      if (noPos.length) parts.push(`pas de position sur la carte : ${esc(noPos.join(', '))}`);
      add('✍️', 'Contenu', plural(todo, 'point à finir', 'points à finir'), 'warn', 'À finir : ' + parts.join(' · ') + '.');
    } else add('✍️', 'Contenu', 'complet', 'ok');

    // 7. sécurité
    add('🔒', 'contenu.js', A.leaked ? 'EN LIGNE' : 'non publié', A.leaked ? 'err' : 'ok', A.leaked ? 'contenu.js est en ligne : les réponses sont lisibles par tous. Supprimez-le du dépôt GitHub.' : '');
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
