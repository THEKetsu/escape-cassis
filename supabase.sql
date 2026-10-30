-- À coller dans Supabase : SQL Editor > New query > Run.
-- Peut être relancé sans risque après une mise à jour : les données sont conservées.
-- Table progress : une ligne par équipe, contenant toute sa progression (JSON).
-- Table messages : le tchat entre chaque équipe et l'organisation.
-- Table team_secrets : la clé secrète de chaque équipe, et table organiser_book : ces clés pour le dashboard (QR codes des équipes)
-- (remplies par supabase-equipes.sql, voir « Compte organisateur » en bas).
--
-- Accès :
--   - la clé publique (rôle anon) n'a AUCUN accès direct aux tables : les téléphones passent par les
--     fonctions team_* en bas de ce fichier, qui exigent la clé de leur équipe (lue dans son QR code) ;
--   - le dashboard se connecte avec le compte organisateur (voir « Compte organisateur » en bas).

-- ---------- accès ----------

-- Compte organisateur : rôle posé dans app_metadata (modifiable seulement côté serveur)
create or replace function public.is_organiser() returns boolean
language sql stable as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'organisateur'
$$;

-- Clés des équipes : table fermée (RLS sans policy, aucun droit), lue seulement par les fonctions team_*
create table if not exists public.team_secrets (
  team text primary key,
  token text not null check (char_length(token) >= 12)
);
alter table public.team_secrets enable row level security;
revoke all on public.team_secrets from anon, authenticated;

-- Clés des équipes pour le dashboard (une ligne { teamKeys }, remplie par supabase-equipes.sql) : lisible par l'organisateur seulement
create table if not exists public.organiser_book (
  id int primary key check (id = 1),
  data jsonb not null
);
alter table public.organiser_book enable row level security;
drop policy if exists "book_organiser_select" on public.organiser_book;
create policy "book_organiser_select" on public.organiser_book for select to authenticated using (public.is_organiser());
revoke all on public.organiser_book from anon, authenticated;
grant select on public.organiser_book to authenticated;

-- ---------- progression ----------

create table if not exists public.progress (
  team text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

-- Garde-fous sur ce que les équipes peuvent écrire :
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

-- Seul l'organisateur lit et efface la progression directement.
-- Les téléphones passent par team_save / team_load / team_board.
-- Les anciennes policies « anon » sont retirées : relancer ce script suffit pour migrer.
drop policy if exists "progress_select" on public.progress;
drop policy if exists "progress_insert" on public.progress;
drop policy if exists "progress_update" on public.progress;
drop policy if exists "progress_delete" on public.progress;
drop policy if exists "progress_organiser_select" on public.progress;
drop policy if exists "progress_organiser_delete" on public.progress;
create policy "progress_organiser_select" on public.progress for select to authenticated using (public.is_organiser());
create policy "progress_organiser_delete" on public.progress for delete to authenticated using (public.is_organiser());

revoke all on public.progress from anon, authenticated;
grant select, delete on public.progress to authenticated;

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

-- L'organisateur lit, écrit (sender = 'admin' seulement) et efface ; un message envoyé ne se modifie pas.
-- La suppression sert au bouton « Effacer toutes les données » du dashboard.
-- Les équipes lisent et écrivent leurs messages par team_messages / team_send.
drop policy if exists "messages_select" on public.messages;
drop policy if exists "messages_insert" on public.messages;
drop policy if exists "messages_delete" on public.messages;
drop policy if exists "messages_organiser_select" on public.messages;
drop policy if exists "messages_organiser_insert" on public.messages;
drop policy if exists "messages_organiser_delete" on public.messages;
create policy "messages_organiser_select" on public.messages for select to authenticated using (public.is_organiser());
create policy "messages_organiser_insert" on public.messages for insert to authenticated
  with check (public.is_organiser() and sender = 'admin');
create policy "messages_organiser_delete" on public.messages for delete to authenticated using (public.is_organiser());

revoke all on public.messages from anon, authenticated;
grant select, insert, delete on public.messages to authenticated;

-- ---------- fonctions des téléphones ----------
-- Chacune vérifie la clé de l'équipe (p_token) avant de toucher aux données.

create or replace function public.team_ok(p_team text, p_token text) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from team_secrets s where s.team = p_team and s.token = p_token)
$$;

