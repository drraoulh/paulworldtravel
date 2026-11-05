-- Run after ai-exams.sql. All test data is rolled back; no auth account or email created.
begin;
do $$
declare v_user uuid; v_enrollment uuid; v_session jsonb; v_again jsonb; v_op jsonb; v_id uuid;
begin
  select id into v_user from public.profiles where role='admin' limit 1;
  if v_user is null then raise exception 'An existing admin profile is required for this transaction-only test'; end if;
  insert into public.enrollments(user_id,formule,status,starts_at,ends_at)
    values(v_user,'express','active',current_date,current_date+7) returning id into v_enrollment;
  v_id := gen_random_uuid();
  v_session := public.start_ai_exam(v_user,v_enrollment,1,1,v_id);
  v_again := public.start_ai_exam(v_user,v_enrollment,1,1,v_id);
  if v_session->>'id' <> v_again->>'id' then raise exception 'Retry consumed another credit'; end if;
  begin
    perform public.start_ai_exam(v_user,v_enrollment,1,1,gen_random_uuid());
    raise exception 'Quota was not enforced';
  exception when raise_exception then
    if sqlerrm <> 'exam_quota_exhausted' then raise; end if;
  end;
  v_op := public.claim_ai_exam_operation((v_session->>'id')::uuid,'grade:writing:test');
  begin
    perform public.claim_ai_exam_operation((v_session->>'id')::uuid,'grade:writing:test');
    raise exception 'Concurrent operation was not blocked';
  exception when raise_exception then
    if sqlerrm <> 'operation_busy' then raise; end if;
  end;
  update public.ai_exam_operations set state='done',result='{"score":12}'::jsonb where session_id=(v_session->>'id')::uuid;
  v_op := public.claim_ai_exam_operation((v_session->>'id')::uuid,'grade:writing:test');
  if v_op->>'state' <> 'done' or v_op->'result'->>'score' <> '12' then raise exception 'Correction was not cached'; end if;
  if has_function_privilege('authenticated','public.start_ai_exam(uuid,uuid,integer,integer,uuid)','EXECUTE')
    or has_function_privilege('anon','public.start_ai_exam(uuid,uuid,integer,integer,uuid)','EXECUTE')
    or has_function_privilege('authenticated','public.claim_ai_exam_operation(uuid,text)','EXECUTE')
    or has_table_privilege('authenticated','public.ai_exam_sessions','INSERT')
    or has_table_privilege('anon','public.ai_exam_operations','SELECT') then raise exception 'Unsafe privileges'; end if;
end $$;
rollback;
select 'Exam reservations, quota, idempotency, concurrency, cache and grants passed; test data rolled back' as result;
