-- Public, sourced TCF announcements. Run through a migration on the remote project.
create table if not exists public.tcf_sources (
  id text primary key, name text not null, url text not null, kind text not null,
  checked_at timestamptz, state text not null default 'pending' check (state in ('pending','ok','partial','error')), detail text
);
create table if not exists public.tcf_publications (
  id text primary key,
  source_id text not null references public.tcf_sources(id),
  source_url text not null check (source_url ~ '^https://'),
  title text not null check (char_length(title) between 12 and 220),
  kind text not null check (kind in ('news','session')),
  city text check (city in ('Douala','Yaoundé')),
  starts_on date, published_on date, verified_at timestamptz not null default now(),
  status text not null default 'draft' check (status in ('draft','published','withdrawn')),
  check (kind <> 'session' or (starts_on is not null and city is not null))
);
create index if not exists tcf_publications_dates_idx on public.tcf_publications (starts_on) where status='published' and kind='session';
create index if not exists tcf_publications_source_idx on public.tcf_publications (source_id);
alter table public.tcf_sources enable row level security;
alter table public.tcf_publications enable row level security;
revoke all on public.tcf_sources, public.tcf_publications from anon, authenticated;
grant select on public.tcf_sources, public.tcf_publications to anon, authenticated;
grant insert, update, delete on public.tcf_publications to authenticated;
grant all on public.tcf_sources, public.tcf_publications to service_role;
create policy "tcf_sources_read" on public.tcf_sources for select to anon, authenticated using (true);
create policy "tcf_publications_anon_read" on public.tcf_publications for select to anon using (status='published');
create policy "tcf_publications_member_read" on public.tcf_publications for select to authenticated using (status='published' or (select public.is_admin()));
create policy "tcf_publications_admin_insert" on public.tcf_publications for insert to authenticated with check ((select public.is_admin()));
create policy "tcf_publications_admin_update" on public.tcf_publications for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "tcf_publications_admin_delete" on public.tcf_publications for delete to authenticated using ((select public.is_admin()));
insert into public.tcf_sources (id,name,url,kind) values
 ('ifc','Institut français du Cameroun','https://www.ifcameroun.com/','centre'),
 ('tls','TLScontact — inscriptions IFC','https://ifc-polelangue.tlscontact.com/','inscription'),
 ('fei','France Éducation international','https://www.france-education-international.fr/test/tcf-canada','reference')
on conflict (id) do nothing;

-- Evergreen reference links; no invented publication date or session date.
insert into public.tcf_publications (id,source_id,source_url,title,kind,status) values
 ('fei:format-ce','fei','https://www.france-education-international.fr/test/tcf-canada','Compréhension écrite du TCF Canada : le format de l’épreuve et les informations officielles','news','published'),
 ('fei:exemples','fei','https://www.france-education-international.fr/test/exemples-epreuves-tcf','Préparer le TCF : consulter les exemples d’épreuves publiés par France Éducation international','news','published')
on conflict (id) do nothing;
