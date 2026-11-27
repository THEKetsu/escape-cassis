/* Écrans du jeu : accueil, lancement, étape, réussite. Récit, règles et transition de zone : mission.js ; fin de partie : finale.js. */
(function () {
  const A = window.EscapePlayer;
  if (!A) return;
  const { E, Sync, GAME, S, $app, FINAL_COLOR, leaderboard, LIVE, TAKEOVER_MS } = A;
  const esc = window.Util.esc;

  // Gabarit : {{equipe}} devient le nom de l'équipe dans le jeu (« Équipe 1 »), {{numero}} son numéro (enveloppes nominatives)
  const tpl = (html) => String(html || '')
    .split('{{equipe}}').join(esc(GAME.teams[A.state.team].name || A.state.team))
    .split('{{numero}}').join(esc(String(A.state.team).replace(/\D/g, '')));

  function render() {
    clearInterval(A.tick);
    if (A.stopLobby) A.stopLobby();
    if (A.stopFinale) A.stopFinale();
    window.scrollTo(0, 0);
    if (!A.state) return renderNoTeam();
    if (!A.state.startedAt) {
      if (A.state.joined) return A.renderLobby();
      return A.state.prelude ? A.renderPrelude() : renderWelcome();
    }
    if (A.state.phase === 'done') return A.renderEnd();
    if (A.state.phase === 'success') return A.state.transition ? A.renderZoneDone(A.current()) : renderSuccess(A.current());
    if (briefingLeft()) return renderBriefing();
    renderStep(A.current());
  }

  // Avant la première énigme : les consignes éventuelles (settings.briefing), puis le lancement propre à l'équipe
  // (« ÉQUIPE 3 », sa première zone, le nombre de zones à valider)
  function briefingScreens() {
    const circuit = GAME.teams[A.state.team].circuit;
    const first = GAME.zones[circuit[0]];
    return [
      S.briefing && { title: 'Votre mission', text: S.briefing, button: 'C\'est compris' },
      first && {
        photo: (A.path[0] && A.path[0].photo) || first.photo,
        title: 'ÉQUIPE {{numero}}',
        text: `<p class="lead">Votre parcours vient d'être activé.</p>
          <p>Vous devez maintenant rejoindre votre premier lieu :</p>${A.destinationHtml(first, true)}
          <p><b>${circuit.length} lieux à valider.</b></p><p class="mission-go">Votre temps commence maintenant.</p>`,
        button: 'LANCER LA MISSION',
      },
    ].filter(Boolean);
  }

  // Écrans de départ pas encore vus (seulement tant que la première énigme n'est pas commencée)
  function briefingLeft() {
    const state = A.state;
    if (state.stepIndex !== 0 || state.phase !== 'step' || state.log.length) return 0;
    return Math.max(0, briefingScreens().length - (state.briefing || 0));
  }

  function renderBriefing() {
    const screen = briefingScreens()[A.state.briefing || 0];
    A.setTheme(A.zoneColor(A.current()));
    $app.innerHTML = `
      ${header()}
      ${screen.photo ? `<div class="hero-photo"><img src="${esc(screen.photo)}" alt=""></div>` : ''}
      <main class="card launch${screen.photo ? ' over-photo' : ''} anim">
        <h1 class="display">${tpl(esc(screen.title))}</h1>
        <div class="text">${tpl(screen.text)}</div>
        <button class="btn primary big" data-action="briefing-next">${esc(screen.button)}</button>
      </main>`;
    startTimer();
    A.push();
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
      // rang dans le circuit (1, 2, 3…), ni le numéro réel de la zone ni sa variante : le dashboard les montre
      const label = i === circuit.length ? A.icon('flag') : String(i + 1);
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
            <button class="pill icon" data-action="map" aria-label="Carte">${A.ICON_MAP}</button>
            <button class="pill icon" data-action="textsize" aria-label="Taille du texte">Aa</button>
            ${Sync.enabled ? A.chatButton() : ''}
            ${leaderboard ? `<button class="pill icon" data-action="board" aria-label="Classement">${A.ICON_BOARD}</button>` : ''}
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
        ${S.tagline ? `<p class="tagline">${esc(S.tagline)}</p>` : ''}
        <p class="lead">Scannez le <b>QR code de votre équipe</b> pour commencer.</p>
        ${picker}
        <a class="admin-link" href="admin.html">${A.icon('compass')} Espace organisateur</a>
      </main>`;
  }

  function renderWelcome() {
    const state = A.state;
    A.setTheme(FINAL_COLOR);
    const remote = A.remote;
    // Une partie est déjà enregistrée pour cette équipe : on la reprend (pas de nouvelle partie par-dessus).
    // Si un autre téléphone l'a mise à jour il y a moins d'une minute et demie, il joue encore : reprise refusée
    // sauf avec le code organisation.
    const resume = remote && remote.startedAt
      ? (A.remoteLive
        ? `<div class="notice">${A.icon('block')} Cette équipe est déjà en jeu sur un autre téléphone.
             <small>Un seul téléphone par équipe. Si l'autre téléphone est hors service, attendez 1 min 30 ou demandez à l'organisation.</small>
             <button class="btn" data-action="unlock">${A.icon('key')} Code organisation</button></div>`
        : `<div class="notice">Cette équipe a déjà une partie en cours (étape ${remote.stepIndex + 1}).
             <button class="btn primary" data-action="resume">${A.icon('undo')} Reprendre la partie</button></div>`)
      : '';
    const hintCosts = (S.hintPenalties || []).map(A.minutes).join(' · ');
    $app.innerHTML = `
      <main class="card welcome anim">
        <div class="hero">${HERO}<button class="textsize-btn" data-action="textsize" aria-label="Taille du texte">Aa</button></div>
        <div class="team-badge"><span class="avatar big" id="my-avatar">${A.avatar(state.team)}</span>${esc(A.teamName(state.team))}</div>
        <h1 class="display">${esc(GAME.title)}</h1>
        ${S.tagline ? `<p class="tagline">${esc(S.tagline)}</p>` : ''}
        ${resume}
        ${S.intro ? `<div class="text">${S.intro}</div>` : ''}
        <details class="how">
          <summary>Comment ça marche ?</summary>
          <div class="tiles">
            <div><span>${A.icon('puzzle')}</span><b>Énigmes</b><small>une à la fois, sur place</small></div>
            <div><span>${A.icon('bulb')}</span><b>Indices</b><small>${hintCosts ? '+' + hintCosts : 'disponibles'}</small></div>
            <div><span>${A.icon('medal')}</span><b>Badges</b><small>vitesse, sans faute…</small></div>
            <div><span>${A.icon('trophy')}</span><b>Classement</b><small>temps + pénalités</small></div>
          </div>
        </details>
        <label class="field">Nom de votre équipe
          <input id="team-name" maxlength="30" autocomplete="off" placeholder="Les Calanques Express" value="${esc(state.teamName || '')}">
        </label>
        <div class="field">Votre emoji
          <div class="emoji-pick">${A.EMOJIS.map((e) => `<button type="button" class="emoji ${e === A.avatar(state.team) ? 'on' : ''}" data-action="emoji" data-emoji="${e}" aria-label="Choisir ${e}">${e}</button>`).join('')}</div>
        </div>
        ${LIVE ? '<p class="help">Pendant la partie, la position du téléphone est partagée avec l\'organisation pour vous suivre sur sa carte. Acceptez la localisation quand le téléphone la demande.</p>' : ''}
        ${remote && remote.startedAt ? '' : '<button class="btn primary big" data-action="mission">COMMENCER LA MISSION</button>'}
        <p class="credits">${S.credits ? esc(S.credits) + ' · ' : ''}version ${esc(A.VERSION)} · <button class="link" data-action="reset-phone">réinitialiser</button></p>
      </main>`;
    if (Sync.enabled && !A.remote) {
      Sync.loadTeam(state.team).then((row) => {
        const s = row && row.data && row.data.state;
        if (s && s.startedAt && !A.state.startedAt) {
          A.remote = s;
          A.remoteLive = !!s.device && s.device !== A.deviceId && Date.now() - Date.parse(row.updated_at) < TAKEOVER_MS;
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
      case 'multi':
        return `<p class="help">Cochez exactement ${step.count} réponses.</p><div class="choices">` + step.options.map((o, i) =>
          `<button class="btn choice" data-action="toggle" data-value="${esc(o)}" aria-pressed="false"><span class="letter">${String.fromCharCode(65 + i)}</span>${esc(o)}</button>`).join('') +
          '</div><button class="btn primary big" data-action="validate-multi">Valider</button>';
      case 'order':
        return '<p class="help">Touchez les éléments dans l\'ordre, du premier au dernier. Touchez un élément choisi pour le retirer.</p><div class="choices">' +
          step.options.map((o) => `<button class="btn choice" data-action="order-pick" data-value="${esc(o)}"><span class="letter"></span>${esc(o)}</button>`).join('') +
          '</div><button class="btn primary big" data-action="validate-order">Valider l\'ordre</button>';
      case 'zip':
        return A.zipHtml(step);
      case 'image-choice':
        return A.PhotoGrid(step.options, 'pick-image') + A.PrimaryButton('Valider', 'validate-image', { disabled: true });
      case 'qr':
        return '<div class="scan-hint"><span>'+A.icon('scan')+'</span>Ouvrez l\'appareil photo du téléphone et visez le QR code.</div>' +
          form('text', 'ou tapez le code inscrit dessous');
      case 'gps':
        return '<button class="btn primary big" data-action="gps">'+A.icon('gps')+' Vérifier notre position</button>' +
          ((step.answers || step.h) ? '<details class="fallback"><summary>Le GPS ne marche pas ?</summary>' +
            form('text', 'Code de secours') + '</details>' : '');
      case 'text':
        return step.oneByOne ? oneByOneHtml(step, form) : form('text', 'Votre réponse');
      case 'tap':
        return `<div class="tap" data-action="tap"><img src="${esc(step.image)}" alt="Touchez la bonne zone"></div>
          <p class="help">Touchez l'image à l'endroit choisi.</p>`;
      default:
        return form('text', 'Votre réponse');
    }
  }

  // Une réponse à la fois : les réponses trouvées (coche verte), puis la saisie de la suivante
  function oneByOneHtml(step, form) {
    const found = (A.state.found && A.state.found[step.key]) || [];
    const need = step.atLeast || (step.groups || step.gh || []).length;
    const chips = found.length ? found.map((f) => A.AnswerChip(f.text)).join('') : '<span class="answers-empty">Aucune réponse pour le moment</span>';
    return `<section class="answers-box"><h2>Vos réponses</h2><div class="chips">${chips}</div>
      <p class="answers-count">${found.length}/${need}</p></section>${form('text', `Réponse ${Math.min(found.length + 1, need)} sur ${need}`)}`;
  }

  function hintsHtml(step) {
    const hints = step.hints || [];
    if (!hints.length) return '';
    const shown = A.state.hints[step.key] || 0;
    let html = '<section class="hints" id="hints"><h2>Besoin d\'aide ?</h2>';
    for (let i = 0; i < shown; i++) html += A.HintCard(i + 1, hints[i]);
    if (shown < hints.length) {
      html += `<button class="btn hint-btn" data-action="hint">Indice ${shown + 1}/${hints.length}
        <small>+${A.minutes(E.hintPenalty(GAME, step, shown))}</small></button>`;
    }
    return html + '</section>';
  }

  function renderStep(step) {
    A.setTheme(A.zoneColor(step));
    $app.innerHTML = `
      ${header()}
      ${A.PuzzleCard({
        photo: step.photo || (GAME.zones[step.zoneId] || {}).photo,
        back: A.state.stepIndex > 0 ? 'review' : '',
        header: A.PuzzleHeader(step.zoneId === 'final' ? 'Point final' : `Lieu ${(GAME.zones[step.zoneId] || {}).badge || step.zoneName}`, esc(step.title || '')),
        body: `<div class="text">${tpl(step.text)}</div>
          ${A.imagesHtml(step.images)}
          <div class="interaction">${interactionHtml(step)}</div>
          <p id="feedback" class="feedback" aria-live="polite"></p>`,
      })}
      ${hintsHtml(step)}
      <footer class="foot"><button class="link" data-action="master">${A.icon('key')} Code organisation</button>${A.state.stepIndex > 0 ? `<button class="link" data-action="review">${A.icon('undo')} Revoir l'étape précédente</button>` : ''}<p class="credits">version ${esc(A.VERSION)} · <button class="link" data-action="reset-phone">réinitialiser</button></p></footer>`;
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
    const last = state.stepIndex === A.path.length - 1;
    const zoneDone = step.zoneStep === step.zoneSteps - 1 && step.zoneId !== 'final';
    const circuit = GAME.teams[state.team].circuit;
    // Dernière zone du circuit de l'équipe : écran propre à la zone (« rendez-vous à la finale »), au lieu d'annoncer un lieu déjà visité
    const lastZone = zoneDone && step.zoneIndex === circuit.length - 1;
    const s = lastZone && GAME.zones[step.zoneId].lastSuccess ? GAME.zones[step.zoneId].lastSuccess : (step.success || {});
    // la destination suivante n'est pas annoncée ici : l'écran « ZONE VALIDÉE » qui suit s'en charge (mission.js)
    $app.innerHTML = `
      ${header()}
      ${A.SuccessScreen({
        photo: s.photo,
        title: s.title ? s.title.replace(/^\s*✅\s*/u, '') : 'ÉTAPE VALIDÉE',
        text: tpl(s.text),
        extra: (step.type === 'zip' && state.zipLetters ? `<p class="zip-found">Lettres rencontrées : <b>${esc(state.zipLetters.split('').join(' '))}</b></p>` : '') +
          (s.reveal ? `<p>Votre prochaine destination :</p><p class="big-code">${esc(s.reveal)}</p>` : '') + A.imagesHtml(s.images),
        button: A.PrimaryButton(s.button ? esc(s.button) : last ? 'Voir le résultat' : 'Continuer', 'next'),
      })}`;
    startTimer();
    if (zoneDone) A.confetti();
  }

  A.tpl = tpl;
  Object.assign(A, { render, header, hintsHtml, briefingLeft, startTimer });
})();
