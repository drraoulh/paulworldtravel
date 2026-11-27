-- Moves the learning progress out of the auth user metadata (494 REQUEST_HEADER_TOO_LARGE fix).
-- The metadata is copied into every session token and cookie; with the progress inside, the
-- cookie grew with each series until the site refused the requests.
-- Run once in Supabase > SQL Editor. Safe to run again.
begin;

-- 1. Progress that only exists in the metadata is copied into the table first.
insert into public.learner_progress(user_id, snapshot)
select u.id, u.raw_user_meta_data->'pwt_progress'
from auth.users u
join public.profiles p on p.id = u.id
where jsonb_typeof(u.raw_user_meta_data->'pwt_progress') = 'object'
  and octet_length((u.raw_user_meta_data->'pwt_progress')::text) <= 524288
on conflict (user_id) do nothing;

-- 2. Then it is removed from the metadata. New sessions get a small cookie again.
update auth.users
set raw_user_meta_data = raw_user_meta_data - 'pwt_progress'
where raw_user_meta_data ? 'pwt_progress';

commit;

-- Check: should return 0.
select count(*) from auth.users where raw_user_meta_data ? 'pwt_progress';
