-- Move is_admin() out of the schema the API exposes. The policies keep
-- working, since they hold the function itself rather than its name, but it
-- can no longer be called from outside as /rest/v1/rpc/is_admin.

create schema if not exists private;

alter function public.is_admin() set schema private;

revoke execute on function private.is_admin() from public, anon;
grant usage on schema private to authenticated;
grant execute on function private.is_admin() to authenticated;
