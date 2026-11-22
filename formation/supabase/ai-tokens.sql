-- Paul World Travel Formation: AI token accounting (run after ai.sql). Safe to re-run.
-- One row per AI provider call, written by the server; read by staff through the report functions.

create table if not exists public.ai_token_usage (
  id bigserial primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  feature text not null,
  kind text not null check (kind in ('chat', 'transcription')),
  model text not null,
  input_tokens int not null default 0,
  output_tokens int not null default 0,
  audio_seconds numeric(10, 1) not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists ai_token_usage_created_idx on public.ai_token_usage (created_at);
create index if not exists ai_token_usage_user_idx on public.ai_token_usage (user_id, created_at);

alter table public.ai_token_usage enable row level security;
drop policy if exists "ai_token_usage_staff" on public.ai_token_usage;
create policy "ai_token_usage_staff" on public.ai_token_usage
  for select to authenticated using ((select public.is_staff()));
