import type { Feedback } from '@/lib/ai/prompts';

export default function FeedbackView({ feedback, improvedLabel = 'Version améliorée' }: { feedback: Feedback; improvedLabel?: string }) {
  return (
    <div className="space-y-6" aria-live="polite">
      <div className="flex flex-col gap-6 rounded-2xl bg-night p-6 text-white sm:flex-row sm:items-center sm:p-8">
        <div className="flex flex-col-reverse">
          <p className="text-sm text-blue-200">Note estimée</p>
          <p className="display text-6xl text-container">{feedback.score}<span className="text-2xl text-blue-200"> / 20</span></p>
        </div>
        <div className="sm:border-l sm:border-white/15 sm:pl-6">
          <p className="font-semibold">{[feedback.level && `Niveau ${feedback.level}`, feedback.nclc].filter(Boolean).join(', ')}</p>
          <p className="mt-2 text-blue-100">{feedback.summary}</p>
        </div>
      </div>

      {feedback.criteria.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {feedback.criteria.map((c) => (
            <div key={c.name} className="rounded-2xl border border-rule bg-white p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="heading text-night">{c.name}</h3>
                <span className="font-bold text-ocean">{c.score} / {c.max}</span>
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
        Cette note est une estimation produite par une IA à partir de la grille du TCF Canada. Elle ne remplace pas l’évaluation officielle ; votre formateur peut la relire et la corriger.
      </p>
    </div>
  );
}
