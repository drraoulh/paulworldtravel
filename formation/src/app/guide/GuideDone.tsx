'use client';

import Link from 'next/link';
import { markDone, useCourse } from '@/components/parcours/useCourse';

/** Marks the guide as read in the course, then sends the candidate to the next step. */
export default function GuideDone() {
  const { isDone } = useCourse();
  const read = isDone('guide');
  return (
    <div className="rounded-2xl bg-night p-6 text-white">
      <p className="heading text-lg">{read ? 'Guide lu' : 'Prêt à commencer ?'}</p>
      <p className="mt-1 text-sm text-blue-100">L’étape suivante est le test de niveau.</p>
      <Link href="/test-de-niveau/" onClick={() => markDone('guide')} className="mt-4 block rounded-full bg-container py-3 text-center font-bold text-night hover:bg-container-hover">
        J’ai lu le guide, commencer
      </Link>
    </div>
  );
}
