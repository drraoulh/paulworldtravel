import type { Metadata } from 'next';
import { ButtonLink, Container, PageHeader } from '@/components/ui';
import { epreuves, nclcTable } from '@/content/tcf';

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
          <div className="mt-8 overflow-x-auto rounded-lg border border-rule">
            <table className="w-full min-w-[40rem] text-left">
              <thead className="bg-paper text-sm text-slate">
                <tr>
                  <th scope="col" className="px-5 py-3 font-semibold">Épreuve</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Durée</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Format</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Résultat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule">
                {epreuves.map((e) => (
                  <tr key={e.id}>
                    <th scope="row" className="px-5 py-4 font-semibold text-night">{e.name}</th>
                    <td className="px-5 py-4">{e.minutes} min</td>
                    <td className="px-5 py-4">{e.format}</td>
                    <td className="px-5 py-4">{e.scale}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            {epreuves.map((e) => (
              <div key={e.id}>
                <h3 className="heading text-xl text-night">{e.name}</h3>
                <p className="mt-2 text-slate">{e.what}</p>
              </div>
            ))}
          </div>
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
