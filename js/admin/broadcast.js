/* Message à toutes les équipes (tchat : un message par équipe, avec la notification habituelle sur leur téléphone). */
(function () {
  const A = window.EscapeAdmin;
  if (!A) return;
  const { Sync, teamIds } = A;

  function showBroadcast() {
    const connected = teamIds.filter((t) => A.rows[t]);
    const overlay = document.createElement('div');
    overlay.className = 'qr-overlay';
    overlay.innerHTML = `
      <div class="qr-panel broadcast">
        <header><h2>📣 Message à toutes les équipes</h2><button data-close>✕ Fermer</button></header>
        <p class="muted">Le message arrive dans le tchat de chaque équipe, avec la notification habituelle.</p>
        <form>
          <textarea rows="4" maxlength="1000" placeholder="Votre message à toutes les équipes…"></textarea>
          <label class="check-only"><input type="checkbox" ${connected.length ? 'checked' : ''}> Seulement les équipes déjà connectées (${connected.length}/${teamIds.length})</label>
          <button class="primary">Envoyer</button>
          <p class="err"></p>
        </form>
      </div>`;
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.closest('[data-close]')) overlay.remove();
    });
    overlay.querySelector('form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const body = overlay.querySelector('textarea').value.trim().slice(0, 1000);
      const only = overlay.querySelector('input[type=checkbox]').checked;
      const targets = only ? connected : teamIds;
      const err = overlay.querySelector('.err');
      if (!body) return;
      if (!targets.length) { err.textContent = 'Aucune équipe connectée.'; return; }
      if (!confirm(`Envoyer ce message à ${targets.length} équipe${targets.length > 1 ? 's' : ''} ?`)) return;
      const button = overlay.querySelector('button.primary');
      button.disabled = true;
      try {
        A.addMessages(await Sync.sendMessages(targets.map((team) => ({ team, sender: 'admin', body }))), false);
        overlay.remove();
      } catch (error) {
        err.textContent = 'Non envoyé : ' + error.message;
        button.disabled = false;
      }
    });
    document.body.appendChild(overlay);
    overlay.querySelector('textarea').focus();
  }

  A.showBroadcast = showBroadcast;
})();
