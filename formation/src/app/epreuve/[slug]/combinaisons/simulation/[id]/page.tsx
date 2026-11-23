import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui';
import EpreuveShell from '@/components/epreuve/EpreuveShell';
import AiGate from '@/components/access/AiGate';
import CombinationExam from '@/components/simulator/CombinationExam';
import { getEpreuve } from '@/lib/epreuves';
import { getCombinaison } from '@/lib/combinaisons-server';
import { MONTHS, toWritingTask } from '@/lib/combinaisons';

type Props = { params: Promise<{ slug: string; id: string }> };

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Simulation d’une combinaison : expression écrite', robots: { index: false } };

export default async function CombinationSimulation({ params }: Props) {
  const { slug, id } = await params;
  const e = getEpreuve(slug);
  if (!e || e.module.id !== 'ee') notFound();
  const c = await getCombinaison(decodeURIComponent(id));
  if (!c) notFound();
  const tasks = ([1, 2, 3] as const).map((n) => toWritingTask(c, n));
  const label = `Combinaison de ${MONTHS[c.content.month - 1].toLowerCase()} ${c.content.year}${c.theme ? ` · ${c.theme}` : ''}`;
  return (
    <EpreuveShell epreuve={e} active="combinaisons" title="Simulateur d’examen" intro="Les trois tâches d’une combinaison de session, en 60 minutes, puis la correction complète de vos trois textes par l’IA.">
      <Container>
        <AiGate next={`/epreuve/${e.slug}/combinaisons/simulation/${encodeURIComponent(c.id)}/`}>
          <CombinationExam id={c.id} label={label} tasks={tasks} />
        </AiGate>
      </Container>
    </EpreuveShell>
  );
}
