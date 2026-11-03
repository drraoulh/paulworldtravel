begin;
do $$
declare uid uuid; role_name text;
begin
  foreach role_name in array array['admin','trainer','candidate','other'] loop
    uid := gen_random_uuid();
    insert into auth.users(id,aud,role,email,raw_user_meta_data,raw_app_meta_data,created_at,updated_at)
    values(uid,'authenticated','authenticated','codex-'||uid||'@example.invalid','{}','{}',now(),now());
    if role_name in ('admin','trainer') then update public.profiles set role=role_name where id=uid; end if;
    perform set_config('pwt.test_'||role_name,uid::text,true);
  end loop;
  insert into public.learner_progress(user_id,snapshot) values(current_setting('pwt.test_candidate')::uuid,'{"done":[]}'),(current_setting('pwt.test_other')::uuid,'{"done":[]}');
  insert into public.learner_notes(user_id,note,updated_by) values(current_setting('pwt.test_candidate')::uuid,'Internal probe',current_setting('pwt.test_admin')::uuid);
  insert into public.lesson_drafts(id,content,updated_by) values('co/admin-permission-probe','{"slug":"admin-permission-probe","title":"Private probe"}',current_setting('pwt.test_admin')::uuid);
  insert into public.lesson_publications(id,content,revision) values('co/admin-public-probe','{"title":"Public probe"}',1);
end $$;
set local role anon;
do $$ begin
  if not exists(select 1 from public.lesson_publications where id='co/admin-public-probe') then raise exception 'Public lessons inaccessible'; end if;
  begin perform count(*) from public.lesson_drafts; raise exception 'Anonymous draft access'; exception when insufficient_privilege then null; end;
  begin perform count(*) from public.learner_progress; raise exception 'Anonymous progress access'; exception when insufficient_privilege then null; end;
  begin perform count(*) from public.learner_notes; raise exception 'Anonymous notes access'; exception when insufficient_privilege then null; end;
end $$;
reset role;
do $$ begin perform set_config('request.jwt.claims',jsonb_build_object('sub',current_setting('pwt.test_candidate'),'role','authenticated')::text,true); end $$;
set local role authenticated;
do $$ begin
  if public.is_admin() or public.is_staff() then raise exception 'Candidate elevated'; end if;
  if (select count(*) from public.learner_progress where user_id in(current_setting('pwt.test_candidate')::uuid,current_setting('pwt.test_other')::uuid))<>1 then raise exception 'Candidate reads other progress'; end if;
  if exists(select 1 from public.learner_notes) or exists(select 1 from public.lesson_drafts) then raise exception 'Candidate reads staff data'; end if;
  update public.learner_progress set snapshot='{"done":["read:co/example"]}' where user_id=current_setting('pwt.test_candidate')::uuid;
  begin insert into public.lesson_drafts(id,content,updated_by) values('co/forbidden-probe','{}',auth.uid()); raise exception 'Candidate writes drafts'; exception when insufficient_privilege then null; end;
  begin update public.profiles set role='admin' where id=auth.uid(); raise exception 'Role escalation allowed'; exception when insufficient_privilege then null; end;
  begin insert into public.learner_notes(user_id,note,updated_by) values(auth.uid(),'forbidden',auth.uid()); raise exception 'Candidate writes notes'; exception when insufficient_privilege then null; end;
end $$;
reset role;
do $$ begin perform set_config('request.jwt.claims',jsonb_build_object('sub',current_setting('pwt.test_trainer'),'role','authenticated')::text,true); end $$;
set local role authenticated;
do $$ begin
  if not public.is_staff() or public.is_admin() then raise exception 'Wrong trainer access'; end if;
  if not exists(select 1 from public.lesson_drafts where id='co/admin-permission-probe') then raise exception 'Trainer cannot read draft'; end if;
  if (select count(*) from public.learner_progress where user_id in(current_setting('pwt.test_candidate')::uuid,current_setting('pwt.test_other')::uuid))<>2 then raise exception 'Staff cannot read progress'; end if;
  begin perform public.publish_training_lesson('co/admin-permission-probe',1); raise exception 'Trainer published lesson'; exception when raise_exception then if sqlerrm<>'Accès administrateur requis' then raise; end if; end;
end $$;
reset role;
do $$ begin perform set_config('request.jwt.claims',jsonb_build_object('sub',current_setting('pwt.test_admin'),'role','authenticated')::text,true); end $$;
set local role authenticated;
do $$ begin
  perform public.publish_training_lesson('co/admin-permission-probe',1);
  if not exists(select 1 from public.lesson_publications where id='co/admin-permission-probe' and revision=1) then raise exception 'Admin publication failed'; end if;
  begin perform public.publish_training_lesson('co/admin-permission-probe',2); raise exception 'Stale revision accepted'; exception when raise_exception then if sqlerrm<>'Brouillon modifié : rechargez avant publication' then raise; end if; end;
  update public.profiles set first_name='Probe' where id=current_setting('pwt.test_candidate')::uuid;
  if not exists(select 1 from public.profiles where id=current_setting('pwt.test_candidate')::uuid and first_name='Probe') then raise exception 'Admin profile edit failed'; end if;
  insert into public.enrollments(user_id,formule,status) values(current_setting('pwt.test_candidate')::uuid,'essentiel','pending');
end $$;
reset role;
rollback;
select 'PASS: anonymous isolation, candidate ownership, trainer read-only lessons, admin publication and profile edits, stale revision rejected; fixtures rolled back' as result;
