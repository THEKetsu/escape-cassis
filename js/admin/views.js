/* Rendu du tableau de bord : équipes, classement, occupation des zones, page complète. */
(function () {
  const A = window.EscapeAdmin;
  if (!A) return;
  const { E, GAME, $root, teamIds, STATUS } = A;
  const { esc } = window.Util;

  function chips(info) {
    const st = info.st;
    const circuit = info.team.circuit.map(String).concat('final');
    const doneZones = new Set();
    if (st) {
      info.path.forEach((p, i) => {
        if (i < st.stepIndex || st.finishedAt) doneZones.add(p.zoneId);
      });
      // une zone n'est terminée que si toutes ses étapes le sont
      info.path.forEach((p, i) => { if (i >= st.stepIndex && !st.finishedAt) doneZones.delete(p.zoneId); });
    }
    const currentZone = st && st.startedAt && !st.finishedAt ? info.step.zoneId : null;
    return '<div class="chips">' + circuit.map((z) => {
      const cls = z === currentZone ? 'cur' : doneZones.has(z) ? 'ok' : '';
      return `<span class="chip ${cls}">${z === 'final' ? 'F' : esc(z)}</span>`;
    }).join('<i>›</i>') + '</div>';
  }

  function teamRow(info) {
    const [icon, label, cls] = STATUS[info.status];
    const st = info.st;
    let position = '–';
    if (st && st.startedAt) {
      position = st.finishedAt
        ? `Arrivée à ${new Date(st.finishedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`
        : `<b>${esc(info.step.zoneName)}</b> <small>${info.step.variant ? '(' + info.step.variant + ') ' : ''}étape ${info.step.zoneStep + 1}/${info.step.zoneSteps}</small><br><small>${esc(info.step.title || '')}</small>`;
    }
    const lastSeen = info.row ? Math.round((Date.now() - info.row.updatedAt) / 1000) : null;
    const main = `
      <tr class="team ${cls}" data-team="${esc(info.t)}">
        <td><b>${esc(info.team.name || info.t)}</b>${st && st.teamName ? `<br><small>${esc(st.teamName)}</small>` : ''}</td>
        <td><span class="status ${cls}">${icon} ${label}</span></td>
        <td>${chips(info)}</td>
        <td>${position}</td>
        <td class="num">${st && st.startedAt && !st.finishedAt ? E.formatDuration(info.stepSec) : '–'}${st && st.wrongOnStep && !st.finishedAt ? `<br><small>${st.wrongOnStep} erreur(s)</small>` : ''}</td>
        <td class="num">${st ? st.hintsTotal || 0 : '–'}${st && st.skips ? ` <small>🔑${st.skips}</small>` : ''}</td>
        <td class="num">${st && st.penalty ? '+' + E.formatDuration(st.penalty) : '–'}</td>
        <td class="num"><b>${st && st.startedAt ? E.formatDuration(info.total) : '–'}</b></td>
        <td class="num"><small>${lastSeen == null ? '–' : lastSeen < 60 ? lastSeen + ' s' : Math.round(lastSeen / 60) + ' min'}</small></td>
        <td>${A.chatCell(info.t)}</td>
      </tr>`;
    if (!A.open.has(info.t) || !st) return main;
    const log = (st.log || []).map((l) => `
      <tr><td>${new Date(l.at).toLocaleTimeString('fr-FR')}</td><td>${esc(l.zoneName)}</td><td>${esc(l.title)}</td>
      <td class="num">${E.formatDuration(l.sec)}</td><td class="num">${l.hints}</td><td class="num">${l.wrong || 0}</td><td>${l.skipped ? '🔑 passée' : ''}</td></tr>`).join('');
    return main + `
      <tr class="detail"><td colspan="10">
        ${A.book && info.step && !st.finishedAt ? `<p class="answer-line">🔑 Étape en cours : ${A.stepSolution(info.step)}</p>` : ''}
        ${log ? `<table class="log"><tr><th>Heure</th><th>Zone</th><th>Étape</th><th>Durée</th><th>Indices</th><th>Erreurs</th><th></th></tr>${log}</table>` : '<p>Aucune étape validée.</p>'}
      </td></tr>`;
  }

  function ranking(infos) {
    const started = infos.filter((i) => i.st && i.st.startedAt);
    if (!started.length) return '<p class="muted">Aucune équipe partie.</p>';
    const done = started.filter((i) => i.status === 'done').sort((a, b) => a.total - b.total);
    const running = started.filter((i) => i.status !== 'done')
      .sort((a, b) => b.st.stepIndex / b.path.length - a.st.stepIndex / a.path.length || a.total - b.total);
    return '<ol class="ranking">' + done.concat(running).map((i) => `
      <li class="${i.status === 'done' ? 'done' : ''}">
        <span>${esc(i.st.teamName || i.team.name)}</span>
        <b>${E.formatDuration(i.total)}</b>
        <small>${i.status === 'done' ? `dont +${E.formatDuration(i.st.penalty)} de pénalités` : `en cours · ${i.st.stepIndex}/${i.path.length} étapes`}</small>
      </li>`).join('') + '</ol>';
  }

  function occupancy(infos) {
    const zones = Object.keys(GAME.zones).map((z) => ({ id: z, name: GAME.zones[z].name }))
      .concat({ id: 'final', name: (GAME.final && GAME.final.name) || 'Final' });
    return '<div class="zones">' + zones.map((z) => {
      const here = infos.filter((i) => i.st && i.st.startedAt && !i.st.finishedAt && i.step.zoneId === z.id);
      return `<div class="zone ${here.length > 2 ? 'crowded' : ''}"><b>${z.id === 'final' ? '🏁' : esc(z.id)} · ${esc(z.name)}</b>
        <div>${here.map((i) => `<span class="tag">${esc(i.t)}${i.step.variant ? ' ' + i.step.variant : ''}</span>`).join('') || '<small>—</small>'}</div></div>`;
    }).join('') + '</div>';
  }

  function render() {
    const infos = teamIds.map(A.teamInfo);
    const count = (s) => infos.filter((i) => i.status === s).length;
    $root.innerHTML = `
      <header class="bar glass">
        <div class="title">
          <h1>${esc(GAME.title)}</h1>
          <small>${A.fetchError ? `<span class="err">⚠️ ${esc(A.fetchError)}</span>` : `<span class="live-dot"></span>En direct · mis à jour à ${A.lastFetch ? new Date(A.lastFetch).toLocaleTimeString('fr-FR') : '…'}`}</small>
        </div>
        <div class="meta">
          ${A.unreadTotal() ? `<button data-action="chat-next" class="unread">💬 ${A.unreadTotal()} message${A.unreadTotal() > 1 ? 's' : ''}</button>` : ''}
          <button data-action="book" class="dark">🔑 Réponses</button>
          <button data-action="qr" class="primary">📱 QR codes équipes</button>
          <button data-action="refresh" class="icon" title="Actualiser">↻</button>
          <button data-action="wipe" class="danger">🗑️ Effacer toutes les données</button>
        </div>
      </header>
      <div id="warn"></div>
      <section class="kpis">
        <div><span class="kpi-icon blue">🏃</span><b>${count('playing') + count('stuck') + count('offline')}</b><small>en jeu</small></div>
        <div class="${count('stuck') ? 'alert' : ''}"><span class="kpi-icon red">🆘</span><b>${count('stuck')}</b><small>bloquée(s) ?</small></div>
        <div class="${count('offline') ? 'warnk' : ''}"><span class="kpi-icon orange">📵</span><b>${count('offline')}</b><small>sans signal</small></div>
        <div><span class="kpi-icon green">🏁</span><b>${count('done')}<i>/${infos.filter((i) => i.st && i.st.startedAt).length}</i></b><small>arrivées</small></div>
      </section>
      <section><h2>Carte</h2>${A.map(infos)}</section>
      <section>
        <h2>Équipes <small>cliquez une ligne pour le détail</small></h2>
        <div class="table-wrap"><table class="teams">
          <tr><th>Équipe</th><th>Statut</th><th>Circuit</th><th>Position</th><th>Sur l'étape</th><th>Indices</th><th>Pénalités</th><th>Total</th><th>Signal</th><th>Tchat</th></tr>
          ${infos.map(teamRow).join('')}
        </table></div>
      </section>
      <div class="cols">
        <section><h2>Zones en ce moment</h2>${occupancy(infos)}</section>
        <section><h2>Classement</h2>${ranking(infos)}</section>
      </div>
      <footer>
        <span>Code organisation pour débloquer une équipe : ${A.book && A.book.masterCode ? `<b>${esc(A.book.masterCode)}</b>` : 'voir 🔑 Réponses'}</span>
      </footer>`;
    const slot = document.getElementById('map-tiles');
    if (slot) slot.replaceWith(A.tiles());
    document.title = (A.unreadTotal() ? `(${A.unreadTotal()}) ` : '') + A.baseTitle;
    A.checkLeak();
  }

  Object.assign(A, { render });
})();
