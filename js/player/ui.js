/* Utilitaires d'affichage et fenêtres : thème, images, fenêtres modales, notifications, confettis. */
(function () {
  const A = window.EscapePlayer;
  if (!A) return;
  const { E, GAME, AVATARS, ZONE_COLORS, FINAL_COLOR } = A;
  const esc = window.Util.esc;

  // ---------- utilitaires ----------

  function teamName(teamId, custom) {
    return custom || GAME.teams[teamId].name || teamId;
  }

  function avatar(teamId) {
    const team = GAME.teams[teamId];
    return team.emoji || AVATARS[Object.keys(GAME.teams).indexOf(teamId) % AVATARS.length];
  }

  function current() {
    return A.path[A.state.stepIndex];
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
    A.path.forEach((step) => E.stepImages(step).forEach((src) => { new Image().src = src; }));
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

  Object.assign(A, {
    teamName, avatar, current, minutes, zoneColor, setTheme, vibrate, imagesHtml, feedback,
    restartAnimation, preloadImages, sheet, ask, toast, confetti,
  });
})();
