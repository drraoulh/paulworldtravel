-- Paul World Travel Formation: AI features (run after schema.sql). Safe to re-run.
-- Writes come only from the server (secret key); candidates read their own rows.

create table if not exists public.ai_usage (
  id bigserial primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  feature text not null check (feature in ('writing', 'speaking', 'tutor', 'generate')),
  created_at timestamptz not null default now()
);
create index if not exists ai_usage_user_idx on public.ai_usage (user_id, feature, created_at);

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  kind text not null check (kind in ('ee', 'eo')),
  task_id text not null,
  task_prompt text not null,
  content text,
  transcript text,
  word_count int,
  duration_seconds int,
  ai_score numeric(4, 1),
  ai_feedback jsonb,
  trainer_score numeric(4, 1) check (trainer_score between 0 and 20),
  trainer_comment text,
  status text not null default 'ai_reviewed' check (status in ('ai_reviewed', 'trainer_reviewed')),
  reviewed_by uuid references public.profiles (id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists submissions_user_idx on public.submissions (user_id, created_at desc);
create index if not exists submissions_status_idx on public.submissions (status, created_at desc);

create table if not exists public.question_drafts (
  id uuid primary key default gen_random_uuid(),
  created_by uuid references public.profiles (id) on delete set null,
  epreuve text not null check (epreuve in ('ce', 'co', 'ee', 'eo')),
  level text not null check (level in ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
  theme text,
  content jsonb not null,
  status text not null default 'draft' check (status in ('draft', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

alter table public.ai_usage enable row level security;
alter table public.submissions enable row level security;
alter table public.question_drafts enable row level security;

drop policy if exists "ai_usage_select" on public.ai_usage;
create policy "ai_usage_select" on public.ai_usage
  for select to authenticated using (user_id = (select auth.uid()) or (select public.is_staff()));

drop policy if exists "submissions_select" on public.submissions;
create policy "submissions_select" on public.submissions
  for select to authenticated using (user_id = (select auth.uid()) or (select public.is_staff()));

drop policy if exists "submissions_review" on public.submissions;
create policy "submissions_review" on public.submissions
  for update to authenticated using ((select public.is_staff())) with check ((select public.is_staff()));

-- Trainers only fill in the review columns.
revoke update on public.submissions from authenticated, anon;
grant update (trainer_score, trainer_comment, status, reviewed_by, reviewed_at) on public.submissions to authenticated;

drop policy if exists "drafts_staff_select" on public.question_drafts;
create policy "drafts_staff_select" on public.question_drafts
  for select to authenticated using ((select public.is_staff()) or status = 'approved');

drop policy if exists "drafts_staff_update" on public.question_drafts;
create policy "drafts_staff_update" on public.question_drafts
  for update to authenticated using ((select public.is_staff())) with check ((select public.is_staff()));

revoke update on public.question_drafts from authenticated, anon;
grant update (status) on public.question_drafts to authenticated;

-- Approved exercises are public training material.
drop policy if exists "drafts_public_approved" on public.question_drafts;
create policy "drafts_public_approved" on public.question_drafts
  for select to anon using (status = 'approved');
