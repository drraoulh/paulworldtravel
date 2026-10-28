-- Already enabled on the connected project. Requires pg_cron, pg_net and Vault.
-- Never include the plaintext token in source, frontend variables or logs.
create extension if not exists pg_cron;
create extension if not exists pg_net with schema extensions;
do $$ begin
  if not exists (select 1 from vault.secrets where name='tcf_watch_token') then
    perform vault.create_secret(encode(extensions.gen_random_bytes(32),'hex'), 'tcf_watch_token', 'Private TCF daily collector authentication');
  end if;
end $$;
-- Before deploying the function on a different project, obtain ONLY this digest
-- and replace TOKEN_DIGEST in functions/tcf-watch/index.ts:
-- select encode(extensions.digest(decrypted_secret,'sha256'),'hex')
-- from vault.decrypted_secrets where name='tcf_watch_token';
select cron.schedule('tcf-watch-daily', '0 6 * * *', $job$
  select net.http_post(
    url := 'https://losobefiezietwpurwok.supabase.co/functions/v1/tcf-watch',
    headers := jsonb_build_object('Content-Type','application/json','x-tcf-watch-token',
      (select decrypted_secret from vault.decrypted_secrets where name='tcf_watch_token')),
    body := '{}'::jsonb, timeout_milliseconds := 60000
  );
$job$);
