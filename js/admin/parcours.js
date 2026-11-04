/* Vue « Parcours » : zone et variante de chaque équipe à chaque étape, avec les conflits de zone. */
(function () {
  const A = window.EscapeAdmin;
  if (!A) return;
  const { E, GAME, teamIds } = A;
  const { esc } = window.Util;

  // Conflit : plus de 2 équipes dans la même zone à la même étape, ou deux équipes avec la même variante
  const conflicts = [];
  E.simulate(GAME).forEach((byZone, slot) => {
    Object.keys(byZone).forEach((z) => {
      const here = byZone[z];
      if (here.length > 2 || new Set(here.map((h) => h.variant)).size < here.length) conflicts.push({ slot, zone: z, teams: here });
    });
  });
  const inConflict = new Set(conflicts.flatMap((c) => c.teams.map((h) => c.slot + ':' + h.team)));

  function parcoursHtml(infos) {
    const slots = Math.max(...teamIds.map((t) => GAME.teams[t].circuit.length));
    const head = Array.from({ length: slots }, (_, s) => `<th>Étape ${s + 1}</th>`).join('') + '<th>Fin</th>';
    const rows = teamIds.map((t) => {
      const team = GAME.teams[t];
      const info = infos.find((i) => i.t === t);
      const st = info && info.st;
      const reached = st && st.startedAt ? (st.finishedAt ? slots : info.step.zoneIndex) : -1; // étape en cours (0-based)
      const cells = Array.from({ length: slots }, (_, s) => {
        const z = team.circuit[s];
        if (z == null) return '<td></td>';
        const cls = (s < reached ? 'ok' : s === reached ? 'cur' : '') + (inConflict.has(s + ':' + t) ? ' bad' : '');
        const label = `${z}${E.variantFor(team, String(z)).toLowerCase()}`;
        return `<td><span class="pc ${cls}" title="${esc((GAME.zones[z] || {}).name || z)}">${label}</span></td>`;
      }).join('');
      return `<tr><td><b>${esc(team.name || t)}</b></td>${cells}<td><span class="pc ${st && st.finishedAt ? 'ok' : ''}">F</span></td></tr>`;
    }).join('');
    const summary = conflicts.length
      ? `<p class="err">⚠️ ${conflicts.length} conflit${conflicts.length > 1 ? 's' : ''} : ${conflicts.map((c) => `étape ${c.slot + 1}, zone ${esc(c.zone)} (${c.teams.map((h) => esc(h.team) + h.variant.toLowerCase()).join(', ')})`).join(' · ')}</p>`
      : '<p class="muted">✅ Aucun conflit : au plus 2 équipes par zone à chaque étape, toujours avec deux variantes différentes.</p>';
    return `${summary}<div class="table-wrap"><table class="parcours"><tr><th>Équipe</th>${head}</tr>${rows}</table></div>`;
  }

  Object.assign(A, { parcoursHtml, parcoursConflicts: conflicts });
})();
