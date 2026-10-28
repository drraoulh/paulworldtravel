import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui';
import Dashboard from '@/components/epreuve/Dashboard';
import EpreuveShell from '@/components/epreuve/EpreuveShell';
import { lessonId } from '@/content/parcours';
import { seriesFor } from '@/content/series';
import { epreuveConfigs, getEpreuve } from '@/lib/epreuves';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => epreuveConfigs.map((e) => ({ slug: e.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const e = getEpreuve((await params).slug);
  return e ? { title: `Tableau de bord : ${e.module.name}` } : {};
}

export default async function TableauPage({ params }: Props) {
  const e = getEpreuve((await params).slug);
  if (!e) notFound();
  const m = e.module;
  const id = m.id;
  return (
    <EpreuveShell epreuve={e} active="tableau-de-bord" title="Tableau de bord" intro={`Votre progression en ${m.name.toLowerCase()} : leçons, résultats et corrections.`}>
      <Container>
        <Dashboard
          epreuve={id}
          slug={e.slug}
          lessonIds={m.lessons.map((l) => lessonId(m, l))}
          series={id === 'ce' || id === 'co' ? seriesFor(id).map((s) => ({ number: s.number, total: s.questions.length })) : []}
        />
      </Container>
    </EpreuveShell>
  );
}
