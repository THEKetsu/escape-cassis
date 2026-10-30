/*
 * Moteur du jeu, module geo : Géographie : distances GPS, position des équipes, carte en tuiles, zones cliquables.
 * Logique pure, sans DOM. Module UMD : Node (require) ou navigateur (window.Engine).
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else {
    const E = root.Engine = root.Engine || {};
    Object.assign(E, factory(E));
  }
})(typeof self !== 'undefined' ? self : this, function () {
  // Distance en mètres entre deux points GPS (haversine)
  function distance(lat1, lng1, lat2, lng2) {
    const R = 6371000;
    const rad = (d) => (d * Math.PI) / 180;
    const dLat = rad(lat2 - lat1);
    const dLng = rad(lng2 - lng1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(a));
  }

  // Position d'une zone (lat, lng facultatifs dans contenu.js), 'final' compris
  function zonePoint(game, zoneId) {
    const z = zoneId === 'final' ? game.final : game.zones && game.zones[zoneId];
    return z && typeof z.lat === 'number' && typeof z.lng === 'number' ? { lat: z.lat, lng: z.lng } : null;
  }

  // Une position GPS envoyée par le téléphone n'est plus affichée au-delà de ce délai
  const LIVE_MAX_AGE = 2 * 60 * 1000;

  // Position d'une équipe sur la carte du dashboard :
  // - live : dernière position GPS du téléphone (state.pos), si elle a moins de 2 min ;
  // - sinon déduite de l'avancement : sur sa zone si elle y joue, à mi-chemin depuis la zone
  //   précédente si elle cherche la suivante (la 1re étape d'une zone est l'énigme qui y mène).
  // null si la position est inconnue.
  function teamLocation(game, path, state, now) {
    if (!state || !state.startedAt) return null;
    if (state.finishedAt) {
      const end = zonePoint(game, 'final');
      return end && { lat: end.lat, lng: end.lng, zoneId: 'final', enRoute: false, from: null, to: end };
    }
    const step = path[state.stepIndex];
    const enRoute = !!step && step.zoneStep === 0;
    const pos = state.pos;
    if (pos && typeof pos.lat === 'number' && typeof pos.lng === 'number' && (now || Date.now()) - pos.at < LIVE_MAX_AGE) {
      return { lat: pos.lat, lng: pos.lng, zoneId: step ? step.zoneId : null, enRoute, from: null, to: null, live: true, acc: pos.acc || 0, at: pos.at };
    }
    const to = step && zonePoint(game, step.zoneId);
    if (!to) return null;
    const from = enRoute && state.stepIndex > 0 ? zonePoint(game, path[state.stepIndex - 1].zoneId) : null;
    const at = from ? { lat: (from.lat + to.lat) / 2, lng: (from.lng + to.lng) / 2 } : to;
    return { lat: at.lat, lng: at.lng, zoneId: step.zoneId, enRoute, from, to };
  }

  // Carte en tuiles (projection Web Mercator, tuiles de 256 px) : choisit le zoom le plus fort
  // qui fait tenir tous les points dans width × height (ou opts.zoom, centré pareil),
  // puis renvoie les tuiles à afficher et une fonction point -> pixel dans le cadre.
  // opts.left : bande réservée à gauche du cadre (panneau posé sur la carte), où rien n'est centré.
  function mapView(points, width, height, opts) {
    const o = Object.assign({ padding: 40, minZoom: 3, maxZoom: 18, zoom: null, left: 0 }, opts);
    if (!points.length) return null;
    const world = (p, z) => {
      const scale = 256 * 2 ** z;
      const s = Math.sin((p.lat * Math.PI) / 180);
      return { x: ((p.lng + 180) / 360) * scale, y: (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * scale };
    };
    let zoom = o.minZoom;
    if (o.zoom != null) zoom = Math.max(o.minZoom, Math.min(19, o.zoom));
    else for (let z = o.maxZoom; z >= o.minZoom; z--) {
      const px = points.map((p) => world(p, z));
      const w = Math.max(...px.map((p) => p.x)) - Math.min(...px.map((p) => p.x));
      const h = Math.max(...px.map((p) => p.y)) - Math.min(...px.map((p) => p.y));
      if (w <= width - o.left - 2 * o.padding && h <= height - 2 * o.padding) { zoom = z; break; }
    }
    const px = points.map((p) => world(p, zoom));
    const cx = (Math.max(...px.map((p) => p.x)) + Math.min(...px.map((p) => p.x))) / 2;
    const cy = (Math.max(...px.map((p) => p.y)) + Math.min(...px.map((p) => p.y))) / 2;
    const x0 = cx - (o.left + (width - o.left) / 2);
    const y0 = cy - height / 2;
    const tiles = [];
    for (let ty = Math.floor(y0 / 256); ty <= Math.floor((y0 + height) / 256); ty++) {
      for (let tx = Math.floor(x0 / 256); tx <= Math.floor((x0 + width) / 256); tx++) {
        tiles.push({ x: tx, y: ty, z: zoom, left: tx * 256 - x0, top: ty * 256 - y0 });
      }
    }
    const project = (p) => { const w = world(p, zoom); return { x: w.x - x0, y: w.y - y0 }; };
    // Échelle à une latitude donnée (pour dessiner un rayon de précision GPS)
    const metersPerPixel = (lat) => (40075016.686 * Math.cos((lat * Math.PI) / 180)) / (256 * 2 ** zoom);
    return { zoom, width, height, tiles, project, metersPerPixel };
  }

  // Étape "tap" : x, y en % de l'image, r en % de la largeur ; ratio = hauteur / largeur
  function hitTarget(x, y, target, ratio) {
    const dx = x - target.x;
    const dy = (y - target.y) * (ratio || 1);
    return Math.sqrt(dx * dx + dy * dy) <= target.r;
  }

  return { distance, zonePoint, LIVE_MAX_AGE, teamLocation, mapView, hitTarget };
});
