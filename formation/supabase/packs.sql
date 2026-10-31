-- Packs (Essentiel, Silver, Gold, Platinum) and online payments (NotchPay).
-- Additive: the old formules stay valid for existing enrollments.

alter table public.enrollments drop constraint if exists enrollments_formule_check;
alter table public.enrollments add constraint enrollments_formule_check
  check (formule in ('en-ligne', 'presentiel', 'hybride', 'essentiel', 'silver', 'gold', 'platinum'));

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  enrollment_id uuid references public.enrollments (id) on delete set null,
  pack text not null check (pack in ('essentiel', 'silver', 'gold', 'platinum')),
  amount integer not null check (amount > 0),
  currency text not null default 'XAF',
  provider text not null default 'notchpay',
  reference text not null unique,
  provider_reference text,
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed', 'cancelled')),
  created_at timestamptz not null default now(),
  paid_at timestamptz
);
create index if not exists payments_user_idx on public.payments (user_id, created_at desc);

-- Candidates read their own payments; only the server (service role) writes.
alter table public.payments enable row level security;
drop policy if exists "payments_select" on public.payments;
create policy "payments_select" on public.payments
  for select to authenticated using (user_id = (select auth.uid()) or (select public.is_staff()));

-- The sign-up form can now name a pack.
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

  if meta->>'formule' in ('en-ligne', 'presentiel', 'hybride', 'essentiel', 'silver', 'gold', 'platinum') then
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
