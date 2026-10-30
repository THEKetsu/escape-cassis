/*
 * Synchronisation avec Supabase (table "progress", une ligne par équipe).
 * Appels REST directs : aucune bibliothèque à charger.
 */
window.Sync = (function () {
  const cfg = (window.CONFIG && window.CONFIG.supabase) || {};
  const enabled = !!(cfg.url && cfg.key);
  const base = enabled ? cfg.url.replace(/\/+$/, '') + '/rest/v1/progress' : '';

  function headers(extra) {
    const h = Object.assign({ apikey: cfg.key, 'Content-Type': 'application/json' }, extra);
    // Les anciennes clés "anon" sont des JWT ; les nouvelles clés "publishable" vont seulement dans apikey
    if (cfg.key && cfg.key.startsWith('eyJ')) h.Authorization = 'Bearer ' + cfg.key;
    return h;
  }

  async function request(url, options) {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Supabase ${res.status} : ${await res.text()}`);
    return res;
  }

  function saveState(state) {
    return request(base + '?on_conflict=team', {
      method: 'POST',
      headers: headers({ Prefer: 'resolution=merge-duplicates,return=minimal' }),
      body: JSON.stringify({ team: state.team, data: { state }, updated_at: new Date().toISOString() }),
      keepalive: true,
    });
  }

  async function loadTeam(team) {
    const res = await request(`${base}?team=eq.${encodeURIComponent(team)}&select=data,updated_at`, { headers: headers() });
    const rows = await res.json();
    return rows[0] || null;
  }

  async function loadAll() {
    const res = await request(base + '?select=team,data,updated_at', { headers: headers() });
    return res.json();
  }

  function deleteAll() {
    return request(base + '?team=not.is.null', { method: 'DELETE', headers: headers() });
  }

  return { enabled, saveState, loadTeam, loadAll, deleteAll };
})();
