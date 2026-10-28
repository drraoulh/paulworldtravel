import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui';
import EpreuveShell from '@/components/epreuve/EpreuveShell';
import SeriesList from '@/components/epreuve/SeriesList';
import TeamSeries from '@/components/epreuve/TeamSeries';
import { seriesFor } from '@/content/series';
import { comprehensionConfigs, getEpreuve } from '@/lib/epreuves';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => comprehensionConfigs.map((e) => ({ slug: e.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const e = getEpreuve((await params).slug);
  return e ? { title: `Séries d’entraînement : ${e.module.name}` } : {};
}

export default async function SeriesPage({ params }: Props) {
  const e = getEpreuve((await params).slug);
  if (!e || e.kind !== 'comprehension') notFound();
  const id = e.module.id as 'ce' | 'co';
  const series = seriesFor(id).map((s) => ({ number: s.number, count: s.questions.length }));

  return (
    <EpreuveShell
      epreuve={e}
      active="series"
      title="Séries d’entraînement"
      intro={`Des séries complètes de 39 questions, de difficulté croissante comme à l’examen. ${id === 'co' ? 'Les documents sont lus par la voix de votre navigateur.' : 'Sans compte, gratuit.'}`}
    >
      <Container className="space-y-12">
        <SeriesList epreuve={id} slug={e.slug} series={series} />
        {id === 'ce' && <TeamSeries />}
        <p className="text-sm text-slate">
          Questions originales créées pour cette plateforme, pas des questions officielles du TCF.
          {id === 'co' && ' La voix de synthèse aide à travailler la méthode ; complétez avec la radio et des podcasts francophones pour habituer votre oreille aux vrais accents.'}
        </p>
      </Container>
    </EpreuveShell>
  );
}
