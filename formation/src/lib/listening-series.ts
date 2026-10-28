import { listeningBank, type ListeningLevel, type ListeningQuestion } from '../content/listening.ts';
export const LISTENING_SECONDS = 35 * 60;
export const LISTENING_VERSION = '2026-10-28-v1';
export const LISTENING_BLUEPRINT: readonly [ListeningLevel,number][] = [['A1',4],['A2',6],['B1',9],['B2',10],['C1',6],['C2',4]];
export function buildListeningSeries(month: string, variant: number): ListeningQuestion[] {
 if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month) || !Number.isInteger(variant) || variant < 1 || variant > 3) throw new Error('Sélection invalide');
 let seed=2166136261; for(const char of `${LISTENING_VERSION}:${month}:${variant}`) seed=Math.imul(seed ^ char.charCodeAt(0),16777619);
 const random=()=>{seed+=0x6D2B79F5;let t=Math.imul(seed ^ seed>>>15,1|seed);t^=t+Math.imul(t ^ t>>>7,61|t);return ((t ^ t>>>14)>>>0)/4294967296;};
 return LISTENING_BLUEPRINT.flatMap(([level,count])=>{
  const pool=listeningBank.filter(q=>q.level===level);
  if(pool.length<count) throw new Error(`Banque insuffisante : ${level}`);
  for(let i=pool.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
  return pool.slice(0,count);
 });
}
export function gradeListening(questions: readonly ListeningQuestion[], answers: readonly (number|null)[]) {
 return {correct:questions.reduce((n,q,i)=>n+Number(answers[i]===q.answer),0),answered:questions.reduce((n,_,i)=>n+Number(Number.isInteger(answers[i])&&Number(answers[i])>=0&&Number(answers[i])<4),0),total:questions.length};
}
