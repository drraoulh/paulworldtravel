import type { Metadata } from 'next';
import Link from 'next/link';
import { headers } from 'next/headers';
import { ButtonLink, Container, PageHeader } from '@/components/ui';
import PackGrid from '@/components/packs/PackGrid';
import { isZone, zoneForCountry } from '@/content/offers';
import { contact } from '@/content/contact';

export const metadata: Metadata = {
  title: 'Packs de préparation au TCF Canada',
  description: 'Quatre packs pour préparer le TCF Canada : Essentiel, Silver, Gold et Platinum, avec des prix pour le Cameroun, le Canada et les autres pays.',
};

type Props = { searchParams: Promise<{ zone?: string }> };

export default async function Packs({ searchParams }: Props) {
  const asked = (await searchParams).zone;
  // Prices follow the visitor's country (Vercel geolocation), unless a zone was chosen.
  const zone = isZone(asked) ? asked : zoneForCountry((await headers()).get('x-vercel-ip-country'));
  return (
    <>
      <PageHeader
        title="Choisissez votre pack"
        intro="Tous les packs donnent accès à la plateforme complète. Plus le pack est élevé, plus vous avez de temps, de corrections et d’accompagnement par un formateur."
      />

      <section className="bg-paper py-14 sm:py-20">
        <Container>
          <PackGrid initialZone={zone} />
          <p className="mt-8 text-slate">
            Pas encore décidé ? Créez un compte gratuit : il comprend deux corrections écrites, une correction orale et quinze questions au tuteur pour essayer.{' '}
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
            <p className="mt-4 text-slate">Le paiement en ligne directement sur le site arrive bientôt.</p>
          </div>
          <div className="rounded-2xl bg-paper p-6 sm:p-8">
            <h3 className="heading text-xl text-night">Une question avant de choisir ?</h3>
            <p className="mt-2 text-slate">Écrivez-nous, nous vous aidons à choisir le pack adapté à votre niveau et à la date de votre examen.</p>
            <ButtonLink href={contact.whatsapp} className="mt-5">Nous écrire sur WhatsApp</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
