/*
 * Application joueurs : un téléphone par équipe.
 * Progression gardée dans le navigateur (localStorage) et envoyée au dashboard si Supabase est configuré.
 */
(function () {
  const E = window.Engine;
  const Sync = window.Sync;
  const GAME = window.GAME_SOURCE || window.GAME;
  const $app = document.getElementById('app');

  if (!GAME) {
    $app.innerHTML = '<main class="card"><h1>Jeu introuvable</h1><p>game.js (ou contenu.js en local) n\'a pas pu être chargé.</p></main>';
    return;
  }

  const S = GAME.settings || {};
  const SALT = S.salt || GAME.id;
  const STORE = 'escape:' + GAME.id;
  const HEARTBEAT_MS = 30000;
  const ZONE_COLORS = ['#1d8fb3', '#e76f51', '#2a9d8f', '#7b5ea7', '#d98b1f', '#3d7dd8', '#c2457a', '#5a8f29'];
  const FINAL_COLOR = '#0b3954';
  const AVATARS = ['🐬', '🦀', '🐙', '🐚', '⛵', '🐟', '🦑', '🌊', '🐠', '⚓'];
  const leaderboard = Sync.enabled && S.showLeaderboard !== false;

  let state = load();
  let path = state ? E.buildPath(GAME, state.team) : null;
  let cooldownUntil = 0;
  let tick = null;
  let remote = null; // progression trouvée sur le serveur, proposée à la reprise
  let pendingScan = null; // code lu dans un QR de checkpoint (?scan=…), propre à cet onglet

  // ---------- état ----------

  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(STORE));
      return s && GAME.teams[s.team] ? s : null;
    } catch (e) {
      return null;
    }
  }

  function newState(team) {
    return {
      team, teamName: '', startedAt: null, finishedAt: null,
      stepIndex: 0, stepStartedAt: null, phase: 'step',
      hints: {}, hintsTotal: 0, penalty: 0, skips: 0, wrong: 0, wrongOnStep: 0,
      log: [], updatedAt: Date.now(),
    };
  }

  function setState(s) {
    state = s;
    path = s ? E.buildPath(GAME, s.team) : null;
  }

  function save() {
    state.updatedAt = Date.now();
    localStorage.setItem(STORE, JSON.stringify(state));
    push();
  }

  // ---------- synchro dashboard ----------

  let pushTimer = null;
  function push() {
    if (!Sync.enabled || !state) return;
    clearTimeout(pushTimer);
    pushTimer = setTimeout(() => {
      Sync.saveState(state).then(() => setNet(true), () => setNet(false));
    }, 300);
  }

  let online = null;
  function setNet(ok) {
    online = ok;
    const el = document.getElementById('net');
    if (el) {
      el.className = 'net ' + (ok ? 'ok' : 'ko');
      el.title = ok ? 'Synchronisé' : 'Hors connexion : la progression est gardée sur le téléphone';
    }
  }

  setInterval(() => {
    if (state && state.startedAt && !state.finishedAt) {
      push();
      updatePosition();
    }
  }, HEARTBEAT_MS);

  // ---------- position en direct (carte du dashboard, si settings.liveLocation) ----------

  const LIVE = !!S.liveLocation && Sync.enabled && !!navigator.geolocation;
  let liveDenied = false;
  let lastPositionAsk = 0;

  // Relevé ponctuel plutôt qu'un suivi continu : moins gourmand en batterie, assez pour situer l'équipe
  function updatePosition() {
    if (!LIVE || liveDenied || !state || !state.startedAt || state.finishedAt) return;
    if (Date.now() - lastPositionAsk < 10000) return;
    lastPositionAsk = Date.now();
    navigator.geolocation.getCurrentPosition((p) => {
      if (!state || !state.startedAt || state.finishedAt) return;
      state.pos = {
        lat: +p.coords.latitude.toFixed(5), lng: +p.coords.longitude.toFixed(5),
        acc: Math.round(p.coords.accuracy || 0), at: Date.now(),
      };
      save();
    }, (err) => {
      if (err.code === err.PERMISSION_DENIED) liveDenied = true; // l'équipe a refusé : position déduite de l'avancement
    }, { enableHighAccuracy: true, maximumAge: 15000, timeout: 20000 });
  }

  window.addEventListener('online', push);

  // Un QR code scanné ouvre un nouvel onglet : les onglets se tiennent à jour mutuellement
  window.addEventListener('storage', (e) => {
    if (e.key === STORE) {
      const next = load();
      // un simple relevé de position ne doit pas redessiner l'écran (réponse en cours de saisie)
      const progress = (s) => s && JSON.stringify(Object.assign({}, s, { pos: null, updatedAt: null }));
      const changed = progress(next) !== progress(state);
      setState(next);
      if (changed) render();
    }
  });

  // ---------- utilitaires ----------

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function teamName(teamId, custom) {
    return custom || GAME.teams[teamId].name || teamId;
  }

  function avatar(teamId) {
    const team = GAME.teams[teamId];
    return team.emoji || AVATARS[Object.keys(GAME.teams).indexOf(teamId) % AVATARS.length];
  }

  function current() {
    return path[state.stepIndex];
  }

  function minutes(sec) {
    return sec >= 60 ? `${Math.round(sec / 60)} min` : `${sec} s`;
  }

  function zoneColor(step) {
    if (!step || step.zoneId === 'final') return FINAL_COLOR;
    const zone = GAME.zones[step.zoneId];
    return zone.color || ZONE_COLORS[Object.keys(GAME.zones).indexOf(step.zoneId) % ZONE_COLORS.length];
  }

  function setTheme(color) {
    document.documentElement.style.setProperty('--zone', color);
    const meta = document.querySelector('meta[name=theme-color]');
    if (meta) meta.content = color;
  }

  function vibrate(pattern) {
    if (navigator.vibrate) navigator.vibrate(pattern);
  }

  function imagesHtml(images) {
    if (!images || !images.length) return '';
    return '<div class="images">' + images.map((src, i) =>
      `<button class="img" data-action="zoom" data-src="${esc(src)}"><img src="${esc(src)}" alt="Image ${i + 1}">` +
      (images.length > 1 ? `<span class="img-num">${i + 1}</span>` : '') + '<span class="img-zoom">⤢</span></button>').join('') + '</div>';
  }

  function feedback(msg, kind) {
    const el = document.getElementById('feedback');
    if (!el) return;
    el.className = 'feedback ' + (kind || '');
    el.innerHTML = msg;
    if (kind === 'bad') restartAnimation(el, 'shake');
  }

  function restartAnimation(el, cls) {
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
  }

  function preloadImages() {
    path.forEach((step) => E.stepImages(step).forEach((src) => { new Image().src = src; }));
  }

  // ---------- fenêtres, notifications, confettis ----------

  function sheet(html, onClick) {
    const m = document.createElement('div');
    m.className = 'modal';
    m.innerHTML = `<div class="sheet" role="dialog" aria-modal="true">${html}</div>`;
    const close = () => {
      m.classList.add('closing');
      setTimeout(() => m.remove(), 180);
    };
    m.addEventListener('click', (e) => {
      if (e.target === m || e.target.closest('[data-close]')) return close();
      if (onClick) onClick(e, close);
    });
    document.body.appendChild(m);
    return { el: m, close };
  }

  // Remplace confirm() / prompt() : renvoie true / le texte saisi, ou null si annulé
  function ask(opts) {
    return new Promise((resolve) => {
      let done = false;
      const finish = (value, close) => {
        if (done) return;
        done = true;
        close();
        resolve(value);
      };
      const s = sheet(`
        ${opts.icon ? `<div class="sheet-icon">${opts.icon}</div>` : ''}
        <h2>${opts.title}</h2>
        ${opts.text ? `<p>${opts.text}</p>` : ''}
        ${opts.input ? `<input class="sheet-input" type="text" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="${esc(opts.input)}">` : ''}
        <div class="sheet-actions">
          <button class="btn" data-ask="cancel">${opts.cancel || 'Annuler'}</button>
          <button class="btn primary" data-ask="ok">${opts.ok || 'OK'}</button>
        </div>`, (e, close) => {
        const b = e.target.closest('[data-ask]');
        if (!b) return;
        const input = s.el.querySelector('input');
        finish(b.dataset.ask === 'ok' ? (input ? input.value : true) : null, close);
      });
      const input = s.el.querySelector('input');
      if (input) {
        input.focus();
        input.addEventListener('keydown', (e) => { if (e.key === 'Enter') finish(input.value, s.close); });
      }
      // fermeture par clic sur le fond = annulation
      s.el.addEventListener('click', (e) => { if (e.target === s.el) finish(null, () => {}); });
    });
  }

  function toast(html) {
    let box = document.getElementById('toasts');
    if (!box) {
      box = document.createElement('div');
      box.id = 'toasts';
      document.body.appendChild(box);
    }
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = html;
    box.appendChild(t);
    setTimeout(() => t.classList.add('out'), 3200);
    setTimeout(() => t.remove(), 3700);
  }

  function confetti() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const box = document.createElement('div');
    box.className = 'confetti';
    const colors = ['#ffd166', '#e76f51', '#2a9d8f', '#1d8fb3', '#ffffff', '#c2457a'];
    for (let i = 0; i < 60; i++) {
      const p = document.createElement('i');
      p.style.left = Math.random() * 100 + '%';
      p.style.background = colors[i % colors.length];
      p.style.animationDelay = Math.random() * 0.5 + 's';
      p.style.animationDuration = 1.8 + Math.random() * 1.4 + 's';
      p.style.transform = `rotate(${Math.random() * 360}deg)`;
      box.appendChild(p);
    }
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 4000);
  }

  // ---------- rendu ----------

  function render() {
    clearInterval(tick);
    window.scrollTo(0, 0);
    if (!state) return renderNoTeam();
    if (!state.startedAt) return renderWelcome();
    if (state.phase === 'done') return renderFinished();
    if (state.phase === 'success') return renderSuccess(current());
    renderStep(current());
  }

  function header() {
    const step = current();
    const circuit = GAME.teams[state.team].circuit;
    const zoneDone = state.phase === 'success' && step.zoneStep === step.zoneSteps - 1;
    const segments = Array.from({ length: step.zoneSteps }, (_, i) => {
      const cls = i < step.zoneStep || (i === step.zoneStep && state.phase === 'success') ? 'done' : i === step.zoneStep ? 'cur' : '';
      return `<i class="${cls}"></i>`;
    }).join('');
    const trail = circuit.map((_, i) => i).concat(circuit.length).map((i) => {
      const done = i < step.zoneIndex || (i === step.zoneIndex && zoneDone);
      const cur = !done && i === step.zoneIndex;
      const label = done ? '✓' : i === circuit.length ? '🏁' : i + 1;
      return `<li class="${done ? 'done' : cur ? 'cur' : ''}">${label}</li>`;
    }).join('');
    return `
      <header class="top">
        <div class="segments">${segments}</div>
        <div class="top-row">
          <div class="who">
            <span class="avatar">${avatar(state.team)}</span>
            <b>${esc(teamName(state.team, state.teamName))}</b>
          </div>
          <div class="top-actions">
            <span class="pill"><span id="net" class="net ${online === null ? '' : online ? 'ok' : 'ko'}"></span><span id="timer">${E.formatDuration(E.elapsedSeconds(state, Date.now()))}</span>
              ${state.penalty ? `<small>+${E.formatDuration(state.penalty)}</small>` : ''}</span>
            ${Sync.enabled ? chatButton() : ''}
            ${leaderboard ? '<button class="pill icon" data-action="board" aria-label="Classement">🏆</button>' : ''}
          </div>
        </div>
        <ol class="trail">${trail}</ol>
      </header>`;
  }

  function startTimer() {
    tick = setInterval(() => {
      const el = document.getElementById('timer');
      if (el) el.textContent = E.formatDuration(E.elapsedSeconds(state, Date.now()));
    }, 1000);
  }

  const HERO = `
    <svg class="hero-art" viewBox="0 0 400 190" aria-hidden="true">
      <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffcf99"/><stop offset="1" stop-color="#9fdcf2"/></linearGradient></defs>
      <rect width="400" height="190" fill="url(#sky)"/>
      <circle cx="300" cy="62" r="26" fill="#ffd166"/>
      <path d="M215 190 L248 92 Q262 70 290 82 L330 58 Q362 62 400 46 V190 Z" fill="#c8553d"/>
      <path d="M262 110 Q300 100 340 88 M250 135 Q300 122 400 98" stroke="#a7432f" stroke-width="3" fill="none"/>
      <path d="M0 190 V120 L40 112 L70 122 L110 108 L150 118 L190 112 L215 128 V190 Z" fill="#f2e2c4"/>
      <g fill="#e9c08a"><rect x="20" y="124" width="22" height="18"/><rect x="58" y="128" width="18" height="16"/><rect x="118" y="120" width="24" height="20"/><rect x="160" y="126" width="20" height="16"/></g>
      <g fill="#c8553d"><path d="M18 124 L31 115 L44 124Z"/><path d="M116 120 L130 110 L144 120Z"/></g>
      <rect y="148" width="400" height="42" fill="#1d8fb3"/>
      <path d="M0 156 Q20 151 40 156 T80 156 T120 156 T160 156 T200 156 T240 156 T280 156 T320 156 T360 156 T400 156" stroke="#fff" stroke-opacity=".55" stroke-width="2" fill="none"/>
      <path d="M0 172 Q25 167 50 172 T100 172 T150 172 T200 172 T250 172 T300 172 T350 172 T400 172" stroke="#fff" stroke-opacity=".35" stroke-width="2" fill="none"/>
      <path d="M150 150 L196 150 L188 160 L158 160 Z" fill="#0b3954"/><path d="M172 148 V112 L192 146 Z" fill="#fff"/><path d="M170 146 V118 L154 146 Z" fill="#ffe6c2"/>
    </svg>`;

  function renderNoTeam() {
    setTheme(FINAL_COLOR);
    const picker = S.teamPicker
      ? '<div class="choices">' + Object.keys(GAME.teams).map((t) =>
        `<button class="btn choice" data-action="pick" data-team="${esc(t)}">${avatar(t)} ${esc(teamName(t))}</button>`).join('') + '</div>'
      : '';
    $app.innerHTML = `
      <main class="card welcome anim">
        <div class="hero">${HERO}</div>
        <h1 class="display">${esc(GAME.title)}</h1>
        <p class="lead">📷 Scannez le <b>QR code de votre équipe</b> pour commencer.</p>
        ${picker}
      </main>`;
  }

  function renderWelcome() {
    setTheme(FINAL_COLOR);
    const resume = remote && remote.startedAt
      ? `<div class="notice">Cette équipe a déjà une partie en cours (étape ${remote.stepIndex + 1}).
           <button class="btn primary" data-action="resume">↩️ Reprendre la partie</button></div>`
      : '';
    const hintCosts = (S.hintPenalties || []).map(minutes).join(' · ');
    $app.innerHTML = `
      <main class="card welcome anim">
        <div class="hero">${HERO}</div>
        <div class="team-badge"><span class="avatar big">${avatar(state.team)}</span>${esc(teamName(state.team))}</div>
        <h1 class="display">${esc(GAME.title)}</h1>
        ${resume}
        <div class="text">${S.intro || ''}</div>
        <div class="tiles">
          <div><span>🧩</span><b>Énigmes</b><small>une à la fois, sur place</small></div>
          <div><span>💡</span><b>Indices</b><small>${hintCosts ? '+' + hintCosts : 'disponibles'}</small></div>
          <div><span>🏅</span><b>Badges</b><small>vitesse, sans faute…</small></div>
          <div><span>🏆</span><b>Classement</b><small>temps + pénalités</small></div>
        </div>
        <label class="field">Nom de votre équipe
          <input id="team-name" maxlength="30" autocomplete="off" placeholder="Les Calanques Express">
        </label>
        ${LIVE ? '<p class="help">📍 Pendant la partie, la position du téléphone est partagée avec l\'organisation pour vous suivre sur sa carte. Acceptez la localisation quand le téléphone la demande.</p>' : ''}
        <button class="btn primary big" data-action="start">C'est parti ! 🚀</button>
      </main>`;
    if (Sync.enabled && !remote) {
      Sync.loadTeam(state.team).then((row) => {
        const s = row && row.data && row.data.state;
        if (s && s.startedAt && !state.startedAt) {
          remote = s;
          renderWelcome();
        }
      }).catch(() => {});
    }
  }

  function interactionHtml(step) {
    const form = (inputmode, placeholder) => `
      <form class="answer" data-form="answer">
        <input id="answer" type="text" inputmode="${inputmode}" autocomplete="off" autocorrect="off"
               autocapitalize="characters" spellcheck="false" placeholder="${placeholder}" enterkeyhint="send">
        <button class="btn primary" aria-label="Valider">Valider</button>
      </form>`;
    switch (step.type) {
      case 'info':
        return `<button class="btn primary big" data-action="continue">${esc(step.button || 'Continuer')}</button>`;
      case 'number':
        return form('decimal', 'Votre réponse');
      case 'qcm':
        return '<div class="choices">' + step.options.map((o, i) =>
          `<button class="btn choice" data-action="choose" data-value="${esc(o)}"><span class="letter">${String.fromCharCode(65 + i)}</span>${esc(o)}</button>`).join('') + '</div>';
      case 'image-choice':
        return '<div class="image-choices">' + step.options.map((o) =>
          `<button class="image-choice" data-action="choose" data-value="${esc(o.label)}">
             <img src="${esc(o.img)}" alt="${esc(o.label)}"><span>${esc(o.label)}</span></button>`).join('') + '</div>';
      case 'qr':
        return '<div class="scan-hint"><span>📷</span>Ouvrez l\'appareil photo du téléphone et visez le QR code.</div>' +
          form('text', 'ou tapez le code inscrit dessous');
      case 'gps':
        return '<button class="btn primary big" data-action="gps">📡 Vérifier notre position</button>' +
          ((step.answers || step.h) ? '<details class="fallback"><summary>Le GPS ne marche pas ?</summary>' +
            form('text', 'Code de secours') + '</details>' : '');
      case 'tap':
        return `<div class="tap" data-action="tap"><img src="${esc(step.image)}" alt="Touchez la bonne zone"></div>
          <p class="help">👆 Touchez l'image à l'endroit choisi.</p>`;
      default:
        return form('text', 'Votre réponse');
    }
  }

  function hintsHtml(step) {
    const hints = step.hints || [];
    if (!hints.length) return '';
    const shown = state.hints[step.key] || 0;
    let html = '<section class="hints" id="hints"><h2>Besoin d\'aide ?</h2>';
    for (let i = 0; i < shown; i++) html += `<div class="hint"><span>${i + 1}</span><p>${hints[i]}</p></div>`;
    if (shown < hints.length) {
      html += `<button class="btn hint-btn" data-action="hint">💡 Indice ${shown + 1}/${hints.length}
        <small>+${minutes(E.hintPenalty(GAME, step, shown))}</small></button>`;
    }
    return html + '</section>';
  }

  function renderStep(step) {
    setTheme(zoneColor(step));
    $app.innerHTML = `
      ${header()}
      <main class="card anim">
        <div class="kicker"><span>📍 ${esc(step.zoneName)}</span><span>Énigme ${step.zoneStep + 1}/${step.zoneSteps}</span></div>
        <h1>${esc(step.title || '')}</h1>
        <div class="text">${step.text || ''}</div>
        ${imagesHtml(step.images)}
        <div class="interaction">${interactionHtml(step)}</div>
        <p id="feedback" class="feedback" aria-live="polite"></p>
      </main>
      ${hintsHtml(step)}
      <footer class="foot"><button class="link" data-action="master">🔑 Code organisation</button></footer>`;
    startTimer();
    push();

    if (pendingScan) {
      const code = pendingScan;
      pendingScan = null;
      if (step.type === 'qr') submit(code);
      else feedback('Ce QR code ne correspond pas à l\'étape en cours.', 'bad');
    }
  }

  function renderSuccess(step) {
    setTheme(zoneColor(step));
    const s = step.success || {};
    const last = state.stepIndex === path.length - 1;
    const zoneDone = step.zoneStep === step.zoneSteps - 1 && step.zoneId !== 'final';
    const left = GAME.teams[state.team].circuit.length - step.zoneIndex - 1;
    const subtitle = zoneDone
      ? (left ? `${esc(step.zoneName)} ✓ · encore ${left} zone${left > 1 ? 's' : ''}` : 'Toutes les zones sont faites, cap sur le final !')
      : '';
    $app.innerHTML = `
      ${header()}
      <main class="card success anim">
        <div class="check"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24"/><path d="M15 27 l7 7 l15 -16"/></svg></div>
        <h1 class="display">${zoneDone ? 'Zone terminée !' : 'Bien joué !'}</h1>
        ${subtitle ? `<p class="lead">${subtitle}</p>` : ''}
        <div class="text">${s.text || ''}</div>
        ${imagesHtml(s.images)}
        <button class="btn primary big" data-action="next">${last ? '🏁 Voir le résultat' : 'Continuer ➜'}</button>
      </main>`;
    startTimer();
    if (zoneDone) confetti();
  }

  function badgesHtml(earned) {
    const ids = earned.map((b) => b.id);
    return '<div class="badges">' + E.BADGES.map((b) => `
      <div class="badge ${ids.includes(b.id) ? 'on' : ''}" title="${esc(b.desc)}">
        <span>${b.icon}</span><b>${esc(b.name)}</b><small>${esc(b.desc)}</small>
      </div>`).join('') + '</div>';
  }

  function renderFinished() {
    setTheme(FINAL_COLOR);
    const elapsed = E.elapsedSeconds(state, Date.now());
    const zones = [];
    state.log.forEach((l) => {
      let z = zones.find((x) => x.zone === l.zone);
      if (!z) zones.push(z = { zone: l.zone, name: l.zoneName, sec: 0, hints: 0, skips: 0 });
      z.sec += l.sec;
      z.hints += l.hints;
      if (l.skipped) z.skips++;
    });
    $app.innerHTML = `
      <main class="card finished anim">
        <div class="trophy">🏆</div>
        <h1 class="display">Bravo ${esc(teamName(state.team, state.teamName))} !</h1>
        <p class="lead" id="rank">${leaderboard ? 'Calcul du classement…' : ''}</p>
        <div class="score">
          <div><small>Temps de jeu</small><b>${E.formatDuration(elapsed)}</b></div>
          <div><small>Pénalités</small><b>+${E.formatDuration(state.penalty)}</b></div>
          <div class="total"><small>Temps final</small><b>${E.formatDuration(elapsed + state.penalty)}</b></div>
        </div>
        <h2>Vos badges</h2>
        ${badgesHtml(E.earnedBadges(state, path))}
        <h2>Votre parcours</h2>
        <table class="recap">
          <tr><th>Zone</th><th>Temps</th><th>Indices</th></tr>
          ${zones.map((z) => `<tr><td>${esc(z.name)}${z.skips ? ' 🔑' : ''}</td><td>${E.formatDuration(z.sec)}</td><td>${z.hints}</td></tr>`).join('')}
        </table>
        <div class="text">${S.finalMessage || ''}</div>
        ${leaderboard ? '<button class="btn" data-action="board">🏆 Voir le classement</button>' : ''}
        ${Sync.enabled ? `<button class="btn chat-wide" data-action="chat">${chatButtonContent()} Écrire à l'organisation</button>` : ''}
      </main>`;
    if (leaderboard) {
      loadRanking().then((ranked) => {
        const i = ranked.findIndex((r) => r.team === state.team);
        const el = document.getElementById('rank');
        if (el && i >= 0) el.innerHTML = `Classement provisoire : <b>${i + 1}${i ? 'e' : 're'}</b> sur ${ranked.length}`;
      }).catch(() => {});
    }
  }

  // ---------- classement en direct ----------

  async function loadRanking() {
    const rows = await Sync.loadAll();
    const states = {};
    rows.forEach((r) => { if (r.data && r.data.state) states[r.team] = r.data.state; });
    states[state.team] = state; // toujours la version locale la plus fraîche
    return E.rankTeams(GAME, states, Date.now());
  }

  function showBoard() {
    const s = sheet('<h2>🏆 Classement en direct</h2><div class="board"><p class="help">Chargement…</p></div><button class="btn" data-close>Fermer</button>');
    loadRanking().then((ranked) => {
      const box = s.el.querySelector('.board');
      box.innerHTML = ranked.map((r, i) => {
        const pct = Math.round(r.progress * 100);
        return `<div class="board-row ${r.team === state.team ? 'me' : ''}">
          <span class="rank">${i < 3 ? ['🥇', '🥈', '🥉'][i] : i + 1}</span>
          <span class="avatar">${avatar(r.team)}</span>
          <div class="board-main"><b>${esc(teamName(r.team, r.state.teamName))}</b>
            <div class="bar-mini"><i style="width:${pct}%"></i></div></div>
          <span class="board-time">${r.done ? E.formatDuration(r.total) : pct + ' %'}</span>
        </div>`;
      }).join('') || '<p class="help">Aucune équipe partie.</p>';
    }, () => {
      s.el.querySelector('.board').innerHTML = '<p class="help">Classement indisponible hors connexion.</p>';
    });
  }

  // ---------- tchat avec l'organisation ----------

  const CHAT_MS = 6000;      // vérification des nouveaux messages, fenêtre fermée
  const CHAT_OPEN_MS = 3000; // fenêtre ouverte
  let chat = { team: null, msgs: [], lastId: 0, loaded: false };
  let chatSheet = null;
  let chatTimer = null;

  // Dernier message lu, gardé sur le téléphone (par équipe)
  function readKey() { return STORE + ':lu:' + state.team; }
  function chatUnread() { return state ? E.unreadCount(chat.msgs, Number(localStorage.getItem(readKey())) || 0, 'admin') : 0; }
  function chatIsOpen() { return !!chatSheet && document.body.contains(chatSheet.el); }

  function chatButtonContent() {
    const n = chatUnread();
    return `💬<span id="chat-badge" class="chat-badge" ${n ? '' : 'hidden'}>${n}</span>`;
  }

  function chatButton() {
    return `<button class="pill icon chat-btn" data-action="chat" aria-label="Tchat avec l'organisation">${chatButtonContent()}</button>`;
  }

  function updateChatBadge() {
    const badge = document.getElementById('chat-badge');
    if (!badge) return;
    const n = chatUnread();
    badge.textContent = n;
    badge.hidden = !n;
  }

  function markChatRead() {
    if (chat.msgs.length) localStorage.setItem(readKey(), chat.msgs[chat.msgs.length - 1].id);
    updateChatBadge();
  }

  function timeOf(iso) {
    return new Date(iso).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }

  // fromPoll : messages lus sur le serveur (fait avancer lastId) ; sinon message qu'on vient d'envoyer.
  // Les doublons sont écartés par id : un message envoyé revient aussi à la lecture suivante.
  function addMessages(list, fromPoll) {
    const known = new Set(chat.msgs.map((m) => m.id));
    const fresh = list.filter((m) => !known.has(m.id));
    if (fromPoll) list.forEach((m) => { chat.lastId = Math.max(chat.lastId, m.id); });
    if (!fresh.length) return;
    chat.msgs = chat.msgs.concat(fresh).sort((a, b) => a.id - b.id);
    if (chatIsOpen()) {
      renderChat();
      markChatRead();
      return;
    }
    const incoming = fresh.filter((m) => m.sender === 'admin');
    if (fromPoll && chat.loaded && incoming.length) {
      vibrate([100, 60, 100]);
      toast(`<span class="toast-icon">💬</span><div><b>Message de l'organisation</b><small>${esc(incoming[incoming.length - 1].body.slice(0, 90))}</small></div>`);
    }
    updateChatBadge();
  }

  async function pollChat() {
    clearTimeout(chatTimer);
    if (Sync.enabled && state) {
      const team = state.team;
      if (chat.team !== team) chat = { team, msgs: [], lastId: 0, loaded: false };
      try {
        const list = await Sync.loadMessages(team, chat.lastId);
        if (state && state.team === team) {
          addMessages(list, true);
          chat.loaded = true;
        }
      } catch (e) { /* hors connexion : nouvel essai au prochain tour */ }
    }
    chatTimer = setTimeout(pollChat, chatIsOpen() ? CHAT_OPEN_MS : CHAT_MS);
  }

  function renderChat() {
    const box = chatSheet.el.querySelector('.chat-list');
    box.innerHTML = chat.msgs.map((m) => `
      <div class="msg ${m.sender === 'team' ? 'me' : ''}">
        <p>${esc(m.body)}</p><small>${m.sender === 'admin' ? 'Organisation · ' : ''}${timeOf(m.created_at)}</small>
      </div>`).join('') || '<p class="help">Une question, un souci ? Écrivez ici, l\'organisation vous répond dans cette fenêtre.</p>';
    box.scrollTop = box.scrollHeight;
  }

  async function sendChat(form) {
    const input = form.querySelector('textarea');
    const body = input.value.trim().slice(0, 1000);
    if (!body) return;
    const step = state.startedAt && !state.finishedAt ? current() : null;
    const button = form.querySelector('button');
    const err = form.querySelector('.feedback');
    button.disabled = true;
    try {
      const msg = await Sync.sendMessage({
        team: state.team, sender: 'team', body,
        step: step ? [step.zoneName, step.title].filter(Boolean).join(' · ') : null,
      });
      input.value = '';
      err.textContent = '';
      addMessages([msg], false);
    } catch (e) {
      err.textContent = 'Message non envoyé : vérifiez la connexion et réessayez.';
    }
    button.disabled = false;
  }

  function showChat() {
    chatSheet = sheet(`
      <h2>💬 Organisation</h2>
      <div class="chat-list"></div>
      <form class="chat-form">
        <textarea rows="2" maxlength="1000" placeholder="Votre message…"></textarea>
        <button class="btn primary">Envoyer</button>
        <p class="feedback bad"></p>
      </form>
      <button class="btn" data-close>Fermer</button>`);
    const form = chatSheet.el.querySelector('form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      sendChat(form);
    });
    renderChat();
    markChatRead();
    pollChat();
  }

  // ---------- actions ----------

  function wrongAnswer(el) {
    state.wrong++;
    state.wrongOnStep = (state.wrongOnStep || 0) + 1;
    save();
    cooldownUntil = Date.now() + 2000;
    vibrate([60, 60, 60]);
    feedback('❌ Ce n\'est pas la bonne réponse.', 'bad');
    const input = document.getElementById('answer');
    if (input) restartAnimation(input, 'error');
    if (el) el.classList.add('wrong');
  }

  function submit(value, el) {
    const step = current();
    if (!String(value).trim() || Date.now() < cooldownUntil) return;
    if (E.checkAnswer(value, step, SALT)) return solve(step, false);
    wrongAnswer(el);
  }

  function tap(e, box) {
    const step = current();
    if (Date.now() < cooldownUntil) return;
    const rect = box.getBoundingClientRect();
    if (!rect.width) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const hit = E.hitTarget(x, y, step.target, rect.height / rect.width);
    const mark = document.createElement('span');
    mark.className = 'tap-mark ' + (hit ? 'ok' : 'ko');
    mark.style.left = x + '%';
    mark.style.top = y + '%';
    box.appendChild(mark);
    if (hit) setTimeout(() => solve(step, false), 450);
    else {
      setTimeout(() => mark.remove(), 1500);
      wrongAnswer();
    }
  }

  function solve(step, skipped) {
    if (current().key !== step.key || state.phase !== 'step') return;
    const now = Date.now();
    const before = E.earnedBadges(state, path).map((b) => b.id);
    state.log.push({
      key: step.key, type: step.type, zone: step.zoneId, zoneName: step.zoneName, title: step.title || '',
      at: now, sec: Math.round((now - state.stepStartedAt) / 1000),
      hints: state.hints[step.key] || 0, wrong: state.wrongOnStep || 0, skipped,
    });
    state.wrongOnStep = 0;
    if (state.stepIndex === path.length - 1) state.finishedAt = now;
    if (step.success || step.zoneStep === step.zoneSteps - 1) state.phase = 'success';
    else advance();
    save();
    vibrate(80);
    render();
    E.earnedBadges(state, path).filter((b) => !before.includes(b.id)).forEach((b, i) => {
      setTimeout(() => toast(`<span class="toast-icon">${b.icon}</span><div><b>Badge « ${esc(b.name)} »</b><small>${esc(b.desc)}</small></div>`), 600 + i * 900);
    });
  }

  function advance() {
    if (state.stepIndex >= path.length - 1) {
      state.phase = 'done';
      return;
    }
    state.stepIndex++;
    state.phase = 'step';
    state.stepStartedAt = Date.now();
  }

  async function showHint() {
    const step = current();
    const shown = state.hints[step.key] || 0;
    const cost = E.hintPenalty(GAME, step, shown);
    const ok = await ask({ icon: '💡', title: `Indice ${shown + 1}`, text: `Il ajoute <b>+${minutes(cost)}</b> à votre temps.`, ok: 'Voir l\'indice' });
    if (!ok || current().key !== step.key) return;
    state.hints[step.key] = shown + 1;
    state.hintsTotal++;
    state.penalty += cost;
    save();
    document.getElementById('hints').outerHTML = hintsHtml(step);
    document.querySelector('.top').outerHTML = header(); // affiche la pénalité à côté du chrono
  }

  async function masterCode() {
    const step = current();
    const code = await ask({
      icon: '🔑', title: 'Code organisation', input: 'Code',
      text: `Fait passer cette étape (pénalité <b>+${minutes(S.skipPenalty || 0)}</b>).`, ok: 'Valider',
    });
    if (!code || current().key !== step.key) return;
    if (!E.codeMatches(code, S.masterCode, S.masterHash, SALT)) return feedback('🔑 Code organisation incorrect.', 'bad');
    state.skips++;
    state.penalty += S.skipPenalty || 0;
    solve(step, true);
  }

  function checkGps(step) {
    if (!navigator.geolocation) return feedback('Géolocalisation indisponible : utilisez le code de secours.', 'bad');
    feedback('📡 Recherche de votre position…');
    navigator.geolocation.getCurrentPosition((pos) => {
      const d = E.distance(pos.coords.latitude, pos.coords.longitude, step.lat, step.lng);
      const tolerance = (step.radius || 40) + Math.min(pos.coords.accuracy || 0, 50);
      if (d <= tolerance) solve(step, false);
      else feedback(`Pas encore ! Vous êtes à environ ${Math.round(d)} m du point.`, 'bad');
    }, (err) => {
      feedback(`Position introuvable (${esc(err.message)}). Réessayez à découvert ou utilisez le code de secours.`, 'bad');
    }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 5000 });
  }

  function start() {
    const input = document.getElementById('team-name');
    state.teamName = input ? input.value.trim().slice(0, 30) : '';
    state.startedAt = state.stepStartedAt = Date.now();
    save();
    preloadImages();
    render();
    updatePosition(); // demande l'autorisation au moment du clic sur « C'est parti »
  }

  function zoom(src) {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `<img src="${esc(src)}" alt=""><button class="btn close">✕ Fermer</button>`;
    overlay.addEventListener('click', (e) => { if (e.target.tagName !== 'IMG') overlay.remove(); });
    document.body.appendChild(overlay);
  }

  $app.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const step = state && path && state.startedAt ? current() : null;
    switch (el.dataset.action) {
      case 'pick': setState(newState(el.dataset.team)); save(); render(); break;
      case 'start': start(); break;
      case 'resume': setState(remote); remote = null; save(); preloadImages(); render(); updatePosition(); break;
      case 'continue': solve(step, false); break;
      case 'choose': if (!el.classList.contains('wrong')) submit(el.dataset.value, el); break;
      case 'tap': tap(e, el); break;
      case 'hint': showHint(); break;
      case 'master': masterCode(); break;
      case 'gps': checkGps(step); break;
      case 'board': showBoard(); break;
      case 'chat': showChat(); break;
      case 'next': advance(); save(); render(); break;
      case 'zoom': zoom(el.dataset.src); break;
    }
  });

  $app.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    submit(input.value);
    input.select();
  });

  // ---------- nouvelle partie publiée ----------

  // Si game.js a changé d'id (remise à zéro), on recharge pour repartir sur la nouvelle partie.
  // Uniquement sur le site publié : en local, contenu.js remplace game.js.
  function checkNewGame() {
    if (window.GAME_SOURCE || !/^https?:/.test(location.protocol)) return;
    fetch('game.js', { cache: 'no-store' })
      .then((r) => (r.ok ? r.text() : ''))
      .then((txt) => {
        const m = /"id":\s*"([^"]*)"/.exec(txt);
        if (m && m[1] !== GAME.id) location.reload();
      })
      .catch(() => {});
  }
  document.addEventListener('visibilitychange', () => { if (!document.hidden) checkNewGame(); });
  setInterval(checkNewGame, 60000);

  // ---------- démarrage ----------

  const params = new URLSearchParams(location.search);
  if (params.has('reset') && confirm('Effacer la progression enregistrée sur ce téléphone ?')) {
    localStorage.removeItem(STORE);
    setState(null);
  }
  const urlTeam = params.get('equipe');
  if (urlTeam) {
    if (!GAME.teams[urlTeam]) {
      alert(`Équipe « ${urlTeam} » inconnue.`);
    } else if (!state) {
      setState(newState(urlTeam));
      save();
    } else if (state.team !== urlTeam &&
      confirm(`Ce téléphone joue déjà pour ${teamName(state.team, state.teamName)}.\nPasser à ${teamName(urlTeam)} ? La progression actuelle sera perdue sur ce téléphone.`)) {
      setState(newState(urlTeam));
      save();
    }
  }
  if (state && state.startedAt) pendingScan = params.get('scan');
  if (location.search) history.replaceState(null, '', location.pathname);
  if (state && state.startedAt) preloadImages();
  render();
  pollChat();
  updatePosition();
})();
