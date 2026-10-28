import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, PageHeader } from '@/components/ui';
import ReadingPractice from './ReadingPractice';
export const metadata: Metadata = { title: 'Entraînement de compréhension écrite' };
export default function Training() {
  return <><PageHeader title="Lisez, comprenez, progressez." intro="Un premier entraînement gratuit en compréhension écrite. Prenez le temps de comprendre les textes, puis apprenez à gérer le chronomètre." />
    <section className="bg-paper py-12 sm:py-16"><Container>
      <p className="mb-6 max-w-3xl text-slate">Six questions originales, de A2 à B2. Cette série de découverte n’est pas un test blanc officiel et ne délivre pas de score TCF. Aucun compte nécessaire.</p>
      <ReadingPractice />
      <Link href="/cours/" className="mt-8 inline-block font-bold text-ocean hover:underline">Consulter les fiches méthode →</Link>
    </Container></section></>;
}
