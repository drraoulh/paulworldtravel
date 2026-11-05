import type { Metadata } from 'next';
import { Container, PageHeader } from '@/components/ui';
import LevelTest from './LevelTest';
import { publishedModules } from '@/lib/training-content';

export const metadata: Metadata = {
  title: 'Test de niveau de français gratuit',
  description: 'Quinze questions pour estimer votre niveau de français, du A1 au C1, avant de préparer le TCF Canada.',
};

export default async function TestDeNiveau() {
  const modules = await publishedModules();
  const reading = modules.find((m) => m.id === 'ce')!;
  return (
    <>
      <PageHeader image={{ src: '/images/test-niveau.jpg', alt: 'Une jeune femme note ses réponses dans un cahier devant son ordinateur' }}
        title="Test de niveau gratuit"
        intro="Quinze questions de grammaire, de vocabulaire et de lecture, de la plus simple à la plus difficile. Chaque réponse est expliquée. Comptez environ dix minutes."
      />
      <section className="bg-paper py-12 sm:py-16">
        <Container className="max-w-3xl">
          <LevelTest firstLessonHref={reading.lessons[0] ? `/epreuve/${reading.slug}/methodologie/${reading.lessons[0].slug}/` : '/parcours/'} />
        </Container>
      </section>
    </>
  );
}
