import { createClient } from 'npm:@supabase/supabase-js@2.118.0';
import { TCF_SOURCES, parseOfficialPage, discoverPages, fetchOfficial } from './feed.ts';

const TOKEN_DIGEST = '376cd96e37c5c6bde187fdede4d5f70c39410f71235dc9b8932688fa241b8fd4';
Deno.serve(async (request: Request) => {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  const token = request.headers.get('x-tcf-watch-token') ?? '';
  const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token));
  const digest = Array.from(new Uint8Array(hash)).map((v) => v.toString(16).padStart(2, '0')).join('');
  if (digest !== TOKEN_DIGEST) return new Response('Unauthorized', { status: 401 });
  const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, { auth: { persistSession: false } });
  const checkedAt = new Date().toISOString();
  const reports = await Promise.all(TCF_SOURCES.map(async (source) => {
    let count = 0; let state = 'ok'; let detail: string | null = null;
    try {
      const html = await fetchOfficial(source.url, source.url);
      const items = parseOfficialPage(html, source, checkedAt);
      const children = await Promise.allSettled(discoverPages(html, source).map(async (url) => parseOfficialPage(await fetchOfficial(url, source.url), source, checkedAt, url)));
      for (const child of children) { if (child.status === 'fulfilled') items.push(...child.value); else { state = 'partial'; detail = 'Certaines pages liées sont indisponibles.'; } }
      const unique = [...new Map(items.map((item) => [item.id, item])).values()];
      if (unique.length) {
        const { error } = await db.from('tcf_publications').upsert(unique, { onConflict: 'id', ignoreDuplicates: true });
        if (error) throw error;
        // Refresh verification only; never overwrite editorial rejection or corrections.
        const { error: touchError } = await db.from('tcf_publications').update({ verified_at: checkedAt }).in('id', unique.map((item) => item.id));
        if (touchError) throw touchError;
      }
      count = unique.length;
    } catch (error) { state = 'error'; detail = error instanceof Error ? error.message.slice(0, 180) : 'Collecte indisponible'; }
    const { error } = await db.from('tcf_sources').update({ checked_at: checkedAt, state, detail }).eq('id', source.id);
    if (error) { console.error('TCF source status write failed', error); throw error; }
    return { source: source.id, state, count };
  }));
  return Response.json({ checked_at: checkedAt, reports });
});
