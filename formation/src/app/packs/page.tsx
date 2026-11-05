import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { headers } from 'next/headers';
import { ButtonLink, Container, PageHeader } from '@/components/ui';
import PackGrid from '@/components/packs/PackGrid';
import { FREE_TRIAL, freeSeriesRange, isZone, zoneForCountry } from '@/content/offers';
import { contact } from '@/content/contact';
import { stripeConfigured } from '@/lib/stripe';

export const metadata: Metadata = {
  title: 'Packs de préparation au TCF Canada',
  description: 'Cinq packs pour préparer le TCF Canada, dès 7 jours : Express, Essentiel, Silver, Gold et Platinum, avec des prix pour le Cameroun, le Canada et les autres pays.',
};

type Props = { searchParams: Promise<{ zone?: string }> };

export default async function Packs({ searchParams }: Props) {
  const asked = (await searchParams).zone;
  // Prices follow the visitor's country (Vercel geolocation), unless a zone was chosen.
  const zone = isZone(asked) ? asked : zoneForCountry((await headers()).get('x-vercel-ip-country'));
  return (
    <>
      <PageHeader image={{ src: '/images/groupe-tuteur.jpg', alt: 'Deux étudiants préparent un examen sur ordinateur avec l’aide d’une formatrice' }}
        title="Choisissez votre pack"
        intro="Tous les packs donnent accès à la plateforme complète. Plus le pack est élevé, plus vous avez de temps, de corrections et d’accompagnement par un formateur."
      />

      <section className="bg-paper py-14 sm:py-20">
        <Container>
          <PackGrid initialZone={zone} />
          <p className="mt-8 text-slate">
            Pas encore décidé ? Le compte gratuit comprend le test de niveau, les leçons, {freeSeriesRange} de chaque compréhension (accessibles même sans compte) et un essai de l’IA : {FREE_TRIAL.writing} corrections écrites, {FREE_TRIAL.speaking} corrections orales et {FREE_TRIAL.tutor} questions au tuteur.{' '}
            <Link href="/test-de-niveau/" className="font-semibold text-ocean hover:underline">Commencer par le test de niveau</Link>
          </p>
        </Container>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="heading text-3xl text-night">Paiement et accès</h2>
            <p className="mt-4 text-lg text-slate">
              Inscrivez-vous en choisissant votre pack. Un conseiller vous contacte sous 24 h ouvrées pour le paiement : par Mobile Money (MTN ou Orange) ou dans nos bureaux de Douala et de Yaoundé au Cameroun, et à distance depuis le Canada et les autres pays, selon les moyens que le conseiller vous indique. Votre accès est activé dès réception, pour la durée du pack.
            </p>
            {stripeConfigured()
              ? <p className="mt-4 text-slate">Vous pouvez aussi payer par carte bancaire en ligne (Visa, Mastercard, Apple Pay) depuis votre espace, après la création de votre compte : l’accès s’ouvre immédiatement.</p>
              : <p className="mt-4 text-slate">Le paiement par carte en ligne arrive bientôt.</p>}
          </div>
          <div className="overflow-hidden rounded-2xl bg-paper">
            <div className="relative aspect-[16/9]"><Image src="/images/classe-groupe.jpg" alt="Un formateur accompagne des étudiants qui travaillent sur ordinateur en salle de cours" fill sizes="(min-width: 1024px) 540px, 100vw" className="object-cover" /></div>
            <div className="p-6 sm:p-8">
            <h3 className="heading text-xl text-night">Une question avant de choisir ?</h3>
            <p className="mt-2 text-slate">Écrivez-nous, nous vous aidons à choisir le pack adapté à votre niveau et à la date de votre examen.</p>
            <ButtonLink href={contact.whatsapp} className="mt-5">Nous écrire sur WhatsApp</ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
