import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { ButtonLink, Container, PageHeader } from '@/components/ui';
import NclcCalculator from '@/components/nclc/NclcCalculator';

export const metadata: Metadata = {
  title: 'Calculateur NCLC du TCF Canada',
  description: 'Convertissez vos résultats au TCF Canada en niveaux NCLC : compréhension orale et écrite (100 à 699), expression écrite et orale (sur 20), avec le barème officiel d’IRCC et le seuil NCLC 7 d’Entrée express.',
};

const explanations: { title: string; text: ReactNode }[] = [
  {
    title: 'Le NCLC 7 et Entrée express',
    text: (
      <>
        Le Programme des travailleurs qualifiés (fédéral) demande au moins le NCLC 7 dans chacune des quatre compétences, dans votre première langue officielle.
        Une seule compétence à NCLC 6 suffit à ne pas remplir cette condition : c’est pourquoi le calculateur retient votre compétence la plus faible.
      </>
    ),
  },
  {
    title: 'Des points en plus pour le français',
    text: (
      <>
        Avec au moins le NCLC 7 dans les quatre compétences en français, votre profil Entrée express reçoit des points supplémentaires : 50 points si vous avez
        aussi au moins le niveau 5 des Canadian Language Benchmarks dans les quatre compétences en anglais, 25 points sinon. Le même seuil donne accès aux rondes
        d’invitations réservées aux candidats qui parlent français.
      </>
    ),
  },
  {
    title: 'Et le Québec ?',
    text: (
      <>
        Le Québec choisit lui-même ses travailleurs qualifiés, avec le Programme de sélection des travailleurs qualifiés (PSTQ) et ses propres exigences de
        français, qui dépendent du volet et de l’emploi. Le barème NCLC d’IRCC ne s’y applique pas tel quel : vérifiez les niveaux demandés et les tests reconnus
        sur Québec.ca avant de vous inscrire.
      </>
    ),
  },
];

export default function CalculateurNclc() {
  return (
    <>
      <PageHeader
        title="Calculateur NCLC"
        intro="Entrez vos résultats au TCF Canada, ou ceux de vos séries d’entraînement : vous voyez votre NCLC dans chaque compétence et votre niveau global, avec le barème d’Immigration, Réfugiés et Citoyenneté Canada (IRCC)."
      />

      <section className="bg-paper py-12 sm:py-16">
        <Container className="max-w-4xl">
          <NclcCalculator />
        </Container>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <Container>
          <h2 className="heading text-3xl text-night">Ce que votre NCLC veut dire</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {explanations.map((e) => (
              <article key={e.title} className="rounded-2xl border border-rule p-6">
                <h3 className="heading text-xl text-night">{e.title}</h3>
                <p className="mt-3 text-slate">{e.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm text-slate">
            Outil d’information, sans valeur officielle. Les règles d’Entrée express et les barèmes peuvent changer : vérifiez toujours sur canada.ca avant votre
            demande. Les résultats du TCF Canada sont acceptés par IRCC pendant deux ans.{' '}
            <Link href="/niveaux-nclc/" className="font-semibold text-ocean underline decoration-ocean/30 decoration-2 underline-offset-4 hover:decoration-ocean">Le tableau complet des niveaux NCLC</Link>
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/epreuve/comprehension-orale/series/">Faire une série d’écoute gratuite</ButtonLink>
            <ButtonLink href="/epreuve/comprehension-ecrite/series/" variant="dark">Faire une série de lecture gratuite</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
