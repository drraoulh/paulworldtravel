import type { Metadata } from 'next';
import { Container, PageHeader } from '@/components/ui';
import SpeakingPractice from './SpeakingPractice';

export const metadata: Metadata = { title: 'Expression orale corrigée par l’IA' };

export default function ExpressionOrale() {
  return (
    <>
      <PageHeader
        title="Parlez, l’IA vous écoute."
        intro="Enregistrez votre réponse à une tâche d’expression orale. Elle est transcrite, puis notée sur 20 avec vos erreurs et une réponse modèle."
      />
      <section className="bg-paper py-12 sm:py-16"><Container><SpeakingPractice /></Container></section>
    </>
  );
}
