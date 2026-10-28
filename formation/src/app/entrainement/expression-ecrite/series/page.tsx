import type { Metadata } from 'next';
import { Container, PageHeader } from '@/components/ui';
import { WRITING_SOURCES } from '@/content/writing-series';
import { validWritingMonth } from '@/lib/writing-series';
import MonthlyWriting from './MonthlyWriting';
export const dynamic='force-dynamic';
export const metadata: Metadata={title:'Expression écrite : séries mensuelles et trois tâches'};
export default async function WritingSeriesPage({searchParams}:{searchParams:Promise<{mois?:string;serie?:string}>}) {
  const params=await searchParams;
  const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Douala',year:'numeric',month:'2-digit'}).formatToParts(new Date());
  const currentMonth=`${parts.find(part=>part.type==='year')!.value}-${parts.find(part=>part.type==='month')!.value}`;
  const month=params.mois&&validWritingMonth(params.mois)?params.mois:currentMonth;
  const variant=params.serie&&/^[1-3]$/.test(params.serie)?Number(params.serie):1;
  return <><PageHeader title="Expression écrite : vos séries mensuelles" intro="Préparez les trois tâches en une séance : un message, un récit commenté et un texte comparant deux opinions. Écrivez à votre rythme ou en 60 minutes."/><section className="bg-paper py-12"><Container><MonthlyWriting initialMonth={month} initialVariant={variant}/><aside className="mt-10 rounded-xl border border-rule bg-white p-6"><h2 className="heading text-xl">Format vérifié et ressources officielles</h2><p className="mt-3 text-slate">L’épreuve d’expression écrite dure 60 minutes pour l’ensemble des trois tâches. Les longueurs demandées sont de 60 à 120 mots, de 120 à 150 mots, puis de 120 à 180 mots. La répartition du temps entre les tâches reste à votre charge.</p><p className="mt-3 text-sm text-slate">Consignes et documents de cette banque entièrement originaux, inspirés des types de tâches présentés par France Éducation international. Aucun sujet d’une session historique n’est revendiqué. Vérification des ressources : 28 octobre 2026.</p><ul className="mt-4 space-y-3">{WRITING_SOURCES.map(source=><li key={source.id}><a href={source.url} target="_blank" rel="noopener noreferrer" className="font-bold text-ocean underline">{source.title} ↗</a><p className="mt-1 text-sm text-slate">{source.use}</p></li>)}</ul></aside></Container></section></>;
}
