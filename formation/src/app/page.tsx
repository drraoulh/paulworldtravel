import { epreuveConfigs } from '@/lib/epreuves';
import Link from 'next/link';
import Image from 'next/image';
import ExamTimeline from '@/components/ExamTimeline';
import { ButtonLink, Check, Container } from '@/components/ui';
import { epreuves } from '@/content/tcf';
import { autresLangues, contact, formules } from '@/content/offers';

const steps = [
  ['Test de niveau', 'Quinze questions gratuites pour situer votre français, du A1 au C1.'],
  ['Inscription', 'Vous choisissez en ligne, à Douala ou les deux. Le paiement se fait à l’agence ou à distance : nous vous expliquons comment.'],
  ['Cours et entraînement', 'Méthode par épreuve, exercices corrigés, rédactions et oraux commentés par un formateur.'],
  ['Tests blancs', 'Examens complets chronométrés pour arriver le jour J en connaissant le rythme.'],
];

export default function Home() {
  const [enLigne, presentiel] = formules;
  return (
    <>
      <header className="relative overflow-hidden bg-night text-white">
        <Container className="grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div>
            <p className="eyebrow text-container"><span className="inline-block h-2 w-2 rounded-full bg-container" /> Votre projet Canada commence ici</p>
            <h1 className="display mt-6 text-5xl sm:text-6xl lg:text-[4.4rem]">Votre français.<br />Votre avenir.<br /><span className="text-container">Le Canada.</span></h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-blue-100">Préparez le TCF Canada avec une méthode claire et un accompagnement humain. En ligne, à Douala, à votre rythme.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/test-de-niveau/">Évaluer mon niveau <span aria-hidden="true" className="ml-3">↗</span></ButtonLink>
              <ButtonLink href="/formules/" variant="outline">Découvrir les formules</ButtonLink>
            </div>
            <p className="mt-5 text-sm text-blue-200">Gratuit · 15 questions · Résultat immédiat</p>
          </div>
          <div className="relative pb-8 lg:pl-4">
            <div className="relative aspect-[4/4] overflow-hidden rounded-[2rem] sm:aspect-[5/4] lg:aspect-[4/4.5]">
              <Image src="/images/toronto.jpg" alt="La tour CN et la ville de Toronto au coucher du soleil" fill priority sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-transparent to-transparent" />
              <div className="absolute left-6 top-6 rounded-full bg-white/95 px-4 py-2 text-xs font-bold tracking-wider text-night">DESTINATION CANADA</div>
              <p className="absolute bottom-8 left-7 right-7 text-2xl font-semibold leading-tight">Un objectif qui vous ressemble.<br /><span className="text-blue-100">Une préparation pour avancer.</span></p>
            </div>
            <div className="relative -mt-5 ml-5 mr-5 flex items-center gap-4 rounded-2xl bg-white p-5 text-night shadow-xl sm:ml-10 sm:mr-0">
              <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-container/20 text-2xl">↗</span>
              <div><p className="font-bold">Un cap, quatre compétences</p><p className="mt-1 text-sm text-slate">Écouter, lire, écrire et parler avec confiance.</p></div>
            </div>
          </div>
        </Container>
        <div className="border-t border-white/15 bg-night-deep/60"><Container className="py-8"><ExamTimeline /></Container></div>
      </header>

      {/* Two ways to train */}
      <section className="bg-paper py-16 sm:py-20">
        <Container>
          <p className="eyebrow mb-4 text-ocean">Apprendre à votre façon</p>
          <h2 className="heading max-w-2xl text-3xl text-night sm:text-4xl">En ligne ou en salle, le même programme</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {[enLigne, presentiel].map((f) => (
              <div key={f.id} className="overflow-hidden rounded-2xl border border-rule bg-white shadow-sm">
                <div className="relative h-56 overflow-hidden">
                  <Image src={f.id === 'en-ligne' ? '/images/study.jpg' : '/images/classroom.jpg'} alt={f.id === 'en-ligne' ? 'Prise de notes pendant une séance de travail individuel' : 'Une salle de cours avec des participants'} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                  <span className="absolute bottom-4 left-5 rounded-full bg-white px-4 py-2 text-xs font-bold text-night">{f.id === 'en-ligne' ? 'OÙ QUE VOUS SOYEZ' : 'APPRENDRE ENSEMBLE'}</span>
                </div>
                <div className="p-6 sm:p-8">
                <h3 className="heading text-2xl text-night">{f.name}</h3>
                <p className="mt-1 text-slate">{f.where}</p>
                <ul className="mt-6 space-y-3">
                  {f.includes.slice(0, 4).map((item) => <Check key={item}>{item}</Check>)}
                </ul>
                <Link href={`/inscription/?formule=${f.id}`} className="mt-6 inline-flex font-bold text-ocean hover:underline">Découvrir cette formule <span aria-hidden="true" className="ml-2">→</span></Link>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-slate">
            Vous hésitez ? La formule <Link href="/formules/" className="font-semibold text-ocean underline-offset-4 hover:underline">hybride</Link> combine les deux.
          </p>
        </Container>
      </section>

      {/* The four épreuves */}
      <section id="epreuves" className="scroll-mt-20 bg-white py-16 sm:py-20">
        <Container>
          <h2 className="heading max-w-2xl text-3xl text-night sm:text-4xl">Les quatre épreuves du TCF Canada</h2>
          <p className="mt-4 max-w-2xl text-slate">Pour chaque épreuve : la méthode en leçons courtes, des séries ou des sujets corrigés, un simulateur et votre tableau de bord.</p>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {epreuveConfigs.map((e) => {
              const info = epreuves.find((x) => x.id === e.module.id)!;
              return (
                <Link key={e.slug} href={`/epreuve/${e.slug}/`} className="group flex flex-col rounded-2xl border border-rule bg-paper p-6 transition-colors hover:border-ocean sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="heading text-xl text-night group-hover:text-ocean">{info.name}</h3>
                    <span className="text-sm font-semibold text-slate">{info.format}, {info.minutes} min</span>
                  </div>
                  <p className="mt-3 flex-1 text-slate">{info.what}</p>
                  <span className="mt-5 font-bold text-ocean">Commencer</span>
                </Link>
              );
            })}
          </div>
          <Link href="/examen-blanc/" className="mt-4 flex flex-col gap-2 rounded-2xl bg-night p-6 text-white transition-colors hover:bg-ocean sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <span>
              <span className="heading block text-xl">Examen blanc</span>
              <span className="mt-1 block text-blue-100">Compréhension orale, compréhension écrite et expression écrite enchaînées, avec les durées officielles.</span>
            </span>
            <span className="font-bold text-container">Passer l’examen blanc</span>
          </Link>
        </Container>
      </section>

      {/* Steps */}
      <section className="bg-paper py-16 sm:py-20">
        <Container>
          <h2 className="heading text-3xl text-night sm:text-4xl">Votre parcours jusqu’à l’examen</h2>
          <ol className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(([title, text], i) => (
              <li key={title} className="rounded-2xl border border-rule bg-white p-6">
                <span className="display text-4xl text-ocean/40">{i + 1}</span>
                <p className="heading mt-3 text-lg text-night">{title}</p>
                <p className="mt-2 text-slate">{text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* NCLC */}
      <section className="bg-white py-16 sm:py-20">
        <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="heading text-3xl text-night sm:text-4xl">Quel NCLC viser ?</h2>
            <p className="mt-4 text-lg text-slate">
              Le Canada convertit vos résultats en niveaux NCLC, de 1 à 12. Pour les travailleurs qualifiés d’Entrée express, le minimum est un NCLC 7 dans chacune des quatre compétences. Un meilleur NCLC rapporte aussi plus de points.
            </p>
            <Link href="/tcf-canada/" className="mt-6 inline-block font-bold text-ocean underline-offset-4 hover:underline">
              Voir le barème complet et le déroulement de l’examen
            </Link>
          </div>
          <div className="rounded-lg bg-night p-6 text-white sm:p-8">
            <p className="text-blue-200">Pour un NCLC 7, il faut au moins :</p>
            <dl className="mt-5 grid grid-cols-2 gap-6">
              {[['458', 'en compréhension orale'], ['453', 'en compréhension écrite'], ['10 / 20', 'en expression écrite'], ['10 / 20', 'en expression orale']].map(([v, l]) => (
                <div key={l} className="flex flex-col-reverse">
                  <dt className="mt-1 text-sm text-blue-100">{l}</dt>
                  <dd className="display text-3xl text-container sm:text-4xl">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* Other languages */}
      <section className="bg-paper py-16 sm:py-20">
        <Container>
          <h2 className="heading text-3xl text-night sm:text-4xl">D’autres langues arrivent</h2>
          <p className="mt-4 max-w-2xl text-lg text-slate">Nous préparons des formations pour d’autres examens de langue. Inscrivez-vous pour être prévenu.</p>
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {autresLangues.map((l) => (
              <li key={l.name} className="rounded-lg border border-rule bg-white p-5">
                <p className="heading text-lg text-night">{l.name}</p>
                <p className="mt-1 text-slate">{l.exams}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-night py-16 text-white sm:py-20">
        <Container className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="display text-3xl sm:text-4xl">Commencez par votre niveau</h2>
            <p className="mt-4 text-lg text-blue-100">Dix minutes, quinze questions, un résultat immédiat. Ensuite, nous vous conseillons la formule adaptée.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/test-de-niveau/">Faire le test</ButtonLink>
            <ButtonLink href={contact.whatsapp} variant="outline">Écrire sur WhatsApp</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
