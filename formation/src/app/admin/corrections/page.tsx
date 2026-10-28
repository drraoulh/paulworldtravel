import type { Metadata } from 'next';
import Link from 'next/link';
import AdminNav from '@/components/admin/AdminNav';
import { Container } from '@/components/ui';
import { formatDate } from '@/lib/labels';
import type { Feedback } from '@/lib/ai/prompts';
import { requireStaff } from '@/lib/staff';
import { reviewSubmission } from './actions';

export const metadata: Metadata = { title: 'Corrections', robots: { index: false } };
export const dynamic = 'force-dynamic';

type Row = {
  id: string; kind: 'ee' | 'eo'; task_prompt: string; content: string | null; transcript: string | null;
  word_count: number | null; duration_seconds: number | null; ai_score: number | null; ai_feedback: Feedback | null;
  trainer_score: number | null; trainer_comment: string | null; status: string; created_at: string;
  profiles: { email: string; first_name: string | null; last_name: string | null } | null;
};

export default async function Corrections({ searchParams }: { searchParams: Promise<{ statut?: string; erreur?: string }> }) {
  const { supabase } = await requireStaff('/admin/corrections/');
  const params = await searchParams;
  const filter = params.statut === 'relues' ? 'trainer_reviewed' : 'ai_reviewed';
  const { data, error } = await supabase
    .from('submissions')
    .select('*, profiles!submissions_user_id_fkey(email, first_name, last_name)')
    .eq('status', filter)
    .order('created_at', { ascending: false })
    .limit(100)
    .returns<Row[]>();

  return (
    <>
      <header className="bg-night text-white">
        <Container className="py-10 sm:py-14">
          <AdminNav current="/admin/corrections/" />
          <h1 className="display text-3xl sm:text-4xl">Corrections</h1>
          <p className="mt-3 max-w-2xl text-blue-100">Productions corrigées par l’IA. Relisez-les, ajustez la note si besoin et laissez un commentaire : le candidat le voit dans son espace.</p>
          <nav className="mt-6 flex gap-2" aria-label="Filtrer">
            <Link href="/admin/corrections/" className={`rounded-full px-4 py-2 text-sm font-semibold ${filter === 'ai_reviewed' ? 'bg-container text-night' : 'bg-white/10 hover:bg-white/20'}`}>À relire</Link>
            <Link href="/admin/corrections/?statut=relues" className={`rounded-full px-4 py-2 text-sm font-semibold ${filter === 'trainer_reviewed' ? 'bg-container text-night' : 'bg-white/10 hover:bg-white/20'}`}>Relues</Link>
          </nav>
        </Container>
      </header>
      <section className="bg-paper py-10">
        <Container className="space-y-4">
          {params.erreur && <p role="alert" className="rounded-xl bg-red-50 p-4 text-maple">{params.erreur === 'note' ? 'La note doit être comprise entre 0 et 20.' : 'L’enregistrement a échoué. Réessayez.'}</p>}
          {error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-maple">Impossible de charger les corrections.</p>}
          {!error && (data ?? []).length === 0 && <p className="rounded-xl bg-white p-6 text-slate">Aucune production dans cette catégorie.</p>}
          {(data ?? []).map((r) => (
            <article key={r.id} className="rounded-2xl border border-rule bg-white p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="heading text-lg text-night">{[r.profiles?.first_name, r.profiles?.last_name].filter(Boolean).join(' ') || r.profiles?.email}</h2>
                  <p className="text-sm text-slate">{r.kind === 'ee' ? `Expression écrite, ${r.word_count} mots` : `Expression orale, ${r.duration_seconds} s`} · {formatDate(r.created_at)}</p>
                </div>
                <p className="text-right text-sm"><span className="block text-slate">Note IA</span><span className="heading text-2xl text-night">{r.ai_score ?? '—'} / 20</span></p>
              </div>
              <p className="mt-4 text-sm font-semibold text-night">Sujet</p>
              <p className="text-sm text-slate">{r.task_prompt}</p>
              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-bold text-ocean">{r.kind === 'ee' ? 'Texte du candidat' : 'Transcription'} et analyse IA</summary>
                <p className="mt-3 whitespace-pre-line rounded-xl bg-paper p-4 text-sm">{r.content ?? r.transcript}</p>
                {r.ai_feedback && (
                  <div className="mt-3 space-y-2 text-sm">
                    <p>{r.ai_feedback.summary}</p>
                    <ul className="list-disc pl-5 text-slate">{r.ai_feedback.criteria.map((c) => <li key={c.name}>{c.name} : {c.score}/{c.max}. {c.comment}</li>)}</ul>
                  </div>
                )}
              </details>
              <form action={reviewSubmission} className="mt-5 grid grid-cols-1 gap-3 border-t border-rule pt-5 sm:grid-cols-[8rem_1fr_auto] sm:items-end">
                <input type="hidden" name="id" value={r.id} />
                <label className="text-sm">
                  <span className="block font-semibold text-night">Note /20</span>
                  <input name="trainer_score" inputMode="decimal" required defaultValue={r.trainer_score ?? r.ai_score ?? ''} className="mt-1 w-full rounded-lg border border-rule px-3 py-2" />
                </label>
                <label className="text-sm">
                  <span className="block font-semibold text-night">Commentaire du formateur</span>
                  <input name="trainer_comment" defaultValue={r.trainer_comment ?? ''} placeholder="Points forts, priorités de travail…" className="mt-1 w-full rounded-lg border border-rule px-3 py-2" />
                </label>
                <button className="rounded-lg bg-night px-4 py-2.5 text-sm font-bold text-white hover:bg-ocean">{r.status === 'trainer_reviewed' ? 'Mettre à jour' : 'Valider'}</button>
              </form>
            </article>
          ))}
        </Container>
      </section>
    </>
  );
}
