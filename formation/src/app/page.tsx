import Link from 'next/link';
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
      <header className="relative isolate overflow-hidden bg-night text-white">
        <div aria-hidden="true" className="absolute -right-40 -top-40 -z-10 h-[30rem] w-[30rem] rounded-full bg-ocean/40 blur-3xl" />
        <Container className="py-16 sm:py-24">
          <p className="font-semibold text-container">Préparation au TCF Canada</p>
          <h1 className="display mt-4 max-w-4xl text-[2.5rem] sm:text-6xl">Obtenez le NCLC qu’il vous faut pour le Canada.</h1>
          <p className="mt-6 max-w-2xl text-lg text-blue-100 sm:text-xl">
            Cours en ligne ou en salle à Douala, entraînement sur les quatre épreuves, tests blancs chronométrés et corrections par des formateurs.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/test-de-niveau/">Faire le test de niveau gratuit</ButtonLink>
            <ButtonLink href="/formules/" variant="outline">Voir les formules</ButtonLink>
          </div>
          <div className="mt-16 border-t border-white/15 pt-10">
            <ExamTimeline />
          </div>
        </Container>
      </header>

      {/* Two ways to train */}
      <section className="bg-paper py-16 sm:py-20">
        <Container>
          <h2 className="heading max-w-2xl text-3xl text-night sm:text-4xl">En ligne ou en salle, le même programme</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {[enLigne, presentiel].map((f) => (
              <div key={f.id} className="rounded-lg bg-white p-6 sm:p-8">
                <h3 className="heading text-2xl text-night">{f.name}</h3>
                <p className="mt-1 text-slate">{f.where}</p>
                <ul className="mt-6 space-y-3">
                  {f.includes.slice(0, 4).map((item) => <Check key={item}>{item}</Check>)}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-slate">
            Vous hésitez ? La formule <Link href="/formules/" className="font-semibold text-ocean underline-offset-4 hover:underline">hybride</Link> combine les deux.
          </p>
        </Container>
      </section>

      {/* The four épreuves */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <h2 className="heading max-w-2xl text-3xl text-night sm:text-4xl">Chaque épreuve a sa méthode</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2">
            {epreuves.map((e) => (
              <div key={e.id} className="border-t-4 border-ocean pt-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="heading text-xl text-night">{e.name}</h3>
                  <span className="text-sm font-semibold text-slate">{e.minutes} min, {e.scale.toLowerCase()}</span>
                </div>
                <p className="mt-3 text-slate">{e.what}</p>
                <p className="mt-3"><span className="font-semibold text-night">Notre préparation : </span>{e.how}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Steps */}
      <section className="bg-paper py-16 sm:py-20">
        <Container>
          <h2 className="heading text-3xl text-night sm:text-4xl">Votre parcours jusqu’à l’examen</h2>
          <ol className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(([title, text], i) => (
              <li key={title} className="border-t-4 border-night pt-5">
                <span className="display text-4xl text-sky">{i + 1}</span>
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
