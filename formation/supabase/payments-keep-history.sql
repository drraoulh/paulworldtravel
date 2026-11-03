-- Applied on 2026-11-03: deleting an account keeps its payments (user_id becomes null),
-- so the monthly totals in /admin/paiements stay right.
alter table public.payments alter column user_id drop not null;
alter table public.payments drop constraint payments_user_id_fkey;
alter table public.payments add constraint payments_user_id_fkey foreign key (user_id) references auth.users(id) on delete set null;
