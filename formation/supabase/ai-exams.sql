-- One exam credit covers three writings and three oral tasks. Server-only writes.
create table if not exists public.ai_exam_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  enrollment_id uuid references public.enrollments(id) on delete cascade,
  request_id uuid not null,
  serie integer not null check (serie between 1 and 1000),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '24 hours'),
  unique(user_id, request_id)
);
create index if not exists ai_exam_sessions_enrollment_idx on public.ai_exam_sessions(enrollment_id);
create index if not exists ai_exam_sessions_user_idx on public.ai_exam_sessions(user_id, created_at desc);
create table if not exists public.ai_exam_operations (
  session_id uuid not null references public.ai_exam_sessions(id) on delete cascade,
  operation text not null check (length(operation) between 1 and 150),
  state text not null default 'pending' check (state in ('pending','working','done','failed')),
  attempts integer not null default 0 check (attempts between 0 and 2),
  lease_id uuid,
  result jsonb,
  updated_at timestamptz not null default now(),
  primary key(session_id, operation)
);
alter table public.ai_exam_sessions enable row level security;
alter table public.ai_exam_operations enable row level security;
revoke all on public.ai_exam_sessions, public.ai_exam_operations from anon, authenticated;
grant select on public.ai_exam_sessions to authenticated;
drop policy if exists ai_exam_sessions_owner_read on public.ai_exam_sessions;
create policy ai_exam_sessions_owner_read on public.ai_exam_sessions for select to authenticated
using (user_id = (select auth.uid()));
drop policy if exists ai_exam_operations_server_only on public.ai_exam_operations;
create policy ai_exam_operations_server_only on public.ai_exam_operations for all to authenticated using (false) with check (false);
grant all on public.ai_exam_sessions, public.ai_exam_operations to service_role;

-- Serialize credit reservations, including retries and concurrent requests.
create or replace function public.start_ai_exam(p_user_id uuid, p_enrollment_id uuid, p_serie integer, p_limit integer, p_request_id uuid)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare v_row public.ai_exam_sessions; v_count integer; v_role text;
begin
  if p_limit < 1 or p_limit > 100 or p_limit is null then raise exception 'invalid_limit'; end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_user_id::text || ':exam', 0));
  select * into v_row from public.ai_exam_sessions where user_id=p_user_id and request_id=p_request_id;
  if found then
    if v_row.serie <> p_serie or v_row.enrollment_id is distinct from p_enrollment_id then raise exception 'invalid_request'; end if;
    if v_row.expires_at <= now() then raise exception 'expired_exam'; end if;
    return to_jsonb(v_row);
  end if;
  if p_enrollment_id is null then
    select role into v_role from public.profiles where id=p_user_id;
    if v_role not in ('admin','trainer') or v_role is null then raise exception 'paid_pack_required'; end if;
  elsif not exists (select 1 from public.enrollments e where e.id=p_enrollment_id and e.user_id=p_user_id and e.status='active'
    and (e.starts_at is null or e.starts_at::date <= (now() at time zone 'UTC')::date)
    and (e.ends_at is null or e.ends_at::date >= (now() at time zone 'UTC')::date)) then
    raise exception 'paid_pack_required';
  end if;
  select count(*) into v_count from public.ai_exam_sessions
    where user_id=p_user_id and enrollment_id is not distinct from p_enrollment_id
    and (p_enrollment_id is not null or created_at >= now()-interval '30 days');
  if v_count >= p_limit then raise exception 'exam_quota_exhausted'; end if;
  insert into public.ai_exam_sessions(user_id,enrollment_id,serie,request_id)
    values(p_user_id,p_enrollment_id,p_serie,p_request_id) returning * into v_row;
  return to_jsonb(v_row);
end; $$;

-- Each correction/turn has a unique slot. Replays return its saved result, never another AI bill.
create or replace function public.claim_ai_exam_operation(p_session_id uuid, p_operation text)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare v_row public.ai_exam_operations;
begin
  insert into public.ai_exam_operations(session_id, operation) values(p_session_id,p_operation) on conflict do nothing;
  select * into v_row from public.ai_exam_operations where session_id=p_session_id and operation=p_operation for update;
  if v_row.state='done' then return jsonb_build_object('state','done','result',v_row.result); end if;
  if v_row.state='working' and v_row.updated_at > now()-interval '2 minutes' then raise exception 'operation_busy'; end if;
  if v_row.attempts >= 2 then raise exception 'operation_attempts_exhausted'; end if;
  update public.ai_exam_operations set state='working', attempts=attempts+1, lease_id=gen_random_uuid(),updated_at=now()
    where session_id=p_session_id and operation=p_operation returning * into v_row;
  return jsonb_build_object('state','working','lease_id',v_row.lease_id);
end; $$;
revoke execute on function public.start_ai_exam(uuid,uuid,integer,integer,uuid) from public, anon, authenticated;
revoke execute on function public.claim_ai_exam_operation(uuid,text) from public, anon, authenticated;
grant execute on function public.start_ai_exam(uuid,uuid,integer,integer,uuid) to service_role;
grant execute on function public.claim_ai_exam_operation(uuid,text) to service_role;
