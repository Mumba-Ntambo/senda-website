-- Record when the "under review" and "shortlisted" emails went out, as
-- rejection_sent_at does for a rejection: the dashboard shows it, and the
-- same person is never sent the same email twice.

alter table public.applications
  add column reviewing_sent_at   timestamptz,
  add column shortlisted_sent_at timestamptz;
