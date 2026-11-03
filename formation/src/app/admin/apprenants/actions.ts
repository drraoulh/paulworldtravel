'use server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/staff';
import { validUuid } from '@/lib/admin/learners';
import { packs } from '@/content/offers';
export async function saveLearner(form: FormData) {
  const { supabase, user } = await requireAdmin('/admin/apprenants/');
  const id = String(form.get('id') ?? '');
  if (!validUuid(id)) redirect('/admin/apprenants/');
  const path = `/admin/apprenants/${id}/`;
  const intent = String(form.get('intent'));
  if (intent === 'profile') {
    const { data, error } = await supabase.from('profiles').update({ first_name: String(form.get('first_name') ?? '').trim().slice(0,100), last_name: String(form.get('last_name') ?? '').trim().slice(0,100), phone: String(form.get('phone') ?? '').trim().slice(0,40), city: String(form.get('city') ?? '').trim().slice(0,120) }).eq('id', id).eq('role', 'candidate').select('id').single();
    if (error || !data) redirect(`${path}?erreur=profil`);
  } else if (intent === 'notes') {
    const { data: target } = await supabase.from('profiles').select('id').eq('id', id).eq('role', 'candidate').single();
    if (!target) redirect('/admin/apprenants/');
    const { error } = await supabase.from('learner_notes').upsert({ user_id: id, note: String(form.get('note') ?? '').slice(0,5000), updated_by: user.id }, { onConflict: 'user_id' });
    if (error) redirect(`${path}?erreur=notes`);
  } else if (intent === 'pack') {
    const pack = String(form.get('pack'));
    if (!packs.some((p) => p.id === pack)) redirect(`${path}?erreur=pack`);
    const { data: target } = await supabase.from('profiles').select('id').eq('id', id).eq('role', 'candidate').single();
    if (!target) redirect('/admin/apprenants/');
    const { error } = await supabase.from('enrollments').insert({ user_id: id, formule: pack, status: 'pending' });
    if (error) redirect(`${path}?erreur=pack`);
  } else redirect(`${path}?erreur=action`);
  revalidatePath('/admin/', 'layout');
  revalidatePath('/espace/');
  redirect(`${path}?succes=${intent}`);
}
