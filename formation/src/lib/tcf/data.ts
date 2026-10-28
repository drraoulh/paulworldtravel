import { createClient } from '@/lib/supabase/server';
import { supabaseConfigured } from '@/lib/supabase/config';
export type TcfSource = { id: string; name: string; url: string; checked_at: string | null; state: string; detail: string | null };
export type TcfPublication = { id: string; source_id: string; source_url: string; title: string; kind: 'news' | 'session'; city: string | null; starts_on: string | null; published_on: string | null; verified_at: string; status: string };
export async function getTcfNews(admin = false) {
  if (!supabaseConfigured) return { sources: [] as TcfSource[], items: [] as TcfPublication[], unavailable: true };
  const db = await createClient();
  const [sources, items] = await Promise.all([
    db.from('tcf_sources').select('*').order('name'),
    db.from('tcf_publications').select('*').order('verified_at', { ascending: false }).limit(admin ? 200 : 100),
  ]);
  return { sources: (sources.data ?? []) as TcfSource[], items: (items.data ?? []) as TcfPublication[], unavailable: Boolean(sources.error || items.error) };
}
export function doualaToday() { return new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Douala', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()); }
export function frenchDay(value: string) { return new Date(value.length === 10 ? value + 'T12:00:00Z' : value).toLocaleDateString('fr-FR', { timeZone: 'Africa/Douala', day: 'numeric', month: 'long', year: 'numeric' }); }
