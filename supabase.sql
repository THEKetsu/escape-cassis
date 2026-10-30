-- À coller une seule fois dans Supabase : SQL Editor > New query > Run.
-- Une ligne par équipe, contenant toute sa progression (JSON).

create table if not exists public.progress (
  team text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.progress enable row level security;

-- Le jeu (clé publique) peut lire, créer, mettre à jour et effacer la progression.
-- Aucune donnée personnelle n'est stockée : uniquement le nom d'équipe et l'avancement.
drop policy if exists "progress_select" on public.progress;
drop policy if exists "progress_insert" on public.progress;
drop policy if exists "progress_update" on public.progress;
drop policy if exists "progress_delete" on public.progress;
create policy "progress_select" on public.progress for select to anon using (true);
create policy "progress_insert" on public.progress for insert to anon with check (true);
create policy "progress_update" on public.progress for update to anon using (true) with check (true);
create policy "progress_delete" on public.progress for delete to anon using (true);

grant select, insert, update, delete on public.progress to anon;
