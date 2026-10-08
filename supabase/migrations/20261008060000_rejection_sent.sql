-- Record when the rejection email went out, so the dashboard can show it
-- and the same person is never emailed twice.

alter table public.applications
  add column rejection_sent_at timestamptz;
