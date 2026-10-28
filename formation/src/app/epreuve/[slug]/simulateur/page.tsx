import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui';
import EpreuveShell from '@/components/epreuve/EpreuveShell';
import SpeakingPractice from '@/components/simulator/SpeakingPractice';
import WritingPractice from '@/components/simulator/WritingPractice';
import { expressionConfigs, getEpreuve } from '@/lib/epreuves';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => expressionConfigs.map((e) => ({ slug: e.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const e = getEpreuve((await params).slug);
  return e ? { title: `Simulateur IA : ${e.module.name}` } : {};
}

export default async function SimulateurPage({ params }: Props) {
  const e = getEpreuve((await params).slug);
  if (!e || e.kind !== 'expression') notFound();
  const isEe = e.module.id === 'ee';
  return (
    <EpreuveShell
      epreuve={e}
      active="simulateur"
      title="Simulateur IA"
      intro={isEe
        ? 'Choisissez un sujet, rédigez dans le temps conseillé, puis recevez une note sur 20, vos erreurs expliquées et une version améliorée.'
        : 'Tâches 1 et 3 : enregistrez votre réponse. Tâche 2 : préparez-vous 2 minutes, puis dialoguez avec un interlocuteur joué par l’IA. Votre oral est transcrit puis noté sur 20.'}
    >
      <Container>{isEe ? <WritingPractice /> : <SpeakingPractice />}</Container>
    </EpreuveShell>
  );
}
