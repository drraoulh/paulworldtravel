-- Administration: lesson drafts/publications, staff notes and learner progress.
-- Apply after schema.sql, packs.sql and ai.sql. No access rights depend on learner snapshots.
begin;
create index if not exists profiles_role_created_at_idx on public.profiles(role, created_at desc);
create schema if not exists pwt_private;
create or replace function pwt_private.training_updated_at() returns trigger
language plpgsql security invoker set search_path = '' as $$
begin new.updated_at := now(); return new; end;
$$;
revoke all on function pwt_private.training_updated_at() from public, anon, authenticated;

create table if not exists public.learner_progress (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  snapshot jsonb not null check (jsonb_typeof(snapshot) = 'object' and octet_length(snapshot::text) <= 524288),
  updated_at timestamptz not null default now()
);
alter table public.learner_progress enable row level security;
create policy learner_progress_read on public.learner_progress for select to authenticated
using (user_id = (select auth.uid()) or (select public.is_staff()));
create policy learner_progress_insert on public.learner_progress for insert to authenticated
with check (user_id = (select auth.uid()));
create policy learner_progress_update on public.learner_progress for update to authenticated
using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
revoke all on public.learner_progress from anon, authenticated;
grant select on public.learner_progress to authenticated;
grant insert (user_id, snapshot), update (snapshot) on public.learner_progress to authenticated;
create trigger learner_progress_timestamp before update on public.learner_progress for each row execute function pwt_private.training_updated_at();
-- Existing account progress is copied without exposing other auth metadata.
insert into public.learner_progress(user_id,snapshot)
select u.id, u.raw_user_meta_data->'pwt_progress' from auth.users u
join public.profiles p on p.id=u.id
where jsonb_typeof(u.raw_user_meta_data->'pwt_progress')='object'
and octet_length((u.raw_user_meta_data->'pwt_progress')::text)<=524288
on conflict (user_id) do nothing;

create table if not exists public.learner_notes (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  note text not null check (length(note)<=5000),
  updated_by uuid references public.profiles(id),
  updated_at timestamptz not null default now()
);
create index if not exists learner_notes_updated_by_idx on public.learner_notes(updated_by);
alter table public.learner_notes enable row level security;
create policy learner_notes_read on public.learner_notes for select to authenticated using ((select public.is_staff()));
create policy learner_notes_insert on public.learner_notes for insert to authenticated with check ((select public.is_admin()) and updated_by=(select auth.uid()));
create policy learner_notes_update on public.learner_notes for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()) and updated_by=(select auth.uid()));
revoke all on public.learner_notes from anon,authenticated;
grant select,insert,update on public.learner_notes to authenticated;
create trigger learner_notes_timestamp before update on public.learner_notes for each row execute function pwt_private.training_updated_at();
create policy profiles_update_admin on public.profiles for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy enrollments_insert_admin on public.enrollments for insert to authenticated with check ((select public.is_admin()) and status='pending' and starts_at is null and ends_at is null and activated_by is null);
-- Existing column grants still prohibit changes to role, email and account identity.

create table if not exists public.lesson_drafts (
  id text primary key check (id ~ '^(co|ce|ee|eo)/[a-z0-9]+(-[a-z0-9]+)*$'),
  content jsonb not null check (jsonb_typeof(content)='object' and octet_length(content::text)<=131072),
  revision integer not null default 1 check (revision>0),
  updated_by uuid not null references public.profiles(id),
  updated_at timestamptz not null default now()
);
create index lesson_drafts_updated_by_idx on public.lesson_drafts(updated_by);
alter table public.lesson_drafts enable row level security;
create policy lesson_drafts_read on public.lesson_drafts for select to authenticated using ((select public.is_staff()));
create policy lesson_drafts_insert on public.lesson_drafts for insert to authenticated with check ((select public.is_admin()) and updated_by=(select auth.uid()));
create policy lesson_drafts_update on public.lesson_drafts for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()) and updated_by=(select auth.uid()));
revoke all on public.lesson_drafts from anon,authenticated;
grant select,insert,update on public.lesson_drafts to authenticated;
create trigger lesson_drafts_timestamp before update on public.lesson_drafts for each row execute function pwt_private.training_updated_at();

create table if not exists public.lesson_publications (
  id text primary key check (id ~ '^(co|ce|ee|eo)/[a-z0-9]+(-[a-z0-9]+)*$'),
  content jsonb not null check (jsonb_typeof(content)='object' and octet_length(content::text)<=131072),
  revision integer not null check (revision>0),
  archived boolean not null default false,
  published_at timestamptz not null default now()
);
alter table public.lesson_publications enable row level security;
-- These rows contain only published material (including previously published archives), never drafts.
create policy lesson_publications_read on public.lesson_publications for select to anon,authenticated using (true);
create policy lesson_publications_insert on public.lesson_publications for insert to authenticated with check ((select public.is_admin()));
create policy lesson_publications_update on public.lesson_publications for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
revoke all on public.lesson_publications from anon,authenticated;
grant select on public.lesson_publications to anon,authenticated;
grant insert,update on public.lesson_publications to authenticated;

create or replace function public.publish_training_lesson(p_id text, p_revision integer)
returns void language plpgsql security invoker set search_path = '' as $$
declare draft public.lesson_drafts%rowtype;
begin
  if not public.is_admin() then raise exception 'Accès administrateur requis'; end if;
  select * into draft from public.lesson_drafts where id=p_id for update;
  if not found or draft.revision<>p_revision then raise exception 'Brouillon modifié : rechargez avant publication'; end if;
  insert into public.lesson_publications(id,content,revision,archived,published_at)
  values(draft.id,draft.content,draft.revision,false,now())
  on conflict(id) do update set content=excluded.content, revision=excluded.revision, archived=false, published_at=now();
end;
$$;
revoke all on function public.publish_training_lesson(text,integer) from public,anon;
grant execute on function public.publish_training_lesson(text,integer) to authenticated;
commit;
