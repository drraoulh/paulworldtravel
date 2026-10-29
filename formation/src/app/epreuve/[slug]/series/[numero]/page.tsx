import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui';
import EpreuveShell from '@/components/epreuve/EpreuveShell';
import SeriesRunner from '@/components/epreuve/SeriesRunner';
import { allSeries, getSeries } from '@/content/series';
import { epreuveById, getEpreuve } from '@/lib/epreuves';

type Props = { params: Promise<{ slug: string; numero: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => allSeries.map((s) => ({ slug: epreuveById(s.epreuve).slug, numero: String(s.number) }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, numero } = await params;
  const e = getEpreuve(slug);
  return e ? { title: `Série ${numero} : ${e.module.name}` } : {};
}

export default async function SeriePage({ params }: Props) {
  const { slug, numero } = await params;
  const e = getEpreuve(slug);
  if (!e || e.kind !== 'comprehension') notFound();
  const id = e.module.id as 'ce' | 'co';
  const series = getSeries(id, Number(numero));
  if (!series) notFound();

  return (
    <EpreuveShell epreuve={e} active="series" title={`Série ${series.number}`} intro={`${series.questions.length} questions de ${e.module.name.toLowerCase()}, du niveau A1 au C2.`}>
      <Container className="max-w-6xl">
        <SeriesRunner epreuve={id} number={series.number} questions={series.questions} />
      </Container>
    </EpreuveShell>
  );
}
