import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { supabaseConfigured } from '@/lib/supabase/config';

/** Signed-in trainer or admin, or a redirect. */
export async function requireStaff(path: string) {
  if (!supabaseConfigured) redirect('/connexion/');
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/connexion/?suite=${encodeURIComponent(path)}`);
  const { data: me } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (me?.role !== 'admin' && me?.role !== 'trainer') redirect('/espace/');
  return { supabase, user, isAdmin: me.role === 'admin' };
}
