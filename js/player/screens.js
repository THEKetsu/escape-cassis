/* Écrans du jeu : accueil, étape, réussite, fin de partie. */
(function () {
  const A = window.EscapePlayer;
  if (!A) return;
  const { E, Sync, GAME, S, $app, FINAL_COLOR, leaderboard, LIVE } = A;
  const esc = window.Util.esc;

  function render() {
    clearInterval(A.tick);
    window.scrollTo(0, 0);
    if (!A.state) return renderNoTeam();
    if (!A.state.startedAt) return renderWelcome();
    if (A.state.phase === 'done') return renderFinished();
    if (A.state.phase === 'success') return renderSuccess(A.current());
    renderStep(A.current());
  }

  function header() {
    const state = A.state;
    const step = A.current();
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
            <span class="avatar">${A.avatar(state.team)}</span>
            <b>${esc(A.teamName(state.team, state.teamName))}</b>
          </div>
          <div class="top-actions">
            <span class="pill"><span id="net" class="net ${A.online === null ? '' : A.online ? 'ok' : 'ko'}"></span><span id="timer">${E.formatDuration(E.elapsedSeconds(state, Date.now()))}</span>
              ${state.penalty ? `<small>+${E.formatDuration(state.penalty)}</small>` : ''}</span>
            ${Sync.enabled ? A.chatButton() : ''}
            ${leaderboard ? '<button class="pill icon" data-action="board" aria-label="Classement">🏆</button>' : ''}
          </div>
        </div>
        <ol class="trail">${trail}</ol>
      </header>`;
  }

  function startTimer() {
    A.tick = setInterval(() => {
      const el = document.getElementById('timer');
      if (el) el.textContent = E.formatDuration(E.elapsedSeconds(A.state, Date.now()));
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
    A.setTheme(FINAL_COLOR);
    const picker = S.teamPicker
      ? '<div class="choices">' + Object.keys(GAME.teams).map((t) =>
        `<button class="btn choice" data-action="pick" data-team="${esc(t)}">${A.avatar(t)} ${esc(A.teamName(t))}</button>`).join('') + '</div>'
      : '';
    $app.innerHTML = `
      <main class="card welcome anim">
        <div class="hero">${HERO}</div>
        <h1 class="display">${esc(GAME.title)}</h1>
        <p class="lead">📷 Scannez le <b>QR code de votre équipe</b> pour commencer.</p>
        ${picker}
        <a class="admin-link" href="admin.html">🧭 Espace organisateur</a>
      </main>`;
  }

  function renderWelcome() {
    const state = A.state;
    A.setTheme(FINAL_COLOR);
    const remote = A.remote;
    const resume = remote && remote.startedAt
      ? `<div class="notice">Cette équipe a déjà une partie en cours (étape ${remote.stepIndex + 1}).
           <button class="btn primary" data-action="resume">↩️ Reprendre la partie</button></div>`
      : '';
    const hintCosts = (S.hintPenalties || []).map(A.minutes).join(' · ');
    $app.innerHTML = `
      <main class="card welcome anim">
        <div class="hero">${HERO}</div>
        <div class="team-badge"><span class="avatar big">${A.avatar(state.team)}</span>${esc(A.teamName(state.team))}</div>
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
    if (Sync.enabled && !A.remote) {
      Sync.teamLoad(state.team, A.teamKey(state.team)).then((row) => {
        const s = row && row.data && row.data.state;
        if (s && s.startedAt && !A.state.startedAt) {
          A.remote = s;
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
    const shown = A.state.hints[step.key] || 0;
    let html = '<section class="hints" id="hints"><h2>Besoin d\'aide ?</h2>';
    for (let i = 0; i < shown; i++) html += `<div class="hint"><span>${i + 1}</span><p>${hints[i]}</p></div>`;
    if (shown < hints.length) {
      html += `<button class="btn hint-btn" data-action="hint">💡 Indice ${shown + 1}/${hints.length}
        <small>+${A.minutes(E.hintPenalty(GAME, step, shown))}</small></button>`;
    }
    return html + '</section>';
  }

  function renderStep(step) {
    A.setTheme(A.zoneColor(step));
    $app.innerHTML = `
      ${header()}
      <main class="card anim">
        <div class="kicker"><span>📍 ${esc(step.zoneName)}</span><span>Énigme ${step.zoneStep + 1}/${step.zoneSteps}</span></div>
        <h1>${esc(step.title || '')}</h1>
        <div class="text">${step.text || ''}</div>
        ${A.imagesHtml(step.images)}
        <div class="interaction">${interactionHtml(step)}</div>
        <p id="feedback" class="feedback" aria-live="polite"></p>
      </main>
      ${hintsHtml(step)}
      <footer class="foot"><button class="link" data-action="master">🔑 Code organisation</button></footer>`;
    startTimer();
    A.push();

    if (A.pendingScan) {
      const code = A.pendingScan;
      A.pendingScan = null;
      if (step.type === 'qr') A.submit(code);
      else A.feedback('Ce QR code ne correspond pas à l\'étape en cours.', 'bad');
    }
  }

  function renderSuccess(step) {
    const state = A.state;
    A.setTheme(A.zoneColor(step));
    const s = step.success || {};
    const last = state.stepIndex === A.path.length - 1;
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
        ${A.imagesHtml(s.images)}
        <button class="btn primary big" data-action="next">${last ? '🏁 Voir le résultat' : 'Continuer ➜'}</button>
      </main>`;
    startTimer();
    if (zoneDone) A.confetti();
  }

  function badgesHtml(earned) {
    const ids = earned.map((b) => b.id);
    return '<div class="badges">' + E.BADGES.map((b) => `
      <div class="badge ${ids.includes(b.id) ? 'on' : ''}" title="${esc(b.desc)}">
        <span>${b.icon}</span><b>${esc(b.name)}</b><small>${esc(b.desc)}</small>
      </div>`).join('') + '</div>';
  }

  function renderFinished() {
    const state = A.state;
    A.setTheme(FINAL_COLOR);
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
        <h1 class="display">Bravo ${esc(A.teamName(state.team, state.teamName))} !</h1>
        <p class="lead" id="rank">${leaderboard ? 'Calcul du classement…' : ''}</p>
        <div class="score">
          <div><small>Temps de jeu</small><b>${E.formatDuration(elapsed)}</b></div>
          <div><small>Pénalités</small><b>+${E.formatDuration(state.penalty)}</b></div>
          <div class="total"><small>Temps final</small><b>${E.formatDuration(elapsed + state.penalty)}</b></div>
        </div>
        <h2>Vos badges</h2>
        ${badgesHtml(E.earnedBadges(state, A.path))}
        <h2>Votre parcours</h2>
        <table class="recap">
          <tr><th>Zone</th><th>Temps</th><th>Indices</th></tr>
          ${zones.map((z) => `<tr><td>${esc(z.name)}${z.skips ? ' 🔑' : ''}</td><td>${E.formatDuration(z.sec)}</td><td>${z.hints}</td></tr>`).join('')}
        </table>
        <div class="text">${S.finalMessage || ''}</div>
        ${leaderboard ? '<button class="btn" data-action="board">🏆 Voir le classement</button>' : ''}
        ${Sync.enabled ? `<button class="btn chat-wide" data-action="chat">${A.chatButtonContent()} Écrire à l'organisation</button>` : ''}
      </main>`;
    if (leaderboard) {
      A.loadRanking().then((ranked) => {
        const i = ranked.findIndex((r) => r.team === A.state.team);
        const el = document.getElementById('rank');
        if (el && i >= 0) el.innerHTML = `Classement provisoire : <b>${i + 1}${i ? 'e' : 're'}</b> sur ${ranked.length}`;
      }).catch(() => {});
    }
  }

  Object.assign(A, { render, header, hintsHtml });
})();
