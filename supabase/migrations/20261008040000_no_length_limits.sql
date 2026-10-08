-- No upper limit on a role's summary or description. Only admins can write
-- these, and the site shortens a long summary where space is tight, so the
-- caps were getting in the way without protecting anything.

alter table public.openings
  drop constraint openings_summary_check,
  drop constraint openings_description_check,
  add constraint openings_summary_check check (char_length(summary) >= 1);
