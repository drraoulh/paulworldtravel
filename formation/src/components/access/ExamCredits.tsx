'use client';
import Link from 'next/link';
import { useAccess } from './useAccess';

export default function ExamCredits() {
  const access = useAccess();
  if (!access?.aiAllowed || !access.exams) return null;
  const { remaining, limit, days } = access.exams;
  return <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 text-night">
    <p className="font-bold">Examens blancs corrigés : {remaining} / {limit} disponibles</p>
    <p className="mt-2 text-sm">Crédits inclus sur {days} jours {access.plan === 'staff' ? 'pour l’équipe' : 'de votre pack'}. Un examen comprend les 3 écrits et les 3 oraux ; vos quotas d’entraînement et de tuteur restent séparés.</p>
    {remaining === 0 && <p className="mt-2 text-sm">Vos crédits ont été utilisés. Vous pouvez terminer les corrections d’un examen déjà commencé pendant sa durée de validité. <Link href="/packs/" className="font-semibold underline">Voir les packs</Link></p>}
  </div>;
}
