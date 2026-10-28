import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { Container } from '@/components/ui';
import LoginForm from './LoginForm';

export const metadata: Metadata = { title: 'Connexion à votre espace', robots: { index: false } };

export default function Connexion() {
  return (
    <section className="bg-paper py-12 sm:py-20">
      <Container className="max-w-lg">
        <Suspense>
          <LoginForm />
        </Suspense>
        <p className="mt-6 text-center text-slate">
          Pas encore de compte ? <Link href="/inscription/" className="font-semibold text-ocean hover:underline">Inscrivez-vous</Link>
        </p>
      </Container>
    </section>
  );
}
