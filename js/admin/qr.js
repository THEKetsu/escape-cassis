/* QR codes des équipes (à montrer au briefing). */
(function () {
  const A = window.EscapeAdmin;
  if (!A) return;
  const { GAME, teamIds } = A;
  const { esc } = window.Util;

  function joinUrl() {
    const configured = window.CONFIG && window.CONFIG.publicUrl;
    if (location.protocol.startsWith('http')) return new URL('./', location.href).href;
    return configured && !configured.includes('VOTRE-PSEUDO') ? configured.replace(/\/?$/, '/') : null;
  }

  // Clés des équipes : dans le carnet de réponses (déchiffré avec le code d'accès), jamais dans game.js
  const teamKey = (t) => (A.book && A.book.teamKeys && A.book.teamKeys[t]) || '';
  const teamUrl = (base, t) => base + '?equipe=' + encodeURIComponent(t) + (teamKey(t) ? '&k=' + encodeURIComponent(teamKey(t)) : '');

  // Fenêtre hors de #admin : le dashboard est redessiné chaque seconde
  function showQr() {
    const base = joinUrl();
    const overlay = document.createElement('div');
    overlay.className = 'qr-overlay';
    overlay.innerHTML = `
      <div class="qr-panel">
        <header><h2>📱 Rejoindre le jeu</h2><button data-close>✕ Fermer</button></header>
        ${base && teamIds.some((t) => !teamKey(t)) ? '<p class="err">Clé d\'équipe manquante : ces QR codes ne permettent pas la synchronisation (champ <code>key</code> dans contenu.js, puis node outils/publier.js).</p>' : ''}
        ${base ? `<p class="muted">Le capitaine de chaque équipe scanne son QR code avec l'appareil photo du téléphone. Touchez un code pour l'agrandir.</p>
        <div class="qr-teams">${teamIds.map((t) => `
          <button class="qr-team" data-team="${esc(t)}">
            <b>${esc(GAME.teams[t].name || t)}</b>
            ${window.QR.svg(teamUrl(base, t))}
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

  Object.assign(A, { showQr });
})();
