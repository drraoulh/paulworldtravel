import type { Metadata } from 'next';
import { Container, PageHeader } from '@/components/ui';
import SpeakingPractice from './SpeakingPractice';

export const metadata: Metadata = { title: 'Expression orale corrigée par l’IA' };

export default function ExpressionOrale() {
  return (
    <>
      <PageHeader
        title="Parlez, l’IA vous écoute."
        intro="Tâches 1 et 3 : enregistrez votre réponse. Tâche 2 : préparez-vous 2 minutes, puis dialoguez avec un interlocuteur joué par l’IA. Votre oral est transcrit, puis noté sur 20 avec vos erreurs et un modèle."
      />
      <section className="bg-paper py-12 sm:py-16"><Container><SpeakingPractice /></Container></section>
    </>
  );
}
