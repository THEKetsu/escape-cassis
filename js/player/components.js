/* Composants d'affichage réutilisables du joueur (chaînes HTML) : toutes les énigmes passent par eux.
   ZoneBadge, PuzzleHeader, PuzzleCard, PrimaryButton, PhotoChoice, PhotoGrid, AnswerChip, HintCard, SuccessScreen, ErrorScreen. */
(function () {
  const A = window.EscapePlayer;
  if (!A) return;
  const esc = window.Util.esc;

  const ARROW = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const BACK = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>';
  const ICON_MAP = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14"/></svg>';
  const ICON_BOARD = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h10v5a5 5 0 0 1-10 0V4zM7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3M12 14v4M8 20h8"/></svg>';
  const ICON_CHAT = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H9l-5 4V5z"/></svg>';
  const CROSS = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  // Icônes fines (contour), toutes sur la même grille 24 px
  const ICONS = {
    key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M16 7l3 3M14 9l2 2"/>',
    bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14-4L4 9M4 4v5h5M4 13a8 8 0 0 0 14 4l2-2M20 20v-5h-5"/>',
    pin: '<path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    scan: '<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M4 12h16"/>',
    trophy: '<path d="M7 4h10v5a5 5 0 0 1-10 0V4zM7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3M12 14v4M8 20h8"/>',
    chat: '<path d="M4 5h16v11H9l-5 4V5z"/>',
    play: '<circle cx="12" cy="12" r="9"/><path d="M10 8.5l5 3.5-5 3.5z"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    undo: '<path d="M9 14L4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    puzzle: '<path d="M5 9h3a2 2 0 1 1 4 0h3v3a2 2 0 1 1 0 4v3H5z"/>',
    medal: '<circle cx="12" cy="15" r="5"/><path d="M9 3l3 6 3-6"/>',
    touch: '<path d="M9 11V5a1.5 1.5 0 0 1 3 0v5l5 1.5a2 2 0 0 1 1.5 2L18 19a2 2 0 0 1-2 1.5h-4a2 2 0 0 1-1.6-.8L6 14.5a1.5 1.5 0 0 1 2.3-1.8L9 14z"/>',
    flag: '<path d="M5 21V4M5 5h12l-2 4 2 4H5"/>',
    warn: '<path d="M12 4l9 16H3zM12 10v4M12 17v.5"/>',
    gps: '<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="8"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',
    block: '<circle cx="12" cy="12" r="9"/><path d="M6 6l12 12"/>',
    map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14"/>',
    stats: '<path d="M5 20V10M12 20V4M19 20v-7"/>',
  };
  function icon(name) {
    return `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ''}</svg>`;
  }

  // Pastille de zone au-dessus du titre : « ZONE PORT »
  function ZoneBadge(label) {
    return label ? `<p class="zone-badge">${esc(label)}</p>` : '';
  }

  // Badge + titre centré + petit trait corail
  function PuzzleHeader(badge, title) {
    return `<div class="puzzle-header">${ZoneBadge(badge)}${title ? `<h1>${title}</h1>` : ''}<i class="rule"></i></div>`;
  }

  // Photo principale (optionnelle) puis carte blanche qui la chevauche
  function PuzzleCard({ photo, header, body, className, back }) {
    const hero = photo ? `<div class="hero-photo"><img src="${esc(photo)}" alt="">${back ? BackButton(back) : ''}</div>` : '';
    return `${hero}<main class="puzzle-card card${photo ? ' over-photo' : ''} ${className || ''} anim">${header || ''}${body || ''}</main>`;
  }

  // Bouton principal pleine largeur, flèche à droite ; inactif tant qu'aucune réponse n'est choisie
  function PrimaryButton(label, action, opts) {
    const o = opts || {};
    return `<button class="btn primary big" ${action ? `data-action="${action}"` : ''}${o.disabled ? ' disabled' : ''}>${label}${o.noArrow ? '' : ARROW}</button>`;
  }

  // Une photo sélectionnable avec sa pastille A/B/C/D, sans autre texte
  function PhotoChoice(option, index, action) {
    const letter = esc(option.label || String.fromCharCode(65 + index));
    return `<button class="photo-choice" data-action="${action}" data-value="${esc(option.label)}" aria-label="Proposition ${letter}" aria-pressed="false">
      <img src="${esc(option.img)}" alt=""><span class="letter">${letter}</span></button>`;
  }

  function PhotoGrid(options, action) {
    return `<div class="photo-grid">${options.map((o, i) => PhotoChoice(o, i, action)).join('')}</div>`;
  }

  // Réponse saisie (puce), retirable si une action est donnée
  function AnswerChip(text, action, value) {
    return `<span class="chip">${esc(text)}${action ? `<button type="button" class="chip-x" data-action="${action}" data-value="${esc(value == null ? text : value)}" aria-label="Retirer ${esc(text)}">${CROSS}</button>` : ''}</span>`;
  }

  function HintCard(index, html) {
    return `<div class="hint"><span>${index}</span><p>${html}</p></div>`;
  }

  // Écran de réussite : coche, titre, trait, texte, puis le bouton
  function SuccessScreen({ title, text, extra, button }) {
    return `<main class="card success anim">
      <div class="check"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24"/><path d="M15 27 l7 7 l15 -16"/></svg></div>
      <h1 class="display">${title}</h1>
      <i class="rule"></i>
      <div class="text">${text}</div>${extra || ''}${button || ''}</main>`;
  }

  // Mauvaise réponse : « ACCÈS REFUSÉ » puis l'aide propre à l'énigme
  function ErrorScreen(html) {
    return `<div class="refused"><b>Accès refusé</b><p>${html}</p></div>`;
  }

  function BackButton(action) {
    return `<button class="back-btn" data-action="${action}" aria-label="Retour">${BACK}</button>`;
  }

  Object.assign(A, { ZoneBadge, PuzzleHeader, PuzzleCard, PrimaryButton, PhotoChoice, PhotoGrid, AnswerChip, HintCard, SuccessScreen, ErrorScreen, BackButton, ICON_ARROW: ARROW, ICON_MAP, ICON_BOARD, ICON_CHAT, icon });
})();
