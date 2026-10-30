/* Carte : tuiles OpenStreetMap, zoom et position des équipes. */
(function () {
  const A = window.EscapeAdmin;
  if (!A) return;
  const { E, GAME, S, STATUS } = A;
  const { esc } = window.Util;

  // Cadre en pixels de tuile : un peu plus grand que l'écran, pour zoomer au plus près sans flou
  const MAP_W = 1500;
  const MAP_H = 900;
  const zonePoints = Object.keys(GAME.zones).concat('final')
    .map((z) => ({ id: z, point: E.zonePoint(GAME, z) })).filter((z) => z.point);
  // Sur grand écran, la liste des équipes est posée sur la gauche de la carte : on centre à côté
  const MAP_LEFT = window.innerWidth > 900 ? 340 : 0;
  const fitView = E.mapView(zonePoints.map((z) => z.point), MAP_W, MAP_H, { left: MAP_LEFT });
  let view = fitView;
  let mapZoom = 0;        // décalage choisi avec les boutons + / −
  const pct = (v, total) => (v / total * 100).toFixed(3) + '%';
  let tilesEl = null;

  function zoomMap(delta) {
    if (!fitView) return;
    mapZoom = delta ? Math.max(-2, Math.min(2, mapZoom + delta)) : 0;
    view = E.mapView(zonePoints.map((z) => z.point), MAP_W, MAP_H, { zoom: fitView.zoom + mapZoom, left: MAP_LEFT });
    A.render();
  }

  // Tuiles OpenStreetMap (gratuites, sans clé ; les couleurs sont adoucies en CSS).
  // Créées une fois par niveau de zoom : render() tourne chaque seconde et ne doit pas les recharger.
  function tiles() {
    if (!tilesEl || tilesEl.dataset.zoom !== String(view.zoom)) {
      tilesEl = document.createElement('div');
      tilesEl.className = 'map-tiles';
      tilesEl.dataset.zoom = view.zoom;
      tilesEl.innerHTML = view.tiles.map((t) => `<img alt="" src="https://tile.openstreetmap.org/${t.z}/${t.x}/${t.y}.png"
        style="left:${pct(t.left, MAP_W)};top:${pct(t.top, MAP_H)};width:calc(${pct(256, MAP_W)} + 1px);height:calc(${pct(256, MAP_H)} + 1px)">`).join('');
    }
    return tilesEl;
  }

  // Où en est l'équipe, en une ligne (liste de la carte et infobulles)
  function whereText(info, loc) {
    if (!info.st || !info.st.startedAt) return info.status === 'registered' ? 'prête au départ' : 'pas encore partie';
    if (info.st.finishedAt) return 'arrivée 🏁';
    const where = loc && loc.enRoute ? `vers ${info.step.zoneName}` : info.step.zoneName;
    const age = loc && loc.live ? ` · GPS ${Math.max(0, Math.round((Date.now() - loc.at) / 1000))} s` : '';
    return where + age;
  }

  function map(infos) {
    if (!view) return '<p class="muted">Ajoutez <code>lat</code> et <code>lng</code> aux zones dans contenu.js pour afficher la carte.</p>';
    const placed = [];
    const locs = {};
    infos.filter((i) => i.st && i.st.startedAt).forEach((i) => {
      const loc = locs[i.t] = E.teamLocation(GAME, i.path, i.st, Date.now());
      if (loc) placed.push(Object.assign({ info: i, loc }, view.project(loc)));
    });
    // équipes au même endroit : réparties en cercle autour du point,
    // et toujours décalées quand elles sont sur une zone pour ne pas cacher son numéro
    const groups = {};
    placed.forEach((p) => {
      const key = Math.round(p.x / 10) + ',' + Math.round(p.y / 10);
      (groups[key] = groups[key] || []).push(p);
    });
    Object.values(groups).forEach((g) => {
      const onZone = g.some((p) => !p.loc.from && !p.loc.live);
      if (g.length < 2 && !onZone) return;
      const r = onZone ? 34 : 20;
      g.forEach((p, k) => {
        const a = -Math.PI / 4 + (2 * Math.PI * k) / Math.max(g.length, 4);
        p.x += r * Math.cos(a);
        p.y += r * Math.sin(a);
      });
    });
    const at = (p) => `left:${pct(p.x, MAP_W)};top:${pct(p.y, MAP_H)}`;
    const lines = placed.filter((p) => p.loc.from).map((p) => {
      const a = view.project(p.loc.from);
      const b = view.project(p.loc.to);
      return `<line class="${STATUS[p.info.status][2]}" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"/>`;
    }).join('') + placed.filter((p) => p.loc.live && p.loc.acc).map((p) =>
      // cercle de précision du GPS, à l'échelle de la carte
      `<circle class="acc ${STATUS[p.info.status][2]}" cx="${p.x}" cy="${p.y}" r="${(p.loc.acc / view.metersPerPixel(p.loc.lat)).toFixed(1)}"/>`).join('');
    const zones = zonePoints.map((z) => {
      const name = z.id === 'final' ? (GAME.final.name || 'Final') : GAME.zones[z.id].name;
      return `<div class="map-zone" style="${at(view.project(z.point))}" title="${esc(name)}">
        <b>${z.id === 'final' ? '🏁' : esc(z.id)}</b><small>${esc(name)}</small></div>`;
    }).join('');
    const teams = placed.map((p) => {
      const name = p.info.st.teamName || p.info.team.name || p.info.t;
      const gps = p.loc.live ? ` · précision ±${p.loc.acc} m` : '';
      const style = [p.loc.live ? 'live' : p.loc.enRoute ? 'route' : '', A.selected === p.info.t ? 'sel' : ''].join(' ');
      return `<button class="map-team ${STATUS[p.info.status][2]} ${style}" style="${at(p)}" data-action="select" data-team="${esc(p.info.t)}"
        title="${esc(name + ' · ' + whereText(p.info, p.loc) + gps)}">${esc(p.info.t)}</button>`;
    }).join('');
    // liste des équipes posée sur la carte, façon « Localiser »
    const list = infos.map((i) => `
      <button class="map-row ${A.selected === i.t ? 'sel' : ''} ${i.st && i.st.startedAt ? '' : 'off'}" data-action="select" data-team="${esc(i.t)}">
        <span class="dot ${STATUS[i.status][2]} ${locs[i.t] && locs[i.t].live ? 'live' : ''}">${esc(i.t)}</span>
        <span class="row-text"><b>${esc((i.st && i.st.teamName) || i.team.name || i.t)}</b>
          <small>${esc(whereText(i, locs[i.t]))}${i.st && i.st.startedAt && !locs[i.t] && !i.st.finishedAt ? ' · hors carte' : ''}</small></span>
        ${A.unread(i.t) ? `<span class="row-badge">${A.unread(i.t)}</span>` : ''}
      </button>`).join('');
    return `
      <div class="map-wrap ${A.mapFull ? 'full' : ''}">
        <div class="map" style="aspect-ratio:${MAP_W} / ${MAP_H}">
          <div id="map-tiles"></div>
          <svg viewBox="0 0 ${MAP_W} ${MAP_H}" preserveAspectRatio="none">${lines}</svg>
          ${zones}${teams}
          <div class="map-ctrl glass">
            <button data-action="zoom-in" title="Zoomer">+</button>
            <button data-action="zoom-out" title="Dézoomer">−</button>
            <button data-action="zoom-fit" title="Recentrer sur les zones" ${mapZoom ? '' : 'disabled'}>◎</button>
            <button data-action="map-full" title="${A.mapFull ? 'Quitter le plein écran (Échap)' : 'Plein écran'}">${A.mapFull ? '✕' : '⤢'}</button>
          </div>
          <div class="map-legend glass">${S.liveLocation ? '<span><i class="lg live"></i>GPS du téléphone</span>' : ''}
            <span><i class="lg"></i>sur la zone</span><span><i class="lg route"></i>en chemin</span></div>
          <a class="map-credit" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">© contributeurs OpenStreetMap</a>
        </div>
        <div class="map-list glass">${list}</div>
      </div>`;
  }

  Object.assign(A, { map, tiles, zoomMap });
})();
