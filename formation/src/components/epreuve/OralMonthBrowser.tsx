'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

type Subject = { task: 2 | 3; index: number; prompt: string; answer?: string; id: string };
type Part = { n: number; t2: Subject[]; t3: Subject[] };

const PER_TASK = 5;
const fold = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
const TASKS = { 2: { name: 'Tâche 2', detail: 'Interaction', answerLabel: 'Voir des exemples de questions' }, 3: { name: 'Tâche 3', detail: 'Point de vue', answerLabel: 'Voir le corrigé' } } as const;

/**
 * Session subjects of one month, in parts of five subjects per task, with a keyword
 * search across the month. Each subject opens in the simulator or shows its model answer.
 */
export default function OralMonthBrowser({ slug, ids, t2, t3, c2, c3 }: { slug: string; ids: { t2: string[]; t3: string[] }; t2: string[]; t3: string[]; c2?: string[]; c3?: string[] }) {
  const [query, setQuery] = useState('');
  const parts = useMemo<Part[]>(() => {
    const make = (task: 2 | 3, list: string[], answers: string[] | undefined, id: string[]) =>
      list.map((prompt, index) => ({ task, index, prompt, answer: answers?.[index] || undefined, id: id[index] }));
    const a = make(2, t2, c2, ids.t2);
    const b = make(3, t3, c3, ids.t3);
    const count = Math.max(Math.ceil(a.length / PER_TASK), Math.ceil(b.length / PER_TASK));
    return Array.from({ length: count }, (_, k) => ({ n: k + 1, t2: a.slice(k * PER_TASK, (k + 1) * PER_TASK), t3: b.slice(k * PER_TASK, (k + 1) * PER_TASK) }));
  }, [t2, t3, c2, c3, ids]);
  const q = fold(query.trim());
  const found = q.length >= 2 ? parts.flatMap((p) => [...p.t2, ...p.t3]).filter((s) => fold(s.prompt).includes(q)) : null;

  return (
    <div className="space-y-5">
      <nav aria-label="Parties du mois" className="sticky top-[4.5rem] z-10 -mx-4 overflow-x-auto bg-paper/95 px-4 py-2 backdrop-blur">
        <ul className="flex gap-2">
          {parts.map((p) => (
            <li key={p.n} className="shrink-0">
              <a href={`#partie-${p.n}`} onClick={() => setQuery('')} className="block rounded-xl border border-rule bg-white px-4 py-2 text-center hover:border-ocean">
                <span className="block text-sm font-bold text-ocean">Partie {p.n}</span>
                <span className="block text-xs text-slate">{p.t2.length + p.t3.length} sujets</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <label className="block">
        <span className="sr-only">Rechercher un sujet</span>
        <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher un sujet par mot-clé (logement, travail, sport…)"
          className="w-full rounded-2xl border border-rule bg-white px-5 py-3.5 text-ink focus:border-ocean focus:outline-none" />
      </label>

      {found ? (
        <section aria-live="polite" className="rounded-2xl bg-white p-5 sm:p-6">
          <p className="text-sm text-slate">{found.length} sujet{found.length > 1 ? 's' : ''} pour « {query.trim()} »</p>
          {found.length > 0 && <ol className="mt-3 divide-y divide-rule">{found.map((s) => <SubjectItem key={s.id} slug={slug} s={s} showTask />)}</ol>}
        </section>
      ) : (
        parts.map((p, i) => <PartCard key={p.n} slug={slug} part={p} open={i === 0} />)
      )}
    </div>
  );
}

function PartCard({ slug, part, open }: { slug: string; part: Part; open: boolean }) {
  const [tab, setTab] = useState<2 | 3>(part.t2.length ? 2 : 3);
  const list = tab === 2 ? part.t2 : part.t3;
  return (
    <details id={`partie-${part.n}`} open={open} className="group scroll-mt-32 overflow-hidden rounded-2xl bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 bg-night px-6 py-5 text-white [&::-webkit-details-marker]:hidden">
        <span className="heading text-xl">Partie {part.n}</span>
        <span className="flex items-center gap-3">
          <span className="rounded-full bg-white/15 px-3 py-1 text-sm">{part.t2.length + part.t3.length} sujets</span>
          <span aria-hidden="true" className="text-2xl transition-transform group-open:rotate-180">⌄</span>
        </span>
      </summary>
      <div className="p-4 sm:p-6">
        <div role="tablist" aria-label={`Tâches de la partie ${part.n}`} className="grid grid-cols-2 gap-2">
          {([2, 3] as const).map((t) => (
            <button key={t} type="button" role="tab" aria-selected={tab === t} disabled={!(t === 2 ? part.t2 : part.t3).length} onClick={() => setTab(t)}
              className={`rounded-xl border-2 px-3 py-2.5 text-left disabled:opacity-40 ${tab === t ? 'border-ocean bg-container' : 'border-rule bg-white hover:border-ocean/50'}`}>
              <span className="block font-bold text-night">{TASKS[t].name}</span>
              <span className="block text-xs text-slate">{TASKS[t].detail} · {(t === 2 ? part.t2 : part.t3).length} sujets</span>
            </button>
          ))}
        </div>
        <ol role="tabpanel" className="mt-3 divide-y divide-rule">{list.map((s) => <SubjectItem key={s.id} slug={slug} s={s} />)}</ol>
      </div>
    </details>
  );
}

function SubjectItem({ slug, s, showTask = false }: { slug: string; s: Subject; showTask?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="py-4">
      {showTask && <span className="mb-1 inline-block rounded bg-container px-2 py-0.5 text-xs font-bold text-night">{TASKS[s.task].name}</span>}
      <p className="text-ink">{s.prompt}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Link href={`/epreuve/${slug}/simulateur/?sujet=${encodeURIComponent(s.id)}`} className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-800">M’entraîner sur ce sujet</Link>
        {s.answer && (
          <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="rounded-full border-2 border-night px-4 py-2 text-sm font-bold text-night hover:bg-night hover:text-white">
            {open ? 'Masquer' : TASKS[s.task].answerLabel}
          </button>
        )}
      </div>
      {open && s.answer && <p className="reading mt-3 whitespace-pre-line rounded-xl bg-paper p-4 text-ink">{s.answer}</p>}
    </li>
  );
}
