import type { Metadata } from 'next';
import Image from 'next/image';
import { Suspense } from 'react';
import { Container, PageHeader } from '@/components/ui';
import { contact } from '@/content/contact';
import SignupForm from './SignupForm';
import { visitorZone } from '@/lib/zone';

export const metadata: Metadata = {
  title: 'Inscription à la préparation au TCF Canada',
  description: 'Inscrivez-vous à la préparation au TCF Canada, en ligne ou en présentiel à Douala et à Yaoundé.',
};

export default async function Inscription() {
  return (
    <>
      <PageHeader image={{ src: '/images/depart-valise.jpg', alt: 'Un homme souriant montre son passeport en préparant sa valise' }}
        title="Créer mon compte"
        intro="Commencez gratuitement, ou choisissez directement un pack : un conseiller vous contacte alors pour le paiement et votre accès est activé dès réception."
      />
      <section className="bg-paper py-12 sm:py-16">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Suspense>
              <SignupForm zone={await visitorZone()} />
            </Suspense>
          </div>
          <aside className="lg:col-span-4">
            <div className="overflow-hidden rounded-2xl border border-rule bg-white shadow-sm">
              <div className="relative h-52"><Image src="/images/tutorat.jpg" alt="Une formatrice accompagne un étudiant qui travaille sur son ordinateur" fill sizes="(min-width: 1024px) 360px, 100vw" className="object-cover" /></div>
              <div className="p-6">
            <h2 className="heading text-xl text-night">Vous préférez parler à quelqu’un ?</h2>
            <ul className="mt-4 space-y-3">
              <li><a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="font-bold text-ocean underline decoration-ocean/30 decoration-2 underline-offset-4 hover:decoration-ocean">WhatsApp {contact.phone}</a></li>
              <li><a href={`mailto:${contact.email}`} className="text-ocean underline decoration-ocean/30 decoration-2 underline-offset-4 hover:decoration-ocean">{contact.email}</a></li>
              <li><a href={contact.phone2Href} className="text-ocean underline decoration-ocean/30 decoration-2 underline-offset-4 hover:decoration-ocean">{contact.phone2}</a></li>
            </ul>
              </div>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
