/* Carte du joueur : les lieux apparaissent au fil des énigmes résolues (voir Engine.revealedZones). */
(function () {
  const A = window.EscapePlayer;
  if (!A) return;
  const { E, GAME, $app } = A;
  const esc = window.Util.esc;

  // Cadre en pixels de tuile (format portrait, adapté au téléphone)
  const W = 900;
  const H = 1100;
  const pct = (v, total) => (v / total * 100).toFixed(3) + '%';
  const LABEL = { done: 'visité', current: 'vous jouez ici', next: 'prochaine destination' };

  function mapHtml() {
    const state = A.state;
    const zones = E.revealedZones(GAME, state.team, A.path, state)
      .map((z) => Object.assign({ point: E.zonePoint(GAME, z.id) }, z)).filter((z) => z.point);
    const pos = state.pos && Date.now() - state.pos.at < E.LIVE_MAX_AGE ? state.pos : null;
    if (!zones.length && !pos) return '<p class="pmap-empty">Aucun lieu à afficher pour l\'instant : la carte se remplit au fil de vos énigmes résolues.</p>';
    const view = E.mapView(zones.map((z) => z.point).concat(pos ? [pos] : []), W, H, { padding: 110, maxZoom: 17 });
    const at = (p) => { const q = view.project(p); return `left:${pct(q.x, W)};top:${pct(q.y, H)}`; };
    const tiles = view.tiles.map((t) => `<img alt="" src="https://tile.openstreetmap.org/${t.z}/${t.x}/${t.y}.png"
      style="left:${pct(t.left, W)};top:${pct(t.top, H)};width:calc(${pct(256, W)} + 1px);height:calc(${pct(256, H)} + 1px)">`).join('');
    const accuracy = pos && pos.acc ? `<span class="pmap-acc" style="${at(pos)};width:${pct(2 * pos.acc / view.metersPerPixel(pos.lat), W)};aspect-ratio:1"></span>` : '';
    const pins = zones.map((z) => {
      const name = z.id === 'final' ? (GAME.final.name || 'Final') : GAME.zones[z.id].name;
      return `<div class="pmap-pin ${z.status}" style="${at(z.point)}">
        <b>${z.id === 'final' ? '🏁' : z.status === 'done' ? '✓' : esc(z.id)}</b><small>${esc(name)}</small><i>${LABEL[z.status]}</i></div>`;
    }).join('');
    return `<div class="pmap-frame" style="aspect-ratio:${W} / ${H}">
        <div class="pmap-tiles">${tiles}</div>${accuracy}${pins}
        ${pos ? `<span class="pmap-me" style="${at(pos)}" title="Votre position"></span>` : ''}
        <a class="pmap-credit" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">© OpenStreetMap</a>
      </div>
      <p class="pmap-hint">${pos ? '🔵 Votre position (GPS du téléphone). ' : ''}Les lieux apparaissent au fil de vos énigmes résolues.</p>`;
  }

  function showMap() {
    if (!A.state || !A.path || !A.state.startedAt) return;
    const overlay = document.createElement('div');
    overlay.className = 'overlay pmap';
    overlay.innerHTML = `<div class="pmap-card"><header><b>🗺️ Carte</b><button class="btn close">✕ Fermer</button></header>${mapHtml()}</div>`;
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.closest('.close')) overlay.remove();
    });
    document.body.appendChild(overlay);
  }

  $app.addEventListener('click', (e) => {
    if (e.target.closest('[data-action="map"]')) showMap();
  });

  Object.assign(A, { showMap });
})();
