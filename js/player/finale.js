/*
 * Fin de parcours (phase « done », chrono arrêté par le code d'arrivée) : l'équipe attend au point final,
 * l'organisation lance la mission finale depuis le dashboard (game_session.finale_at), puis énigme commune
 * (final.finale dans contenu.js) et révélation. Sans mission finale définie : les résultats directement.
 */
(function () {
  const A = window.EscapePlayer;
  if (!A) return;
  const { E, Sync, GAME, S, SALT, $app, FINAL_COLOR, leaderboard } = A;
  const esc = window.Util.esc;

  const F = (GAME.final && GAME.final.finale) || null;
  const POLL_MS = 3000;
  const CHECK = '<div class="check"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24"/><path d="M15 27 l7 7 l15 -16"/></svg></div>';
  let timer = null;

  function stopFinale() {
    clearInterval(timer);
    timer = null;
  }

  const numero = () => String(A.state.team).replace(/\D/g, '');

  // ---------- résultats : temps, badges, récapitulatif par zone ----------

  function badgesHtml(earned) {
    const ids = earned.map((b) => b.id);
    return '<div class="badges">' + E.BADGES.map((b) => `
      <div class="badge ${ids.includes(b.id) ? 'on' : ''}" title="${esc(b.desc)}">
        <span>${b.icon}</span><b>${esc(b.name)}</b><small>${esc(b.desc)}</small>
      </div>`).join('') + '</div>';
  }

  function resultsHtml() {
    const state = A.state;
    const elapsed = E.elapsedSeconds(state, Date.now());
    const zones = [];
    state.log.forEach((l) => {
      let z = zones.find((x) => x.zone === l.zone);
      if (!z) zones.push(z = { zone: l.zone, name: l.zoneName, sec: 0, hints: 0, skips: 0 });
      z.sec += l.sec;
      z.hints += l.hints;
      if (l.skipped) z.skips++;
    });
    return `
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
        <tr><th>Lieu</th><th>Temps</th><th>Indices</th></tr>
        ${zones.map((z) => `<tr><td>${esc(z.name)}${z.skips ? ' *' : ''}</td><td>${E.formatDuration(z.sec)}</td><td>${z.hints}</td></tr>`).join('')}
      </table>
      ${leaderboard ? `<button class="btn" data-action="board">${A.icon('trophy')} Voir le classement</button>` : ''}`;
  }

  function loadRank() {
    if (!leaderboard) return;
    A.loadRanking().then((ranked) => {
      const i = ranked.findIndex((r) => r.team === A.state.team);
      const el = document.getElementById('rank');
      if (el && i >= 0) el.innerHTML = `Classement provisoire : <b>${i + 1}${i ? 'e' : 're'}</b> sur ${ranked.length}`;
    }).catch(() => {});
  }

  const chatHtml = () => (Sync.enabled ? `<button class="btn chat-wide" data-action="chat">${A.chatButtonContent()} Écrire à l'organisation</button>` : '');

  // ---------- écrans ----------

  function renderEnd() {
    A.setTheme(FINAL_COLOR);
    const state = A.state;
    if (!F) return renderResults();
    if (!state.finaleAt) return renderWaiting();
    if (!state.finaleStep) return renderBriefing();
    if (state.finaleStep === 1) return renderRiddle();
    renderReveal();
  }

  // Jeu sans mission finale : les résultats, comme avant
  function renderResults() {
    $app.innerHTML = `
      <main class="card finished anim">
        <div class="trophy">${A.icon('trophy')}</div>
        <h1 class="display">Bravo ${esc(A.teamName(A.state.team, A.state.teamName))} !</h1>
        ${resultsHtml()}
        ${S.finalMessage ? `<div class="text">${S.finalMessage}</div>` : ''}
        ${chatHtml()}
      </main>`;
    loadRank();
  }

  // Arrivée au point final : on attend que l'organisation lance la mission finale
  function renderWaiting() {
    $app.innerHTML = `
      <main class="card finished arrived anim">
        ${CHECK}
        <h1 class="display">ÉQUIPE ${esc(numero())} ARRIVÉE</h1>
        <p class="lead">Votre parcours est terminé.</p>
        <p>Gardez votre carte avec vous.</p>
        <p class="mission-alert">ATTENDEZ LES AUTRES ÉQUIPES.</p>
        <p>Le dernier secret ne peut pas encore être révélé.</p>
        <div class="waiting" aria-hidden="true"><i></i><i></i><i></i></div>
        <details class="results"><summary>Votre parcours en chiffres</summary>${resultsHtml()}</details>
        ${chatHtml()}
        <button class="link" data-action="finale-unlock">${A.icon('key')} Lancer la mission finale (code organisation)</button>
      </main>`;
    loadRank();
    if (Sync.enabled) {
      poll();
      timer = setInterval(poll, POLL_MS);
    }
  }

  async function poll() {
    if (!A.state || A.state.phase !== 'done' || A.state.finaleAt) return stopFinale();
    try {
      const at = await Sync.loadFinale();
      if (at && A.state && !A.state.finaleAt) launch(Date.parse(at));
    } catch (e) { /* hors connexion : on réessaie au prochain tour */ }
  }

  function launch(at) {
    stopFinale();
    A.state.finaleAt = at || Date.now();
    A.save();
    A.vibrate([200, 100, 200]);
    A.render();
  }

  // « MISSION FINALE » : débloquée en même temps sur tous les téléphones
  function renderBriefing() {
    $app.innerHTML = `
      <main class="card finale anim">
        <div class="finale-icon">${A.icon('play')}</div>
        <h1 class="display">${esc(F.introTitle || 'MISSION FINALE')}</h1>
        <div class="text">${A.tpl(F.intro || '')}</div>
        <button class="btn primary big" data-action="finale-start">${esc(F.button || 'COMMENCER LA FINALE')}</button>
      </main>`;
  }

  function renderRiddle() {
    $app.innerHTML = `
      ${F.revealPhoto ? `<div class="hero-photo blurred"><img src="${esc(F.revealPhoto)}" alt=""></div>` : ''}
      <main class="card finale-riddle${F.revealPhoto ? ' over-photo' : ''} anim">
        <div class="kicker"><span>Mission finale</span></div>
        <h1>${esc(F.title || '')}</h1>
        <div class="text">${A.tpl(F.text || '')}</div>
        ${A.imagesHtml(F.images)}
        <form class="answer" data-form="finale">
          <input id="answer" type="text" autocomplete="off" autocorrect="off" autocapitalize="characters"
                 spellcheck="false" placeholder="Votre réponse" enterkeyhint="send">
          <button class="btn primary" aria-label="Valider">Valider</button>
        </form>
        <p id="feedback" class="feedback" aria-live="polite"></p>
      </main>`;
  }

  // La révélation reprend le nom saisi ({{reponse}}) : la réponse n'est écrite en clair nulle part dans game.js
  function renderReveal() {
    const reveal = A.tpl(F.reveal || '<h1 class="display">MISSION ACCOMPLIE</h1>')
      .split('{{reponse}}').join(esc(A.state.finaleAnswer || ''));
    $app.innerHTML = `
      ${F.revealPhoto ? `<div class="hero-photo unblur"><img src="${esc(F.revealPhoto)}" alt=""></div>` : ''}
      <main class="card finished reveal${F.revealPhoto ? ' over-photo' : ''} anim">${CHECK}${reveal}</main>
      <section class="card finished anim">
        <h2>Votre parcours en chiffres</h2>
        ${resultsHtml()}
        ${chatHtml()}
      </section>`;
    loadRank();
  }

  function submitFinale(value) {
    if (!String(value).trim() || Date.now() < A.cooldownUntil) return;
    if (E.checkAnswer(value, F, SALT)) {
      A.state.finaleStep = 2;
      A.state.finaleAnswer = String(value).trim().replace(/\s+/g, ' ').toUpperCase().slice(0, 40);
      A.state.finaleSolvedAt = Date.now();
      A.save();
      A.vibrate([80, 60, 80, 60, 200]);
      A.render();
      A.confetti();
      return;
    }
    A.cooldownUntil = Date.now() + 2000;
    A.vibrate([60, 60, 60]);
    A.feedback(A.refusedHtml(F.wrong), 'bad');
    const input = document.getElementById('answer');
    if (input) A.restartAnimation(input, 'error');
  }

  // Lancement de secours (pas de serveur, réseau coupé) : réservé à l'organisation
  async function unlock() {
    const code = await A.ask({
      icon: A.icon('key'), title: 'Mission finale', input: 'Code organisation',
      text: 'Lance la mission finale sur ce téléphone sans attendre le dashboard.', ok: 'Lancer',
    });
    if (!code || !A.state || A.state.finaleAt) return;
    if (!E.codeMatches(code, S.masterCode, S.masterHash, SALT)) return A.toast('<div><b>Code organisation incorrect</b></div>');
    launch(Date.now());
  }

  $app.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    if (!el || !A.state || A.state.phase !== 'done') return;
    if (el.dataset.action === 'finale-unlock') unlock();
    if (el.dataset.action === 'finale-start') {
      A.state.finaleStep = 1;
      A.save();
      A.render();
    }
  });

  $app.addEventListener('submit', (e) => {
    if (e.target.dataset.form !== 'finale') return;
    e.preventDefault();
    const input = e.target.querySelector('input');
    submitFinale(input.value);
    input.select();
  });

  document.addEventListener('visibilitychange', () => { if (!document.hidden && timer) poll(); });

  Object.assign(A, { renderEnd, stopFinale });
})();
