import { createClient } from '@/lib/supabase/server';
import { supabaseConfigured } from '@/lib/supabase/config';
import { getSessionCombinaison, sessionCombinaisons } from '@/content/combinaisons-sessions';
import { isCombinaison, type Combinaison } from './combinaisons';

/**
 * Published combinations: the team's session sets plus the rows approved in the
 * admin (row level security: approved rows are public). Newest first, so the
 * month page (which reverses the list) shows the session sets in order.
 */
export async function publishedCombinaisons(): Promise<Combinaison[]> {
  const fixed = [...sessionCombinaisons].reverse();
  if (!supabaseConfigured) return fixed;
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
  return [...((data ?? []) as Combinaison[]).filter((d) => isCombinaison(d.content)), ...fixed];
}

export async function getCombinaison(id: string): Promise<Combinaison | null> {
  const fixed = getSessionCombinaison(id);
  if (fixed) return fixed;
  if (!supabaseConfigured || !/^[0-9a-f-]{36}$/.test(id)) return null;
  const supabase = await createClient();
  const { data } = await supabase.from('question_drafts').select('id, theme, created_at, content').eq('id', id).eq('status', 'approved').maybeSingle();
  return data && isCombinaison(data.content) ? (data as Combinaison) : null;
}
