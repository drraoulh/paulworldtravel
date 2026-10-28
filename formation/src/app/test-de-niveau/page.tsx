import type { Metadata } from 'next';
import { Container, PageHeader } from '@/components/ui';
import LevelTest from './LevelTest';

export const metadata: Metadata = {
  title: 'Test de niveau de français gratuit',
  description: 'Quinze questions pour estimer votre niveau de français, du A1 au C1, avant de préparer le TCF Canada.',
};

export default function TestDeNiveau() {
  return (
    <>
      <PageHeader image={{ src: '/images/study.jpg', alt: 'Prise de notes pendant une révision' }}
        title="Test de niveau gratuit"
        intro="Quinze questions de grammaire, de vocabulaire et de lecture, de la plus simple à la plus difficile. Chaque réponse est expliquée. Comptez environ dix minutes."
      />
      <section className="bg-paper py-12 sm:py-16">
        <Container className="max-w-3xl">
          <LevelTest />
        </Container>
      </section>
    </>
  );
}
