'use server';

import { revalidatePath } from 'next/cache';
import { aiConfigured, chat, MODELS, parseJson } from '@/lib/ai/openrouter';
import { reformulationPrompt } from '@/lib/ai/prompts';
import type { CombiTask, CombinaisonContent, ReportContent } from '@/lib/combinaisons';
import { createAdminClient } from '@/lib/supabase/admin';
import { requireStaff } from '@/lib/staff';

const PATH = '/admin/combinaisons/';
const str = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max);

async function staffAndAdmin() {
  const staff = await requireStaff(PATH);
  const admin = createAdminClient();
  if (!admin) throw new Error('SUPABASE_SECRET_KEY manquante : ajoutez-la dans Vercel pour gérer les combinaisons.');
  return { ...staff, admin };
}

/** Turns a candidate's report into a reworded draft combination (AI), and archives the report. */
export async function reformulate(form: FormData) {
  const { admin, user } = await staffAndAdmin();
  if (!aiConfigured()) throw new Error('OpenRouter n’est pas configuré.');
  const id = str(form.get('id'), 40);
  const { data: report } = await admin.from('question_drafts').select('id, content').eq('id', id).single();
  const r = report?.content as ReportContent | undefined;
  if (!r || r.kind !== 'report') return;

  const answer = await chat(MODELS.grading(), reformulationPrompt(r.tasks, r.notes), { json: true, maxTokens: 3500, temperature: 0.7 });
  const out = parseJson<{ theme?: string; tasks?: Partial<CombiTask>[] }>(answer);
  const tasks = [0, 1, 2].map((i) => {
    const t = out.tasks?.[i] ?? {};
    return {
      prompt: str(t.prompt, 1500),
      corrige: str(t.corrige, 3000) || undefined,
      documents: i === 2 && Array.isArray(t.documents) ? t.documents.slice(0, 2).map((d) => str(d, 600)) : undefined,
    };
  }) as CombinaisonContent['tasks'];

  const content: CombinaisonContent = { kind: 'combinaison', year: r.year, month: r.month, source: 'candidats', reportId: id, tasks };
  await admin.from('question_drafts').insert({ created_by: user.id, epreuve: 'ee', level: 'B2', theme: str(out.theme, 120) || null, content, status: 'draft' });
  // "rejected" keeps the raw report out of every public list.
  await admin.from('question_drafts').update({ status: 'rejected' }).eq('id', id);
  revalidatePath(PATH);
}

/** Saves the edited combination; publishes it when asked. Also used to create one from scratch. */
export async function saveCombinaison(form: FormData) {
  const { admin, user } = await staffAndAdmin();
  const id = str(form.get('id'), 40);
  const year = Number(form.get('year'));
  const month = Number(form.get('month'));
  if (!Number.isInteger(year) || year < 2020 || year > 2100 || !(month >= 1 && month <= 12)) throw new Error('Année ou mois invalide.');
  const task = (n: number): CombiTask => ({
    prompt: str(form.get(`t${n}`), 1500),
    corrige: str(form.get(`c${n}`), 3000) || undefined,
    documents: n === 3 ? [str(form.get('d1'), 600), str(form.get('d2'), 600)].filter(Boolean) : undefined,
  });
  const tasks = [task(1), task(2), task(3)] as CombinaisonContent['tasks'];
  const publish = form.get('intent') === 'publish';
  if (publish && tasks.some((t) => t.prompt.length < 20)) throw new Error('Chaque tâche doit avoir une consigne avant publication.');

  const source = form.get('source') === 'equipe' ? 'equipe' : 'candidats';
  const previous = id ? (await admin.from('question_drafts').select('content').eq('id', id).single()).data?.content as CombinaisonContent | undefined : undefined;
  const content: CombinaisonContent = { kind: 'combinaison', year, month, source, reportId: previous?.reportId, tasks };
  const row = { theme: str(form.get('theme'), 120) || null, content, status: publish ? 'approved' : 'draft' };
  const { error } = id
    ? await admin.from('question_drafts').update(row).eq('id', id)
    : await admin.from('question_drafts').insert({ ...row, created_by: user.id, epreuve: 'ee', level: 'B2' });
  if (error) throw new Error(error.message);
  revalidatePath(PATH);
  revalidatePath('/epreuve/expression-ecrite/combinaisons/');
}

export async function setCombinaisonStatus(form: FormData) {
  const { admin } = await staffAndAdmin();
  const id = str(form.get('id'), 40);
  const status = str(form.get('status'), 10);
  if (!id || !['draft', 'rejected'].includes(status)) return;
  await admin.from('question_drafts').update({ status }).eq('id', id);
  revalidatePath(PATH);
}
