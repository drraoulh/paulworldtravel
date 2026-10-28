'use server';

import { revalidatePath } from 'next/cache';
import { requireStaff } from '@/lib/staff';

export async function setDraftStatus(formData: FormData) {
  const { supabase, isAdmin } = await requireStaff('/admin/generer/');
  const id = String(formData.get('id') ?? '');
  const status = String(formData.get('status') ?? '');
  if (!isAdmin || !id || !['approved', 'rejected', 'draft'].includes(status)) return;
  const { error } = await supabase.from('question_drafts').update({ status }).eq('id', id);
  if (error) console.error('Draft update failed', error);
  revalidatePath('/admin/generer/');
}
