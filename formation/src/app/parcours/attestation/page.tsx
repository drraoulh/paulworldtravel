import type { Metadata } from 'next';
import Certificate from '@/components/parcours/Certificate';
import { publishedModules } from '@/lib/training-content';
import { buildCourse } from '@/content/parcours/course';

export const metadata: Metadata = { title: 'Attestation de parcours', robots: { index: false } };

export default async function AttestationPage() {
  const course = buildCourse(await publishedModules());
  return (
    <section className="bg-paper py-10 sm:py-14 print:bg-white print:py-0">
      <Certificate ids={course.flatMap((m) => m.items.map((it) => it.id))} modules={course.map((m) => m.title)} />
    </section>
  );
}
