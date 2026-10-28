'use server';

import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import type { ReportContent } from '@/lib/combinaisons';

export type ReportState = { ok: boolean; message: string } | null;

const clean = (v: FormDataEntryValue | null, max: number) => String(v ?? '').trim().slice(0, max);

/** Saves the subjects a candidate remembers from their exam. Reviewed by the team before anything is published. */
export async function submitReport(_: ReportState, form: FormData): Promise<ReportState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, message: 'Connectez-vous pour partager vos sujets.' };
  const admin = createAdminClient();
  if (!admin) return { ok: false, message: 'Le partage de sujets n’est pas encore activé. Réessayez bientôt.' };

  const year = Number(form.get('year'));
  const month = Number(form.get('month'));
  const tasks = [clean(form.get('t1'), 1500), clean(form.get('t2'), 1500), clean(form.get('t3'), 2500)] as ReportContent['tasks'];
  const now = new Date();
  if (!Number.isInteger(year) || year < 2023 || year > now.getFullYear() || !(month >= 1 && month <= 12)) {
    return { ok: false, message: 'Indiquez le mois et l’année de votre examen.' };
  }
  if (new Date(year, month - 1, 1) > now) return { ok: false, message: 'La date de l’examen ne peut pas être dans le futur.' };
  if (tasks.filter((t) => t.length >= 15).length < 1) return { ok: false, message: 'Décrivez au moins une tâche, même en quelques mots.' };
  if (form.get('consent') !== 'on') return { ok: false, message: 'Cochez la case pour accepter que nous reformulions vos sujets.' };

  // At most five reports a day per candidate.
  const { count } = await admin.from('question_drafts').select('id', { count: 'exact', head: true })
    .eq('created_by', user.id).eq('content->>kind', 'report').gte('created_at', new Date(Date.now() - 86_400_000).toISOString());
  if ((count ?? 0) >= 5) return { ok: false, message: 'Merci ! Vous avez déjà partagé plusieurs sujets aujourd’hui.' };

  const content: ReportContent = {
    kind: 'report', year, month, tasks,
    city: clean(form.get('city'), 80) || undefined,
    notes: clean(form.get('notes'), 800) || undefined,
  };
  const { error } = await admin.from('question_drafts').insert({
    created_by: user.id, epreuve: 'ee', level: 'B2', theme: `Sujets rapportés, ${month}/${year}`, content, status: 'draft',
  });
  if (error) {
    console.error('Saving report failed', error);
    return { ok: false, message: 'L’envoi a échoué. Réessayez dans quelques minutes.' };
  }
  return { ok: true, message: 'Merci ! Votre formateur va relire et reformuler vos sujets avant de les publier.' };
}
