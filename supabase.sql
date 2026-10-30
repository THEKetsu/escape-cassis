-- À coller dans Supabase : SQL Editor > New query > Run.
-- Peut être relancé sans risque après une mise à jour : les données sont conservées.
-- Table progress : une ligne par équipe, contenant toute sa progression (JSON).
-- Table messages : le tchat entre chaque équipe et l'organisation.

create table if not exists public.progress (
  team text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

-- Garde-fous sur ce que la clé publique peut écrire :
-- seulement les équipes du jeu (à tenir à jour avec teams dans contenu.js),
-- une progression cohérente avec la ligne, et de taille raisonnable.
-- "not valid" : les lignes déjà présentes ne sont pas revérifiées.
alter table public.progress drop constraint if exists progress_team_known;
alter table public.progress add constraint progress_team_known
  check (team in ('E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8')) not valid;

alter table public.progress drop constraint if exists progress_data_valid;
alter table public.progress add constraint progress_data_valid
  check (
    jsonb_typeof(data -> 'state') = 'object'
    and data -> 'state' ->> 'team' = team
    and octet_length(data::text) <= 50000
  ) not valid;

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

-- ---------- tchat ----------

create table if not exists public.messages (
  id bigint generated always as identity primary key,
  team text not null,
  sender text not null,       -- 'team' ou 'admin'
  body text not null,
  step text,                  -- étape en cours de l'équipe quand elle écrit (« Le Port · Amarrage »)
  created_at timestamptz not null default now()
);
create index if not exists messages_team_id on public.messages (team, id);

alter table public.messages drop constraint if exists messages_valid;
alter table public.messages add constraint messages_valid
  check (
    team in ('E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8')  -- comme progress_team_known
    and sender in ('team', 'admin')
    and char_length(body) between 1 and 1000
    and char_length(coalesce(step, '')) <= 200
  ) not valid;

alter table public.messages enable row level security;

-- Lecture et envoi pour le jeu et le dashboard ; un message envoyé ne se modifie pas.
-- La suppression sert au bouton « Effacer toutes les données » du dashboard.
drop policy if exists "messages_select" on public.messages;
drop policy if exists "messages_insert" on public.messages;
drop policy if exists "messages_delete" on public.messages;
create policy "messages_select" on public.messages for select to anon using (true);
create policy "messages_insert" on public.messages for insert to anon with check (true);
create policy "messages_delete" on public.messages for delete to anon using (true);

grant select, insert, delete on public.messages to anon;
