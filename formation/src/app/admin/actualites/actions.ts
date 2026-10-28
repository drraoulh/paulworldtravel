'use server';
import { revalidatePath } from 'next/cache';
import { requireStaff } from '@/lib/staff';
import { officialUrl, TCF_SOURCES, validDay } from '@/lib/tcf/feed';
export async function saveAnnouncement(form: FormData) {
  const { supabase, isAdmin } = await requireStaff('/admin/actualites/');
  if (!isAdmin) throw new Error('Réservé aux administrateurs.');
  const source = TCF_SOURCES.find(s => s.id === String(form.get('source_id')));
  const title = String(form.get('title') ?? '').trim(); const kind = String(form.get('kind'));
  const url = source && officialUrl(String(form.get('source_url') ?? ''), source.url);
  const day = validDay(String(form.get('starts_on') ?? ''));
  const city = String(form.get('city') ?? '');
  if (!source || !url || title.length < 12 || title.length > 220 || !['news','session'].includes(kind) || (kind === 'session' && (!day || !['Douala','Yaoundé'].includes(city)))) throw new Error('Annonce invalide : vérifiez le titre, la source, la ville et la date.');
  const { error } = await supabase.from('tcf_publications').upsert({ id: `${source.id}:${url}:${kind === 'session' ? day : 'news'}`, source_id: source.id, source_url: url, title, kind, starts_on: kind === 'session' ? day : null, city: kind === 'session' ? city : null, published_on: validDay(String(form.get('published_on') ?? '')), status: 'published', verified_at: new Date().toISOString() });
  if (error) throw new Error('La publication a échoué.');
  revalidatePath('/actualites/'); revalidatePath('/admin/actualites/');
}
export async function setAnnouncementStatus(form: FormData) {
  const { supabase, isAdmin } = await requireStaff('/admin/actualites/');
  const id = String(form.get('id') ?? ''); const status = String(form.get('status'));
  if (!isAdmin || !id || !['published','withdrawn'].includes(status)) throw new Error('Action non autorisée.');
  const { error } = await supabase.from('tcf_publications').update({ status }).eq('id', id);
  if (error) throw new Error('La modification a échoué.');
  revalidatePath('/actualites/'); revalidatePath('/admin/actualites/');
}
