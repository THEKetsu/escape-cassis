/*
 * Synchronisation avec Supabase (tables "progress" et "messages", une ligne de progression par équipe).
 * Appels REST directs : aucune bibliothèque à charger.
 *
 * Deux accès distincts, jamais mélangés :
 *   - joueurs (clé publique + clé de l'équipe) : fonctions team*, qui passent par des fonctions SQL
 *     (rpc) vérifiant la clé de l'équipe ; la clé publique n'a aucun accès direct aux tables ;
 *   - organisateur (compte Supabase Auth, rôle « organisateur ») : loadAll, deleteAll, loadMessages, sendMessage.
 */
window.Sync = (function () {
  const cfg = (window.CONFIG && window.CONFIG.supabase) || {};
  const enabled = !!(cfg.url && cfg.key);
  const root = enabled ? cfg.url.replace(/\/+$/, '') : '';
  const rest = root + '/rest/v1/';
  const base = rest + 'progress';
  const msgBase = rest + 'messages';
  const MSG_FIELDS = 'select=id,team,sender,body,step,created_at';
  const SESSION_KEY = 'escape:session';
  const REFRESH_MARGIN_S = 60;

  const api = { enabled, adminEmail: cfg.adminEmail || '', onAuthLost: null };

  // Les anciennes clés "anon" sont des JWT ; les nouvelles clés "publishable" vont seulement dans apikey
  function headers(token, extra) {
    const h = Object.assign({ apikey: cfg.key, 'Content-Type': 'application/json' }, extra);
    if (token) h.Authorization = 'Bearer ' + token;
    else if (cfg.key && cfg.key.startsWith('eyJ')) h.Authorization = 'Bearer ' + cfg.key;
    return h;
  }

  async function request(url, options) {
    const res = await fetch(url, options);
    if (!res.ok) {
      const text = await res.text();
      const err = new Error(`Supabase ${res.status} : ${text}`);
      err.status = res.status;
      throw err;
    }
    return res;
  }

  // ---------- joueurs : fonctions SQL protégées par la clé de l'équipe ----------

  async function rpc(name, args, options) {
    if (!args.p_token) throw new Error('Clé de l\'équipe absente : rescannez le QR code de l\'équipe');
    const res = await request(rest + 'rpc/' + name, Object.assign({
      method: 'POST', headers: headers(), body: JSON.stringify(args),
    }, options));
    return res.json();
  }

  function teamSave(state, key) {
    return rpc('team_save', { p_team: state.team, p_token: key, p_data: { state } }, { keepalive: true });
  }

  async function teamLoad(team, key) {
    const rows = await rpc('team_load', { p_team: team, p_token: key });
    return rows[0] || null;
  }

  // Classement : l'avancement de toutes les équipes, sans leur position ni leur journal
  function teamBoard(team, key) {
    return rpc('team_board', { p_team: team, p_token: key });
  }

  function teamMessages(team, afterId, key) {
    return rpc('team_messages', { p_team: team, p_token: key, p_after: afterId || 0 });
  }

  // Renvoie le message enregistré (avec son id), pour l'afficher sans attendre la prochaine lecture
  function teamSend(team, body, step, key) {
    return rpc('team_send', { p_team: team, p_token: key, p_body: body, p_step: step || null });
  }

  // ---------- organisateur : session Supabase Auth ----------

  let session = null;
  let refreshing = null;

  function store() {
    try { return window.sessionStorage; } catch (e) { return null; }
  }

  function setSession(s) {
    session = s;
    const st = store();
    if (st) s ? st.setItem(SESSION_KEY, JSON.stringify(s)) : st.removeItem(SESSION_KEY);
  }

  try { session = JSON.parse(store().getItem(SESSION_KEY)); } catch (e) { session = null; }

  function jwtPayload(token) {
    const b64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(decodeURIComponent(escape(atob(b64))));
  }

  async function authToken(grant, body) {
    const res = await fetch(`${root}/auth/v1/token?grant_type=${grant}`, {
      method: 'POST', headers: headers(), body: JSON.stringify(body),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      const err = new Error(json.error_description || json.msg || json.message || 'Connexion refusée');
      err.invalidLogin = json.error_code === 'invalid_credentials' || json.error === 'invalid_grant';
      throw err;
    }
    return {
      access_token: json.access_token,
      refresh_token: json.refresh_token,
      expires_at: Math.floor(Date.now() / 1000) + (json.expires_in || 3600),
    };
  }

  // Le rôle est posé par SQL (voir supabase.sql) : sans lui, la lecture renverrait des listes vides sans erreur
  async function signIn(password) {
    if (!enabled) throw new Error('Supabase non configuré');
    if (!api.adminEmail) throw new Error('Renseignez supabase.adminEmail dans config.js');
    const next = await authToken('password', { email: api.adminEmail, password });
    const role = ((jwtPayload(next.access_token).app_metadata) || {}).role;
    if (role !== 'organisateur') throw new Error('Ce compte n\'a pas le rôle « organisateur » (voir supabase.sql)');
    setSession(next);
  }

  function signOut() {
    setSession(null);
  }

  const hasSession = () => !!session;

  function lost() {
    setSession(null);
    if (api.onAuthLost) api.onAuthLost();
  }

  async function adminHeaders(extra) {
    if (!session) {
      lost();
      throw new Error('Session organisateur expirée : reconnectez-vous');
    }
    if (session.expires_at - Date.now() / 1000 < REFRESH_MARGIN_S) {
      refreshing = refreshing || authToken('refresh_token', { refresh_token: session.refresh_token })
        .then(setSession, () => { lost(); throw new Error('Session organisateur expirée : reconnectez-vous'); })
        .finally(() => { refreshing = null; });
      await refreshing;
    }
    return headers(session.access_token, extra);
  }

  async function adminRequest(url, options) {
    try {
      return await request(url, Object.assign({}, options, { headers: await adminHeaders(options && options.headers) }));
    } catch (e) {
      if (e.status === 401) lost();
      throw e;
    }
  }

  // Carnet de réponses (table organiser_book, remplie par supabase-equipes.sql) ; null s'il n'a pas été chargé
  async function loadBook() {
    const res = await adminRequest(rest + 'organiser_book?id=eq.1&select=data');
    const rows = await res.json();
    return rows[0] ? rows[0].data : null;
  }

  async function loadAll() {
    const res = await adminRequest(base + '?select=team,data,updated_at');
    return res.json();
  }

  function deleteAll() {
    return Promise.all([
      adminRequest(base + '?team=not.is.null', { method: 'DELETE' }),
      adminRequest(msgBase + '?id=gt.0', { method: 'DELETE' }),
    ]);
  }

  // Message de l'organisation : renvoie le message enregistré
  async function sendMessage(msg) {
    const res = await adminRequest(msgBase + '?' + MSG_FIELDS, {
      method: 'POST',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify(msg),
    });
    return (await res.json())[0];
  }

  // Messages postérieurs à afterId, d'une équipe ou de toutes (team omis)
  async function loadMessages(team, afterId) {
    const filter = (team ? `team=eq.${encodeURIComponent(team)}&` : '') + `id=gt.${afterId || 0}`;
    const res = await adminRequest(`${msgBase}?${filter}&order=id.asc&${MSG_FIELDS}`);
    return res.json();
  }

  return Object.assign(api, {
    teamSave, teamLoad, teamBoard, teamMessages, teamSend,
    signIn, signOut, hasSession, loadBook, loadAll, deleteAll, sendMessage, loadMessages,
  });
})();
