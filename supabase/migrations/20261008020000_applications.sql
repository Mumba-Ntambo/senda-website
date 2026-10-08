-- Job applications: a full description on each role, an applications table,
-- and a private bucket for the CVs that come with them.

alter table public.openings
  add column description text not null default ''
  check (char_length(description) <= 20000);

-- ----------------------------------------------------------- applications

create table public.applications (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  -- Kept when the role is later deleted; role_title is the record of what
  -- the person applied for.
  opening_id uuid references public.openings (id) on delete set null,
  role_title text not null check (char_length(role_title) between 1 and 160),
  name       text not null check (char_length(name) between 1 and 200),
  email      text not null check (char_length(email) between 3 and 320),
  phone      text not null default '' check (char_length(phone) <= 40),
  location   text not null default '' check (char_length(location) <= 120),
  link       text not null default '' check (char_length(link) <= 300),
  note       text not null default '' check (char_length(note) <= 5000),
  cv_path    text not null check (char_length(cv_path) between 1 and 300),
  status     text not null default 'new'
             check (status in ('new', 'reviewing', 'shortlisted', 'rejected'))
);

create index applications_created_at_idx on public.applications (created_at desc);
create index applications_opening_id_idx on public.applications (opening_id);

alter table public.applications enable row level security;

-- Write-only for the public, and only against a role that is on the site:
-- the subquery runs as the applicant, who can see published, open roles only.
create policy "Anyone can apply to a published role"
  on public.applications for insert to anon, authenticated
  with check (
    status = 'new'
    and exists (select 1 from public.openings o where o.id = opening_id)
  );

create policy "Admins read applications"
  on public.applications for select to authenticated
  using ((select private.is_admin()));

create policy "Admins update applications"
  on public.applications for update to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

create policy "Admins delete applications"
  on public.applications for delete to authenticated
  using ((select private.is_admin()));

revoke all on public.applications from anon, authenticated;
grant insert on public.applications to anon, authenticated;
grant select, update, delete on public.applications to authenticated;

-- -------------------------------------------------------------------- CVs

-- Private: nothing in it has a public address. The size and type limits are
-- enforced here, by the storage service, whatever the form allows.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'cvs', 'cvs', false, 5242880,
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
);

-- An applicant can put a file in, and cannot list, read, replace or remove one.
create policy "Anyone can upload a CV"
  on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'cvs');

create policy "Admins read CVs"
  on storage.objects for select to authenticated
  using (bucket_id = 'cvs' and (select private.is_admin()));

create policy "Admins delete CVs"
  on storage.objects for delete to authenticated
  using (bucket_id = 'cvs' and (select private.is_admin()));
