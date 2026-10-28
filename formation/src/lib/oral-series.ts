import { oralInterviews, oralInteractions, oralOpinions } from '../content/oral-series.ts';
export const ORAL_BANK_VERSION = '2026-10-28-v1';
export const ORAL_PHASES = [
 { id:'interview', label:'Tâche 1 · entretien dirigé', seconds:120, task:1 },
 { id:'preparation', label:'Tâche 2 · préparation', seconds:120, task:2 },
 { id:'interaction', label:'Tâche 2 · interaction', seconds:210, task:2 },
 { id:'opinion', label:'Tâche 3 · point de vue', seconds:270, task:3 },
] as const;
export const ORAL_TOTAL_SECONDS = ORAL_PHASES.reduce((total,p)=>total+p.seconds,0);
function hash(value:string) { let h=2166136261;for(const char of value) h=Math.imul(h^char.charCodeAt(0),16777619);return h>>>0; }
/** A pedagogical month selection, never a claim about a past official session. */
export function buildOralSeries(month:string,variant:number) {
 if(!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)||!Number.isInteger(variant)||variant<1||variant>3) throw new Error('Sélection de série invalide');
 const pick=<T>(pool:readonly T[],key:string)=>pool[(hash(`${ORAL_BANK_VERSION}:${month}:${key}`)+variant-1)%pool.length];
 return { id:`${ORAL_BANK_VERSION}:${month}:${variant}`, interview:pick(oralInterviews,'interview'),interaction:pick(oralInteractions,'interaction'),opinion:pick(oralOpinions,'opinion') };
}
export function oralPhaseAt(elapsedMilliseconds:number) {
 const elapsed=Math.max(0,Math.floor(elapsedMilliseconds/1000));let boundary=0;
 for(let index=0;index<ORAL_PHASES.length;index++) {const phase=ORAL_PHASES[index];boundary+=phase.seconds;if(elapsed<boundary) return {index,phase,remaining:boundary-elapsed,done:false};}
 return {index:ORAL_PHASES.length,phase:null,remaining:0,done:true};
}
