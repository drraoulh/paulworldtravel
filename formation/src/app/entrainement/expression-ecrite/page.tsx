import type { Metadata } from 'next';
import { Container, PageHeader } from '@/components/ui';
import WritingPractice from './WritingPractice';

export const metadata: Metadata = { title: 'Expression écrite corrigée par l’IA' };

export default function ExpressionEcrite() {
  return (
    <>
      <PageHeader
        title="Écrivez, recevez votre note."
        intro="Choisissez une tâche du TCF Canada, rédigez votre texte et obtenez en moins d’une minute une note estimée sur 20, vos erreurs expliquées et une version améliorée."
      />
      <section className="bg-paper py-12 sm:py-16"><Container><WritingPractice /></Container></section>
    </>
  );
}
