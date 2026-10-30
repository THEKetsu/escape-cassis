/*
 * Outils de préparation (à ouvrir en local, à côté de contenu.js).
 * Contexte partagé : window.EscapeTools, créé seulement si contenu.js est chargé.
 */
(function () {
  const GAME = window.GAME_SOURCE;
  const CONFIG = window.CONFIG || {};
  const $c = document.getElementById('content');

  if (!GAME) {
    $c.innerHTML = '<p class="leak">contenu.js introuvable : ouvrez cette page depuis le dossier du jeu, sur votre ordinateur.</p>';
    return;
  }

  const base = (CONFIG.publicUrl || '').replace(/\/?$/, '/');
  const urlConfigured = base && !base.includes('VOTRE-PSEUDO');

  // QR code généré localement (js/shared/qrcode.js) : aucun service externe, les codes ne sortent pas du poste
  function qr(data) {
    return `<div class="qr-img">${window.QR.svg(data)}</div>`;
  }

  const urlWarning = urlConfigured ? '' :
    '<p class="warning no-print">⚠️ <code>publicUrl</code> n\'est pas renseignée dans config.js : ces QR codes pointent vers une adresse d\'exemple et ne fonctionneront pas.</p>';

  window.EscapeTools = { E: window.Engine, GAME, $c, base, urlConfigured, esc: window.Util.esc, qr, urlWarning };
})();
