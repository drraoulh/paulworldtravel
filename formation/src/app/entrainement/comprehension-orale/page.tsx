import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, PageHeader } from '@/components/ui';
import ListeningPractice from './ListeningPractice';

export const metadata: Metadata = { title: 'Compréhension orale : série d’écoute' };

export default function ComprehensionOrale() {
  return (
    <>
      <PageHeader
        title="Écoutez, puis répondez."
        intro="Huit documents originaux, de l’annonce en gare à la chronique radio, du niveau A1 au C1. Sans compte, gratuit."
      />
      <section className="bg-paper py-12 sm:py-16">
        <Container className="max-w-4xl">
          <ListeningPractice />
          <p className="mt-6 text-sm text-slate">
            Les documents sont lus par la voix de synthèse de votre navigateur : utile pour s’entraîner à la méthode, mais moins riche qu’un vrai enregistrement.
            Complétez avec la radio et les podcasts francophones, et suivez le{' '}
            <Link href="/parcours/comprehension-orale/" className="font-semibold text-ocean hover:underline">module de compréhension orale</Link>.
            Ce ne sont pas des questions officielles du TCF.
          </p>
        </Container>
      </section>
    </>
  );
}
