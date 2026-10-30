/* Tchat avec les équipes : pastille de non-lus, panneau de conversation, envoi. */
(function () {
  const A = window.EscapeAdmin;
  if (!A) return;
  const { E, Sync, GAME, STATUS, teamIds } = A;
  const { esc } = window.Util;

  const CHAT_MS = 5000;
  const READ_KEY = 'admin:lu:' + GAME.id;
  let msgLastId = 0;
  let msgLoaded = false;
  let read = JSON.parse(localStorage.getItem(READ_KEY) || '{}'); // dernier message lu par équipe
  let chatTeam = null;  // équipe dont la conversation est ouverte
  let panel = null;

  const unread = (t) => E.unreadCount(A.msgs[t], read[t], 'team');
  const unreadTotal = () => teamIds.reduce((n, t) => n + unread(t), 0);

  function chatCell(t) {
    const n = unread(t);
    const count = (A.msgs[t] || []).length;
    return `<button class="chat-cell ${n ? 'unread' : ''}" data-action="chat" data-team="${esc(t)}" title="Ouvrir la conversation">
      💬${n ? ` <b>${n}</b>` : count ? ` <small>${count}</small>` : ''}</button>`;
  }

  function markRead(t) {
    const list = A.msgs[t] || [];
    if (!list.length) return;
    read[t] = list[list.length - 1].id;
    localStorage.setItem(READ_KEY, JSON.stringify(read));
  }

  // Petit signal sonore à l'arrivée d'un message (ignoré si le navigateur bloque le son)
  function beep() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
      osc.onended = () => ctx.close();
    } catch (e) { /* pas de son, tant pis */ }
  }

  // Les doublons sont écartés par id : un message envoyé revient aussi à la lecture suivante
  function addMessages(list, fromPoll) {
    let incoming = false;
    list.forEach((m) => {
      if (fromPoll) msgLastId = Math.max(msgLastId, m.id);
      const arr = A.msgs[m.team] = A.msgs[m.team] || [];
      if (arr.some((x) => x.id === m.id)) return;
      arr.push(m);
      arr.sort((a, b) => a.id - b.id);
      if (m.sender === 'team') incoming = true;
    });
    if (chatTeam) {
      markRead(chatTeam);
      renderPanel();
    }
    if (incoming && fromPoll && msgLoaded && unreadTotal()) beep();
  }

  async function pollChat() {
    try {
      addMessages(await Sync.loadMessages(null, msgLastId), true);
      msgLoaded = true;
    } catch (e) { /* table absente ou hors connexion : nouvel essai au prochain tour */ }
    A.render();
    setTimeout(pollChat, CHAT_MS);
  }

  function openChat(t) {
    chatTeam = t;
    if (!panel) {
      panel = document.createElement('aside');
      panel.className = 'chat-panel';
      document.body.appendChild(panel);
      panel.addEventListener('click', (e) => {
        if (e.target.closest('[data-close]')) closeChat();
      });
      panel.addEventListener('submit', (e) => {
        e.preventDefault();
        sendChat();
      });
      // Entrée envoie, Maj+Entrée va à la ligne
      panel.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey && e.target.tagName === 'TEXTAREA') {
          e.preventDefault();
          sendChat();
        }
      });
    }
    panel.innerHTML = `
      <header><div><h2></h2><small class="chat-where"></small></div><button data-close>✕</button></header>
      <div class="chat-list"></div>
      <form><textarea rows="3" maxlength="1000" placeholder="Réponse à l'équipe… (Entrée pour envoyer)"></textarea>
        <button class="primary">Envoyer</button><p class="err"></p></form>`;
    markRead(t);
    renderPanel();
    A.render();
    panel.querySelector('textarea').focus();
  }

  function closeChat() {
    chatTeam = null;
    if (panel) panel.remove();
    panel = null;
  }

  function renderPanel() {
    if (!panel || !chatTeam) return;
    const info = A.teamInfo(chatTeam);
    panel.querySelector('h2').textContent = `💬 ${(info.st && info.st.teamName) || info.team.name || chatTeam}`;
    const playing = info.step && !info.st.finishedAt;
    panel.querySelector('.chat-where').innerHTML = playing
      ? `En ce moment : ${esc(info.step.zoneName)} · ${esc(info.step.title || '')}${A.book ? `<br>🔑 ${A.stepSolution(info.step)}` : ''}`
      : STATUS[info.status][1];
    const box = panel.querySelector('.chat-list');
    const atBottom = box.scrollHeight - box.scrollTop - box.clientHeight < 40;
    box.innerHTML = (A.msgs[chatTeam] || []).map((m) => `
      <div class="msg ${m.sender === 'admin' ? 'me' : ''}">
        <p>${esc(m.body)}</p>
        <small>${new Date(m.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}${m.step ? ' · 📍 ' + esc(m.step) : ''}</small>
      </div>`).join('') || '<p class="muted">Aucun message. Vous pouvez écrire à l\'équipe la première.</p>';
    if (atBottom || !box.dataset.ready) box.scrollTop = box.scrollHeight;
    box.dataset.ready = '1';
  }

  async function sendChat() {
    const input = panel.querySelector('textarea');
    const body = input.value.trim().slice(0, 1000);
    if (!body || !chatTeam) return;
    const err = panel.querySelector('.err');
    try {
      const msg = await Sync.sendMessage({ team: chatTeam, sender: 'admin', body });
      input.value = '';
      err.textContent = '';
      addMessages([msg], false);
      panel.querySelector('.chat-list').scrollTop = 1e9;
    } catch (e) {
      err.textContent = 'Non envoyé : ' + e.message;
    }
  }

  Object.assign(A, { unread, unreadTotal, chatCell, pollChat, openChat, closeChat, renderPanel });
})();
