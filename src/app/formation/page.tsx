import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ButtonLink, CheckItem, Container, PageHero } from '@/components/site';
import { formules } from '../../../formation/src/content/offers';
import { epreuves } from '../../../formation/src/content/tcf';

export const metadata: Metadata = {
  title: 'Formation TCF Canada | Paul World Travel',
  description: 'Découvrez les formules de préparation au TCF Canada et essayez gratuitement les exercices de compréhension écrite.',
};

export default function FormationPreview() {
  return <>
    <PageHero title={<>Votre français.<br />Votre avenir au Canada.</>} intro="Préparez le TCF Canada en ligne ou en présentiel à Douala. Découvrez notre méthode et commencez dès maintenant avec une série gratuite." image="/images/photos/canada-toronto.jpg">
      <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-container">Paul World Travel Formation</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row"><ButtonLink href="/formation/entrainement/">Essayer les exercices gratuits</ButtonLink><ButtonLink href="#formules" variant="outline">Découvrir les formules</ButtonLink></div>
    </PageHero>
    <section className="bg-paper py-14 sm:py-20">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div><p className="text-sm font-bold uppercase tracking-widest text-ocean">Un objectif, quatre compétences</p><h2 className="heading mt-4 text-3xl text-night sm:text-4xl">La méthode avant la vitesse.</h2><p className="mt-5 text-lg text-slate">Apprenez à repérer les informations importantes, à comprendre les nuances et à organiser vos réponses. Notre première série de lecture est accessible sans compte.</p><Link href="/formation/entrainement/" className="mt-6 inline-block font-bold text-ocean hover:underline">Commencer les six exercices →</Link></div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl"><Image src="/images/photos/canada-montreal.jpg" alt="Vue sur Montréal au Canada" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /></div>
      </Container>
    </section>
    <section className="bg-white py-14 sm:py-20"><Container><h2 className="heading text-3xl text-night">Chaque épreuve a sa méthode</h2><div className="mt-8 grid gap-5 md:grid-cols-2">{epreuves.map(e => <article key={e.id} className="rounded-2xl border border-rule bg-paper p-6"><p className="text-sm font-bold uppercase tracking-widest text-ocean">{e.short} · {e.minutes} min</p><h3 className="heading mt-3 text-xl text-night">{e.name}</h3><p className="mt-3 text-slate">{e.what}</p><p className="mt-3"><strong>Notre méthode : </strong>{e.how}</p></article>)}</div><p className="mt-6 text-sm text-slate">L’aperçu propose actuellement la compréhension écrite. Les modules audio, les tests blancs complets et les productions corrigées seront ajoutés progressivement.</p></Container></section>
    <section id="formules" className="scroll-mt-24 bg-paper py-14 sm:py-20"><Container><h2 className="heading text-3xl text-night">À votre rythme, selon votre projet</h2><div className="mt-8 grid gap-6 lg:grid-cols-3">{formules.map(f => <article key={f.id} className="flex flex-col rounded-2xl border border-rule bg-white p-6"><h3 className="heading text-2xl text-night">{f.name}</h3><p className="mt-2 text-sm text-slate">{f.where}</p><p className="mt-4">{f.summary}</p><ul className="my-6 flex-1 space-y-3">{f.includes.map(item => <CheckItem key={item}>{item}</CheckItem>)}</ul><p className="heading text-xl text-night">{f.price ?? 'Tarif sur demande'}</p><p className="mt-2 text-sm text-slate">{f.schedule ?? 'Calendrier communiqué par votre conseiller'}</p><ButtonLink href="/contact/" className="mt-6">Parler à un conseiller</ButtonLink></article>)}</div></Container></section>
    <section className="bg-night py-14 text-white"><Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center"><div><h2 className="heading text-3xl">Commencez par une première série.</h2><p className="mt-3 text-blue-100">Six textes originaux, des corrections expliquées et un mode chronométré.</p></div><ButtonLink href="/formation/entrainement/">M’entraîner gratuitement</ButtonLink></Container></section>
  </>;
}
