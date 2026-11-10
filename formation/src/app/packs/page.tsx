import ForAudience, { PackStatus } from '@/components/access/ForAudience';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ButtonLink, Container, PageHeader } from '@/components/ui';
import PackGrid from '@/components/packs/PackGrid';
import PromoBanner from '@/components/packs/PromoBanner';
import { freeSeriesRange } from '@/content/offers';
import { visitorZone } from '@/lib/zone';
import { contact } from '@/content/contact';
import { stripeConfigured, stripeTestMode } from '@/lib/stripe';

export const metadata: Metadata = {
  title: 'Packs de préparation au TCF Canada',
  description: 'Cinq packs pour préparer le TCF Canada, dès 7 jours : Express, Essentiel, Silver, Gold et Platinum, avec des prix pour le Cameroun, le Canada et les autres pays.',
};

export default async function Packs() {
  // Prices follow the visitor's country (Vercel geolocation): FCFA, CAD, otherwise USD.
  const zone = await visitorZone();
  return (
    <>
      <PageHeader image={{ src: '/images/groupe-tuteur.jpg', alt: 'Deux étudiants préparent un examen sur ordinateur avec l’aide d’une formatrice' }}
        title="Choisissez votre pack"
        intro="Tous les packs donnent accès à la plateforme complète. Plus le pack est élevé, plus vous avez de temps, de corrections et d’accompagnement par un formateur."
      />

      <section className="bg-paper py-14 sm:py-20">
        <Container>
          <div className="mb-8 empty:hidden"><PromoBanner link={false} /></div>
          <ul className="mb-10 grid gap-3 text-center sm:grid-cols-4">
            {[['87', 'séries de 39 questions'], ['43', 'examens blancs complets'], ['540', 'combinaisons corrigées'], ['3 600+', 'sujets d’expression orale']].map(([n, l]) => (
              <li key={l} className="rounded-2xl bg-white p-4 shadow-[0_6px_20px_rgba(20,33,61,.06)]"><span className="display block text-3xl text-ocean">{n}</span><span className="text-sm text-slate">{l}</span></li>
            ))}
          </ul>
          <ForAudience pack={(
            <div className="mb-8 rounded-2xl border-2 border-green-600 bg-white p-5 sm:p-6" role="status">
              <p className="flex items-center gap-2 font-bold text-night"><span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-green-600" /><PackStatus /></p>
              <p className="mt-2 text-slate">Pour prolonger votre accès ou passer à un pack supérieur, choisissez-le ci-dessous ou écrivez-nous sur WhatsApp.</p>
              <Link href="/espace/" className="mt-3 inline-flex font-bold text-ocean underline decoration-ocean/30 decoration-2 underline-offset-4 hover:decoration-ocean">Voir mon espace</Link>
            </div>
          )} />
          <PackGrid zone={zone} />
          <ForAudience visitor={<p className="mt-8 text-slate">
            Pas encore décidé ? Le compte gratuit comprend le test de niveau, les leçons, {freeSeriesRange} de chaque compréhension (avec un compte gratuit) sans accès à l’IA. Les corrections et le tuteur nécessitent un pack payant actif.{' '}
            <Link href="/test-de-niveau/" className="font-semibold text-ocean underline decoration-ocean/30 decoration-2 underline-offset-4 hover:decoration-ocean">Commencer par le test de niveau</Link>
          </p>} free={<p className="mt-8 text-slate">
            Pas encore décidé ? Le compte gratuit comprend le test de niveau, les leçons, {freeSeriesRange} de chaque compréhension (avec un compte gratuit) sans accès à l’IA. Les corrections et le tuteur nécessitent un pack payant actif.{' '}
            <Link href="/test-de-niveau/" className="font-semibold text-ocean underline decoration-ocean/30 decoration-2 underline-offset-4 hover:decoration-ocean">Commencer par le test de niveau</Link>
          </p>} />
        </Container>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="heading text-3xl text-night">Paiement et accès</h2>
            <p className="mt-4 text-lg text-slate">
              Inscrivez-vous en choisissant votre pack. Un conseiller vous contacte sous 24 h ouvrées pour le paiement : par Mobile Money (MTN ou Orange) ou dans nos bureaux de Douala et de Yaoundé au Cameroun, et à distance depuis le Canada et les autres pays, selon les moyens que le conseiller vous indique. Votre accès est activé dès réception, pour la durée du pack.
            </p>
            {stripeConfigured() && !stripeTestMode()
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
