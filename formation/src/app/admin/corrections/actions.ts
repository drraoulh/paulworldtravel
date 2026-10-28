'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireStaff } from '@/lib/staff';

export async function reviewSubmission(formData: FormData) {
  const { supabase, user } = await requireStaff('/admin/corrections/');
  const id = String(formData.get('id') ?? '');
  const score = Number(String(formData.get('trainer_score') ?? '').replace(',', '.'));
  const comment = String(formData.get('trainer_comment') ?? '').slice(0, 4000);
  if (!id || !Number.isFinite(score) || score < 0 || score > 20) redirect('/admin/corrections/?erreur=note');
  const { data, error } = await supabase
    .from('submissions')
    .update({ trainer_score: Math.round(score * 2) / 2, trainer_comment: comment, status: 'trainer_reviewed', reviewed_by: user.id, reviewed_at: new Date().toISOString() })
    .eq('id', id)
    .select('id')
    .single();
  if (error || !data) redirect('/admin/corrections/?erreur=enregistrement');
  revalidatePath('/admin/corrections/');
  revalidatePath('/espace/');
}
