-- Senda Technologies website: admin dashboard backend.
--
-- Applied with `supabase db push` (or paste into the SQL editor). Then:
--   1. Authentication > Users > Add user: create the admin's email and password.
--   2. Run:  insert into public.admins (user_id)
--            select id from auth.users where email = '<that email>';
--   3. Put the project URL and anon (publishable) key in the site's environment as
--      NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.
--
-- Both of those values are public by design. What protects the data is the
-- row-level security below: a visitor may send an enquiry and read published
-- roles, and nothing else. Everything else requires a signed-in user who is
-- listed in public.admins, so a stray sign-up gets no access.

-- ---------------------------------------------------------------- admins

create table public.admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

create policy "An admin can see their own row"
  on public.admins for select to authenticated
  using (user_id = (select auth.uid()));

-- Security definer so the policies below can ask the question without the
-- caller needing to read the admins table themselves.
create function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admins where user_id = (select auth.uid())
  );
$$;

-- ------------------------------------------------------------- enquiries

create table public.enquiries (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name       text not null check (char_length(name) between 1 and 200),
  email      text not null check (char_length(email) between 3 and 320),
  company    text not null default '' check (char_length(company) <= 200),
  services   text[] not null default '{}' check (cardinality(services) <= 12),
  message    text not null check (char_length(message) between 1 and 5000),
  status     text not null default 'new' check (status in ('new', 'read', 'done'))
);

create index enquiries_created_at_idx on public.enquiries (created_at desc);

alter table public.enquiries enable row level security;

-- Write-only for the public: the contact form can add a row, never read one.
create policy "Anyone can send an enquiry"
  on public.enquiries for insert to anon, authenticated
  with check (status = 'new');

create policy "Admins read enquiries"
  on public.enquiries for select to authenticated
  using ((select public.is_admin()));

create policy "Admins update enquiries"
  on public.enquiries for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "Admins delete enquiries"
  on public.enquiries for delete to authenticated
  using ((select public.is_admin()));

-- -------------------------------------------------------------- openings

create table public.openings (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  title        text not null check (char_length(title) between 1 and 160),
  type         text not null check (char_length(type) between 1 and 60),
  location     text not null check (char_length(location) between 1 and 120),
  area         text not null default '' check (char_length(area) <= 80),
  summary      text not null check (char_length(summary) between 1 and 1000),
  closes_on    date,
  is_published boolean not null default false
);

alter table public.openings enable row level security;

-- A role drops off the site by itself the day after it closes.
create policy "Anyone can read published, open roles"
  on public.openings for select to anon, authenticated
  using (is_published and (closes_on is null or closes_on >= current_date));

create policy "Admins read every role"
  on public.openings for select to authenticated
  using ((select public.is_admin()));

create policy "Admins add roles"
  on public.openings for insert to authenticated
  with check ((select public.is_admin()));

create policy "Admins update roles"
  on public.openings for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "Admins delete roles"
  on public.openings for delete to authenticated
  using ((select public.is_admin()));

-- ---------------------------------------------------------------- grants

-- Stated outright rather than left to the project's defaults, which differ
-- between older and newer Supabase projects.
revoke all on public.admins, public.enquiries, public.openings from anon, authenticated;

grant select on public.admins to authenticated;
grant insert on public.enquiries to anon, authenticated;
grant select, update, delete on public.enquiries to authenticated;
grant select on public.openings to anon, authenticated;
grant insert, update, delete on public.openings to authenticated;
grant execute on function public.is_admin() to anon, authenticated;
