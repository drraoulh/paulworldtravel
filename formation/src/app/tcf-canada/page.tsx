import type { Metadata } from 'next';
import Link from 'next/link';
import { ButtonLink, Container, PageHeader } from '@/components/ui';
import { epreuves, nclcTable, totalMinutes } from '@/content/tcf';
import { epreuveById } from '@/lib/epreuves';

export const metadata: Metadata = {
  title: 'Le TCF Canada : épreuves, scores et NCLC',
  description: 'Déroulement du TCF Canada, durée et format des 4 épreuves, et correspondance entre scores et niveaux NCLC.',
};

const faq = [
  ['À quoi sert le TCF Canada ?', 'Il prouve votre niveau de français auprès d’Immigration, Réfugiés et Citoyenneté Canada (IRCC), pour la résidence permanente, Entrée express ou la citoyenneté.'],
  ['Combien de temps le résultat est-il valable ?', 'IRCC accepte les résultats de moins de deux ans à la date de votre demande.'],
  ['Où passer l’examen ?', 'Dans un centre agréé par France Éducation international. Nous vous aidons à trouver une session proche de chez vous et à vous inscrire.'],
  ['Peut-on repasser l’examen ?', 'Oui. Il faut respecter un délai entre deux passages, fixé par le règlement en vigueur. Nous vous l’indiquons au moment de l’inscription.'],
];

export default function TcfCanada() {
  return (
    <>
      <PageHeader image={{ src: '/images/toronto.jpg', alt: 'Toronto et la tour CN au coucher du soleil' }}
        title="Le TCF Canada, épreuve par épreuve"
        intro="Le Test de connaissance du français pour le Canada évalue quatre compétences. Chacune reçoit un score, converti ensuite en niveau NCLC par l’immigration canadienne."
      />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <h2 className="heading text-3xl text-night sm:text-4xl">Les quatre épreuves</h2>
          <p className="mt-4 max-w-3xl text-lg text-slate">Dans l’ordre du jour de l’examen, pour une durée totale de {totalMinutes} minutes.</p>
          <ol className="mt-10 border-t border-night">
            {epreuves.map((e, i) => (
              <li key={e.id} className="grid gap-x-10 gap-y-4 border-b border-rule py-8 md:grid-cols-[3rem_1fr_19rem]">
                <span aria-hidden="true" className="display text-4xl text-night">{i + 1}</span>
                <div>
                  <h3 className="heading text-2xl text-night">
                    <Link href={`/epreuve/${epreuveById(e.id).slug}/`} className="hover:text-ocean">{e.name}</Link>
                  </h3>
                  <p className="mt-2 max-w-xl text-ink">{e.what}</p>
                </div>
                <dl className="grid grid-cols-[6rem_1fr] gap-y-1.5 text-sm">
                  <dt className="text-slate">Durée</dt><dd className="font-semibold text-night">{e.minutes} minutes</dd>
                  <dt className="text-slate">Format</dt><dd className="font-semibold text-night">{e.format}</dd>
                  <dt className="text-slate">Résultat</dt><dd className="font-semibold text-night">{e.scale}</dd>
                </dl>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-paper py-16 sm:py-20">
        <Container>
          <h2 className="heading text-3xl text-night sm:text-4xl">De votre score au NCLC</h2>
          <p className="mt-4 max-w-3xl text-lg text-slate">
            Chaque compétence est convertie séparément. Votre NCLC global est limité par votre compétence la plus faible : un NCLC 9 à l’oral ne compense pas un NCLC 6 à l’écrit.
          </p>
          <div className="mt-8 overflow-x-auto rounded-lg border border-rule bg-white">
            <table className="w-full min-w-[40rem] text-left">
              <thead className="bg-night text-sm text-white">
                <tr>
                  <th scope="col" className="px-5 py-3 font-semibold">NCLC</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Compréhension orale</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Compréhension écrite</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Expression écrite</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Expression orale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule">
                {nclcTable.map((row) => (
                  <tr key={row.nclc} className={row.nclc === '7' ? 'bg-container/15' : undefined}>
                    <th scope="row" className="px-5 py-3 font-bold text-night">{row.nclc}</th>
                    <td className="px-5 py-3">{row.co}</td>
                    <td className="px-5 py-3">{row.ce}</td>
                    <td className="px-5 py-3">{row.ee}</td>
                    <td className="px-5 py-3">{row.eo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate">
            Barème publié par IRCC. Le NCLC 7, surligné, est le minimum pour les travailleurs qualifiés d’Entrée express. Vérifiez toujours le barème en vigueur sur canada.ca avant votre demande.
          </p>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container className="max-w-4xl">
          <h2 className="heading mb-8 text-3xl text-night sm:text-4xl">Questions fréquentes</h2>
          <div className="divide-y divide-rule overflow-hidden rounded-lg border border-rule">
            {faq.map(([q, a]) => (
              <details key={q} className="group p-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                  <span className="heading text-lg text-night">{q}</span>
                  <span aria-hidden="true" className="display text-2xl leading-none text-ocean transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-slate">{a}</p>
              </details>
            ))}
          </div>
          <ButtonLink href="/test-de-niveau/" variant="dark" className="mt-10">Faire le test de niveau gratuit</ButtonLink>
        </Container>
      </section>
    </>
  );
}
