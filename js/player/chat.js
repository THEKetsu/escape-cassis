/* Tchat avec l'organisation. */
(function () {
  const A = window.EscapePlayer;
  if (!A) return;
  const { E, Sync, STORE } = A;
  const esc = window.Util.esc;

  const CHAT_MS = 6000;      // vérification des nouveaux messages, fenêtre fermée
  const CHAT_OPEN_MS = 3000; // fenêtre ouverte
  let chat = { team: null, msgs: [], lastId: 0, loaded: false };
  let chatSheet = null;
  let chatTimer = null;

  // Dernier message lu, gardé sur le téléphone (par équipe)
  function readKey() { return STORE + ':lu:' + A.state.team; }
  function chatUnread() { return A.state ? E.unreadCount(chat.msgs, Number(localStorage.getItem(readKey())) || 0, 'admin') : 0; }
  function chatIsOpen() { return !!chatSheet && document.body.contains(chatSheet.el); }

  function chatButtonContent() {
    const n = chatUnread();
    return `💬<span id="chat-badge" class="chat-badge" ${n ? '' : 'hidden'}>${n}</span>`;
  }

  function chatButton() {
    return `<button class="pill icon chat-btn" data-action="chat" aria-label="Tchat avec l'organisation">${chatButtonContent()}</button>`;
  }

  function updateChatBadge() {
    const badge = document.getElementById('chat-badge');
    if (!badge) return;
    const n = chatUnread();
    badge.textContent = n;
    badge.hidden = !n;
  }

  function markChatRead() {
    if (chat.msgs.length) localStorage.setItem(readKey(), chat.msgs[chat.msgs.length - 1].id);
    updateChatBadge();
  }

  function timeOf(iso) {
    return new Date(iso).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }

  // fromPoll : messages lus sur le serveur (fait avancer lastId) ; sinon message qu'on vient d'envoyer.
  // Les doublons sont écartés par id : un message envoyé revient aussi à la lecture suivante.
  function addMessages(list, fromPoll) {
    const known = new Set(chat.msgs.map((m) => m.id));
    const fresh = list.filter((m) => !known.has(m.id));
    if (fromPoll) list.forEach((m) => { chat.lastId = Math.max(chat.lastId, m.id); });
    if (!fresh.length) return;
    chat.msgs = chat.msgs.concat(fresh).sort((a, b) => a.id - b.id);
    if (chatIsOpen()) {
      renderChat();
      markChatRead();
      return;
    }
    const incoming = fresh.filter((m) => m.sender === 'admin');
    if (fromPoll && chat.loaded && incoming.length) {
      A.vibrate([100, 60, 100]);
      A.toast(`<span class="toast-icon">💬</span><div><b>Message de l'organisation</b><small>${esc(incoming[incoming.length - 1].body.slice(0, 90))}</small></div>`);
    }
    updateChatBadge();
  }

  async function pollChat() {
    clearTimeout(chatTimer);
    if (Sync.enabled && A.state) {
      const team = A.state.team;
      if (chat.team !== team) chat = { team, msgs: [], lastId: 0, loaded: false };
      try {
        const list = await Sync.loadMessages(team, chat.lastId);
        if (A.state && A.state.team === team) {
          addMessages(list, true);
          chat.loaded = true;
        }
      } catch (e) { /* hors connexion : nouvel essai au prochain tour */ }
    }
    chatTimer = setTimeout(pollChat, chatIsOpen() ? CHAT_OPEN_MS : CHAT_MS);
  }

  function renderChat() {
    const box = chatSheet.el.querySelector('.chat-list');
    box.innerHTML = chat.msgs.map((m) => `
      <div class="msg ${m.sender === 'team' ? 'me' : ''}">
        <p>${esc(m.body)}</p><small>${m.sender === 'admin' ? 'Organisation · ' : ''}${timeOf(m.created_at)}</small>
      </div>`).join('') || '<p class="help">Une question, un souci ? Écrivez ici, l\'organisation vous répond dans cette fenêtre.</p>';
    box.scrollTop = box.scrollHeight;
  }

  async function sendChat(form) {
    const input = form.querySelector('textarea');
    const body = input.value.trim().slice(0, 1000);
    if (!body) return;
    const step = A.state.startedAt && !A.state.finishedAt ? A.current() : null;
    const button = form.querySelector('button');
    const err = form.querySelector('.feedback');
    button.disabled = true;
    try {
      const msg = await Sync.sendMessage({
        team: A.state.team, sender: 'team', body,
        step: step ? [step.zoneName, step.title].filter(Boolean).join(' · ') : null,
      });
      input.value = '';
      err.textContent = '';
      addMessages([msg], false);
    } catch (e) {
      err.textContent = 'Message non envoyé : vérifiez la connexion et réessayez.';
    }
    button.disabled = false;
  }

  function showChat() {
    chatSheet = A.sheet(`
      <h2>💬 Organisation</h2>
      <div class="chat-list"></div>
      <form class="chat-form">
        <textarea rows="2" maxlength="1000" placeholder="Votre message…"></textarea>
        <button class="btn primary">Envoyer</button>
        <p class="feedback bad"></p>
      </form>
      <button class="btn" data-close>Fermer</button>`);
    const form = chatSheet.el.querySelector('form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      sendChat(form);
    });
    renderChat();
    markChatRead();
    pollChat();
  }

  Object.assign(A, { chatButtonContent, chatButton, pollChat, showChat });
})();
