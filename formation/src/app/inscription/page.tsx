import type { Metadata } from 'next';
import Image from 'next/image';
import { Suspense } from 'react';
import { Container, PageHeader } from '@/components/ui';
import { contact } from '@/content/offers';
import SignupForm from './SignupForm';

export const metadata: Metadata = {
  title: 'Inscription à la préparation au TCF Canada',
  description: 'Inscrivez-vous à la préparation au TCF Canada, en ligne ou en présentiel à Douala.',
};

export default function Inscription() {
  return (
    <>
      <PageHeader
        title="Inscription"
        intro="Remplissez ce formulaire : un conseiller vous recontacte avec le tarif, les dates et les moyens de paiement. Votre accès est activé dès le paiement reçu."
      />
      <section className="bg-paper py-12 sm:py-16">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Suspense>
              <SignupForm />
            </Suspense>
          </div>
          <aside className="lg:col-span-4">
            <div className="overflow-hidden rounded-2xl border border-rule bg-white shadow-sm">
              <div className="relative h-52"><Image src="/images/classroom.jpg" alt="Participants réunis dans une salle de cours" fill sizes="(min-width: 1024px) 360px, 100vw" className="object-cover" /></div>
              <div className="p-6">
            <h2 className="heading text-xl text-night">Vous préférez parler à quelqu’un ?</h2>
            <ul className="mt-4 space-y-3">
              <li><a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="font-bold text-ocean hover:underline">WhatsApp {contact.phone}</a></li>
              <li><a href={`mailto:${contact.email}`} className="text-ocean hover:underline">{contact.email}</a></li>
              <li className="text-slate">{contact.address}</li>
            </ul>
              </div>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
