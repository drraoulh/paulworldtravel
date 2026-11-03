-- Applied on 2026-11-03: deleting an account keeps its payments (user_id becomes null),
-- so the monthly totals in /admin/paiements stay right.
alter table public.payments alter column user_id drop not null;
alter table public.payments drop constraint payments_user_id_fkey;
alter table public.payments add constraint payments_user_id_fkey foreign key (user_id) references auth.users(id) on delete set null;

-- Applied on 2026-11-03 for card payments (Stripe): amounts with cents (32.99 CAD),
-- and one row per Stripe checkout.
alter table public.payments alter column amount type numeric(12,2);
create unique index if not exists payments_provider_reference_key on public.payments (provider, provider_reference) where provider_reference is not null;
