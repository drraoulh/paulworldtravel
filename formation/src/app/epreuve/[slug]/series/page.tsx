import ForAudience from '@/components/access/ForAudience';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui';
import EpreuveShell from '@/components/epreuve/EpreuveShell';
import SeriesList from '@/components/epreuve/SeriesList';
import TeamSeries from '@/components/epreuve/TeamSeries';
import { freeSeriesAreFree, freeSeriesRange } from '@/content/offers';
import { seriesFor } from '@/content/series/catalog';
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
  const free = `${freeSeriesRange.charAt(0).toUpperCase() + freeSeriesRange.slice(1)} ${freeSeriesAreFree} avec un compte gratuit ; les suivantes nécessitent un pack.`;
  const series = seriesFor(id).map((s) => ({ number: s.number, count: s.questions.length }));

  return (
    <EpreuveShell
      epreuve={e}
      active="series"
      title="Séries d’entraînement"
      intro={<>Des séries complètes de 39 questions, de difficulté croissante comme à l’examen. <ForAudience visitor={free} free={free} pack="Toutes les séries sont incluses dans votre pack." />{id === 'co' ? ' Une seule écoute par document en conditions d’examen.' : ''}</>}
    >
      <Container className="space-y-12">
        <SeriesList epreuve={id} slug={e.slug} series={series} />
        {id === 'ce' && <TeamSeries />}
        <p className="text-sm text-slate">
          Questions originales créées pour cette plateforme, pas des questions officielles du TCF.
          {id === 'co' && ' Les séries 1 à 8 sont enregistrées avec des voix québécoises de synthèse (ElevenLabs) ; les suivantes, avec des voix de synthèse libres (SIWIS, licence CC BY 4.0 ; UPMC Pierre, licence CC BY-SA 4.0). Complétez avec la radio et des podcasts francophones pour habituer votre oreille aux vrais accents.'}
        </p>
      </Container>
    </EpreuveShell>
  );
}
