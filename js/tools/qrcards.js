/* Outils : 4. QR codes des équipes, 5. QR codes des checkpoints. */
(function () {
  const T = window.EscapeTools;
  if (!T) return;
  const { GAME, base, esc, qr, urlWarning } = T;

  function teamCards() {
    const cards = Object.keys(GAME.teams).map((t) => {
      const shown = `${base}?equipe=${encodeURIComponent(t)}`;
      const team = GAME.teams[t];
      // la clé de l'équipe est dans le QR code seulement, pas dans l'adresse imprimée en clair
      const url = shown + (team.key ? `&k=${encodeURIComponent(team.key)}` : '');
      return `
        <div class="qr-card">
          <h3>${esc(GAME.title)}</h3>
          <div class="qr-team">${esc(team.name || t)}</div>
          ${qr(url)}
          <p>Capitaine : scannez ce code avec l'appareil photo de votre téléphone.</p>
          <small>${esc(shown)}</small>
        </div>`;
    }).join('');
    const noKey = Object.keys(GAME.teams).filter((t) => !GAME.teams[t].key);
    return `
      <section id="qr-equipes">
        <h2 class="no-print">4. QR codes des équipes <button data-action="print" data-target="qr-equipes">🖨️ Imprimer</button></h2>
        ${urlWarning}
        ${noKey.length ? `<p class="warning no-print">⚠️ Pas de clé (<code>key</code>) pour ${noKey.map(esc).join(', ')} : ces QR codes ne permettent pas la synchronisation avec le dashboard.</p>` : ''}
        <p class="muted no-print">Ces QR codes contiennent la clé secrète de l'équipe : ne les publiez pas. Si un téléphone tombe en panne, un autre membre de l'équipe rescanne le même QR code : il pourra reprendre la partie (avec le dashboard activé).</p>
        <div class="qr-grid">${cards}</div>
      </section>`;
  }

  function checkpointCards() {
    const cards = [];
    Object.keys(GAME.zones).forEach((z) => ['A', 'B'].forEach((v) => (GAME.zones[z][v] || []).forEach((step, i) => {
      if (step.type !== 'qr' || !step.answers) return;
      const code = step.answers[0];
      cards.push(`
        <div class="qr-card">
          ${qr(`${base}?scan=${encodeURIComponent(code)}`)}
          <div class="qr-code">${esc(code)}</div>
          <small class="no-print">Zone ${esc(z)}${v} étape ${i + 1} : ${esc(step.title)}</small>
        </div>`);
    })));
    return `
      <section id="qr-checkpoints">
        <h2 class="no-print">5. QR codes à cacher sur le terrain <button data-action="print" data-target="qr-checkpoints">🖨️ Imprimer</button></h2>
        ${urlWarning}
        <p class="muted no-print">Un par étape de type <code>qr</code>. Le code écrit dessous permet de le saisir à la main.</p>
        <div class="qr-grid">${cards.join('') || '<p class="muted">Aucune étape de type qr.</p>'}</div>
      </section>`;
  }

  T.teamCards = teamCards;
  T.checkpointCards = checkpointCards;
})();
