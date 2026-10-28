import type { Metadata } from 'next';
import { Container, PageHeader } from '@/components/ui';
import Tutor from './Tutor';

export const metadata: Metadata = { title: 'Tuteur de français' };

export default function Tuteur() {
  return (
    <>
      <PageHeader title="Une question ? Demandez au tuteur." intro="Le tuteur IA explique une règle, une erreur ou la méthode d’une épreuve, à toute heure. Pour vos démarches et vos inscriptions, votre conseiller reste joignable sur WhatsApp." />
      <section className="bg-paper py-12 sm:py-16"><Container className="max-w-4xl"><Tutor /></Container></section>
    </>
  );
}
