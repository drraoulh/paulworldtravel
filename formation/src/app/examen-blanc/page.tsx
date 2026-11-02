import type { Metadata } from 'next';
import { Container, PageHeader } from '@/components/ui';
import MockExam from '@/components/epreuve/MockExam';
import PackGate from '@/components/access/PackGate';
import { seriesFor } from '@/content/series';

export const metadata: Metadata = {
  title: 'Examen blanc TCF Canada',
  description: 'Les quatre épreuves du TCF Canada enchaînées et chronométrées, en conditions réelles : compréhension orale, compréhension écrite, expression écrite et expression orale.',
};

export default function ExamenBlanc() {
  // A mock exam needs a listening AND a reading series with the same number.
  const ce = new Set(seriesFor('ce').map((s) => s.number));
  const numbers = seriesFor('co').map((s) => s.number).filter((n) => ce.has(n));
  return (
    <>
      <PageHeader image={{ src: '/images/examen.jpg', alt: 'Étudiants concentrés pendant un examen écrit' }}
        title="Examen blanc, en conditions réelles."
        intro="Les quatre épreuves du TCF Canada enchaînées, avec les durées officielles : compréhension orale, compréhension écrite, expression écrite, puis expression orale."
      />
      <section className="bg-paper py-12 sm:py-16">
        <Container className="max-w-6xl"><PackGate what="L’examen blanc" next="/examen-blanc/"><MockExam series={numbers} /></PackGate></Container>
      </section>
    </>
  );
}
