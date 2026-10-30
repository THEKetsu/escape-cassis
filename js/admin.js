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
        sessionStorage.setItem(CODE_KEY, value); // déchiffre le carnet de réponses, le temps de l'onglet
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
    renderPanel(); // position de l'équipe affichée en tête de conversation
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
        <td>${chatCell(info.t)}</td>
      </tr>`;
    if (!open.has(info.t) || !st) return main;
    const log = (st.log || []).map((l) => `
      <tr><td>${new Date(l.at).toLocaleTimeString('fr-FR')}</td><td>${esc(l.zoneName)}</td><td>${esc(l.title)}</td>
      <td class="num">${E.formatDuration(l.sec)}</td><td class="num">${l.hints}</td><td class="num">${l.wrong || 0}</td><td>${l.skipped ? '🔑 passée' : ''}</td></tr>`).join('');
    return main + `
      <tr class="detail"><td colspan="10">
        ${book && info.step && !st.finishedAt ? `<p class="answer-line">🔑 Étape en cours : ${stepSolution(info.step)}</p>` : ''}
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

  // ---------- carte (tuiles OpenStreetMap, position déduite de l'avancement) ----------

  // Cadre en pixels de tuile : un peu plus grand que l'écran, pour zoomer au plus près sans flou
  const MAP_W = 1500;
  const MAP_H = 900;
  const zonePoints = Object.keys(GAME.zones).concat('final')
    .map((z) => ({ id: z, point: E.zonePoint(GAME, z) })).filter((z) => z.point);
  const view = E.mapView(zonePoints.map((z) => z.point), MAP_W, MAP_H);
  const pct = (v, total) => (v / total * 100).toFixed(3) + '%';
  let tilesEl = null;

  // Les tuiles sont créées une seule fois : render() tourne chaque seconde et ne doit pas les recharger
  function tiles() {
    if (!tilesEl) {
      tilesEl = document.createElement('div');
      tilesEl.className = 'map-tiles';
      tilesEl.innerHTML = view.tiles.map((t) => `<img alt="" src="https://tile.openstreetmap.org/${t.z}/${t.x}/${t.y}.png"
        style="left:${pct(t.left, MAP_W)};top:${pct(t.top, MAP_H)};width:calc(${pct(256, MAP_W)} + 1px);height:calc(${pct(256, MAP_H)} + 1px)">`).join('');
    }
    return tilesEl;
  }

  function map(infos) {
    if (!view) return '<p class="muted">Ajoutez <code>lat</code> et <code>lng</code> aux zones dans contenu.js pour afficher la carte.</p>';
    const placed = [];
    const unplaced = [];
    infos.filter((i) => i.st && i.st.startedAt).forEach((i) => {
      const loc = E.teamLocation(GAME, i.path, i.st);
      if (loc) placed.push(Object.assign({ info: i, loc }, view.project(loc)));
      else unplaced.push(i);
    });
    // équipes au même endroit : réparties en cercle autour du point,
    // et toujours décalées quand elles sont sur une zone pour ne pas cacher son numéro
    const groups = {};
    placed.forEach((p) => {
      const key = Math.round(p.x / 10) + ',' + Math.round(p.y / 10);
      (groups[key] = groups[key] || []).push(p);
    });
    Object.values(groups).forEach((g) => {
      const onZone = g.some((p) => !p.loc.from);
      if (g.length < 2 && !onZone) return;
      const r = onZone ? 34 : 20;
      g.forEach((p, k) => {
        const a = -Math.PI / 4 + (2 * Math.PI * k) / Math.max(g.length, 4);
        p.x += r * Math.cos(a);
        p.y += r * Math.sin(a);
      });
    });
    const at = (p) => `left:${pct(p.x, MAP_W)};top:${pct(p.y, MAP_H)}`;
    const lines = placed.filter((p) => p.loc.from).map((p) => {
      const a = view.project(p.loc.from);
      const b = view.project(p.loc.to);
      return `<line class="${STATUS[p.info.status][2]}" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"/>`;
    }).join('');
    const zones = zonePoints.map((z) => {
      const name = z.id === 'final' ? (GAME.final.name || 'Final') : GAME.zones[z.id].name;
      return `<div class="map-zone" style="${at(view.project(z.point))}" title="${esc(name)}">
        <b>${z.id === 'final' ? '🏁' : esc(z.id)}</b><small>${esc(name)}</small></div>`;
    }).join('');
    const teams = placed.map((p) => {
      const where = p.loc.enRoute ? `en route vers ${p.info.step.zoneName}` : p.loc.zoneId === 'final' && p.info.st.finishedAt ? 'arrivée' : `sur place : ${p.info.step.zoneName}`;
      return `<span class="map-team ${STATUS[p.info.status][2]} ${p.loc.enRoute ? 'route' : ''}" style="${at(p)}"
        title="${esc((p.info.st.teamName || p.info.team.name || p.info.t) + ' · ' + where)}">${esc(p.info.t)}</span>`;
    }).join('');
    return `
      <div class="map" style="aspect-ratio:${MAP_W} / ${MAP_H}">
        <div id="map-tiles"></div>
        <svg viewBox="0 0 ${MAP_W} ${MAP_H}" preserveAspectRatio="none">${lines}</svg>
        ${zones}${teams}
        <a class="map-credit" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">© contributeurs OpenStreetMap</a>
      </div>
      <p class="muted map-legend">Position approximative, sans GPS : sur la zone où l'équipe joue, ou en pointillés à mi-chemin quand elle cherche la suivante.
        ${unplaced.length ? `<br>Non placées : ${unplaced.map((i) => esc(i.t) + (i.status === 'done' ? ' (arrivée)' : '')).join(', ')}` : ''}</p>`;
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
          ${unreadTotal() ? `<button data-action="chat-next" class="unread">💬 ${unreadTotal()} message${unreadTotal() > 1 ? 's' : ''}</button>` : ''}
          <button data-action="book" class="dark">🔑 Réponses</button>
          <button data-action="qr" class="primary">📱 QR codes équipes</button>
          <button data-action="refresh">↻</button>
          <button data-action="wipe" class="danger">🗑️ Effacer toutes les données</button>
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
          <tr><th>Équipe</th><th>Statut</th><th>Circuit</th><th>Position</th><th>Sur l'étape</th><th>Indices</th><th>Pénalités</th><th>Total</th><th>Signal</th><th>Tchat</th></tr>
          ${infos.map(teamRow).join('')}
        </table></div>
      </section>
      <section><h2>Carte</h2>${map(infos)}</section>
      <div class="cols">
        <section><h2>Zones en ce moment</h2>${occupancy(infos)}</section>
        <section><h2>Classement</h2>${ranking(infos)}</section>
      </div>
      <footer>
        <span>Code organisation pour débloquer une équipe : ${book && book.masterCode ? `<b>${esc(book.masterCode)}</b>` : 'voir 🔑 Réponses'}</span>
      </footer>`;
    const slot = document.getElementById('map-tiles');
    if (slot) slot.replaceWith(tiles());
    document.title = (unreadTotal() ? `(${unreadTotal()}) ` : '') + baseTitle;
    checkLeak();
  }

  // ---------- tchat avec les équipes ----------

  const CHAT_MS = 5000;
  const READ_KEY = 'admin:lu:' + GAME.id;
  const baseTitle = document.title;
  let msgs = {};        // messages par équipe
  let msgLastId = 0;
  let msgLoaded = false;
  let read = JSON.parse(localStorage.getItem(READ_KEY) || '{}'); // dernier message lu par équipe
  let chatTeam = null;  // équipe dont la conversation est ouverte
  let panel = null;

  const unread = (t) => E.unreadCount(msgs[t], read[t], 'team');
  const unreadTotal = () => teamIds.reduce((n, t) => n + unread(t), 0);

  function chatCell(t) {
    const n = unread(t);
    const count = (msgs[t] || []).length;
    return `<button class="chat-cell ${n ? 'unread' : ''}" data-action="chat" data-team="${esc(t)}" title="Ouvrir la conversation">
      💬${n ? ` <b>${n}</b>` : count ? ` <small>${count}</small>` : ''}</button>`;
  }

  function markRead(t) {
    const list = msgs[t] || [];
    if (!list.length) return;
    read[t] = list[list.length - 1].id;
    localStorage.setItem(READ_KEY, JSON.stringify(read));
  }

  // Petit signal sonore à l'arrivée d'un message (ignoré si le navigateur bloque le son)
  function beep() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
      osc.onended = () => ctx.close();
    } catch (e) { /* pas de son, tant pis */ }
  }

  // Les doublons sont écartés par id : un message envoyé revient aussi à la lecture suivante
  function addMessages(list, fromPoll) {
    let incoming = false;
    list.forEach((m) => {
      if (fromPoll) msgLastId = Math.max(msgLastId, m.id);
      const arr = msgs[m.team] = msgs[m.team] || [];
      if (arr.some((x) => x.id === m.id)) return;
      arr.push(m);
      arr.sort((a, b) => a.id - b.id);
      if (m.sender === 'team') incoming = true;
    });
    if (chatTeam) {
      markRead(chatTeam);
      renderPanel();
    }
    if (incoming && fromPoll && msgLoaded && unreadTotal()) beep();
  }

  async function pollChat() {
    try {
      addMessages(await Sync.loadMessages(null, msgLastId), true);
      msgLoaded = true;
    } catch (e) { /* table absente ou hors connexion : nouvel essai au prochain tour */ }
    render();
    setTimeout(pollChat, CHAT_MS);
  }

  function openChat(t) {
    chatTeam = t;
    if (!panel) {
      panel = document.createElement('aside');
      panel.className = 'chat-panel';
      document.body.appendChild(panel);
      panel.addEventListener('click', (e) => {
        if (e.target.closest('[data-close]')) closeChat();
      });
      panel.addEventListener('submit', (e) => {
        e.preventDefault();
        sendChat();
      });
      // Entrée envoie, Maj+Entrée va à la ligne
      panel.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey && e.target.tagName === 'TEXTAREA') {
          e.preventDefault();
          sendChat();
        }
      });
    }
    panel.innerHTML = `
      <header><div><h2></h2><small class="chat-where"></small></div><button data-close>✕</button></header>
      <div class="chat-list"></div>
      <form><textarea rows="3" maxlength="1000" placeholder="Réponse à l'équipe… (Entrée pour envoyer)"></textarea>
        <button class="primary">Envoyer</button><p class="err"></p></form>`;
    markRead(t);
    renderPanel();
    render();
    panel.querySelector('textarea').focus();
  }

  function closeChat() {
    chatTeam = null;
    if (panel) panel.remove();
    panel = null;
  }

  function renderPanel() {
    if (!panel || !chatTeam) return;
    const info = teamInfo(chatTeam);
    panel.querySelector('h2').textContent = `💬 ${(info.st && info.st.teamName) || info.team.name || chatTeam}`;
    const playing = info.step && !info.st.finishedAt;
    panel.querySelector('.chat-where').innerHTML = playing
      ? `En ce moment : ${esc(info.step.zoneName)} · ${esc(info.step.title || '')}${book ? `<br>🔑 ${stepSolution(info.step)}` : ''}`
      : STATUS[info.status][1];
    const box = panel.querySelector('.chat-list');
    const atBottom = box.scrollHeight - box.scrollTop - box.clientHeight < 40;
    box.innerHTML = (msgs[chatTeam] || []).map((m) => `
      <div class="msg ${m.sender === 'admin' ? 'me' : ''}">
        <p>${esc(m.body)}</p>
        <small>${new Date(m.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}${m.step ? ' · 📍 ' + esc(m.step) : ''}</small>
      </div>`).join('') || '<p class="muted">Aucun message. Vous pouvez écrire à l\'équipe la première.</p>';
    if (atBottom || !box.dataset.ready) box.scrollTop = box.scrollHeight;
    box.dataset.ready = '1';
  }

  async function sendChat() {
    const input = panel.querySelector('textarea');
    const body = input.value.trim().slice(0, 1000);
    if (!body || !chatTeam) return;
    const err = panel.querySelector('.err');
    try {
      const msg = await Sync.sendMessage({ team: chatTeam, sender: 'admin', body });
      input.value = '';
      err.textContent = '';
      addMessages([msg], false);
      panel.querySelector('.chat-list').scrollTop = 1e9;
    } catch (e) {
      err.textContent = 'Non envoyé : ' + e.message;
    }
  }

  // ---------- QR codes des équipes (à montrer au briefing) ----------

  function joinUrl() {
    const configured = window.CONFIG && window.CONFIG.publicUrl;
    if (location.protocol.startsWith('http')) return new URL('./', location.href).href;
    return configured && !configured.includes('VOTRE-PSEUDO') ? configured.replace(/\/?$/, '/') : null;
  }

  // ---------- carnet de réponses ----------

  // En local, contenu.js donne les réponses en clair ; en ligne, game.js les contient
  // chiffrées par le code d'accès (answerBook), déchiffrées une fois le code saisi.
  const CODE_KEY = 'admin:code:' + GAME.id;
  let book = window.GAME_SOURCE ? E.answerBook(GAME) : null;

  async function unlockBook(code) {
    if (book || !GAME.answerBook || !code) return !!book;
    try {
      book = await E.decryptJSON(GAME.answerBook, code);
      sessionStorage.setItem(CODE_KEY, code);
    } catch (e) {
      return false;
    }
    render();
    renderPanel();
    return true;
  }

  const TYPE_ICONS = { info: 'ℹ️', text: '✏️', number: '🔢', qcm: '☑️', 'image-choice': '🖼️', qr: '📷', gps: '📡', tap: '👆' };

  // Ce qu'il faut répondre / faire à une étape, en clair
  function solution(step, key) {
    const answers = (book && book.answers[key]) || [];
    const list = answers.length
      ? `<b>${esc(answers[0])}</b>${answers.length > 1 ? ` <small>(aussi : ${answers.slice(1).map(esc).join(', ')})</small>` : ''}`
      : '';
    switch (step.type) {
      case 'info': return `<small>pas de réponse : bouton « ${esc(step.button || 'Continuer')} »</small>`;
      case 'tap': return `toucher l'image à <b>${step.target.x} % / ${step.target.y} %</b> <small>(largeur / hauteur, rayon ${step.target.r} %)</small>`;
      case 'gps': return `se rendre à <b>${step.lat}, ${step.lng}</b> <small>(${step.radius || 40} m)</small>${list ? `<br>code de secours : ${list}` : ''}`;
      default: return list || '<small class="err">réponse indisponible</small>';
    }
  }

  function stepSolution(step) {
    return step ? solution(step, step.key) : '';
  }

  function bookHtml() {
    const stepRow = (step, key, i) => `
      <li><span class="step-no">${i + 1}</span><div>
        <div>${TYPE_ICONS[step.type] || ''} <b>${esc(step.title || '')}</b>${i === 0 && key.startsWith('z') ? ' <small>(mène à la zone)</small>' : ''}</div>
        <div class="answer-line">${solution(step, key)}</div>
        ${(step.hints || []).length ? `<details><summary>${step.hints.length} indice(s)</summary><ol>${step.hints.map((h) => `<li>${h}</li>`).join('')}</ol></details>` : ''}
      </div></li>`;
    const zones = Object.keys(GAME.zones).map((z) => {
      const zone = GAME.zones[z];
      return `<section class="book-zone"><h3>${esc(z)} · ${esc(zone.name)}</h3><div class="book-variants">
        ${['A', 'B'].filter((v) => zone[v]).map((v) => `<div><h4>Variante ${v}</h4><ol class="book-steps">
          ${zone[v].map((step, i) => stepRow(step, `z${z}-${v}-${i}`, i)).join('')}</ol></div>`).join('')}
      </div></section>`;
    }).join('');
    const final = GAME.final && GAME.final.steps.length
      ? `<section class="book-zone"><h3>🏁 ${esc(GAME.final.name || 'Final')}</h3><ol class="book-steps">
          ${GAME.final.steps.map((step, i) => stepRow(step, `final-${i}`, i)).join('')}</ol></section>` : '';
    return `<p>🔑 Code organisation (fait passer une étape, +${E.formatDuration(S.skipPenalty || 0)}) : <b>${esc(book.masterCode || '–')}</b></p>${zones}${final}`;
  }

  function showBook() {
    const overlay = document.createElement('div');
    overlay.className = 'qr-overlay';
    const fill = () => {
      overlay.querySelector('.book-body').innerHTML = book ? bookHtml() : GAME.answerBook
        ? `<form class="book-unlock"><p>Saisissez le code d'accès pour déchiffrer les réponses.</p>
            <input type="password" placeholder="Code d'accès"><button class="primary">Afficher</button><p class="err"></p></form>`
        : '<p class="err">Ce game.js ne contient pas les réponses : régénérez-le avec <code>node outils/publier.js</code> (adminCode renseigné).</p>';
    };
    overlay.innerHTML = `
      <div class="qr-panel book">
        <header><h2>🔑 Réponses des énigmes</h2><button data-close>✕ Fermer</button></header>
        <p class="muted">À garder pour l'organisation : ne laissez pas cet écran à la vue des joueurs.</p>
        <div class="book-body"></div>
      </div>`;
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.closest('[data-close]')) overlay.remove();
    });
    overlay.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = overlay.querySelector('.book-unlock input');
      if (await unlockBook(input.value)) fill();
      else overlay.querySelector('.book-unlock .err').textContent = 'Code incorrect';
    });
    fill();
    document.body.appendChild(overlay);
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
      if (action && action.dataset.action === 'book') return showBook();
      if (action && action.dataset.action === 'chat') return openChat(action.dataset.team);
      if (action && action.dataset.action === 'chat-next') return openChat(teamIds.find((t) => unread(t)));
      if (action && action.dataset.action === 'wipe') {
        if (!confirm('Effacer la progression et les messages de TOUTES les équipes sur le serveur ?')) return;
        if (!confirm('Vraiment ? (à faire avant le jeu, après les tests)')) return;
        try { await Sync.deleteAll(); } catch (err) { alert(err.message); }
        closeChat();
        msgs = {};
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
    pollChat();
    unlockBook(sessionStorage.getItem(CODE_KEY));
    setInterval(refresh, REFRESH_MS);
    setInterval(render, 1000);
  }

  gate();
})();
