'use client';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ORAL_SOURCES, oralInterviews, oralInteractions, oralOpinions } from '@/content/oral-series';
import { buildOralSeries, oralPhaseAt, ORAL_PHASES, ORAL_TOTAL_SECONDS } from '@/lib/oral-series';

const checks = [
 'J’ai répondu aux questions personnelles avec des détails et des exemples.',
 'J’ai posé des questions adaptées et relancé à partir des réponses de mon partenaire.',
 'J’ai annoncé mon avis, développé des arguments et envisagé une limite ou un avis différent.',
 'Mon discours était compréhensible, relié par des connecteurs et adapté à mon interlocuteur.',
 'J’ai respecté le temps et reformulé lorsque je cherchais un mot.',
];
const clock=(seconds:number)=>`${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;
export default function OralMonthlySeries({ initialMonth, initialVariant=1 }: { initialMonth:string; initialVariant?:number }) {
 const [month,setMonth]=useState(initialMonth),[variant,setVariant]=useState(initialVariant);
 const [mode,setMode]=useState<'guided'|'simulation'>('guided');
 const [status,setStatus]=useState<'idle'|'running'|'complete'>('idle');
 const [starting,setStarting]=useState(false),[elapsed,setElapsed]=useState(0),[record,setRecord]=useState(false);
 const [message,setMessage]=useState(''),[recordUrl,setRecordUrl]=useState(''),[mime,setMime]=useState('audio/webm');
 const [selectedChecks,setSelectedChecks]=useState<number[]>([]);
 const recorder=useRef<MediaRecorder|null>(null),stream=useRef<MediaStream|null>(null),started=useRef(0),chunks=useRef<Blob[]>([]),mounted=useRef(true);
 const series=useMemo(()=>buildOralSeries(month,variant),[month,variant]);
 const phase=oralPhaseAt(elapsed);
 const locked=status==='running'||starting;
 const stopRecording=useCallback(()=>{if(recorder.current?.state==='recording')recorder.current.stop();stream.current?.getTracks().forEach(track=>track.stop());stream.current=null;},[]);
 useEffect(()=>{mounted.current=true;return()=>{mounted.current=false;if(recorder.current){recorder.current.onstop=null;if(recorder.current.state==='recording')recorder.current.stop();}stream.current?.getTracks().forEach(track=>track.stop());};},[]);
 useEffect(()=>()=>{if(recordUrl)URL.revokeObjectURL(recordUrl);},[recordUrl]);
 useEffect(()=>{
  if(status!=='running')return;
  const tick=()=>{const milliseconds=Date.now()-started.current;setElapsed(milliseconds);if(milliseconds>=ORAL_TOTAL_SECONDS*1000){setStatus('complete');stopRecording();}};
  tick();const timer=setInterval(tick,250);const preventLeave=(event:BeforeUnloadEvent)=>event.preventDefault();window.addEventListener('beforeunload',preventLeave);
  return()=>{clearInterval(timer);window.removeEventListener('beforeunload',preventLeave);};
 },[status,stopRecording]);
 const start=async()=>{
  if(starting||status==='running')return;
  setStarting(true);setMessage('');setRecordUrl('');setSelectedChecks([]);chunks.current=[];
  if(record){
   try{
    if(!navigator.mediaDevices?.getUserMedia||typeof MediaRecorder==='undefined')throw new Error('unsupported');
    stream.current=await navigator.mediaDevices.getUserMedia({audio:true});
    if(!mounted.current){stream.current.getTracks().forEach(track=>track.stop());stream.current=null;return;}
    const supported=['audio/webm;codecs=opus','audio/webm','audio/mp4'].find(type=>MediaRecorder.isTypeSupported(type));
    const device=new MediaRecorder(stream.current,supported?{mimeType:supported}:undefined);recorder.current=device;setMime(device.mimeType||'audio/webm');
    device.ondataavailable=event=>{if(event.data.size)chunks.current.push(event.data);};
    device.onerror=()=>{setMessage('L’enregistrement a rencontré une erreur ; le chronomètre continue.');stopRecording();};
    device.onstop=()=>{if(chunks.current.length)setRecordUrl(URL.createObjectURL(new Blob(chunks.current,{type:device.mimeType||'audio/webm'})));};
    device.start(1000);
   }catch{stopRecording();setMessage('Micro indisponible ou autorisation refusée : vous pouvez poursuivre sans enregistrement.');}
  }
  started.current=Date.now();setElapsed(0);setStatus('running');setStarting(false);
 };
 const finish=()=>{setElapsed(Date.now()-started.current);setStatus('complete');stopRecording();};
 const resetSelection=()=>{setStatus('idle');setRecordUrl('');setSelectedChecks([]);setMessage('');};
 const button='rounded-xl bg-night px-5 py-3 font-bold text-white hover:bg-ocean disabled:opacity-50';
 const title=new Date(month+'-01T12:00:00Z').toLocaleDateString('fr-FR',{month:'long',year:'numeric',timeZone:'Africa/Douala'});
 const interviewVisible=mode==='guided'||status==='complete'||(status==='running'&&phase.phase?.task===1);
 const interactionVisible=mode==='guided'||status==='complete'||(status==='running'&&phase.phase?.task===2);
 const opinionVisible=mode==='guided'||status==='complete'||(status==='running'&&phase.phase?.task===3);
 return <div className="space-y-7">
  <section className="rounded-2xl border border-rule bg-white p-6 sm:p-8">
   <h2 className="heading text-2xl text-night">Votre combinaison d’expression orale</h2>
   <p className="mt-3 text-slate">{oralInterviews.length} entretiens, {oralInteractions.length} situations d’interaction et {oralOpinions.length} sujets d’opinion originaux. Trois combinaisons sont proposées pour chaque mois et année ; les séries partagent cette banque.</p>
   <p className="mt-3 text-sm text-slate">Le mois sert à organiser votre entraînement. Ces sujets ne sont pas des annales et ne sont attribués à aucune session réelle du TCF.</p>
   <fieldset disabled={locked} className="mt-5 flex flex-wrap gap-4"><legend className="sr-only">Sélection de la série</legend>
    <label className="grid gap-2 text-sm font-semibold">Mois et année<input type="month" value={month} onChange={e=>{if(/^\d{4}-(0[1-9]|1[0-2])$/.test(e.target.value)){setMonth(e.target.value);resetSelection();}}} className="rounded-lg border border-rule p-3" /></label>
    <label className="grid gap-2 text-sm font-semibold">Combinaison<select value={variant} onChange={e=>{setVariant(Number(e.target.value));resetSelection();}} className="rounded-lg border border-rule p-3">{[1,2,3].map(value=><option key={value} value={value}>Série {value}</option>)}</select></label>
    <label className="grid gap-2 text-sm font-semibold">Parcours<select value={mode} onChange={e=>{setMode(e.target.value as 'guided'|'simulation');resetSelection();}} className="rounded-lg border border-rule p-3"><option value="guided">Découverte guidée</option><option value="simulation">Simulation chronométrée</option></select></label>
   </fieldset>
   <p className="mt-5 font-bold text-ocean">{title} · Série {variant} · 3 tâches · 12 minutes, préparation comprise</p>
   <p className="mt-3 text-sm text-slate">Travaillez avec un partenaire qui joue l’examinateur. Seul, entraînez-vous à formuler vos questions ; ce lecteur ne simule pas un interlocuteur. <Link href="/entrainement/expression-orale/" className="font-semibold text-ocean underline">Ouvrir l’entraînement oral avec l’IA</Link></p>
  </section>

  {mode==='simulation'&&<section className="rounded-2xl border border-rule bg-white p-6 sm:p-8">
   <h2 className="heading text-xl text-night">Simulation en quatre étapes</h2>
   <ol className="mt-4 grid gap-2 text-sm sm:grid-cols-2">{ORAL_PHASES.map((p,i)=><li key={p.id} className={`rounded-lg p-3 ${status==='running'&&phase.index===i?'bg-blue-50 font-bold text-ocean':'bg-paper'}`}>{p.label} · {clock(p.seconds)}</li>)}</ol>
   {status==='idle'&&<><p className="mt-4 text-slate">Les consignes apparaissent au début de chaque tâche. Il n’y a pas de préparation pour les tâches 1 et 3. Le chronomètre continue même si vous changez d’onglet ; aucune pause n’est prévue. Le partenaire consulte sa fiche uniquement pendant la tâche 2.</p><label className="mt-5 flex items-start gap-3"><input type="checkbox" checked={record} disabled={starting} onChange={e=>setRecord(e.target.checked)} className="mt-1" /><span>Enregistrer le micro sur cet appareil pour me réécouter. Aucun audio n’est envoyé au serveur ; le fichier inclut les deux minutes de préparation et peut contenir la voix du partenaire.</span></label><button className={`${button} mt-5`} disabled={starting} onClick={start}>{starting?'Préparation du micro…':'Commencer les 12 minutes'}</button></>}
   {status==='running'&&<><p className="mt-5 text-lg font-bold text-ocean" aria-live="polite">{phase.phase?.label}</p><p role="timer" aria-label="Temps restant pour cette étape" className="mt-2 font-mono text-4xl font-bold text-night">{clock(phase.remaining)}</p><p className="mt-3 text-sm text-slate">{phase.phase?.id==='preparation'?'Vous pouvez prendre de courtes notes pour préparer vos questions.':'Parlez maintenant ; le passage à l’étape suivante est automatique.'}</p><button className="mt-5 rounded-lg border border-rule px-4 py-2" onClick={()=>{if(window.confirm('Terminer cette simulation avant la fin du temps ?'))finish();}}>Terminer maintenant</button></>}
   {status==='complete'&&<><p role="status" className="mt-5 font-bold text-ocean">{elapsed>=ORAL_TOTAL_SECONDS*1000?'Les 12 minutes sont écoulées.':'Simulation terminée avant la fin du temps.'}</p><button className={`${button} mt-4`} onClick={resetSelection}>Préparer une nouvelle simulation</button></>}
   {message&&<p role="status" className="mt-4 rounded-lg bg-amber-50 p-4 text-sm">{message}</p>}
  </section>}

  {interviewVisible&&<section className="rounded-2xl border border-rule bg-white p-6 sm:p-8"><p className="eyebrow text-ocean">Tâche 1 · 2 minutes · sans préparation</p><h2 className="heading mt-3 text-2xl">{series.interview.title}</h2><p className="mt-3 text-slate">Répondez naturellement aux questions du partenaire. Il peut adapter les relances à vos réponses ; vous n’avez pas à réciter une présentation préparée.</p><ul className="mt-5 list-disc space-y-2 pl-5">{series.interview.questions.map(q=><li key={q}>{q}</li>)}</ul>{(mode==='guided'||status==='complete')&&<p className="mt-5 rounded-lg bg-paper p-4 text-slate"><strong>Conseil : </strong>{series.interview.tip}</p>}</section>}
  {interactionVisible&&<section className="rounded-2xl border border-rule bg-white p-6 sm:p-8"><p className="eyebrow text-ocean">Tâche 2 · préparation 2 minutes, échange 3 minutes 30</p><h2 className="heading mt-3 text-2xl">{series.interaction.title}</h2><p className="mt-4"><strong>Votre rôle : </strong>{series.interaction.candidate}</p><p className="mt-3"><strong>Rôle du partenaire : </strong>{series.interaction.partner}</p><p className="mt-3"><strong>Votre objectif : </strong>{series.interaction.situation}</p>
   <details className="mt-5 rounded-lg border border-rule p-4"><summary className="cursor-pointer font-bold text-ocean">Fiche réservée au partenaire · informations fictives pour le jeu de rôle</summary><p className="mt-3 text-sm text-slate">Répondez aux questions posées, sans lire toute la fiche d’un seul coup. Vous pouvez demander une précision au candidat.</p><ul className="mt-3 list-disc space-y-2 pl-5">{series.interaction.partnerFacts.map(f=><li key={f}>{f}</li>)}</ul></details>
   {(mode==='guided'||status==='complete')&&<details className="mt-4 rounded-lg bg-paper p-4"><summary className="cursor-pointer font-bold text-ocean">Pistes de questions et conseil</summary><p className="mt-3 text-sm">Plusieurs formulations sont possibles. Adaptez vos relances aux réponses reçues.</p><ul className="mt-3 list-disc space-y-2 pl-5">{series.interaction.questions.map(q=><li key={q}>{q}</li>)}</ul><p className="mt-4 text-slate">{series.interaction.tip}</p></details>}
  </section>}
  {opinionVisible&&<section className="rounded-2xl border border-rule bg-white p-6 sm:p-8"><p className="eyebrow text-ocean">Tâche 3 · 4 minutes 30 · sans préparation</p><h2 className="heading mt-3 text-2xl">{series.opinion.title}</h2><p className="mt-5 text-xl font-semibold text-night">{series.opinion.prompt}</p><p className="mt-3 text-slate">Exposez votre position, développez vos raisons et illustrez-les. Le partenaire peut vous demander de préciser une idée.</p>
   {(mode==='guided'||status==='complete')&&<details className="mt-5 rounded-lg bg-paper p-5"><summary className="cursor-pointer font-bold text-ocean">Pistes d’argumentation · exemple pédagogique</summary><p className="mt-3 text-sm">Il n’existe pas d’opinion attendue ni de corrigé unique. Ces pistes ne constituent pas un discours à mémoriser.</p><p className="mt-4"><strong>Une entrée possible : </strong>{series.opinion.opening}</p><ul className="mt-3 list-disc space-y-2 pl-5">{series.opinion.arguments.map(a=><li key={a}>{a}</li>)}</ul><p className="mt-3"><strong>Nuance à discuter : </strong>{series.opinion.counterpoint}</p><p className="mt-3"><strong>Exemple concret : </strong>{series.opinion.example}</p><p className="mt-3"><strong>Une conclusion possible : </strong>{series.opinion.closing}</p></details>}
  </section>}
  {(mode==='guided'||status==='complete')&&<section className="rounded-2xl border border-rule bg-white p-6 sm:p-8"><h2 className="heading text-2xl">Autoévaluation après l’oral</h2><p className="mt-3 text-slate">Cochez les points réussis après votre échange ou votre réécoute. Cette grille pédagogique ne produit pas de note TCF ni de niveau NCLC.</p><div className="mt-5 space-y-3">{checks.map((text,i)=><label key={text} className="flex items-start gap-3"><input type="checkbox" checked={selectedChecks.includes(i)} onChange={e=>setSelectedChecks(old=>e.target.checked?[...old,i]:old.filter(v=>v!==i))} className="mt-1" /><span>{text}</span></label>)}</div><p className="mt-5 text-sm text-slate">Demandez à votre partenaire : « Quelle idée était la plus claire ? Quelle question aurais-je pu mieux formuler ? » Choisissez ensuite un point à retravailler.</p></section>}
  {recordUrl&&<section className="rounded-2xl border border-rule bg-white p-6"><h2 className="heading text-xl">Votre enregistrement local</h2><audio controls src={recordUrl} className="mt-4 w-full" /><div className="mt-4 flex flex-wrap gap-4"><a href={recordUrl} download={`oral-${month}-serie-${variant}.${mime.includes('mp4')?'m4a':'webm'}`} className="font-bold text-ocean underline">Télécharger l’audio</a><button onClick={()=>setRecordUrl('')} className="font-semibold text-ocean underline">Supprimer cet aperçu</button></div><p className="mt-3 text-sm text-slate">L’aperçu disparaît au rechargement de la page. Un fichier déjà téléchargé reste sur votre appareil ; supprimez-le séparément si nécessaire.</p></section>}
  <aside className="rounded-2xl border border-rule bg-white p-6"><h2 className="heading text-xl">Sources du format</h2><p className="mt-3 text-sm text-slate">Vérification documentaire le 28 octobre 2026. Les rôles, situations, relances et pistes proposés ici sont originaux. Une illustration n’est pas nécessaire pour ces trois tâches orales.</p><ul className="mt-4 space-y-3">{ORAL_SOURCES.map(source=><li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-ocean underline">{source.title} ↗</a><p className="text-sm text-slate">{source.role}</p></li>)}</ul></aside>
 </div>;
}
