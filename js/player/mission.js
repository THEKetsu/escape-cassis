/* Récit de la mission : écrans avant le départ (récit, règles) et transition « ZONE VALIDÉE » entre deux zones. */
(function () {
  const A = window.EscapePlayer;
  if (!A) return;
  const { E, GAME, S, $app, FINAL_COLOR } = A;
  const esc = window.Util.esc;

  // Après l'accueil et avant la salle d'attente : le récit (settings.story), puis les règles (settings.rules).
  // Ils se lisent pendant l'attente du départ, donc hors chrono. state.prelude = rang de l'écran affiché (1, 2…).
  function preludeScreens() {
    return [
      S.story && { kind: 'story', button: 'ACCÉDER AUX RÈGLES' },
      S.rules && S.rules.length && { kind: 'rules', button: 'NOUS SOMMES PRÊTS' },
    ].filter(Boolean);
  }

  function storyHtml() {
    return `<p class="mission-kicker">${esc(GAME.title)}</p><div class="text story-text">${S.story}</div>`;
  }

  function rulesHtml() {
    return `<h1 class="display">RÈGLES DE LA MISSION</h1>
      <ol class="mission-rules">${S.rules.map((r) => `<li><b>${esc(r.title)}</b><span>${r.text}</span></li>`).join('')}</ol>
      ${S.rulesNote ? `<p class="help">${S.rulesNote}</p>` : ''}`;
  }

  function renderPrelude() {
    const screen = preludeScreens()[A.state.prelude - 1];
    if (!screen) {
      A.state.prelude = 0;
      return A.render();
    }
    A.setTheme(FINAL_COLOR);
    $app.innerHTML = `
      <main class="card prelude prelude-${screen.kind} anim">
        ${screen.kind === 'story' ? storyHtml() : rulesHtml()}
        <button class="btn primary big" data-action="prelude-next">${esc(screen.button)}</button>
        <button class="link" data-action="prelude-back">${A.icon('undo')} Retour</button>
      </main>`;
  }

  // « COMMENCER LA MISSION » (accueil), puis le bouton de chaque écran : le dernier inscrit l'équipe (salle d'attente)
  function nextPrelude() {
    const input = document.getElementById('team-name');
    if (input) A.state.teamName = input.value.trim().slice(0, 30);
    const step = A.state.prelude || 0;
    if (step >= preludeScreens().length) return A.start();
    A.state.prelude = step + 1;
    A.save();
    A.render();
  }

  function backPrelude() {
    A.state.prelude = Math.max(0, (A.state.prelude || 0) - 1);
    A.save();
    A.render();
  }

  // Destination mise en avant : le nom de la zone, et son « where » s'il apporte une précision (« près de la statue… »)
  function destinationHtml(zone) {
    if (!zone) return '';
    const name = zone.name || '';
    const where = zone.where || '';
    const extra = where && !E.normalize(where).endsWith(E.normalize(name));
    return `<div class="destination"><b>${esc(name)}</b>${extra ? `<small>${esc(where)}</small>` : ''}</div>`;
  }

  // Après la dernière énigme d'une zone (sauf la dernière zone du circuit, suivie de « PARCOURS TERMINÉ ») :
  // progression, courte « analyse », puis la nouvelle destination
  function renderZoneDone(step) {
    const circuit = GAME.teams[A.state.team].circuit;
    const done = step.zoneIndex + 1;
    const next = GAME.zones[circuit[step.zoneIndex + 1]];
    A.setTheme(A.zoneColor(step));
    $app.innerHTML = `
      ${A.header()}
      <main class="card success zone-done anim">
        <div class="check"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24"/><path d="M15 27 l7 7 l15 -16"/></svg></div>
        <h1 class="display">ZONE VALIDÉE</h1>
        <i class="rule"></i>
        <p class="lead">Vous avez terminé cette étape.</p>
        <div class="progress"><div class="progress-bar"><i style="width:${Math.round((done / circuit.length) * 100)}%"></i></div>
          <b>Progression : ${done} / ${circuit.length}</b></div>
        <p class="analysis" id="analysis"><span class="spinner"></span>Analyse du prochain indice…</p>
        <div class="unlock" id="unlock" hidden>
          <p class="unlock-label">Nouvelle destination débloquée</p>
          ${destinationHtml(next)}
          ${A.PrimaryButton('Poursuivre la mission', 'next')}
        </div>
      </main>`;
    A.startTimer();
    A.confetti();
    setTimeout(() => {
      const analysis = document.getElementById('analysis');
      const unlock = document.getElementById('unlock');
      if (!analysis || !unlock) return;
      analysis.hidden = true;
      unlock.hidden = false;
      A.vibrate(60);
    }, 1800);
  }

  $app.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    if (!el || !A.state) return;
    if (el.dataset.action === 'mission' || el.dataset.action === 'prelude-next') nextPrelude();
    if (el.dataset.action === 'prelude-back') backPrelude();
  });

  Object.assign(A, { renderPrelude, renderZoneDone, destinationHtml });
})();
