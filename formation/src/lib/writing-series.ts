import { writingSeriesBank, WRITING_SERIES_VERSION, type SeriesWritingTask } from '../content/writing-series.ts';
export function countWritingWords(text: string) {
  return text.trim().split(/\s+/u).filter(token => /[\p{L}\p{N}]/u.test(token)).length;
}
export function writingLengthState(text: string, min: number, max: number) {
  const words = countWritingWords(text);
  return { words, state: words < min ? 'short' : words > max ? 'long' : 'valid' } as const;
}
export function validWritingMonth(month: string) { return /^\d{4}-(0[1-9]|1[0-2])$/.test(month); }
function seedFor(value: string) { let seed=2166136261; for(const char of value) seed=Math.imul(seed ^ char.charCodeAt(0),16777619); return seed >>> 0; }
function shuffled<T>(items: readonly T[], seed: number): T[] {
  const result=[...items]; let state=seed;
  const random=()=>{state+=0x6D2B79F5;let value=Math.imul(state ^ state>>>15,1|state);value^=value+Math.imul(value ^ value>>>7,61|value);return ((value ^ value>>>14)>>>0)/4294967296;};
  for(let i=result.length-1;i>0;i--) {const j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]]; }
  return result;
}
export function buildWritingSeries(month: string, variant: number): readonly SeriesWritingTask[] {
  if(!validWritingMonth(month) || !Number.isInteger(variant) || variant < 1 || variant > 3) throw new Error('Choix de série invalide.');
  return ([1,2,3] as const).map(kind => {
    const pool=writingSeriesBank.filter(t=>t.task===kind);
    if(pool.length<3) throw new Error('Banque de sujets insuffisante.');
    return shuffled(pool,seedFor(`${WRITING_SERIES_VERSION}:${month}:${kind}`))[variant-1];
  });
}
export function writingTimeLeft(deadline: number | null, now: number) { return deadline === null ? 0 : Math.max(0,Math.ceil((deadline-now)/1000)); }
export type WritingDraft = { texts: string[]; started: boolean; timed: boolean; deadline: number | null; done: boolean; };
export function emptyWritingDraft(): WritingDraft { return { texts:['','',''],started:false,timed:false,deadline:null,done:false }; }
export function parseWritingDraft(raw: string | null): WritingDraft | null {
  try {
    const value=JSON.parse(raw ?? 'null');
    if(!value || !Array.isArray(value.texts) || value.texts.length!==3 || !value.texts.every((t: unknown)=>typeof t==='string' && t.length<=30000) || typeof value.started!=='boolean' || typeof value.timed!=='boolean' || typeof value.done!=='boolean' || !(value.deadline===null || typeof value.deadline==='number' && Number.isFinite(value.deadline)) || (value.timed && value.started && value.deadline===null)) return null;
    return { texts:value.texts,started:value.started,timed:value.timed,deadline:value.deadline,done:value.done };
  } catch { return null; }
}
