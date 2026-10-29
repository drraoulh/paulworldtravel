'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { writingTasks, wordCount, type WritingTask } from '@/content/expression';
import { getSeries } from '@/content/series';
import type { Feedback } from '@/lib/ai/prompts';
import { saveMockResult } from '@/lib/results';
import { stopSpeaking } from '@/lib/speech';
import SeriesRunner from './SeriesRunner';

type Phase = 'intro' | 'co' | 'break-ce' | 'ce' | 'break-ee' | 'ee' | 'results';

const EE_SECONDS = 60 * 60;
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.max(0, s) % 60).padStart(2, '0')}`;

/** One subject per task, different for each mock exam number. */
const subjectsFor = (serie: number) => ([1, 2, 3] as const).map((n) => {
  const list = writingTasks.filter((t) => t.task === n);
  return list[(serie - 1) % list.length];
});

export default function MockExam({ series }: { series: number[] }) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [serie, setSerie] = useState(series[0]);
  const [co, setCo] = useState(0);
  const [ce, setCe] = useState(0);
  const [texts, setTexts] = useState(['', '', '']);
  const top = useRef<HTMLDivElement>(null);
  const subjects = subjectsFor(serie);

  useEffect(() => { top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, [phase]);
  useEffect(() => () => stopSpeaking(), []);
  // Leaving the page by accident would lose the exam.
  useEffect(() => {
    if (phase === 'intro' || phase === 'results') return;
    const warn = (e: BeforeUnloadEvent) => { e.preventDefault(); };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [phase]);

  const coSeries = getSeries('co', serie)!;
  const ceSeries = getSeries('ce', serie)!;

  return (
    <div ref={top} className="scroll-mt-24">
      {phase === 'intro' && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-6 sm:p-8">
            <h2 className="heading text-2xl text-night">Le déroulement</h2>
            <ol className="mt-5 space-y-4">
              {[
                ['Compréhension orale', '39 questions, 35 minutes. Chaque document n’est diffusé qu’une fois ; la question s’affiche après l’écoute.'],
                ['Compréhension écrite', '39 questions, 60 minutes. Vous pouvez naviguer entre les questions.'],
                ['Expression écrite', '3 tâches, 60 minutes au total. Vous gérez votre temps entre les tâches, comme à l’examen.'],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="display text-3xl text-container" aria-hidden="true">{i + 1}</span>
                  <span><strong className="block text-night">{t}</strong><span className="text-slate">{d}</span></span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-slate">
              Durée totale : environ 2 h 35, avec une pause possible entre les épreuves. Prévoyez des écouteurs, un endroit calme et ne fermez pas la page.
              L’expression orale se passe à part, dans le <Link href="/epreuve/expression-orale/simulateur/" className="font-semibold text-ocean hover:underline">simulateur oral</Link>.
            </p>
          </div>
          <fieldset className="rounded-2xl bg-white p-6 sm:p-8">
            <legend className="sr-only">Choisir l’examen</legend>
            <p className="heading text-lg text-night">Choisissez votre examen blanc</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {series.map((n) => (
                <label key={n} className={`cursor-pointer rounded-xl border-2 px-5 py-3 font-semibold ${serie === n ? 'border-ocean bg-blue-50 text-night' : 'border-rule text-slate hover:border-ocean/50'}`}>
                  <input type="radio" name="serie" className="sr-only" checked={serie === n} onChange={() => setSerie(n)} />
                  Examen blanc {n}
                </label>
              ))}
            </div>
            <button onClick={() => setPhase('co')} className="mt-6 rounded-full bg-maple px-6 py-3.5 font-bold text-white hover:bg-red-800">Commencer l’examen</button>
          </fieldset>
        </div>
      )}

      {phase === 'co' && (
        <section>
          <p className="mb-4 font-semibold text-night">Épreuve 1 sur 3 : compréhension orale</p>
          <SeriesRunner key="co" epreuve="co" number={serie} questions={coSeries.questions} forceMode="exam" onFinish={(s) => { setCo(s); setPhase('break-ce'); }} />
        </section>
      )}

      {(phase === 'break-ce' || phase === 'break-ee') && (
        <div className="rounded-2xl bg-white p-6 text-center sm:p-10">
          <p className="text-slate">Épreuve terminée. Prenez quelques minutes de pause si vous le souhaitez.</p>
          <p className="heading mt-4 text-2xl text-night">Prochaine épreuve : {phase === 'break-ce' ? 'compréhension écrite, 60 minutes' : 'expression écrite, 60 minutes'}</p>
          <button onClick={() => setPhase(phase === 'break-ce' ? 'ce' : 'ee')} className="mt-6 rounded-full bg-maple px-6 py-3.5 font-bold text-white hover:bg-red-800">Commencer l’épreuve</button>
        </div>
      )}

      {phase === 'ce' && (
        <section>
          <p className="mb-4 font-semibold text-night">Épreuve 2 sur 3 : compréhension écrite</p>
          <SeriesRunner key="ce" epreuve="ce" number={serie} questions={ceSeries.questions} forceMode="exam" onFinish={(s) => { setCe(s); setPhase('break-ee'); }} />
        </section>
      )}

      {phase === 'ee' && (
        <MockWriting
          subjects={subjects}
          texts={texts}
          setTexts={setTexts}
          onFinish={() => {
            saveMockResult({ serie, co, ce, total: 39, date: new Date().toISOString() });
            setPhase('results');
          }}
        />
      )}

      {phase === 'results' && <MockResults serie={serie} co={co} ce={ce} subjects={subjects} texts={texts} />}
    </div>
  );
}

function MockWriting({ subjects, texts, setTexts, onFinish }: {
  subjects: WritingTask[];
  texts: string[];
  setTexts: (t: string[]) => void;
  onFinish: () => void;
}) {
  const [tab, setTab] = useState(0);
  const [deadline] = useState(() => Date.now() + EE_SECONDS * 1000);
  const [left, setLeft] = useState(EE_SECONDS);
  const finished = useRef(false);
  const t = subjects[tab];
  const words = wordCount(texts[tab]);

  useEffect(() => {
    const id = setInterval(() => {
      const s = Math.max(0, Math.round((deadline - Date.now()) / 1000));
      setLeft(s);
      if (s === 0 && !finished.current) { finished.current = true; onFinish(); }
    }, 500);
    return () => clearInterval(id);
  }, [deadline, onFinish]);

  return (
    <section className="space-y-4">
      <p className="font-semibold text-night">Épreuve 3 sur 3 : expression écrite</p>
      <div className="sticky top-[4.5rem] z-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/95 px-5 py-3 shadow-sm backdrop-blur">
        <div className="flex gap-1" role="tablist">
          {subjects.map((s, i) => (
            <button key={s.id} role="tab" aria-selected={tab === i} onClick={() => setTab(i)} className={`rounded-lg px-4 py-2 text-sm font-semibold ${tab === i ? 'bg-night text-white' : 'bg-paper text-slate hover:text-night'}`}>
              Tâche {i + 1} <span className="font-normal">({wordCount(texts[i])} mots)</span>
            </button>
          ))}
        </div>
        <span className={`font-mono text-lg ${left < 300 ? 'text-maple' : 'text-night'}`} aria-label="Temps restant">{fmt(left)}</span>
      </div>
      <div className="rounded-2xl bg-white p-6 sm:p-8">
        <p className="text-sm font-bold text-ocean">Tâche {tab + 1} : {t.minWords} à {t.maxWords} mots, environ {t.minutes} min conseillées</p>
        <p className="mt-3 text-lg text-ink">{t.prompt}</p>
        {t.documents && <div className="mt-4 space-y-2">{t.documents.map((d) => <blockquote key={d} className="border-l-4 border-sky bg-paper p-4 text-sm">{d}</blockquote>)}</div>}
        <label className="mt-6 block">
          <span className="sr-only">Votre texte pour la tâche {tab + 1}</span>
          <textarea
            value={texts[tab]}
            onChange={(e) => setTexts(texts.map((v, i) => (i === tab ? e.target.value : v)))}
            rows={12}
            spellCheck={false}
            className="w-full rounded-xl border border-rule p-4 text-lg leading-relaxed text-ink focus:border-ocean focus:outline-none"
          />
        </label>
        <p className={`mt-2 text-sm ${words >= t.minWords && words <= t.maxWords ? 'text-green-700' : 'text-slate'}`}>{words} mots</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {tab < 2 && <button onClick={() => setTab(tab + 1)} className="rounded-full bg-night px-6 py-3.5 font-bold text-white hover:bg-ocean">Tâche suivante</button>}
          <button
            onClick={() => { if (confirm('Rendre votre copie maintenant ? Vous ne pourrez plus la modifier.')) { finished.current = true; onFinish(); } }}
            className="rounded-full bg-container px-6 py-3.5 font-bold text-night hover:bg-container-hover"
          >
            Rendre ma copie
          </button>
        </div>
        <p className="mt-4 text-sm text-slate">Correcteur orthographique désactivé, comme le jour de l’examen.</p>
      </div>
    </section>
  );
}

function MockResults({ serie, co, ce, subjects, texts }: { serie: number; co: number; ce: number; subjects: WritingTask[]; texts: string[] }) {
  const [grades, setGrades] = useState<(Feedback | string | null)[]>([null, null, null]);
  const [busy, setBusy] = useState(false);

  const correct = async () => {
    setBusy(true);
    const out: (Feedback | string | null)[] = [...grades];
    for (let i = 0; i < 3; i++) {
      if (wordCount(texts[i]) < 20) { out[i] = 'Texte trop court pour être corrigé.'; continue; }
      try {
        const res = await fetch('/api/ai/writing/', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ taskId: subjects[i].id, text: texts[i] }) });
        const data = await res.json();
        out[i] = res.ok ? data.feedback : data.error ?? 'La correction a échoué.';
      } catch {
        out[i] = 'La correction a échoué.';
      }
      setGrades([...out]);
    }
    setBusy(false);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-night p-6 text-white sm:p-8">
        <p className="text-sm text-blue-200">Examen blanc {serie} terminé</p>
        <div className="mt-4 grid gap-6 sm:grid-cols-3">
          <div><p className="text-blue-100">Compréhension orale</p><p className="display text-4xl text-container">{co}<span className="text-xl text-blue-200"> / 39</span></p></div>
          <div><p className="text-blue-100">Compréhension écrite</p><p className="display text-4xl text-container">{ce}<span className="text-xl text-blue-200"> / 39</span></p></div>
          <div><p className="text-blue-100">Expression écrite</p><p className="mt-2 text-blue-100">{texts.filter((t) => wordCount(t) > 0).length} / 3 tâches rédigées</p></div>
        </div>
        <p className="mt-6 text-sm text-blue-100">Les résultats des compréhensions indiquent votre réussite, pas un score officiel sur 699. Le détail de chaque question est dans le tableau de bord de chaque épreuve.</p>
      </div>

      <div className="rounded-2xl bg-white p-6 sm:p-8">
        <h2 className="heading text-xl text-night">Votre expression écrite</h2>
        <p className="mt-2 text-slate">Faites corriger vos trois textes par l’IA : cela utilise trois corrections d’écrit de votre compte.</p>
        <button onClick={correct} disabled={busy} className="mt-4 rounded-full bg-container px-6 py-3.5 font-bold text-night hover:bg-container-hover disabled:opacity-50">
          {busy ? 'Correction en cours…' : 'Faire corriger mes trois textes'}
        </button>
        <div className="mt-6 space-y-4">
          {subjects.map((s, i) => {
            const g = grades[i];
            return (
              <details key={s.id} className="rounded-xl bg-paper p-5">
                <summary className="cursor-pointer font-semibold text-night">
                  Tâche {i + 1} ({wordCount(texts[i])} mots)
                  {g && typeof g !== 'string' && <span className="ml-2 text-ocean">{g.score} / 20</span>}
                </summary>
                <p className="mt-3 text-sm text-slate">{s.prompt}</p>
                <p className="mt-3 whitespace-pre-line text-ink">{texts[i] || '(vide)'}</p>
                {typeof g === 'string' && <p className="mt-3 text-maple">{g}</p>}
                {g && typeof g !== 'string' && (
                  <div className="mt-4 space-y-2 border-t border-rule pt-4 text-sm">
                    <p className="text-ink">{g.summary}</p>
                    <ul className="list-disc pl-5 text-slate">{g.criteria.map((c) => <li key={c.name}>{c.name} : {String(c.score).replace('.', ',')} / {c.max}</li>)}</ul>
                    <p className="text-slate">Estimation indicative, sans valeur officielle. Correction complète dans votre espace.</p>
                  </div>
                )}
              </details>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/espace/" className="rounded-full bg-night px-6 py-3.5 font-bold text-white hover:bg-ocean">Voir mon espace</Link>
        <Link href="/epreuve/expression-orale/simulateur/" className="rounded-full border border-rule px-6 py-3.5 font-semibold text-night hover:border-ocean">Passer l’expression orale</Link>
      </div>
    </div>
  );
}
