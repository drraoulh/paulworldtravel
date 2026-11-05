'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/staff';
import { isValidEndDate } from '@/lib/practice';
import { openEnrollment } from '@/lib/admin/accounts';

// Every change goes through the signed-in admin's session: row level security
// rejects it if the account is not an administrator.

const isoDate = (d: Date) => d.toISOString().slice(0, 10);

export async function activateEnrollment(formData: FormData) {
  const id = String(formData.get('id') ?? '');
  const days = Number(formData.get('days') ?? 0);
  const endInput = String(formData.get('ends_at') ?? '');
  if (!id) return;

  const { supabase, user } = await requireAdmin('/admin/inscriptions/');
  if ((endInput && !isValidEndDate(endInput, isoDate(new Date()))) || (!endInput && ![7, 30, 60, 90, 180].includes(days))) redirect('/admin/inscriptions/?erreur=date');
  // Activation and the email to the candidate.
  const done = await openEnrollment(supabase, id, days || 30, user.id, endInput || undefined);
  if (!done) redirect('/admin/inscriptions/?erreur=enregistrement');
  revalidatePath('/admin/', 'layout');
  revalidatePath('/espace/');
}

export async function setEnrollmentStatus(formData: FormData) {
  const id = String(formData.get('id') ?? '');
  const status = String(formData.get('status') ?? '');
  if (!id || !['pending', 'expired', 'cancelled'].includes(status)) return;
  const { supabase } = await requireAdmin('/admin/inscriptions/');
  const { data, error } = await supabase.from('enrollments').update({ status }).eq('id', id).select('id').single();
  if (error || !data) redirect('/admin/inscriptions/?erreur=enregistrement');
  revalidatePath('/admin/', 'layout');
  revalidatePath('/espace/');
}

export async function saveNotes(formData: FormData) {
  const id = String(formData.get('id') ?? '');
  const notes = String(formData.get('staff_notes') ?? '').slice(0, 3000);
  if (!id) return;
  const { supabase } = await requireAdmin('/admin/inscriptions/');
  const { data, error } = await supabase.from('enrollments').update({ staff_notes: notes }).eq('id', id).select('id').single();
  if (error || !data) redirect('/admin/inscriptions/?erreur=enregistrement');
  revalidatePath('/admin/', 'layout');
  revalidatePath('/espace/');
}
