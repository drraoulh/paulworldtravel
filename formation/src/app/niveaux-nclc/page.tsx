import type { Metadata } from 'next';
import Link from 'next/link';
import { ButtonLink, Container, PageHeader } from '@/components/ui';
import LevelScale from '@/components/LevelScale';
import { NCLC_CEFR, NCLC_TABLE, nclcLabel } from '@/lib/nclc';

export const metadata: Metadata = {
  title: 'Niveaux NCLC du TCF Canada : tableau complet',
  description: 'Le tableau officiel d’IRCC entre les résultats du TCF Canada et les niveaux NCLC 4 à 10, pour les quatre épreuves, avec l’équivalence indicative dans le CECR (A1 à C2).',
};

const range = ([a, b]: [number, number]) => (a === b ? String(a) : `${a} – ${b}`);

/** TCF score scale and CEFR levels (France Éducation international). */
const cefrScale = [
  ['A1', '100 – 199'], ['A2', '200 – 299'], ['B1', '300 – 399'], ['B2', '400 – 499'], ['C1', '500 – 599'], ['C2', '600 – 699'],
];

export default function NiveauxNclc() {
  return (
    <>
      <PageHeader
        title="Les niveaux NCLC du TCF Canada"
        intro="Les Niveaux de compétence linguistique canadiens (NCLC) servent à Immigration, Réfugiés et Citoyenneté Canada (IRCC) pour lire votre résultat de français. Chaque épreuve du TCF Canada est convertie séparément, selon le tableau ci-dessous."
      />

      <section className="bg-white py-14 sm:py-20">
        <Container>
          <h2 className="heading text-3xl text-night">TCF Canada et NCLC, épreuve par épreuve</h2>
          <p className="mt-4 max-w-3xl text-lg text-slate">
            Les compréhensions donnent un score de 100 à 699, les expressions une note sur 20. Le NCLC 7, surligné, est le seuil d’Entrée express pour les travailleurs qualifiés et pour les points supplémentaires en français.
          </p>
          <div className="mt-8 overflow-x-auto rounded-lg border border-rule bg-white">
            <table className="w-full min-w-[44rem] text-left">
              <caption className="sr-only">Équivalences entre les résultats du TCF Canada et les niveaux NCLC</caption>
              <thead className="bg-night text-sm text-white">
                <tr>
                  <th scope="col" className="px-5 py-3 font-semibold">NCLC</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Compréhension orale</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Compréhension écrite</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Expression écrite</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Expression orale</th>
                  <th scope="col" className="px-5 py-3 font-semibold">CECR (repère)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule tabular-nums">
                {NCLC_TABLE.map((r) => (
                  <tr key={r.nclc} className={r.nclc === 7 ? 'bg-container/40' : undefined}>
                    <th scope="row" className="px-5 py-3 font-bold text-night">{nclcLabel(r.nclc)}</th>
                    <td className="px-5 py-3">{range(r.co)}</td>
                    <td className="px-5 py-3">{range(r.ce)}</td>
                    <td className="px-5 py-3">{range(r.ee)} / 20</td>
                    <td className="px-5 py-3">{range(r.eo)} / 20</td>
                    <td className="px-5 py-3 font-semibold text-night">{NCLC_CEFR[r.nclc]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate">
            Source : tableaux d’équivalence des tests linguistiques d’IRCC (canada.ca), consultés en novembre 2026. Sous le NCLC 4, IRCC ne donne pas de niveau pour le TCF Canada.
            Le repère CECR est celui de la correspondance du TCF Canada pour les épreuves d’expression ; il est indicatif. Vérifiez toujours le barème en vigueur sur canada.ca avant votre demande.
          </p>
        </Container>
      </section>

      <section className="bg-paper py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="heading text-3xl text-night">Le score sur 699 et le CECR</h2>
            <p className="mt-4 text-lg text-slate">
              Pour les épreuves à choix multiple, le score du TCF se lit aussi sur l’échelle du Cadre européen commun de référence pour les langues (CECR), par tranches de cent points.
            </p>
            <div className="mt-6 overflow-hidden rounded-lg border border-rule bg-white">
              <table className="w-full text-left">
                <caption className="sr-only">Score du TCF et niveau du CECR</caption>
                <thead className="bg-night text-sm text-white">
                  <tr><th scope="col" className="px-5 py-3 font-semibold">CECR</th><th scope="col" className="px-5 py-3 font-semibold">Score du TCF</th></tr>
                </thead>
                <tbody className="divide-y divide-rule tabular-nums">
                  {cefrScale.map(([level, scores]) => (
                    <tr key={level}><th scope="row" className="px-5 py-3 font-bold text-night">{level}</th><td className="px-5 py-3">{scores}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-slate">Échelle de France Éducation international pour les épreuves à choix multiple.</p>
          </div>
          <div className="rounded-2xl bg-white p-6 sm:p-8">
            <h3 className="heading text-xl text-night">Bon à savoir</h3>
            <ul className="mt-4 list-disc space-y-3 pl-5 text-slate">
              <li>Votre niveau global est celui de votre compétence la plus faible : un NCLC 9 à l’oral ne compense pas un NCLC 6 à l’écrit.</li>
              <li>Les seuils ne sont pas les mêmes en compréhension orale et écrite : 458 suffit pour le NCLC 7 à l’oral, 453 à l’écrit.</li>
              <li>Un seul point sous un seuil fait perdre un niveau entier. Visez une marge de sécurité.</li>
              <li>IRCC accepte les résultats de moins de deux ans à la date de votre demande.</li>
            </ul>
            <div className="mt-8"><LevelScale target={7} label="NCLC 7 : le seuil d’Entrée express" /></div>
            <ButtonLink href="/calculateur-nclc/" className="mt-8">Calculer mon NCLC</ButtonLink>
            <p className="mt-4 text-sm text-slate">
              Pour le déroulement des épreuves, voir <Link href="/tcf-canada/" className="font-semibold text-ocean hover:underline">le TCF Canada, épreuve par épreuve</Link>.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
