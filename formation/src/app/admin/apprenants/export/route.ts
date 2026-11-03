import { learnerDirectory, accessLabel, type LearnerFilters } from '@/lib/admin/learners';
import { packName } from '@/content/offers';

export const dynamic = 'force-dynamic';

// Semicolons and a BOM: Excel in French opens the file with accents and columns right.
const cell = (v: unknown) => {
  const s = String(v ?? '');
  return /[";\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const day = (iso: string | null | undefined) => (iso ? iso.slice(0, 10) : '');

export async function GET(request: Request) {
  const url = new URL(request.url);
  const filters: LearnerFilters = {};
  for (const k of ['q', 'pack', 'statut', 'ville', 'niveau'] as const) {
    const v = url.searchParams.get(k);
    if (v) filters[k] = v.slice(0, 100);
  }
  // learnerDirectory checks that the visitor is staff (redirects otherwise).
  const { rows } = await learnerDirectory(filters);
  const header = ['Prénom', 'Nom', 'Email', 'Téléphone', 'Ville', 'Pack', 'Statut', 'Fin du pack', 'Niveau', 'Progression (%)', 'Dernière activité', 'Inscrit le', 'Compte désactivé'];
  const lines = rows.map((r) => [
    r.first_name, r.last_name, r.email, r.phone, r.city,
    r.pack ? packName(r.pack) : '', accessLabel[r.access], r.access === 'active' ? day(r.current?.ends_at) : '',
    r.level, r.learner_progress ? r.summary.percent : '', day(r.lastActive), day(r.created_at), r.disabled ? 'oui' : '',
  ].map(cell).join(';'));
  const csv = '﻿' + [header.join(';'), ...lines].join('\r\n');
  return new Response(csv, {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': `attachment; filename="apprenants-${new Date().toISOString().slice(0, 10)}.csv"`,
      'cache-control': 'no-store',
    },
  });
}
