import type { Feedback } from '@/lib/ai/prompts';
import { expressionBand } from '@/content/tcf';

export default function FeedbackView({ feedback, improvedLabel = 'Version améliorée' }: { feedback: Feedback; improvedLabel?: string }) {
  // Always read from the official table, also for corrections saved before this rule.
  const band = expressionBand(feedback.score);
  return (
    <div className="space-y-6" aria-live="polite">
      <div className="flex flex-col gap-6 rounded-2xl bg-night p-6 text-white sm:flex-row sm:items-center sm:p-8">
        <div className="flex flex-col-reverse">
          <p className="text-sm text-blue-200">Note estimée</p>
          <p className="display text-6xl text-container">{feedback.score}<span className="text-2xl text-blue-200"> / 20</span></p>
        </div>
        <div className="sm:border-l sm:border-white/15 sm:pl-6">
          <p className="font-semibold">Correspondance indicative : {band.nclc}, niveau {band.cecr}</p>
          <p className="mt-2 text-blue-100">{feedback.summary}</p>
        </div>
      </div>

      <div className="rounded-2xl border-2 border-container bg-white p-5 text-sm text-ink" role="note">
        <p className="font-bold text-night">Estimation indicative, sans aucune valeur officielle.</p>
        <p className="mt-1.5 text-slate">
          Seul le TCF Canada passé dans un centre agréé donne une note et un NCLC officiels. La note ci-dessus est estimée par une IA avec
          la grille pédagogique de Paul World Travel, qui n’est pas le barème officiel de France Éducation international. Le NCLC et le niveau
          sont lus dans le tableau de correspondance officiel du TCF Canada (France Éducation international et IRCC) : 4-5 = NCLC 4, 6 = NCLC 5,
          7-9 = NCLC 6, 10-11 = NCLC 7, 12-13 = NCLC 8, 14-15 = NCLC 9, 16-20 = NCLC 10 et plus.
        </p>
      </div>

      {feedback.criteria.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {feedback.criteria.map((c) => (
            <div key={c.name} className="rounded-2xl border border-rule bg-white p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="heading text-night">{c.name}</h3>
                <span className="font-bold text-ocean">{String(c.score).replace(".", ",")} / {c.max}</span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-paper" aria-hidden="true">
                <div className="h-full bg-ocean" style={{ width: `${Math.min(100, (c.score / (c.max || 5)) * 100)}%` }} />
              </div>
              <p className="mt-3 text-sm text-slate">{c.comment}</p>
            </div>
          ))}
        </div>
      )}

      {feedback.errors.length > 0 && (
        <div className="rounded-2xl border border-rule bg-white p-6">
          <h3 className="heading text-lg text-night">Erreurs à corriger</h3>
          <ul className="mt-4 divide-y divide-rule">
            {feedback.errors.map((e, i) => (
              <li key={i} className="py-4 first:pt-0 last:pb-0">
                <p><span className="rounded bg-red-50 px-1.5 py-0.5 text-maple line-through">{e.extract}</span> <span aria-hidden="true">→</span> <span className="rounded bg-green-50 px-1.5 py-0.5 font-semibold text-green-800">{e.correction}</span></p>
                <p className="mt-1.5 text-sm text-slate">{e.explanation}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {feedback.advice.length > 0 && (
        <div className="rounded-2xl border border-rule bg-white p-6">
          <h3 className="heading text-lg text-night">Pour progresser</h3>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate">{feedback.advice.map((a) => <li key={a}>{a}</li>)}</ol>
        </div>
      )}

      {feedback.improved && (
        <details className="rounded-2xl border border-rule bg-white p-6">
          <summary className="heading cursor-pointer text-lg text-night">{improvedLabel}</summary>
          <p className="mt-4 whitespace-pre-line text-ink">{feedback.improved}</p>
        </details>
      )}

      <p className="text-sm text-slate">
        Grille interne en quatre critères notés sur 5, inspirée des dimensions linguistique, pragmatique et sociolinguistique décrites par
        France Éducation international. Votre formateur peut relire cette correction et la modifier.
      </p>
    </div>
  );
}
