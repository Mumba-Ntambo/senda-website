-- Two more optional facts for a role's page: how the work is located
-- (on-site, hybrid, remote) and what it pays. Blank means "not shown".

alter table public.openings
  add column work_mode text not null default ''
    check (char_length(work_mode) <= 40),
  add column compensation text not null default ''
    check (char_length(compensation) <= 200);
