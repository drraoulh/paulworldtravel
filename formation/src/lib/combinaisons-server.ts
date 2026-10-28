import { createClient } from '@/lib/supabase/server';
import { supabaseConfigured } from '@/lib/supabase/config';
import { isCombinaison, type Combinaison } from './combinaisons';

/** Published combinations (row level security: approved rows are public). */
export async function publishedCombinaisons(): Promise<Combinaison[]> {
  if (!supabaseConfigured) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('question_drafts')
    .select('id, theme, created_at, content')
    .eq('epreuve', 'ee')
    .eq('status', 'approved')
    .eq('content->>kind', 'combinaison')
    .order('created_at', { ascending: false })
    .limit(2000);
  if (error) console.error('Loading combinations failed', error);
  return ((data ?? []) as Combinaison[]).filter((d) => isCombinaison(d.content));
}

export async function getCombinaison(id: string): Promise<Combinaison | null> {
  if (!supabaseConfigured || !/^[0-9a-f-]{36}$/.test(id)) return null;
  const supabase = await createClient();
  const { data } = await supabase.from('question_drafts').select('id, theme, created_at, content').eq('id', id).eq('status', 'approved').maybeSingle();
  return data && isCombinaison(data.content) ? (data as Combinaison) : null;
}
