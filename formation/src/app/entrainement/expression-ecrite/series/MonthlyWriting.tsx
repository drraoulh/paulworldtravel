'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { WRITING_REVIEW, WRITING_SERIES_SECONDS, WRITING_SERIES_VERSION, type SeriesWritingTask } from '@/content/writing-series';
import { buildWritingSeries, emptyWritingDraft, parseWritingDraft, validWritingMonth, writingLengthState, writingTimeLeft, type WritingDraft } from '@/lib/writing-series';

const button='rounded-xl bg-night px-5 py-3 font-bold text-white hover:bg-ocean disabled:cursor-not-allowed disabled:opacity-50';
function WritingSession({ tasks, sessionId, onActiveChange }: { tasks: readonly SeriesWritingTask[]; sessionId: string; onActiveChange: (active: boolean) => void }) {
  const [draft,setDraft]=useState<WritingDraft>(emptyWritingDraft);
  const [ready,setReady]=useState(false);
  const [storageError,setStorageError]=useState(false);
  const [remaining,setRemaining]=useState(WRITING_SERIES_SECONDS);
  const [index,setIndex]=useState(0);
  const [checks,setChecks]=useState<boolean[]>(WRITING_REVIEW.map(()=>false));
  const key=`pwt-writing-${WRITING_SERIES_VERSION}-${sessionId}`;
  useEffect(()=>{
    try { const saved=parseWritingDraft(localStorage.getItem(key));if(saved) { const expired=saved.timed && saved.started && saved.deadline !== null && writingTimeLeft(saved.deadline,Date.now())===0;setDraft({...saved,done:saved.done||expired}); } }
    catch { setStorageError(true); }
    setReady(true);
  },[key]);
  useEffect(()=>{
    if(!ready)return;
    try { localStorage.setItem(key,JSON.stringify(draft)); }
    catch {setStorageError(true);}
  },[draft,key,ready]);
  useEffect(()=>{
    if(!ready||!draft.started||!draft.timed||draft.done||draft.deadline===null)return;
    const deadline=draft.deadline;
    const tick=()=>{ const left=writingTimeLeft(deadline,Date.now());setRemaining(left);if(left===0)setDraft(old=>({...old,done:true})); };
    tick();const interval=setInterval(tick,500);return()=>clearInterval(interval);
  },[ready,draft.started,draft.timed,draft.done,draft.deadline]);
  useEffect(()=>{onActiveChange(ready&&draft.started&&!draft.done);},[ready,draft.started,draft.done,onActiveChange]);
  useEffect(()=>{
    if(!draft.started||draft.done)return;
    const prevent=(event: BeforeUnloadEvent)=>{event.preventDefault();};window.addEventListener('beforeunload',prevent);return()=>window.removeEventListener('beforeunload',prevent);
  },[draft.started,draft.done]);
  const start=(timed: boolean)=>{setDraft(old=>({...old,started:true,timed,done:false,deadline:timed?Date.now()+WRITING_SERIES_SECONDS*1000:null}));setRemaining(WRITING_SERIES_SECONDS);};
  const clear=()=>{if(!window.confirm('Effacer les trois textes et recommencer cette combinaison ?'))return;setDraft(emptyWritingDraft());setIndex(0);setChecks(WRITING_REVIEW.map(()=>false));};
  const finish=()=>{if(draft.texts.some(t=>!t.trim())&&!window.confirm('Une ou plusieurs tâches sont vides. Passer tout de même à la relecture ?'))return;setDraft(old=>({...old,done:true}));};
  const download=()=>{
    const text=tasks.map((task,i)=>`${task.title}\n${task.prompt}\n${task.documents?.map((d,n)=>`Document ${n+1} : ${d}`).join('\n\n') ?? ''}\n\nMON TEXTE\n${draft.texts[i]}\n`).join('\n--------------------\n\n');
    const url=URL.createObjectURL(new Blob([`Entraînement original EE · ${sessionId}\nAucune note officielle\n\n${text}`],{type:'text/plain;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download=`entrainement-ee-${sessionId}.txt`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  };
  if(!ready)return <p role="status" className="rounded-xl bg-white p-6">Chargement du brouillon de cette combinaison…</p>;
  const current=tasks[index];
  const length=writingLengthState(draft.texts[index],current.minWords,current.maxWords);
  return <div className="space-y-6">
    <p role="status" className={`rounded-xl p-4 text-sm ${storageError?'bg-amber-50':'bg-blue-50'}`}>{storageError?'Le stockage local est indisponible : exportez vos textes pour les conserver.':'Les textes de cette combinaison sont enregistrés uniquement dans ce navigateur. Aucun envoi à un serveur ni à une IA.'}</p>
    {!draft.started ? <div className="grid gap-5 sm:grid-cols-2">
      <article className="rounded-2xl border border-rule bg-white p-6"><h2 className="heading text-xl">Écriture guidée</h2><p className="mt-3 text-slate">Trois tâches avec des pistes de plan. Prenez le temps de préparer et relire, sans minuterie.</p><button className={`${button} mt-5`} onClick={()=>start(false)}>Commencer en mode guidé</button></article>
      <article className="rounded-2xl border border-rule bg-white p-6"><h2 className="heading text-xl">Entraînement de 60 minutes</h2><p className="mt-3 text-slate">Un seul chronomètre pour les trois tâches. Les pistes apparaissent à la relecture. Le temps continue si vous quittez la page.</p><button className={`${button} mt-5`} onClick={()=>start(true)}>Commencer les 60 minutes</button></article>
    </div> : <>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-night p-5 text-white"><span className="font-bold">{draft.done?'Écriture terminée · relecture':draft.timed?'Mode chronométré':'Mode guidé'}</span>{draft.timed&&<span role="timer" aria-label="Temps restant" className="font-mono text-xl">{draft.done?'Terminé':`${String(Math.floor(remaining/60)).padStart(2,'0')}:${String(remaining%60).padStart(2,'0')}`}</span>}</div>
      <nav aria-label="Tâches d’expression écrite" className="flex flex-wrap gap-3">{tasks.map((task,i)=><button key={task.id} aria-pressed={index===i} onClick={()=>setIndex(i)} className={`rounded-xl border-2 px-5 py-3 font-bold ${index===i?'border-ocean bg-blue-50 text-ocean':'border-rule bg-white'}`}>Tâche {task.task} · {writingLengthState(draft.texts[i],task.minWords,task.maxWords).words} mots</button>)}</nav>
      <article className="rounded-2xl border border-rule bg-white p-6 sm:p-8">
        <p className="text-sm font-bold text-ocean">{current.topic} · {current.minWords} à {current.maxWords} mots</p><h2 className="heading mt-3 text-2xl">{current.title}</h2><p className="mt-4 text-lg leading-relaxed">{current.prompt}</p>
        {current.documents&&<div className="mt-6 grid gap-4 lg:grid-cols-2">{current.documents.map((document,i)=><section key={i} className="rounded-xl border border-rule bg-paper p-5"><h3 className="font-bold">Document {i+1} · texte original d’entraînement</h3><p className="mt-3 text-sm leading-relaxed">{document}</p></section>)}</div>}
        {(!draft.timed||draft.done)&&<details className="mt-6 rounded-xl bg-blue-50 p-5"><summary className="cursor-pointer font-bold text-ocean">Pistes de plan et de révision</summary><ol className="mt-4 list-decimal space-y-2 pl-5">{current.plan.map(item=><li key={item}>{item}</li>)}</ol><p className="mt-3 text-sm">Ce plan est une aide pédagogique, pas un corrigé unique. Plusieurs réponses pertinentes sont possibles.</p></details>}
        <label className="mt-6 block"><span className="font-bold">Votre texte — tâche {current.task}</span><textarea name={`ee-task-${current.task}`} value={draft.texts[index]} readOnly={draft.done} maxLength={30000} onChange={event=>{const value=event.target.value;setDraft(old=>({...old,texts:old.texts.map((text,i)=>i===index?value:text)}));}} rows={12} spellCheck={!draft.timed} className="mt-3 w-full rounded-xl border border-rule p-4 focus:border-ocean focus:outline-none read-only:bg-paper" placeholder="Rédigez votre texte ici…" /></label>
        <p aria-live="polite" className={`mt-3 text-sm ${length.state==='valid'?'font-semibold text-green-700':'text-slate'}`}>{length.words} mot{length.words>1?'s':''} · {length.state==='valid'?'longueur respectée':length.state==='short'?`minimum : ${current.minWords} mots`:`maximum dépassé de ${length.words-current.maxWords} mots`}</p><p className="mt-2 text-xs text-slate">Compteur pédagogique : groupes séparés par des espaces contenant une lettre ou un chiffre ; les apostrophes et traits d’union ne séparent pas les mots.</p>
        <div className="mt-6 flex flex-wrap gap-3"><button className={button} disabled={index===0} onClick={()=>setIndex(i=>i-1)}>Tâche précédente</button><button className={button} disabled={index===2} onClick={()=>setIndex(i=>i+1)}>Tâche suivante</button></div>
      </article>
      {!draft.done&&<button className={button} onClick={finish}>Terminer et relire</button>}
      {draft.done&&<section className="rounded-2xl border border-rule bg-white p-6"><h2 className="heading text-2xl">Votre bilan de révision</h2><p className="mt-3 text-slate">Le contrôle de longueur ne note pas la qualité de la langue. Aucune note TCF ou estimation NCLC n’est attribuée ici.</p><ul className="mt-4 space-y-2">{tasks.map((task,i)=>{const result=writingLengthState(draft.texts[i],task.minWords,task.maxWords);return <li key={task.id}>Tâche {task.task} : {result.words} mots — {result.state==='valid'?'longueur respectée':result.state==='short'?'texte trop court':'texte trop long'} ({task.minWords}–{task.maxWords}).</li>;})}</ul><fieldset className="mt-6 space-y-3"><legend className="mb-3 font-bold">Autoévaluation</legend>{WRITING_REVIEW.map((item,i)=><label key={item} className="flex items-start gap-3"><input type="checkbox" checked={checks[i]} onChange={event=>{const checked=event.target.checked;setChecks(old=>old.map((value,n)=>i===n?checked:value));}} className="mt-1" /><span>{item}</span></label>)}</fieldset></section>}
    </>}
    <div className="flex flex-wrap gap-4"><button className="rounded-xl border-2 border-night px-5 py-3 font-bold" onClick={download}>Exporter mes trois textes</button><button className="rounded-xl border border-rule px-5 py-3 text-sm font-semibold text-maple" onClick={clear}>Effacer et recommencer</button><Link href="/entrainement/expression-ecrite/" className="self-center font-bold text-ocean underline">Accéder aux exercices avec correction IA</Link></div>
    <p className="text-sm text-slate">Le lien vers la correction IA ouvre un parcours séparé avec ses propres sujets et conditions de compte. Les textes de cette page n’y sont pas transférés automatiquement.</p>
  </div>;
}
export default function MonthlyWriting({ initialMonth, initialVariant=1 }: { initialMonth: string; initialVariant?: number }) {
  const [month,setMonth]=useState(initialMonth);const [variant,setVariant]=useState(initialVariant);const [active,setActive]=useState(false);
  const tasks=useMemo(()=>buildWritingSeries(month,variant),[month,variant]);
  const monthLabel=new Date(month+'-01T12:00:00Z').toLocaleDateString('fr-FR',{timeZone:'Africa/Douala',month:'long',year:'numeric'});
  return <div className="space-y-7"><div className="rounded-2xl border border-rule bg-white p-6"><h2 className="heading text-2xl">Votre combinaison mensuelle</h2><p className="mt-3 text-slate">36 sujets originaux : 12 messages, 12 récits commentés et 12 débats accompagnés de deux documents. Chaque combinaison réunit une tâche de chaque type.</p><p className="mt-3 text-sm text-slate">Le mois sert à organiser votre travail. Ces sujets ne sont pas des annales de sessions réellement passées. Les combinaisons puisent dans la même banque et peuvent réutiliser un sujet d’un mois à l’autre.</p><fieldset disabled={active} className="mt-5 flex flex-wrap gap-4 disabled:opacity-60"><legend className="sr-only">Choisir la série d’expression écrite</legend><label className="grid gap-2 text-sm font-semibold">Mois et année<input type="month" value={month} onChange={event=>{if(validWritingMonth(event.target.value))setMonth(event.target.value);}} className="rounded-lg border border-rule p-3" /></label><label className="grid gap-2 text-sm font-semibold">Combinaison<select value={variant} onChange={event=>setVariant(Number(event.target.value))} className="rounded-lg border border-rule p-3"><option value={1}>Série 1</option><option value={2}>Série 2</option><option value={3}>Série 3</option></select></label></fieldset><p className="mt-5 font-bold text-ocean">{monthLabel} · Série {variant} · 3 tâches · 60 minutes</p>{active&&<p role="status" className="mt-3 text-sm">La sélection reste fixe pendant l’écriture. Terminez la série pour changer de combinaison.</p>}</div><WritingSession key={`${month}-${variant}`} tasks={tasks} sessionId={`${month}-${variant}`} onActiveChange={setActive}/></div>;
}
