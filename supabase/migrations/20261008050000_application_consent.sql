-- Record that the applicant ticked the consent box, and refuse an application
-- sent without it — the form requires the tick, and so does the database.

alter table public.applications
  add column consented boolean not null default false;

drop policy "Anyone can apply to a published role" on public.applications;

create policy "Anyone can apply to a published role"
  on public.applications for insert to anon, authenticated
  with check (
    status = 'new'
    and consented
    and exists (select 1 from public.openings o where o.id = opening_id)
  );
