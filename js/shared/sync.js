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

  // Session en cours : numéro et heure du départ. null = pas de table ; startedAt undefined = table sans colonne started_at
  // (supabase.sql pas relancé : pas de salle d'attente) ; startedAt null = salle d'attente, le départ n'est pas donné.
  async function loadSession() {
    try {
      const res = await request(rest + 'game_session?id=eq.1&select=epoch,started_at', { headers: headers() });
      const rows = await res.json();
      return rows[0] ? { epoch: rows[0].epoch, startedAt: rows[0].started_at } : null;
    } catch (e) {
      if (e.message.includes(' 404')) return null;
      if (e.message.includes(' 400')) {
        const epoch = await loadEpoch();
        return epoch ? { epoch, startedAt: undefined } : null;
      }
      throw e;
    }
  }

  async function patchSession(fields) {
    const res = await request(rest + 'game_session?id=eq.1', {
      method: 'PATCH',
      headers: headers({ Prefer: 'return=representation' }),
      body: JSON.stringify(fields),
    });
    const rows = await res.json();
    if (!rows.length) throw new Error('table game_session vide ou absente : relancez supabase.sql');
    return rows[0];
  }

  // Nouvelle session : change le numéro (les téléphones qui en avaient un autre repartent de zéro) et remet la salle d'attente
  async function newSession() {
    const epoch = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    const fields = { epoch, updated_at: new Date().toISOString() };
    try {
      await patchSession(Object.assign({ started_at: null }, fields));
    } catch (e) {
      if (!e.message.includes(' 400')) throw e;
      await patchSession(fields); // sans colonne started_at
    }
    return epoch;
  }

  // Donne le départ : toutes les équipes de la salle d'attente démarrent
  async function startGame() {
    try {
      return (await patchSession({ started_at: new Date().toISOString() })).started_at;
    } catch (e) {
      if (e.message.includes(' 400')) throw new Error('colonne started_at absente : relancez supabase.sql');
      throw e;
    }
  }

  // « Terminer la partie » : d'abord le nouveau numéro (les téléphones n'écrivent plus rien), puis les lignes
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

  // Même message pour plusieurs équipes (message collectif) : renvoie les messages enregistrés
  async function sendMessages(list) {
    const res = await request(msgBase + '?' + MSG_FIELDS, {
      method: 'POST',
      headers: headers({ Prefer: 'return=representation' }),
      body: JSON.stringify(list),
    });
    return res.json();
  }

  // Messages postérieurs à afterId, d'une équipe ou de toutes (team omis)
  async function loadMessages(team, afterId) {
    const filter = (team ? `team=eq.${encodeURIComponent(team)}&` : '') + `id=gt.${afterId || 0}`;
    const res = await request(`${msgBase}?${filter}&order=id.asc&${MSG_FIELDS}`, { headers: headers() });
    return res.json();
  }

  return { enabled, saveState, loadTeam, loadAll, loadEpoch, loadSession, startGame, newSession, resetAll, deleteAll, sendMessage, sendMessages, loadMessages };
})();
