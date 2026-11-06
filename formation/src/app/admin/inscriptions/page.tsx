import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Container } from '@/components/ui';
import AdminNav from '@/components/admin/AdminNav';
import { createClient } from '@/lib/supabase/server';
import { supabaseConfigured } from '@/lib/supabase/config';
import { effectiveStatus, formatDate, formuleName, statusLabel, statusTone, type Enrollment, type Profile } from '@/lib/labels';
import { packs } from '@/content/offers';
import { activateEnrollment, saveNotes, setEnrollmentStatus } from '../actions';
import { adminButton, adminSecondary, adminSuccess, adminDanger, adminSmall, adminLink } from '@/components/admin/ui';

export const metadata: Metadata = { title: 'Administration', robots: { index: false } };
export const dynamic = 'force-dynamic';

const filters = [
  ['pending', 'En attente'],
  ['active', 'Actives'],
  ['scheduled', 'À venir'],
  ['expired', 'Terminées'],
  ['cancelled', 'Annulées'],
  ['all', 'Toutes'],
] as const;

type Row = Enrollment & { profiles: Pick<Profile, 'email' | 'first_name' | 'last_name' | 'phone' | 'city'> | null };

export default async function Admin({ searchParams }: { searchParams: Promise<{ statut?: string; erreur?: string; apprenant?: string }> }) {
  if (!supabaseConfigured) redirect('/connexion/');
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/connexion/?suite=/admin/inscriptions/');
  const { data: me } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (me?.role !== 'admin' && me?.role !== 'trainer') {
    return (
      <Container className="py-20">
        <h1 className="heading text-3xl text-night">Accès réservé</h1>
        <p className="mt-4 text-slate">Cette page est réservée à l’équipe Paul World Travel.</p>
        <Link href="/espace/" className={`mt-6 inline-block ${adminLink}`}>Retour à mon espace</Link>
      </Container>
    );
  }
  const isAdmin = me.role === 'admin';
  const params = await searchParams;
  const filter = filters.some(([key]) => key === params.statut) ? params.statut! : 'pending';

  let enrollmentQuery = supabase
    .from('enrollments')
    .select('*, profiles!enrollments_user_id_fkey(email, first_name, last_name, phone, city)')
    .order('created_at', { ascending: false });
  if (params.apprenant && /^[0-9a-f-]{36}$/i.test(params.apprenant)) enrollmentQuery = enrollmentQuery.eq('user_id', params.apprenant);
  const { data, error } = await enrollmentQuery.limit(500).returns<Row[]>();
  const rows = (data ?? []).map((r) => ({ ...r, shown: effectiveStatus(r) }));
  const counts = Object.fromEntries(filters.map(([k]) => [k, k === 'all' ? rows.length : rows.filter((r) => r.shown === k).length]));
  const list = filter === 'all' ? rows : rows.filter((r) => r.shown === filter);

  return (
    <>
      <header className="bg-night text-white">
        <Container className="py-10 sm:py-14">
          <AdminNav current="/admin/inscriptions/" />
          <h1 className="display text-3xl sm:text-4xl">Inscriptions</h1>
          <nav className="mt-6 flex flex-wrap gap-2" aria-label="Filtrer par statut">
            {filters.map(([key, label]) => (
              <Link
                key={key}
                href={`/admin/inscriptions/?statut=${key}${params.apprenant ? `&apprenant=${encodeURIComponent(params.apprenant)}` : ''}`}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${filter === key ? 'bg-container text-night' : 'bg-white/10 text-white hover:bg-white/20'}`}
              >
                {label} ({counts[key]})
              </Link>
            ))}
          </nav>
        </Container>
      </header>

      <section className="bg-paper py-10">
        <Container className="space-y-4">
          {params.erreur && <p role="alert" className="rounded-lg bg-red-50 p-5 text-maple">{params.erreur === 'date' ? 'La date de fin doit être valide et ne pas être passée.' : 'La modification n’a pas pu être enregistrée. Vérifiez votre accès puis réessayez.'}</p>}
          {error && <p role="alert" className="rounded-lg bg-red-50 p-5 text-maple">Impossible de charger les inscriptions. Vérifiez la configuration Supabase puis réessayez.</p>}
          {!error && list.length === 0 && <p className="rounded-lg bg-white p-6 text-slate">Aucune inscription dans cette catégorie.</p>}
          {list.map((r) => {
            const p = r.profiles;
            return (
              <article key={r.id} className="rounded-lg bg-white p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="heading text-lg text-night">{[p?.first_name, p?.last_name].filter(Boolean).join(' ') || 'Sans nom'}</h2>
                    <p className="text-sm text-slate">
                      <Link href={`/admin/apprenants/${r.user_id}/`} title="Ouvrir la fiche pour lui écrire" className={adminLink}>{p?.email}</Link>
                      {p?.phone && <> · <a href={`https://wa.me/${p.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{p.phone}</a></>}
                      {p?.city && <> · {p.city}</>}
                    </p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-sm font-semibold ${statusTone[r.shown]}`}>{statusLabel[r.shown]}</span>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm md:grid-cols-5">
                  <div><dt className="text-slate">Formule</dt><dd className="font-semibold">{formuleName(r.formule)}</dd></div>
                  <div><dt className="text-slate">Niveau</dt><dd className="font-semibold">{r.level || '—'}</dd></div>
                  <div><dt className="text-slate">Objectif</dt><dd className="font-semibold">{r.goal || '—'}</dd></div>
                  <div><dt className="text-slate">Examen prévu</dt><dd className="font-semibold">{r.exam_date || '—'}</dd></div>
                  <div><dt className="text-slate">{r.shown === 'pending' ? 'Inscrit le' : 'Accès'}</dt><dd className="font-semibold">{r.shown === 'pending' || !r.starts_at ? formatDate(r.created_at) : `${formatDate(r.starts_at)} → ${formatDate(r.ends_at)}`}</dd></div>
                </dl>
                {r.message && <p className="mt-4 rounded-md bg-paper p-3 text-sm">{r.message}</p>}

                {isAdmin && (
                  <div className="mt-5 flex flex-col gap-4 border-t border-rule pt-5 lg:flex-row lg:items-end lg:justify-between">
                    <form action={activateEnrollment} className="flex flex-wrap items-end gap-3">
                      <input type="hidden" name="id" value={r.id} />
                      <label className="text-sm">
                        <span className="block font-semibold text-night">Durée</span>
                        <select name="days" defaultValue={String(packs.find((p) => p.id === r.formule)?.days ?? 30)} className="mt-1 rounded-md border border-rule px-3 py-2">
                          <option value="7">7 jours</option>
                          <option value="30">1 mois</option>
                          <option value="60">2 mois</option>
                          <option value="90">3 mois</option>
                          <option value="180">6 mois</option>
                        </select>
                      </label>
                      <label className="text-sm">
                        <span className="block font-semibold text-night">ou jusqu’au</span>
                        <input type="date" name="ends_at" className="mt-1 rounded-md border border-rule px-3 py-2" />
                      </label>
                      <button className={adminSuccess}>
                        {r.shown === 'active' ? 'Prolonger' : 'Paiement reçu : activer'}
                      </button>
                    </form>
                    <div className="flex flex-wrap gap-2">
                      {r.shown !== 'pending' && (
                        <form action={setEnrollmentStatus}><input type="hidden" name="id" value={r.id} /><input type="hidden" name="status" value="pending" />
                          <button className={`${adminSecondary} ${adminSmall}`}>Remettre en attente</button></form>
                      )}
                      {r.shown === 'active' && (
                        <form action={setEnrollmentStatus}><input type="hidden" name="id" value={r.id} /><input type="hidden" name="status" value="expired" />
                          <button className={`${adminSecondary} ${adminSmall}`}>Terminer</button></form>
                      )}
                      {r.shown !== 'cancelled' && (
                        <form action={setEnrollmentStatus}><input type="hidden" name="id" value={r.id} /><input type="hidden" name="status" value="cancelled" />
                          <button className={`${adminDanger} ${adminSmall}`}>Annuler</button></form>
                      )}
                    </div>
                  </div>
                )}
                {isAdmin && (
                  <form action={saveNotes} className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <input type="hidden" name="id" value={r.id} />
                    <input name="staff_notes" defaultValue={r.staff_notes ?? ''} placeholder="Note interne (paiement, mode, remarque…)" className="flex-1 rounded-md border border-rule px-3 py-2 text-sm" />
                    <button className={adminButton}>Enregistrer la note</button>
                  </form>
                )}
              </article>
            );
          })}
        </Container>
      </section>
    </>
  );
}
