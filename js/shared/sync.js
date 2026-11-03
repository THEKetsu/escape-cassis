/*
 * Synchronisation avec Supabase (table "progress", une ligne par équipe).
 * Appels REST directs : aucune bibliothèque à charger.
 */
window.Sync = (function () {
  const cfg = (window.CONFIG && window.CONFIG.supabase) || {};
  const enabled = !!(cfg.url && cfg.key);
  const rest = enabled ? cfg.url.replace(/\/+$/, '') + '/rest/v1/' : '';
  const base = rest + 'progress';
  const msgBase = rest + 'messages';
  const MSG_FIELDS = 'select=id,team,sender,body,step,created_at';

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

  // Numéro de la session en cours (table game_session) ; null si la table n'existe pas (supabase.sql pas relancé)
  async function loadEpoch() {
    try {
      const res = await request(rest + 'game_session?id=eq.1&select=epoch', { headers: headers() });
      const rows = await res.json();
      return rows[0] ? rows[0].epoch : null;
    } catch (e) {
      if (e.message.includes(' 404')) return null;
      throw e;
    }
  }

  // Nouvelle session : change le numéro, les téléphones qui en avaient un autre repartent de zéro
  async function newSession() {
    const epoch = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    const res = await request(rest + 'game_session?id=eq.1', {
      method: 'PATCH',
      headers: headers({ Prefer: 'return=representation' }),
      body: JSON.stringify({ epoch, updated_at: new Date().toISOString() }),
    });
    if (!(await res.json()).length) throw new Error('table game_session vide ou absente : relancez supabase.sql');
    return epoch;
  }

  // « Effacer toutes les données » : d'abord le nouveau numéro (les téléphones n'écrivent plus rien), puis les lignes
  async function resetAll() {
    let warning = '';
    try {
      await newSession();
    } catch (e) {
      warning = e.message;
    }
    await deleteAll();
    if (warning) throw new Error('Données effacées, mais les téléphones ne seront pas remis à zéro : ' + warning);
  }

  function deleteAll() {
    return Promise.all([
      request(base + '?team=not.is.null', { method: 'DELETE', headers: headers() }),
      request(msgBase + '?id=gt.0', { method: 'DELETE', headers: headers() }),
    ]);
  }

  // ---------- tchat (table "messages") ----------

  // Renvoie le message enregistré (avec son id), pour l'afficher sans attendre la prochaine lecture
  async function sendMessage(msg) {
    const res = await request(msgBase + '?' + MSG_FIELDS, {
      method: 'POST',
      headers: headers({ Prefer: 'return=representation' }),
      body: JSON.stringify(msg),
    });
    return (await res.json())[0];
  }

  // Messages postérieurs à afterId, d'une équipe ou de toutes (team omis)
  async function loadMessages(team, afterId) {
    const filter = (team ? `team=eq.${encodeURIComponent(team)}&` : '') + `id=gt.${afterId || 0}`;
    const res = await request(`${msgBase}?${filter}&order=id.asc&${MSG_FIELDS}`, { headers: headers() });
    return res.json();
  }

  return { enabled, saveState, loadTeam, loadAll, loadEpoch, newSession, resetAll, deleteAll, sendMessage, loadMessages };
})();
