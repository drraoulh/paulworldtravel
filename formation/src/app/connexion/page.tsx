import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import { Container } from '@/components/ui';
import LoginForm from './LoginForm';

export const metadata: Metadata = { title: 'Connexion à votre espace', robots: { index: false } };

export default function Connexion() {
  return (
    <section className="bg-paper py-12 sm:py-20">
      <Container className="grid max-w-5xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative hidden min-h-[580px] overflow-hidden rounded-[2rem] bg-night lg:block">
          <Image src="/images/toronto.jpg" alt="Toronto, au Canada" fill sizes="480px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-transparent" />
          <div className="absolute bottom-10 left-8 right-8 text-white"><p className="display text-4xl">Chaque séance vous rapproche de votre projet.</p><p className="mt-5 leading-relaxed text-blue-100">Retrouvez votre inscription, votre formule et vos résultats de test de niveau.</p></div>
        </div>
        <div className="rounded-2xl border border-rule bg-white p-6 shadow-sm sm:p-8">
        <Suspense>
          <LoginForm />
        </Suspense>
        <p className="mt-6 text-center text-slate">
          Pas encore de compte ? <Link href="/inscription/" className="font-semibold text-ocean hover:underline">Inscrivez-vous</Link>
        </p>
        </div>
      </Container>
    </section>
  );
}
