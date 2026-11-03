import Link from 'next/link';
import { accessLabel, daysSince, learnerName, type DirectoryRow } from '@/lib/admin/learners';
import { packName } from '@/content/offers';
import { formatDate } from '@/lib/labels';

const tone: Record<string, string> = {
  active: 'bg-green-100 text-green-800',
  scheduled: 'bg-blue-50 text-night',
  pending: 'bg-container/25 text-night',
  expired: 'bg-paper text-slate',
  cancelled: 'bg-red-50 text-maple',
  none: 'bg-slate-100 text-slate',
};

export default function LearnerTable({ rows, progress = false }: { rows: DirectoryRow[]; progress?: boolean }) {
  return (
    <div role="region" aria-label="Liste des apprenants" tabIndex={0} className="relative max-w-full overflow-x-auto rounded-xl border border-rule bg-white">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="border-b border-rule bg-slate-50 text-xs text-slate">
          <tr>
            <th className="px-5 py-4">Apprenant</th>
            <th className="px-5 py-4">{progress ? 'Leçons et quiz' : 'Pack'}</th>
            <th className="px-5 py-4">Niveau</th>
            <th className="px-5 py-4">Progression</th>
            <th className="px-5 py-4">Dernière activité</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-rule">
          {rows.map((p) => {
            const idle = daysSince(p.lastActive);
            return (
              <tr key={p.id} className="hover:bg-slate-50/60">
                <td className="px-5 py-4">
                  <Link href={`/admin/apprenants/${p.id}/`} className="font-bold text-night hover:text-ocean">{learnerName(p)}</Link>
                  <p className="mt-1 text-xs text-slate">{p.email}</p>
                  <p className="mt-0.5 text-xs text-slate">{[p.phone, p.city].filter(Boolean).join(', ')}</p>
                  {p.disabled && <span className="mt-1 inline-block rounded bg-red-50 px-2 py-0.5 text-[11px] font-bold text-maple">Compte désactivé</span>}
                </td>
                <td className="px-5 py-4 text-xs">
                  {progress ? (
                    <span className="text-slate">{p.summary.read} leçons consultées<br />{p.summary.quizzes}/{p.summary.lessonCount} quiz réussis</span>
                  ) : (
                    <>
                      <span className={`inline-block rounded-full px-2.5 py-1 font-bold ${tone[p.access]}`}>{p.pack ? packName(p.pack) : accessLabel.none}</span>
                      {p.pack && <span className="mt-1 block text-slate">{accessLabel[p.access]}{p.access === 'active' && p.current?.ends_at ? ` jusqu’au ${formatDate(p.current.ends_at)}` : ''}</span>}
                    </>
                  )}
                </td>
                <td className="px-5 py-4 font-bold">{p.level ?? <span className="text-xs font-normal text-slate">Pas de test</span>}</td>
                <td className="px-5 py-4">
                  <p className="font-bold">{p.learner_progress ? `${p.summary.percent} %` : <span className="text-xs font-normal text-slate">Pas encore commencé</span>}</p>
                  {p.learner_progress && <div className="mt-2 h-1.5 w-24 rounded-full bg-paper"><div className="h-full rounded-full bg-emerald-600" style={{ width: `${p.summary.percent}%` }} /></div>}
                </td>
                <td className="px-5 py-4 text-xs text-slate">
                  {p.lastActive ? formatDate(p.lastActive) : 'Jamais connecté'}
                  {idle !== null && idle >= 14 && <span className="mt-1 block font-bold text-maple">Inactif depuis {idle} jours</span>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