create or replace function public.team_save(p_team text, p_token text, p_data jsonb) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not team_ok(p_team, p_token) then raise exception 'clé d''équipe invalide' using errcode = '42501'; end if;
  insert into progress (team, data, updated_at) values (p_team, p_data, now())
  on conflict (team) do update set data = excluded.data, updated_at = now();
end $$;

create or replace function public.team_load(p_team text, p_token text)
returns table (data jsonb, updated_at timestamptz)
language plpgsql stable security definer set search_path = public as $$
begin
  if not team_ok(p_team, p_token) then raise exception 'clé d''équipe invalide' using errcode = '42501'; end if;
  return query select p.data, p.updated_at from progress p where p.team = p_team;
end $$;

-- Classement : avancement de toutes les équipes, sans position GPS ni journal
create or replace function public.team_board(p_team text, p_token text)
returns table (team text, data jsonb, updated_at timestamptz)
language plpgsql stable security definer set search_path = public as $$
begin
  if not team_ok(p_team, p_token) then raise exception 'clé d''équipe invalide' using errcode = '42501'; end if;
  return query
    select p.team,
      jsonb_build_object('state', jsonb_build_object(
        'team', p.team,
        'teamName', p.data -> 'state' -> 'teamName',
        'startedAt', p.data -> 'state' -> 'startedAt',
        'finishedAt', p.data -> 'state' -> 'finishedAt',
        'stepIndex', p.data -> 'state' -> 'stepIndex',
        'penalty', p.data -> 'state' -> 'penalty')),
      p.updated_at
    from progress p;
end $$;

create or replace function public.team_messages(p_team text, p_token text, p_after bigint default 0)
returns setof public.messages
language plpgsql stable security definer set search_path = public as $$
begin
  if not team_ok(p_team, p_token) then raise exception 'clé d''équipe invalide' using errcode = '42501'; end if;
  return query select m.* from messages m where m.team = p_team and m.id > p_after order by m.id;
end $$;

create or replace function public.team_send(p_team text, p_token text, p_body text, p_step text default null)
returns public.messages
language plpgsql security definer set search_path = public as $$
declare
  r public.messages;
begin
  if not team_ok(p_team, p_token) then raise exception 'clé d''équipe invalide' using errcode = '42501'; end if;
  insert into messages (team, sender, body, step) values (p_team, 'team', p_body, p_step) returning * into r;
  return r;
end $$;

-- team_ok reste interne ; les autres fonctions sont ouvertes à la clé publique (elles vérifient la clé d'équipe)
revoke all on function public.team_ok(text, text) from public, anon, authenticated;
revoke all on function public.team_save(text, text, jsonb) from public;
revoke all on function public.team_load(text, text) from public;
revoke all on function public.team_board(text, text) from public;
revoke all on function public.team_messages(text, text, bigint) from public;
revoke all on function public.team_send(text, text, text, text) from public;
grant execute on function public.team_save(text, text, jsonb) to anon;
grant execute on function public.team_load(text, text) to anon;
grant execute on function public.team_board(text, text) to anon;
grant execute on function public.team_messages(text, text, bigint) to anon;
grant execute on function public.team_send(text, text, text, text) to anon;

-- ---------- Compte organisateur et clés des équipes (à faire une fois) ----------
-- 1. Authentication > Sign In / Providers : désactiver « Allow new users to sign up » (laisser aussi les connexions anonymes désactivées).
-- 2. Authentication > Users > Add user : votre email et, comme mot de passe, le adminCode de contenu.js écrit en
--    MAJUSCULES sans tirets ni espaces (code « s5zw-s7a7 » : mot de passe S5ZWS7A7). Cochez « Auto Confirm User ».
--    Renseignez ensuite cet email dans config.js (supabase.adminEmail).
-- 3. Donnez-lui le rôle organisateur (remplacez l'email), puis exécutez :
--      update auth.users set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role": "organisateur"}'
--      where email = 'organisateur@exemple.fr';
-- 4. Clés des équipes : node outils/publier.js génère supabase-equipes.sql (ignoré par git) ; collez-le dans le SQL Editor.
--    À refaire seulement si vous changez une équipe ou sa clé (pas pour modifier les énigmes).
--    Le code d'accès du dashboard n'est publié nulle part (ni en clair, ni haché) : seul Supabase le vérifie.
