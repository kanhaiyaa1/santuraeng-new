-- Minimal database round-trip for the /api/health endpoint (keeps the project active).
-- Applied to project santuraeng (muxlspfwnkxoctrsrxck) as migration "create_health_check_function".
create or replace function public.health_check()
returns integer
language sql
stable
security invoker
set search_path = ''
as $$ select 1 $$;

revoke all on function public.health_check() from public;
grant execute on function public.health_check() to anon, authenticated;
