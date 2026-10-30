/*
 * Dashboard organisation : lit la table Supabase toutes les 10 s.
 * Le code d'accès est une simple barrière : les données (progression) ne sont pas sensibles.
 */
(function () {
  const E = window.Engine;
  const Sync = window.Sync;
  const GAME = window.GAME_SOURCE || window.GAME;
  const S = GAME.settings || {};
  const SALT = S.salt || GAME.id;
  const $root = document.getElementById('admin');
  const REFRESH_MS = 10000;
  const OFFLINE_MS = 90000;
  const teamIds = Object.keys(GAME.teams);
  const paths = Object.fromEntries(teamIds.map((t) => [t, E.buildPath(GAME, t)]));

  let rows = {};
  let lastFetch = null;
  let fetchError = null;
  let open = new Set();

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  // ---------- accès ----------

  function gate() {
    if (sessionStorage.getItem('admin:' + GAME.id) === 'ok' || (!S.adminCode && !S.adminHash)) return start();
    $root.innerHTML = `
      <form class="gate">
        <h1>🧭 Dashboard</h1>
        <input type="password" placeholder="Code d'accès" autofocus>
        <button>Entrer</button>
        <p class="err"></p>
      </form>`;
    $root.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      const value = e.target.querySelector('input').value;
      if (E.codeMatches(value, S.adminCode, S.adminHash, SALT)) {
        sessionStorage.setItem('admin:' + GAME.id, 'ok');
        start();
      } else {
        e.target.querySelector('.err').textContent = 'Code incorrect';
      }
    });
  }

  // ---------- données ----------

  async function refresh() {
    try {
      const list = await Sync.loadAll();
      rows = {};
      list.forEach((r) => { rows[r.team] = { state: r.data && r.data.state, updatedAt: Date.parse(r.updated_at) }; });
      lastFetch = Date.now();
      fetchError = null;
    } catch (e) {
      fetchError = e.message;
    }
    render();
  }

  function teamInfo(t) {
    const row = rows[t];
    const st = row && row.state;
    const path = paths[t];
    const now = Date.now();
    const info = { t, st, path, row, team: GAME.teams[t] };
    if (!st || !st.startedAt) {
      info.status = row ? 'registered' : 'idle';
      return info;
    }
    info.step = path[st.stepIndex];
    info.stepSec = st.finishedAt ? 0 : Math.round((now - st.stepStartedAt) / 1000);
    info.elapsed = E.elapsedSeconds(st, now);
    info.total = info.elapsed + (st.penalty || 0);
    if (st.finishedAt) info.status = 'done';
    else if (now - row.updatedAt > OFFLINE_MS) info.status = 'offline';
    else if (info.stepSec > (S.stuckMinutes || 12) * 60) info.status = 'stuck';
    else info.status = 'playing';
    return info;
  }

  const STATUS = {
    idle: ['⏳', 'Pas connectée', 'idle'],
    registered: ['📱', 'Prête', 'idle'],
    playing: ['🏃', 'En jeu', 'playing'],
    stuck: ['🆘', 'Bloquée ?', 'stuck'],
    offline: ['📵', 'Sans signal', 'offline'],
    done: ['🏁', 'Arrivée', 'done'],
  };

  // ---------- rendu ----------

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
      </tr>`;
    if (!open.has(info.t) || !st) return main;
    const log = (st.log || []).map((l) => `
      <tr><td>${new Date(l.at).toLocaleTimeString('fr-FR')}</td><td>${esc(l.zoneName)}</td><td>${esc(l.title)}</td>
      <td class="num">${E.formatDuration(l.sec)}</td><td class="num">${l.hints}</td><td class="num">${l.wrong || 0}</td><td>${l.skipped ? '🔑 passée' : ''}</td></tr>`).join('');
    return main + `
      <tr class="detail"><td colspan="9">
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
    const infos = teamIds.map(teamInfo);
    const count = (s) => infos.filter((i) => i.status === s).length;
    $root.innerHTML = `
      <header>
        <h1>🧭 ${esc(GAME.title)}</h1>
        <div class="meta">
          ${fetchError ? `<span class="err">⚠️ ${esc(fetchError)}</span>` : ''}
          <span>Mise à jour : ${lastFetch ? new Date(lastFetch).toLocaleTimeString('fr-FR') : '…'}</span>
          <button data-action="qr" class="primary">📱 QR codes équipes</button>
          <button data-action="refresh">↻</button>
        </div>
      </header>
      <div id="warn"></div>
      <section class="kpis">
        <div><b>${count('playing') + count('stuck') + count('offline')}</b><small>en jeu</small></div>
        <div class="${count('stuck') ? 'alert' : ''}"><b>${count('stuck')}</b><small>bloquée(s) ?</small></div>
        <div class="${count('offline') ? 'warnk' : ''}"><b>${count('offline')}</b><small>sans signal</small></div>
        <div><b>${count('done')}/${infos.filter((i) => i.st && i.st.startedAt).length}</b><small>arrivées</small></div>
      </section>
      <section>
        <h2>Équipes <small>(cliquez une ligne pour le détail)</small></h2>
        <div class="table-wrap"><table class="teams">
          <tr><th>Équipe</th><th>Statut</th><th>Circuit</th><th>Position</th><th>Sur l'étape</th><th>Indices</th><th>Pénalités</th><th>Total</th><th>Signal</th></tr>
          ${infos.map(teamRow).join('')}
        </table></div>
      </section>
      <div class="cols">
        <section><h2>Zones en ce moment</h2>${occupancy(infos)}</section>
        <section><h2>Classement</h2>${ranking(infos)}</section>
      </div>
      <footer>
        <span>Code organisation pour débloquer une équipe : voir <code>masterCode</code> dans contenu.js</span>
        <button data-action="wipe" class="danger">Effacer toutes les données</button>
      </footer>`;
    checkLeak();
  }

  // ---------- QR codes des équipes (à montrer au briefing) ----------

  function joinUrl() {
    const configured = window.CONFIG && window.CONFIG.publicUrl;
    if (location.protocol.startsWith('http')) return new URL('./', location.href).href;
    return configured && !configured.includes('VOTRE-PSEUDO') ? configured.replace(/\/?$/, '/') : null;
  }

  // Fenêtre hors de #admin : le dashboard est redessiné chaque seconde
  function showQr() {
    const base = joinUrl();
    const overlay = document.createElement('div');
    overlay.className = 'qr-overlay';
    overlay.innerHTML = `
      <div class="qr-panel">
        <header><h2>📱 Rejoindre le jeu</h2><button data-close>✕ Fermer</button></header>
        ${base ? `<p class="muted">Le capitaine de chaque équipe scanne son QR code avec l'appareil photo du téléphone. Touchez un code pour l'agrandir.</p>
        <div class="qr-teams">${teamIds.map((t) => `
          <button class="qr-team" data-team="${esc(t)}">
            <b>${esc(GAME.teams[t].name || t)}</b>
            ${window.QR.svg(base + '?equipe=' + encodeURIComponent(t))}
          </button>`).join('')}</div>`
        : '<p class="err">Renseignez <code>publicUrl</code> dans config.js, ou ouvrez le dashboard depuis le site publié.</p>'}
      </div>`;
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.closest('[data-close]')) return overlay.remove();
      const card = e.target.closest('.qr-team');
      if (card) card.classList.toggle('zoom');
    });
    document.body.appendChild(overlay);
  }

  // Alerte si contenu.js (réponses en clair) a été publié par erreur
  let leak = null;
  function checkLeak() {
    if (leak === null && location.protocol.startsWith('http') && !/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) {
      leak = false;
      fetch('contenu.js', { method: 'HEAD', cache: 'no-store' }).then((r) => { leak = r.ok; render(); }, () => {});
    }
    if (leak) {
      document.getElementById('warn').innerHTML =
        '<p class="leak">🚨 contenu.js est en ligne : les réponses sont lisibles par tous. Supprimez-le du dépôt GitHub !</p>';
    }
  }

  function start() {
    if (!Sync.enabled) {
      $root.innerHTML = `<div class="gate"><h1>Dashboard non configuré</h1>
        <p>Renseignez <code>supabase.url</code> et <code>supabase.key</code> dans <code>config.js</code> (voir README).</p></div>`;
      return;
    }
    $root.addEventListener('click', async (e) => {
      const action = e.target.closest('[data-action]');
      if (action && action.dataset.action === 'refresh') return refresh();
      if (action && action.dataset.action === 'qr') return showQr();
      if (action && action.dataset.action === 'wipe') {
        if (!confirm('Effacer la progression de TOUTES les équipes sur le serveur ?')) return;
        if (!confirm('Vraiment ? (à faire avant le jeu, après les tests)')) return;
        try { await Sync.deleteAll(); } catch (err) { alert(err.message); }
        return refresh();
      }
      const row = e.target.closest('tr.team');
      if (row) {
        const t = row.dataset.team;
        open.has(t) ? open.delete(t) : open.add(t);
        render();
      }
    });
    refresh();
    setInterval(refresh, REFRESH_MS);
    setInterval(render, 1000);
  }

  gate();
})();
