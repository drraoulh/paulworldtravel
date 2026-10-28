-- Paul World Travel Formation: database schema.
-- Run once in Supabase: SQL Editor > New query > paste this file > Run.
-- Safe to re-run: every statement checks what already exists.

-- ---------------------------------------------------------------------------
-- Profiles: one row per account, created automatically at sign-up.
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  first_name text,
  last_name text,
  phone text,
  city text,
  role text not null default 'candidate' check (role in ('candidate', 'trainer', 'admin')),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Enrollments: a candidate's registration to a training, activated by staff.
-- ---------------------------------------------------------------------------
create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  exam text not null default 'tcf-canada',
  formule text not null check (formule in ('en-ligne', 'presentiel', 'hybride')),
  level text,
  goal text,
  exam_date text,
  message text,
  status text not null default 'pending' check (status in ('pending', 'active', 'expired', 'cancelled')),
  starts_at date,
  ends_at date,
  activated_by uuid references public.profiles (id),
  activated_at timestamptz,
  staff_notes text,
  created_at timestamptz not null default now()
);
create index if not exists enrollments_user_idx on public.enrollments (user_id);
create index if not exists enrollments_status_idx on public.enrollments (status);

-- ---------------------------------------------------------------------------
-- Level test results (free test). user_id is empty for visitors without account.
-- ---------------------------------------------------------------------------
create table if not exists public.level_test_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles (id) on delete set null,
  level text not null check (level in ('A1', 'A2', 'B1', 'B2', 'C1')),
  score int not null check (score >= 0),
  total int not null check (total > 0 and score <= total),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Role helpers (security definer so policies can read roles without recursion).
-- ---------------------------------------------------------------------------
create or replace function public.is_staff()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role in ('trainer', 'admin'));
$$;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- ---------------------------------------------------------------------------
-- Sign-up trigger: creates the profile and the pending enrollment from the
-- details the sign-up form stores in the account metadata.
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
declare
  meta jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
begin
  insert into public.profiles (id, email, first_name, last_name, phone, city)
  values (
    new.id,
    new.email,
    left(meta->>'first_name', 100),
    left(meta->>'last_name', 100),
    left(meta->>'phone', 40),
    left(meta->>'city', 120)
  )
  on conflict (id) do nothing;

  if meta->>'formule' in ('en-ligne', 'presentiel', 'hybride') then
    insert into public.enrollments (user_id, formule, level, goal, exam_date, message)
    values (
      new.id,
      meta->>'formule',
      left(meta->>'level', 20),
      left(meta->>'goal', 40),
      left(meta->>'exam_date', 100),
      left(meta->>'message', 3000)
    );
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Row level security
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.enrollments enable row level security;
alter table public.level_test_results enable row level security;

-- Profiles: read your own (staff read all); edit your own contact details only.
drop policy if exists "profiles_select" on public.profiles;
create policy "profiles_select" on public.profiles
  for select to authenticated using (id = (select auth.uid()) or (select public.is_staff()));

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));

-- Candidates may change their contact details but never their role or email.
revoke update on public.profiles from authenticated, anon;
grant update (first_name, last_name, phone, city) on public.profiles to authenticated;

-- Enrollments: read your own (staff read all); request a new one as pending;
-- only admins activate, extend or cancel.
drop policy if exists "enrollments_select" on public.enrollments;
create policy "enrollments_select" on public.enrollments
  for select to authenticated using (user_id = (select auth.uid()) or (select public.is_staff()));

drop policy if exists "enrollments_insert_own" on public.enrollments;
create policy "enrollments_insert_own" on public.enrollments
  for insert to authenticated
  with check (user_id = (select auth.uid()) and status = 'pending' and activated_by is null and starts_at is null and ends_at is null);

drop policy if exists "enrollments_update_admin" on public.enrollments;
create policy "enrollments_update_admin" on public.enrollments
  for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

-- Level test: anyone may save a result (own account or anonymous); read your own.
drop policy if exists "results_insert" on public.level_test_results;
create policy "results_insert" on public.level_test_results
  for insert to anon, authenticated
  with check (user_id is null or user_id = (select auth.uid()));

drop policy if exists "results_select" on public.level_test_results;
create policy "results_select" on public.level_test_results
  for select to authenticated using (user_id = (select auth.uid()) or (select public.is_staff()));

-- ---------------------------------------------------------------------------
-- First administrator: after creating your own account on the site, run
--   update public.profiles set role = 'admin' where email = 'infos@paulworldtravel.com';
-- ---------------------------------------------------------------------------
