/* Équipes connectées : un chiffre et une pastille par équipe ; une alerte seulement si quelque chose empêche de jouer. */
(function () {
  const A = window.EscapeAdmin;
  if (!A) return;
  const { Sync } = A;
  const { esc } = window.Util;

  // La table de session existe-t-elle ? (sinon ni salle d'attente ni remise à zéro des téléphones)
  async function checkSessionTable() {
    try {
      A.sessionTable = (await Sync.loadEpoch()) ? 'ok' : 'absent';
    } catch (e) {
      A.sessionTable = 'erreur';
    }
    A.render();
  }

  // Connectée = le téléphone a donné signe de vie récemment (une ligne restée sur le serveur ne suffit pas)
  const fresh = (info) => !!info.row && Date.now() - info.row.updatedAt < A.OFFLINE_MS;

  // Pastille d'une équipe : jouant, prête (salle d'attente), connectée, absente
  function pill(info) {
    const st = info.st;
    const cls = !fresh(info) ? 'off' : st && st.startedAt ? 'play' : info.status === 'ready' ? 'ready' : 'on';
    const label = { play: 'en jeu', ready: 'prête (salle d\'attente)', on: 'connectée', off: 'pas connectée en ce moment' }[cls];
    return `<span class="tp ${cls}" title="${esc((st && st.teamName) || info.team.name || info.t)} · ${label}">${esc(info.t)}</span>`;
  }

  function alerts() {
    const list = [];
    if (A.fetchError) list.push(['err', `🚨 Supabase ne répond pas : ${esc(A.fetchError)}`]);
    if (A.leaked) list.push(['err', '🚨 contenu.js est en ligne : les réponses sont lisibles par tous. Supprimez-le du dépôt GitHub.']);
    if (!A.fetchError && (A.sessionTable === 'absent' || (A.session && A.session.startedAt === undefined))) {
      list.push(['err', '🚨 Départ impossible : relancez <code>supabase.sql</code> (colonne <code>started_at</code>). Les équipes attendent, mais vous ne pouvez pas encore donner le départ.']);
    }
    return list;
  }

  function checksHtml(infos) {
    const connected = infos.filter(fresh).length;
    const notes = alerts().map(([level, text]) => `<li class="${level}">${text}</li>`).join('');
    return `<section class="checks">
      <div class="ck-teams">
        <b>👥 Équipes connectées</b>
        <span class="ck-count ${connected === infos.length ? 'all' : ''}">${connected}/${infos.length}</span>
        <div class="tp-row">${infos.map(pill).join('')}</div>
      </div>
      ${notes ? `<ul class="ck-notes">${notes}</ul>` : ''}
    </section>`;
  }

  Object.assign(A, { checksHtml, checkSessionTable });
})();
