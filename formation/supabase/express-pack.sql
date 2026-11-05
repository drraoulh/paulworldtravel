-- Express pack (7 days): allow the new pack id. Additive, existing rows stay valid.
-- Not applied yet: run it once in the Supabase SQL editor before selling the pack.

alter table public.enrollments drop constraint if exists enrollments_formule_check;
alter table public.enrollments add constraint enrollments_formule_check
  check (formule in ('en-ligne', 'presentiel', 'hybride', 'express', 'essentiel', 'silver', 'gold', 'platinum'));

alter table public.payments drop constraint if exists payments_pack_check;
alter table public.payments add constraint payments_pack_check
  check (pack in ('express', 'essentiel', 'silver', 'gold', 'platinum'));

-- The sign-up form can name the Express pack (same function as in packs.sql, with 'express' added).
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

  if meta->>'formule' in ('en-ligne', 'presentiel', 'hybride', 'express', 'essentiel', 'silver', 'gold', 'platinum') then
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
revoke execute on function public.handle_new_user() from public, anon, authenticated;
