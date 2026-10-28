import type { Metadata } from 'next';
import AdminNav from '@/components/admin/AdminNav';
import { Container } from '@/components/ui';
import { formatDate } from '@/lib/labels';
import { requireStaff } from '@/lib/staff';
import { setDraftStatus } from './actions';
import GenerateForm from './GenerateForm';

export const metadata: Metadata = { title: 'Générer des exercices', robots: { index: false } };
export const dynamic = 'force-dynamic';

type Draft = {
  id: string; epreuve: string; level: string; theme: string | null; status: string; created_at: string;
  content: { title: string; document: string; questions: { prompt: string; choices: string[]; answer: number; explanation: string }[] };
};

const statusLabel: Record<string, string> = { draft: 'Brouillon', approved: 'Validé', rejected: 'Rejeté' };

export default async function Generer() {
  const { supabase, isAdmin } = await requireStaff('/admin/generer/');
  const { data } = await supabase.from('question_drafts').select('*').in('epreuve', ['ce', 'co']).neq('status', 'rejected').order('created_at', { ascending: false }).limit(60).returns<Draft[]>();

  return (
    <>
      <header className="bg-night text-white">
        <Container className="py-10 sm:py-14">
          <AdminNav current="/admin/generer/" />
          <h1 className="display text-3xl sm:text-4xl">Générer des exercices</h1>
          <p className="mt-3 max-w-2xl text-blue-100">L’IA rédige des brouillons originaux. Relisez chaque texte, chaque question et chaque réponse avant de valider : un exercice validé pourra être proposé aux candidats.</p>
        </Container>
      </header>
      <section className="bg-paper py-10">
        <Container className="space-y-6">
          {isAdmin ? <GenerateForm /> : <p className="rounded-xl bg-white p-5 text-slate">La génération est réservée aux administrateurs.</p>}
          {(data ?? []).map((d) => (
            <article key={d.id} className="rounded-2xl border border-rule bg-white p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="heading text-lg text-night">{d.content.title || 'Sans titre'}</h2>
                <span className="text-sm text-slate">{d.epreuve === 'ce' ? 'Compréhension écrite' : 'Compréhension orale'} · {d.level}{d.theme ? ` · ${d.theme}` : ''} · {formatDate(d.created_at)} · <strong className={d.status === 'approved' ? 'text-green-700' : 'text-night'}>{statusLabel[d.status]}</strong></span>
              </div>
              <p className="mt-4 whitespace-pre-line rounded-xl bg-paper p-4 text-sm">{d.content.document}</p>
              <ol className="mt-4 space-y-3">
                {d.content.questions.map((q, i) => (
                  <li key={i} className="text-sm">
                    <p className="font-semibold text-night">{i + 1}. {q.prompt}</p>
                    <ul className="mt-1 grid grid-cols-1 gap-1 sm:grid-cols-2">{q.choices.map((c, j) => <li key={j} className={j === q.answer ? 'font-semibold text-green-700' : 'text-slate'}>{String.fromCharCode(65 + j)}. {c}</li>)}</ul>
                    <p className="mt-1 text-slate">{q.explanation}</p>
                  </li>
                ))}
              </ol>
              {isAdmin && (
                <div className="mt-5 flex gap-2 border-t border-rule pt-4">
                  {d.status !== 'approved' && <form action={setDraftStatus}><input type="hidden" name="id" value={d.id} /><input type="hidden" name="status" value="approved" /><button className="rounded-lg bg-green-700 px-4 py-2 text-sm font-bold text-white hover:bg-green-800">Valider</button></form>}
                  {d.status === 'approved' && <form action={setDraftStatus}><input type="hidden" name="id" value={d.id} /><input type="hidden" name="status" value="draft" /><button className="rounded-lg border border-rule px-4 py-2 text-sm font-semibold hover:bg-paper">Repasser en brouillon</button></form>}
                  <form action={setDraftStatus}><input type="hidden" name="id" value={d.id} /><input type="hidden" name="status" value="rejected" /><button className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-maple hover:bg-red-50">Rejeter</button></form>
                </div>
              )}
            </article>
          ))}
        </Container>
      </section>
    </>
  );
}
