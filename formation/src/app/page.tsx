import Image from 'next/image';
import Link from 'next/link';
import LevelScale from '@/components/LevelScale';
import { ButtonLink, Container } from '@/components/ui';
import { headers } from 'next/headers';
import { formatPrice, packs, zoneForCountry } from '@/content/offers';
import { lessonCount } from '@/content/parcours';
import { epreuves } from '@/content/tcf';
import { EPREUVE_IMAGES, epreuveConfigs } from '@/lib/epreuves';

const nclc7 = [
  ['458', 'en compréhension orale, sur 699'],
  ['453', 'en compréhension écrite, sur 699'],
  ['10', 'en expression écrite, sur 20'],
  ['10', 'en expression orale, sur 20'],
];

export default async function Home() {
  // Pack prices follow the visitor's country (Vercel geolocation).
  const zone = zoneForCountry((await headers()).get('x-vercel-ip-country'));
  return (
    <>
      {/* Hero: the level scale is the one memorable element. */}
      <header className="border-b border-rule bg-white">
        <Container className="pb-14 pt-14 sm:pb-20 sm:pt-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
          <div className="max-w-3xl">
            <h1 className="display text-[2.6rem] text-night sm:text-6xl lg:text-[4.2rem]">Le TCF Canada, une épreuve à la fois.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate sm:text-xl">
              Méthode, séries corrigées, simulateurs et examen blanc pour atteindre le NCLC dont votre dossier a besoin. En ligne, ou en salle à Douala et à Yaoundé.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <ButtonLink href="/test-de-niveau/">Évaluer mon niveau gratuitement</ButtonLink>
              <Link href="#epreuves" className="font-bold text-night underline decoration-rule decoration-2 underline-offset-8 hover:decoration-night">Voir les quatre épreuves</Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-paper lg:aspect-[4/5]">
            <Image src="/images/etudiants.jpg" alt="Deux étudiants révisent ensemble leurs cahiers" fill priority sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover" />
          </div>
          </div>
          <div className="mt-16 sm:mt-20">
            <LevelScale target={7} label={<>NCLC 7 : le minimum de l’Entrée express pour les travailleurs qualifiés</>} />
          </div>
        </Container>
      </header>

      {/* The four épreuves, as a list: one row per épreuve, in the order of the exam day. */}
      <section id="epreuves" className="scroll-mt-20 bg-white py-16 sm:py-24">
        <Container>
          <div className="grid gap-4 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <div>
              <h2 className="heading text-3xl text-night sm:text-4xl">Les quatre épreuves</h2>
              <p className="mt-4 text-slate">Dans l’ordre du jour de l’examen. Chacune a sa méthode, son entraînement et son tableau de bord.</p>
            </div>
            <ol className="border-t border-night">
              {epreuveConfigs.map((e) => {
                const info = epreuves.find((x) => x.id === e.module.id)!;
                const practice = e.sections.find((s) => s.key === 'series' || s.key === 'simulateur')!;
                return (
                  <li key={e.slug} className="grid gap-x-6 gap-y-3 border-b border-rule py-7 sm:grid-cols-[7rem_1fr_auto]">
                    <Link href={`/epreuve/${e.slug}/`} className="relative hidden aspect-square overflow-hidden rounded-xl bg-paper sm:block" tabIndex={-1} aria-hidden="true">
                      <Image src={EPREUVE_IMAGES[e.module.id].src} alt="" fill sizes="7rem" className="object-cover" />
                    </Link>
                    <div>
                      <Link href={`/epreuve/${e.slug}/`} className="heading text-2xl text-night hover:text-ocean">{info.name}</Link>
                      <p className="mt-1 text-sm text-slate">{info.format}, {info.minutes} minutes</p>
                      <p className="mt-3 max-w-xl text-ink">{info.what}</p>
                    </div>
                    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold sm:flex-col sm:items-end sm:pt-2">
                      <Link href={`/epreuve/${e.slug}/methodologie/`} className="text-ocean hover:underline">Méthodologie</Link>
                      <Link href={practice.href} className="text-ocean hover:underline">{practice.key === 'series' ? 'Séries de 39 questions' : 'Simulateur IA'}</Link>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </Container>
      </section>

      {/* Mock exam */}
      <section className="relative isolate overflow-hidden bg-night text-white">
        <Image src="/images/examen.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-night/85" />
        <Container className="grid gap-8 py-16 sm:py-24 lg:grid-cols-[2fr_1fr] lg:items-center">
          <div>
            <h2 className="heading text-3xl sm:text-4xl">L’examen blanc, avec les vraies durées</h2>
            <p className="mt-4 max-w-2xl text-lg text-blue-100">
              Compréhension orale en 35 minutes, compréhension écrite en 60 minutes, puis expression écrite en 60 minutes. Une seule écoute, un chronomètre, et la correction de vos trois textes à la fin.
            </p>
          </div>
          <div className="lg:justify-self-end"><ButtonLink href="/examen-blanc/">Passer l’examen blanc</ButtonLink></div>
        </Container>
      </section>

      {/* What the platform contains, stated plainly. */}
      <section className="bg-paper py-16 sm:py-24">
        <Container>
          <h2 className="heading max-w-2xl text-3xl text-night sm:text-4xl">Ce que vous trouvez ici</h2>
          <dl className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [`${lessonCount} leçons`, 'Une méthode par épreuve, avec des modèles commentés et un quiz pour valider chaque leçon.'],
              ['4 séries de 39 questions', 'En lecture et en écoute, de A1 à C2, avec des documents audio et les explications.'],
              ['21 sujets corrigés', 'À l’écrit et à l’oral, chacun avec un corrigé commenté.'],
              ['Correction par l’IA', 'Note sur 20, erreurs expliquées, NCLC indicatif, et relecture possible par votre formateur.'],
            ].map(([t, d]) => (
              <div key={t} className="border-t border-night pt-4">
                <dt className="heading text-xl text-night">{t}</dt>
                <dd className="mt-2 text-slate">{d}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* NCLC 7 */}
      <section className="bg-white py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="heading text-3xl text-night sm:text-4xl">Ce que demande un NCLC 7</h2>
            <p className="mt-4 text-lg text-slate">
              Le Canada convertit chaque résultat du TCF en niveau NCLC. Pour les travailleurs qualifiés d’Entrée express, il faut au moins un NCLC 7 dans chacune des quatre compétences.
            </p>
            <Link href="/tcf-canada/" className="mt-6 inline-block font-bold text-ocean hover:underline">Voir le tableau complet des équivalences</Link>
          </div>
          <dl className="grid grid-cols-2 border-t border-night">
            {nclc7.map(([v, l], i) => (
              <div key={l} className={`flex flex-col-reverse border-b border-rule py-6 ${i % 2 === 0 ? 'pr-6' : 'border-l pl-6'}`}>
                <dt className="mt-1 text-sm text-slate">{l}</dt>
                <dd className="display text-5xl text-night">{v}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Packs */}
      <section className="border-t border-rule bg-paper py-16 sm:py-24">
        <Container>
          <h2 className="heading max-w-2xl text-3xl text-night sm:text-4xl">Quatre packs, selon l’accompagnement voulu</h2>
          <p className="mt-4 max-w-2xl text-lg text-slate">Tous donnent accès à la plateforme complète. Les packs Gold et Platinum ajoutent un formateur, en visio ou en salle à Douala et à Yaoundé.</p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {packs.map((p) => (
              <li key={p.id} className={`rounded-2xl bg-white p-6 ${p.featured ? 'ring-2 ring-ocean' : 'border border-rule'}`}>
                <h3 className="heading text-2xl text-night">{p.name}</h3>
                <p className="mt-1 text-slate">{p.tagline}</p>
                <p className="display mt-5 whitespace-nowrap text-3xl text-night">{formatPrice(p, zone)}</p>
                <p className="text-sm text-slate">{p.months} mois d’accès</p>
              </li>
            ))}
          </ul>
          <ButtonLink href={`/packs/?zone=${zone}`} variant="dark" className="mt-10">Comparer les packs</ButtonLink>
        </Container>
      </section>
    </>
  );
}
