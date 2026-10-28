'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { escapeHtml, sendEmail } from '@/lib/brevo';
import { formatDate, formuleName } from '@/lib/labels';

// Every change goes through the signed-in admin's session: row level security
// rejects it if the account is not an administrator.

const isoDate = (d: Date) => d.toISOString().slice(0, 10);

export async function activateEnrollment(formData: FormData) {
  const id = String(formData.get('id') ?? '');
  const days = Number(formData.get('days') ?? 0);
  const endInput = String(formData.get('ends_at') ?? '');
  if (!id) return;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const start = new Date();
  const end = endInput ? new Date(endInput) : new Date(start.getTime() + Math.max(1, days || 30) * 86_400_000);
  const { data: enrollment, error } = await supabase
    .from('enrollments')
    .update({ status: 'active', starts_at: isoDate(start), ends_at: isoDate(end), activated_by: user.id, activated_at: new Date().toISOString() })
    .eq('id', id)
    .select('formule, ends_at, profiles!enrollments_user_id_fkey(email, first_name)')
    .single();
  if (error || !enrollment) {
    console.error('Activation failed', error);
    return;
  }

  // Tell the candidate their access is open (best effort).
  const candidate = enrollment.profiles as unknown as { email: string; first_name: string | null } | null;
  if (candidate?.email) {
    try {
      await sendEmail({
        to: [{ email: candidate.email }],
        subject: 'Votre accès à la préparation au TCF Canada est activé',
        htmlContent:
          `<div style="font-family:Arial,sans-serif;font-size:15px;color:#0e1726"><p>Bonjour ${escapeHtml(candidate.first_name ?? '')},</p>` +
          `<p>Votre paiement est bien reçu : votre formule <strong>${escapeHtml(formuleName(enrollment.formule))}</strong> est active jusqu’au ${formatDate(enrollment.ends_at)}.</p>` +
          `<p>Connectez-vous à votre espace pour suivre votre préparation : https://formation.paulworldtravel.com/espace/</p>` +
          `<p>Bonne préparation,<br>Paul World Travel Formation<br>WhatsApp : +237 6 94 24 46 66</p></div>`,
        tags: ['formation', 'activation'],
      });
    } catch (e) {
      console.error('Activation email failed', e);
    }
  }
  revalidatePath('/admin/');
}

export async function setEnrollmentStatus(formData: FormData) {
  const id = String(formData.get('id') ?? '');
  const status = String(formData.get('status') ?? '');
  if (!id || !['pending', 'expired', 'cancelled'].includes(status)) return;
  const supabase = await createClient();
  const { error } = await supabase.from('enrollments').update({ status }).eq('id', id);
  if (error) console.error('Status change failed', error);
  revalidatePath('/admin/');
}

export async function saveNotes(formData: FormData) {
  const id = String(formData.get('id') ?? '');
  const notes = String(formData.get('staff_notes') ?? '').slice(0, 3000);
  if (!id) return;
  const supabase = await createClient();
  const { error } = await supabase.from('enrollments').update({ staff_notes: notes }).eq('id', id);
  if (error) console.error('Notes failed', error);
  revalidatePath('/admin/');
}
