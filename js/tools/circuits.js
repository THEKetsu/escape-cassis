/* Outils : 2. répartition théorique des équipes par créneau. */
(function () {
  const T = window.EscapeTools;
  if (!T) return;
  const { E, GAME, esc } = T;

  function circuitsSection() {
    const zoneIds = Object.keys(GAME.zones);
    const slots = E.simulate(GAME);
    const rows = slots.map((byZone, s) => `<tr><th>Créneau ${s + 1}</th>${zoneIds.map((z) => {
      const here = byZone[z] || [];
      const variants = here.map((h) => h.variant);
      const clash = variants.length !== new Set(variants).size;
      const cls = here.length > 2 ? 'bad' : clash ? 'mid' : '';
      return `<td class="${cls}">${here.map((h) => `<span class="tag">${esc(h.team)} ${h.variant}</span>`).join('')}</td>`;
    }).join('')}</tr>`).join('');
    return `
      <section id="circuits" class="no-print">
        <h2>2. Répartition théorique des équipes</h2>
        <p class="muted">Créneau n = n-ième zone de chaque équipe, en supposant que toutes avancent au même rythme.
          <span class="legend bad">plus de 2 équipes</span> <span class="legend mid">même variante en même temps</span></p>
        <div class="table-wrap"><table class="sim">
          <tr><th></th>${zoneIds.map((z) => `<th>Zone ${esc(z)}<br><small>${esc(GAME.zones[z].name)}</small></th>`).join('')}</tr>
          ${rows}
        </table></div>
      </section>`;
  }

  T.circuitsSection = circuitsSection;
})();
