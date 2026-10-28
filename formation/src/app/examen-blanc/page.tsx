import type { Metadata } from 'next';
import { Container, PageHeader } from '@/components/ui';
import MockExam from '@/components/epreuve/MockExam';
import { seriesFor } from '@/content/series';

export const metadata: Metadata = {
  title: 'Examen blanc TCF Canada',
  description: 'Compréhension orale, compréhension écrite et expression écrite enchaînées et chronométrées, en conditions réelles.',
};

export default function ExamenBlanc() {
  // A mock exam needs a listening AND a reading series with the same number.
  const ce = new Set(seriesFor('ce').map((s) => s.number));
  const numbers = seriesFor('co').map((s) => s.number).filter((n) => ce.has(n));
  return (
    <>
      <PageHeader
        title="Examen blanc, en conditions réelles."
        intro="Les trois épreuves écrites et orales collectives enchaînées, avec les durées officielles : compréhension orale, compréhension écrite, puis expression écrite."
      />
      <section className="bg-paper py-12 sm:py-16">
        <Container className="max-w-4xl"><MockExam series={numbers} /></Container>
      </section>
    </>
  );
}
