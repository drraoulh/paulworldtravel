'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { wordCount, type WritingTask } from '@/content/expression';
import type { Feedback } from '@/lib/ai/prompts';
import { nclcFor } from '@/lib/nclc';
import FeedbackView from '@/components/ai/FeedbackView';
import { fmt } from '@/components/ai/useRecorder';
import { refreshAccess } from '@/components/access/useAccess';

const TOTAL = 60 * 60;
const ACCENTS = ['é', 'è', 'ê', 'ë', 'à', 'â', 'ç', 'î', 'ï', 'ô', 'ù', 'û', 'œ', 'É', 'À', 'Ç', '«', '»', '’'];
type Result = { feedback: Feedback } | { error: string } | { empty: true };
const scoreOf = (r: Result | undefined) => (r && 'feedback' in r ? r.feedback.score : 0);

/**
 * Full writing combination in exam conditions: 60 minutes for the three tasks,
 * free navigation, accent keys, then the three texts are corrected together.
 */
export default function CombinationExam({ id, label, tasks }: { id: string; label: string; tasks: WritingTask[] }) {
  const key = `pwt-ee-combi-${id}`;
  const [phase, setPhase] = useState<'intro' | 'exam' | 'grading' | 'done'>('intro');
  const [texts, setTexts] = useState(['', '', '']);
  const [tab, setTab] = useState(0);
  const [deadline, setDeadline] = useState(0);
  const [left, setLeft] = useState(TOTAL);
  const [used, setUsed] = useState(0);
  const [results, setResults] = useState<Result[]>([]);
  const [grading, setGrading] = useState(0);
  const area = useRef<HTMLTextAreaElement>(null);
  const finished = useRef(false);

  // A draft in progress survives a reload: same texts, same deadline.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key) ?? 'null');
      if (saved && Array.isArray(saved.texts) && saved.deadline > Date.now()) {
        setTexts(saved.texts.map((t: unknown) => String(t ?? '')));
        setDeadline(saved.deadline);
        setPhase('exam');
      }
    } catch { /* The draft is optional. */ }
  }, [key]);
  useEffect(() => {
    if (phase !== 'exam') return;
    try { localStorage.setItem(key, JSON.stringify({ texts, deadline })); } catch { /* ignore */ }
  }, [key, phase, texts, deadline]);

  const finish = useCallback(async () => {
    if (finished.current) return;
    finished.current = true;
    setUsed(Math.min(TOTAL, TOTAL - Math.round((deadline - Date.now()) / 1000)));
    setPhase('grading');
    window.scrollTo({ top: 0 });
    const out: Result[] = [];
    for (let i = 0; i < 3; i++) {
      setGrading(i + 1);
      if (wordCount(texts[i]) < 20) { out.push({ empty: true }); continue; }
      try {
        const res = await fetch('/api/ai/writing/', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ taskId: tasks[i].id, text: texts[i] }) });
        const data = await res.json();
        out.push(res.ok ? { feedback: data.feedback } : { error: data.error ?? 'La correction a échoué.' });
      } catch {
        out.push({ error: 'La correction a échoué. Vérifiez votre connexion.' });
      }
      setResults([...out]);
    }
    setResults(out);
    try { localStorage.removeItem(key); } catch { /* ignore */ }
    refreshAccess();
    setPhase('done');
  }, [deadline, key, tasks, texts]);

  useEffect(() => {
    if (phase !== 'exam') return;
    const tick = () => {
      const s = Math.max(0, Math.round((deadline - Date.now()) / 1000));
      setLeft(s);
      if (s === 0) finish();
    };
    tick();
    const timer = setInterval(tick, 500);
    return () => clearInterval(timer);
  }, [phase, deadline, finish]);

  const start = () => {
    finished.current = false;
    setTexts(['', '', '']);
    setResults([]);
    setTab(0);
    setDeadline(Date.now() + TOTAL * 1000);
    setPhase('exam');
  };

  const insert = (ch: string) => {
    const el = area.current;
    const value = texts[tab];
    const [a, b] = el ? [el.selectionStart, el.selectionEnd] : [value.length, value.length];
    setTexts(texts.map((v, i) => (i === tab ? value.slice(0, a) + ch + value.slice(b) : v)));
    requestAnimationFrame(() => { if (el) { el.focus(); el.setSelectionRange(a + ch.length, a + ch.length); } });
  };

  if (phase === 'intro') {
    return (
      <div className="rounded-2xl border border-rule bg-white p-6 sm:p-8">
        <p className="text-sm font-bold text-ocean">{label}</p>
        <h2 className="heading mt-2 text-2xl text-night">Simulation en conditions d’examen</h2>
        <p className="mt-3 text-ink">60 minutes pour les trois tâches. Vous passez librement de l’une à l’autre et vous gérez votre temps, comme le jour de l’examen.</p>
        <ol className="mt-5 grid gap-3 sm:grid-cols-3">
          {tasks.map((t, i) => (
            <li key={t.id} className="rounded-xl border border-rule bg-paper p-4">
              <p className="font-bold text-night">Tâche {i + 1}</p>
              <p className="mt-1 text-sm text-slate">{t.minWords} à {t.maxWords} mots, environ {t.minutes} min</p>
            </li>
          ))}
        </ol>
        <ul className="mt-5 space-y-1 text-sm text-slate">
          <li>• Une tâche laissée vide ou de moins de 20 mots compte 0 sur 20.</li>
          <li>• Chaque tâche rédigée utilise une correction d’expression écrite de votre pack (3 au maximum).</li>
          <li>• Correcteur orthographique désactivé, comme à l’examen. Les accents sont à droite du texte.</li>
        </ul>
        <button onClick={start} className="mt-6 rounded-full bg-maple px-7 py-3.5 font-bold text-white hover:bg-red-800">Commencer l’examen (60:00)</button>
      </div>
    );
  }

  if (phase === 'grading' || phase === 'done') {
    const avg = results.length === 3 ? results.reduce((s, r) => s + scoreOf(r), 0) / 3 : null;
    const nclc = avg === null ? null : nclcFor('ee', avg);
    return (
      <div className="space-y-6">
        {phase === 'grading' ? (
          <div role="status" className="rounded-2xl bg-night p-8 text-center text-white">
            <p className="heading text-2xl">Correction en cours…</p>
            <p className="mt-2 text-blue-100">Tâche {grading} sur 3, selon les critères officiels de l’épreuve. Comptez environ 30 secondes par tâche.</p>
          </div>
        ) : (
          <div className="grid gap-4 rounded-2xl bg-night p-6 text-white sm:grid-cols-3 sm:p-8">
            <div><p className="text-sm text-blue-100">Note moyenne</p><p className="heading mt-1 text-4xl">{avg === null ? '–' : (Math.round(avg * 10) / 10).toLocaleString('fr-FR')}<span className="text-xl text-blue-100"> / 20</span></p></div>
            <div><p className="text-sm text-blue-100">Niveau estimé</p><p className="heading mt-1 text-3xl">{nclc ? `NCLC ${nclc}${nclc >= 10 ? ' et plus' : ''}` : 'Inférieur au NCLC 4'}</p></div>
            <div><p className="text-sm text-blue-100">Temps utilisé</p><p className="heading mt-1 text-3xl">{fmt(used)}</p><p className="text-sm text-blue-100">sur 60:00</p></div>
          </div>
        )}
        {results.map((r, i) => (
          <section key={tasks[i].id} className="rounded-2xl border border-rule bg-white p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="heading text-xl text-night">Tâche {i + 1}</h3>
              <span className="font-bold text-night">{'feedback' in r ? `${r.feedback.score} / 20` : '0 / 20'}</span>
            </div>
            <p className="mt-2 text-sm text-slate">{tasks[i].prompt}</p>
            {'empty' in r && <p className="mt-4 rounded-xl bg-paper p-4 text-sm text-ink">Tâche vide ou trop courte (moins de 20 mots) : elle compte 0 sur 20, comme à l’examen.</p>}
            {'error' in r && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-maple">{r.error} Cette tâche n’a pas été notée ; vous pouvez la refaire depuis le simulateur.</p>}
            {'feedback' in r && <div className="mt-4"><FeedbackView feedback={r.feedback} improvedLabel="Correction proposée" /></div>}
            <details className="mt-4 rounded-xl bg-paper p-4">
              <summary className="cursor-pointer text-sm font-semibold text-night">Relire mon texte ({wordCount(texts[i])} mots)</summary>
              <p className="reading mt-3 whitespace-pre-line text-ink">{texts[i] || '(vide)'}</p>
            </details>
          </section>
        ))}
        {phase === 'done' && <button onClick={() => setPhase('intro')} className="rounded-full bg-night px-6 py-3.5 font-bold text-white hover:bg-ocean">Refaire une simulation</button>}
      </div>
    );
  }

  const t = tasks[tab];
  const words = wordCount(texts[tab]);
  return (
    <div className="grid gap-4 lg:grid-cols-[13rem_1fr_13rem]">
      <aside className="space-y-3 lg:sticky lg:top-24 lg:self-start">
        <div className={`rounded-2xl p-4 text-white ${left < 300 ? 'bg-maple' : 'bg-night'}`}>
          <p className="font-mono text-3xl" aria-label="Temps restant">{fmt(left)}</p>
          <p className="text-xs text-blue-100">Temps restant sur 60 minutes</p>
        </div>
        <nav aria-label="Tâches" className="grid grid-cols-3 gap-2 lg:grid-cols-1">
          {tasks.map((s, i) => {
            const n = wordCount(texts[i]);
            return (
              <button key={s.id} onClick={() => setTab(i)} aria-current={tab === i ? 'step' : undefined}
                className={`rounded-xl border-2 px-3 py-2.5 text-left text-sm ${tab === i ? 'border-ocean bg-container' : 'border-rule bg-white hover:border-ocean/50'}`}>
                <span className="block font-bold text-night">Tâche {i + 1}</span>
                <span className={`block text-xs ${n >= s.minWords && n <= s.maxWords ? 'text-green-700' : 'text-slate'}`}>{n} / {s.minWords}-{s.maxWords} mots</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="rounded-2xl border border-rule bg-white p-5 sm:p-7">
        <p className="text-sm font-bold text-ocean">Tâche {tab + 1} : {t.minWords} à {t.maxWords} mots, environ {t.minutes} min conseillées</p>
        <p className="mt-3 text-lg text-ink">{t.prompt}</p>
        {t.documents && <div className="mt-4 space-y-2">{t.documents.map((d) => <blockquote key={d} className="border-l-4 border-sky bg-paper p-4 text-sm">{d}</blockquote>)}</div>}
        <label className="mt-5 block">
          <span className="sr-only">Votre texte pour la tâche {tab + 1}</span>
          <textarea ref={area} value={texts[tab]} rows={13} spellCheck={false} autoCorrect="off" autoCapitalize="sentences" placeholder="Rédigez votre texte ici…"
            onChange={(e) => setTexts(texts.map((v, i) => (i === tab ? e.target.value : v)))}
            className="w-full rounded-xl border border-rule p-4 text-lg leading-relaxed text-ink focus:border-ocean focus:outline-none" />
        </label>
        <p className={`mt-2 text-sm ${words >= t.minWords && words <= t.maxWords ? 'font-semibold text-green-700' : 'text-slate'}`}>{words} mot{words > 1 ? 's' : ''} (attendu : {t.minWords} à {t.maxWords})</p>
        <div className="mt-5 flex flex-wrap gap-3">
          {tab < 2 && <button onClick={() => setTab(tab + 1)} className="rounded-full bg-night px-6 py-3 font-bold text-white hover:bg-ocean">Tâche suivante</button>}
          <button onClick={() => { if (confirm('Terminer l’examen et lancer la correction ? Vous ne pourrez plus modifier vos textes.')) finish(); }}
            className="rounded-full bg-container px-6 py-3 font-bold text-night hover:bg-container-hover">Terminer l’examen</button>
        </div>
      </div>

      <aside className="space-y-3 lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-rule bg-white p-4">
          <p className="text-sm font-bold text-night">Accents</p>
          <div className="mt-2 grid grid-cols-6 gap-1.5 lg:grid-cols-4">
            {ACCENTS.map((c) => (
              <button key={c} type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => insert(c)} aria-label={`Insérer ${c}`}
                className="rounded-lg border border-rule bg-paper py-2 text-lg text-night hover:border-ocean">{c}</button>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-rule bg-white p-4">
          <p className="text-sm font-bold text-night">Progression</p>
          <ul className="mt-2 space-y-2">
            {tasks.map((s, i) => {
              const pct = Math.min(100, Math.round((wordCount(texts[i]) / s.minWords) * 100));
              return (
                <li key={s.id} className="text-xs text-slate">
                  Tâche {i + 1}
                  <span className="mt-1 block h-2 overflow-hidden rounded-full bg-paper"><span className={`block h-full ${pct >= 100 ? 'bg-green-600' : 'bg-ocean'}`} style={{ width: `${pct}%` }} /></span>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </div>
  );
}
