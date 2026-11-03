'use server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/staff';
import { cleanText, createAccount, sendAccessLink, service, setRole, validEmail, type Role } from '@/lib/admin/accounts';
import { validUuid } from '@/lib/admin/learners';

const back = (q: string) => redirect(`/admin/equipe/?${q}`);

/** Gives the admin or trainer role to an existing account, or creates the account. */
export async function addMember(form: FormData) {
  await requireAdmin('/admin/equipe/');
  const email = cleanText(form.get('email'), 254).toLowerCase();
  const role = String(form.get('role')) as Role;
  if (!validEmail(email) || (role !== 'admin' && role !== 'trainer')) back('erreur=email');
  const db = service();
  let { data: profile } = await db.from('profiles').select('id').eq('email', email).maybeSingle();
  let created = false;
  if (!profile) {
    const res = await createAccount({ email, first_name: cleanText(form.get('first_name'), 100), last_name: '', phone: '', city: '' });
    if ('error' in res) back('erreur=creation');
    profile = { id: (res as { id: string }).id };
    created = true;
  }
  if (!(await setRole(profile!.id, role))) back('erreur=role');
  if (created) await sendAccessLink(email, cleanText(form.get('first_name'), 100) || null, true);
  revalidatePath('/admin/', 'layout');
  back(`succes=${created ? 'cree' : 'ajoute'}`);
}

export async function changeRole(form: FormData) {
  const { user } = await requireAdmin('/admin/equipe/');
  const id = String(form.get('id') ?? '');
  const role = String(form.get('role')) as Role;
  if (!validUuid(id) || !['admin', 'trainer', 'candidate'].includes(role)) back('erreur=role');
  // An admin cannot lower their own role: the platform must always keep one admin.
  if (id === user.id) back('erreur=soi');
  if (!(await setRole(id, role))) back('erreur=role');
  revalidatePath('/admin/', 'layout');
  back('succes=role');
}
