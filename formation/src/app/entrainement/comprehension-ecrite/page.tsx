import type { Metadata } from 'next';
import { Container, PageHeader } from '@/components/ui';
import { doualaToday } from '@/lib/tcf/data';
import MonthlyReading from './MonthlyReading';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Compréhension écrite : séries mensuelles de 39 questions' };
export default async function ReadingPage({ searchParams }: { searchParams: Promise<{ mois?: string; serie?: string }> }) {
  const params = await searchParams;
  const month = /^\d{4}-(0[1-9]|1[0-2])$/.test(params.mois ?? '') ? params.mois! : doualaToday().slice(0,7);
  const variant = /^[1-3]$/.test(params.serie ?? '') ? Number(params.serie) : 1;
  return <><PageHeader title="Compréhension écrite : 39 questions, 60 minutes" intro="Choisissez un mois et une combinaison. Entraînez-vous à votre rythme ou gérez votre temps, puis consultez chaque correction expliquée." /><section className="bg-paper py-12"><Container><MonthlyReading initialMonth={month} initialVariant={variant} /><aside className="mt-10 rounded-xl border border-rule bg-white p-6"><h2 className="heading text-xl">Format et ressources consultées</h2><p className="mt-3 text-slate">France Éducation international présente une épreuve de 39 QCM à quatre choix, avec une réponse correcte par question, en 60 minutes. Nos documents et questions sont originaux : les ressources en ligne servent à vérifier le format et les compétences à travailler, pas à attribuer une provenance d’examen aux exercices. Notre répartition par niveau est un choix pédagogique. Le bilan indique des réponses justes, sans conversion en score officiel ou en NCLC.</p><div className="mt-4 flex flex-wrap gap-5"><a href="https://www.france-education-international.fr/test/tcf-canada" target="_blank" rel="noopener noreferrer" className="font-bold text-ocean underline">Présentation officielle</a><a href="https://www.france-education-international.fr/test/exemples-epreuves-tcf" target="_blank" rel="noopener noreferrer" className="font-bold text-ocean underline">Exemples d’épreuves publiés par FEI</a><a href="https://apprendre.tv5monde.com/fr/tcf" target="_blank" rel="noopener noreferrer" className="font-bold text-ocean underline">Entraînement complémentaire TV5MONDE</a></div></aside></Container></section></>;
}
