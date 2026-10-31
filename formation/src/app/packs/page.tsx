import type { Metadata } from 'next';
import Link from 'next/link';
import { ButtonLink, Check, Container, PageHeader } from '@/components/ui';
import { formatFcfa, packs } from '@/content/offers';
import { contact } from '@/content/contact';

export const metadata: Metadata = {
  title: 'Packs de préparation au TCF Canada',
  description: 'Quatre packs pour préparer le TCF Canada : Essentiel, Silver, Gold et Platinum, de 15 000 à 150 000 FCFA.',
};

export default function Packs() {
  return (
    <>
      <PageHeader
        title="Choisissez votre pack"
        intro="Tous les packs donnent accès à la plateforme complète. Plus le pack est élevé, plus vous avez de temps, de corrections et d’accompagnement par un formateur."
      />

      <section className="bg-paper py-14 sm:py-20">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {packs.map((p) => (
              <article key={p.id} className={`relative flex flex-col rounded-2xl bg-white p-6 ${p.featured ? 'ring-2 ring-ocean' : 'border border-rule'}`}>
                {p.featured && <span className="absolute -top-3 left-6 rounded-full bg-ocean px-3 py-1 text-xs font-bold text-white">Le plus choisi</span>}
                <h2 className="heading text-2xl text-night">{p.name}</h2>
                <p className="mt-1 text-slate">{p.tagline}</p>
                <p className="mt-6">
                  <span className="display whitespace-nowrap text-[2rem] text-night">{formatFcfa(p.price)}</span>
                </p>
                <p className="text-sm text-slate">pour {p.months} mois d’accès</p>
                <ul className="mt-6 flex-1 space-y-3 text-[0.95rem]">
                  {p.includes.map((item) => <Check key={item}>{item}</Check>)}
                </ul>
                <ButtonLink href={`/inscription/?formule=${p.id}`} variant={p.featured ? 'primary' : 'dark'} className="mt-8 w-full">
                  Choisir {p.name}
                </ButtonLink>
              </article>
            ))}
          </div>
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
              Inscrivez-vous en choisissant votre pack. Un conseiller vous contacte sous 24 h ouvrées pour le paiement, par Mobile Money (MTN ou Orange) ou dans nos bureaux de Douala et de Yaoundé. Votre accès est activé dès réception, pour la durée du pack.
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
