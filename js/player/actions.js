/* Actions du joueur : réponses, indices, GPS, démarrage, et délégation des clics sur l'application. */
(function () {
  const A = window.EscapePlayer;
  if (!A) return;
  const { E, GAME, S, SALT, $app } = A;
  const esc = window.Util.esc;

  function wrongAnswer(el) {
    A.state.wrong++;
    A.state.wrongOnStep = (A.state.wrongOnStep || 0) + 1;
    A.save();
    A.cooldownUntil = Date.now() + 2000;
    A.vibrate([60, 60, 60]);
    A.feedback(A.current().wrong || '❌ Ce n\'est pas la bonne réponse.', 'bad');
    const input = document.getElementById('answer');
    if (input) A.restartAnimation(input, 'error');
    if (el) el.classList.add('wrong');
  }

  function submit(value, el) {
    const step = A.current();
    if (!String(value).trim() || Date.now() < A.cooldownUntil) return;
    if (E.checkAnswer(value, step, SALT)) return solve(step, false);
    wrongAnswer(el);
  }

  // Choix multiple : les options cochées, dans l'ordre des options (pas celui des clics), séparées par " + "
  function validateMulti(step) {
    const picked = [...$app.querySelectorAll('.choice.selected')].map((b) => b.dataset.value);
    if (picked.length !== step.count) return A.feedback(`Cochez exactement ${step.count} réponses.`, 'bad');
    submit(picked.join(' + '));
  }

  // Classement : chaque proposition touchée reçoit son rang (1, 2, 3…) ; la retirer renumérote les suivantes
  function orderPick(el) {
    const buttons = [...$app.querySelectorAll('.choice[data-value]')];
    const rank = Number(el.dataset.rank || 0);
    if (rank) {
      delete el.dataset.rank;
      buttons.forEach((b) => { if (Number(b.dataset.rank) > rank) b.dataset.rank = Number(b.dataset.rank) - 1; });
    } else {
      el.dataset.rank = buttons.filter((b) => b.dataset.rank).length + 1;
    }
    buttons.forEach((b) => {
      b.classList.toggle('selected', !!b.dataset.rank);
      b.querySelector('.letter').textContent = b.dataset.rank || '';
    });
  }

  function validateOrder(step) {
    const picked = [...$app.querySelectorAll('.choice[data-rank]')].sort((a, b) => a.dataset.rank - b.dataset.rank);
    if (picked.length !== step.options.length) return A.feedback('Placez les ' + step.options.length + ' éléments dans l\'ordre.', 'bad');
    submit(picked.map((b) => b.dataset.value).join(' + '));
  }

  function tap(e, box) {
    const step = A.current();
    if (Date.now() < A.cooldownUntil) return;
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
    const state = A.state;
    if (A.current().key !== step.key || state.phase !== 'step') return;
    const now = Date.now();
    const before = E.earnedBadges(state, A.path).map((b) => b.id);
    state.log.push({
      key: step.key, type: step.type, zone: step.zoneId, zoneName: step.zoneName, title: step.title || '',
      at: now, sec: Math.round((now - state.stepStartedAt) / 1000),
      hints: state.hints[step.key] || 0, wrong: state.wrongOnStep || 0, skipped,
    });
    state.wrongOnStep = 0;
    if (state.stepIndex === A.path.length - 1) state.finishedAt = now;
    if (step.success || step.zoneStep === step.zoneSteps - 1) state.phase = 'success';
    else advance();
    A.save();
    A.vibrate(80);
    A.render();
    E.earnedBadges(state, A.path).filter((b) => !before.includes(b.id)).forEach((b, i) => {
      setTimeout(() => A.toast(`<span class="toast-icon">${b.icon}</span><div><b>Badge « ${esc(b.name)} »</b><small>${esc(b.desc)}</small></div>`), 600 + i * 900);
    });
  }

  function advance() {
    const state = A.state;
    if (state.stepIndex >= A.path.length - 1) {
      state.phase = 'done';
      return;
    }
    state.stepIndex++;
    state.phase = 'step';
    state.stepStartedAt = Date.now();
  }

  async function showHint() {
    const step = A.current();
    const shown = A.state.hints[step.key] || 0;
    const cost = E.hintPenalty(GAME, step, shown);
    const ok = await A.ask({ icon: '💡', title: `Indice ${shown + 1}`, text: `Il ajoute <b>+${A.minutes(cost)}</b> à votre temps.`, ok: 'Voir l\'indice' });
    if (!ok || A.current().key !== step.key) return;
    A.state.hints[step.key] = shown + 1;
    A.state.hintsTotal++;
    A.state.penalty += cost;
    A.save();
    document.getElementById('hints').outerHTML = A.hintsHtml(step);
    document.querySelector('.top').outerHTML = A.header(); // affiche la pénalité à côté du chrono
  }

  async function masterCode() {
    const step = A.current();
    const code = await A.ask({
      icon: '🔑', title: 'Code organisation', input: 'Code',
      text: `Fait passer cette étape (pénalité <b>+${A.minutes(S.skipPenalty || 0)}</b>).`, ok: 'Valider',
    });
    if (!code || A.current().key !== step.key) return;
    if (!E.codeMatches(code, S.masterCode, S.masterHash, SALT)) return A.feedback('🔑 Code organisation incorrect.', 'bad');
    A.state.skips++;
    A.state.penalty += S.skipPenalty || 0;
    solve(step, true);
  }

  // Reprise forcée d'une équipe encore en jeu ailleurs : réservée à l'organisation
  async function unlock() {
    const code = await A.ask({
      icon: '🔑', title: 'Code organisation', input: 'Code',
      text: 'Reprendre cette équipe sur ce téléphone. L\'autre téléphone ne doit plus jouer.', ok: 'Valider',
    });
    if (!code) return;
    if (!E.codeMatches(code, S.masterCode, S.masterHash, SALT)) return A.toast('<div><b>🔑 Code organisation incorrect</b></div>');
    A.remoteLive = false;
    A.render();
  }

  function checkGps(step) {
    if (!navigator.geolocation) return A.feedback('Géolocalisation indisponible : utilisez le code de secours.', 'bad');
    A.feedback('📡 Recherche de votre position…');
    navigator.geolocation.getCurrentPosition((pos) => {
      const d = E.distance(pos.coords.latitude, pos.coords.longitude, step.lat, step.lng);
      const tolerance = (step.radius || 40) + Math.min(pos.coords.accuracy || 0, 50);
      if (d <= tolerance) solve(step, false);
      else A.feedback(`Pas encore ! Vous êtes à environ ${Math.round(d)} m du point.`, 'bad');
    }, (err) => {
      A.feedback(`Position introuvable (${esc(err.message)}). Réessayez à découvert ou utilisez le code de secours.`, 'bad');
    }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 5000 });
  }

  function start() {
    const input = document.getElementById('team-name');
    A.state.teamName = input ? input.value.trim().slice(0, 30) : '';
    A.state.startedAt = A.state.stepStartedAt = Date.now();
    A.save();
    A.preloadImages();
    A.render();
    A.updatePosition(); // demande l'autorisation au moment du clic sur « C'est parti »
  }

  function zoom(src) {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `<p class="zoom-hint">Touchez l'image pour l'agrandir ou la réduire</p><img src="${esc(src)}" alt=""><button class="btn close">✕ Fermer</button>`;
    // un touché sur l'image alterne entre « à la largeur de l'écran » et « grande, à faire défiler » (grilles, plans)
    overlay.addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG') overlay.classList.toggle('wide');
      else overlay.remove();
    });
    document.body.appendChild(overlay);
  }

  A.submit = submit; // appelé par l'écran d'étape pour un QR scanné

  $app.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const step = A.state && A.path && A.state.startedAt ? A.current() : null;
    switch (el.dataset.action) {
      case 'pick': A.setState(A.newState(el.dataset.team)); A.save(); A.render(); break;
      case 'start': start(); break;
      case 'unlock': unlock(); break;
      case 'resume': A.setState(A.remote); A.remote = null; A.save(); A.preloadImages(); A.render(); A.updatePosition(); break;
      case 'continue': solve(step, false); break;
      case 'order-pick': orderPick(el); break;
      case 'validate-order': validateOrder(step); break;
      case 'toggle': el.classList.toggle('selected'); el.setAttribute('aria-pressed', el.classList.contains('selected')); break;
      case 'validate-multi': validateMulti(step); break;
      case 'choose': if (!el.classList.contains('wrong')) submit(el.dataset.value, el); break;
      case 'tap': tap(e, el); break;
      case 'hint': showHint(); break;
      case 'master': masterCode(); break;
      case 'gps': checkGps(step); break;
      case 'board': A.showBoard(); break;
      case 'chat': A.showChat(); break;
      case 'next': advance(); A.save(); A.render(); break;
      case 'zoom': zoom(el.dataset.src); break;
    }
  });

  $app.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    submit(input.value);
    input.select();
  });
})();
