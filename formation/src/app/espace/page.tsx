import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ButtonLink, Container } from '@/components/ui';
import { contact } from '@/content/offers';
import { createClient } from '@/lib/supabase/server';
import { supabaseConfigured } from '@/lib/supabase/config';
import { effectiveStatus, formatDate, formuleName, statusLabel, statusTone, type Enrollment, type Profile } from '@/lib/labels';
import { signOut } from './actions';

export const metadata: Metadata = { title: 'Mon espace', robots: { index: false } };
export const dynamic = 'force-dynamic';

export default async function Espace() {
  if (!supabaseConfigured) redirect('/connexion/');
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/connexion/?suite=/espace/');

  const [{ data: profile }, { data: enrollments }, { data: results }] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).single<Profile>(),
    supabase.from('enrollments').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).returns<Enrollment[]>(),
    supabase.from('level_test_results').select('level, score, total, created_at').eq('user_id', user.id).order('created_at', { ascending: false }).limit(3),
  ]);
  const isStaff = profile?.role === 'admin' || profile?.role === 'trainer';
  const active = enrollments?.find((e) => effectiveStatus(e) === 'active');

  return (
    <>
      <header className="bg-night text-white">
        <Container className="flex flex-col gap-6 py-12 sm:flex-row sm:items-end sm:justify-between sm:py-16">
          <div>
            <h1 className="display text-4xl sm:text-5xl">Bonjour {profile?.first_name ?? ''}</h1>
            <p className="mt-3 text-blue-100">{user.email}</p>
          </div>
          <div className="flex gap-3">
            {isStaff && <ButtonLink href="/admin/">Espace admin</ButtonLink>}
            <form action={signOut}>
              <button className="rounded-md border-2 border-white/70 px-5 py-2.5 font-bold hover:bg-white hover:text-night">Me déconnecter</button>
            </form>
          </div>
        </Container>
      </header>

      <section className="bg-paper py-12 sm:py-16">
        <Container className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            <h2 className="heading text-2xl text-night">Mes formations</h2>
            {(enrollments ?? []).length === 0 && (
              <div className="rounded-lg bg-white p-6">
                <p>Vous n’avez pas encore d’inscription.</p>
                <ButtonLink href="/formules/" variant="dark" className="mt-4">Choisir une formule</ButtonLink>
              </div>
            )}
            {(enrollments ?? []).map((e) => {
              const status = effectiveStatus(e);
              return (
                <article key={e.id} className="rounded-lg bg-white p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="heading text-xl text-night">TCF Canada, {formuleName(e.formule).toLowerCase()}</h3>
                    <span className={`rounded-full px-3 py-1 text-sm font-semibold ${statusTone[status]}`}>{statusLabel[status]}</span>
                  </div>
                  {status === 'pending' && (
                    <p className="mt-4 text-slate">
                      Inscription reçue le {formatDate(e.created_at)}. Un conseiller vous contacte pour le paiement ; votre accès est activé dès réception.
                    </p>
                  )}
                  {status === 'active' && (
                    <p className="mt-4 text-slate">Accès ouvert du {formatDate(e.starts_at)} au {formatDate(e.ends_at)}.</p>
                  )}
                  {status === 'scheduled' && <p className="mt-4 text-slate">Votre accès commencera le {formatDate(e.starts_at)}.</p>}
                  {status === 'expired' && <p className="mt-4 text-slate">Accès terminé le {formatDate(e.ends_at)}.</p>}
                  <dl className="mt-5 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
                    <div><dt className="text-slate">Niveau de départ</dt><dd className="font-semibold">{e.level || 'Non renseigné'}</dd></div>
                    <div><dt className="text-slate">Objectif</dt><dd className="font-semibold">{e.goal || 'Non renseigné'}</dd></div>
                    <div><dt className="text-slate">Examen prévu</dt><dd className="font-semibold">{e.exam_date || 'Non renseigné'}</dd></div>
                  </dl>
                </article>
              );
            })}

            <div className="rounded-2xl border border-rule bg-white p-6">
              <h3 className="heading text-lg text-night">Cours, entraînements et tests blancs</h3>
              <p className="mt-2 text-slate">
                {active
                  ? 'Retrouvez les premières fiches méthode et la série gratuite de compréhension écrite. Les modules complets seront ajoutés progressivement.'
                  : 'Vous pouvez déjà consulter les fiches méthode et essayer la série gratuite de compréhension écrite en attendant l’activation de votre formule.'}
              </p>
              <div className="mt-5 flex flex-wrap gap-3"><ButtonLink href="/cours/" variant="dark">Fiches méthode</ButtonLink><ButtonLink href="/entrainement/">S’entraîner</ButtonLink></div>
            </div>
          </div>

          <aside className="space-y-6 lg:col-span-4">
            <div className="rounded-lg bg-white p-6">
              <h2 className="heading text-lg text-night">Test de niveau</h2>
              {results && results.length > 0 ? (
                <ul className="mt-3 space-y-2">
                  {results.map((r) => (
                    <li key={r.created_at} className="flex justify-between gap-3">
                      <span className="font-bold text-night">{r.level}</span>
                      <span className="text-slate">{r.score}/{r.total}, {formatDate(r.created_at)}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-slate">Vous n’avez pas encore passé le test connecté à votre compte.</p>
              )}
              <Link href="/test-de-niveau/" className="mt-4 inline-block font-bold text-ocean hover:underline">Passer le test</Link>
            </div>
            <div className="rounded-lg bg-white p-6">
              <h2 className="heading text-lg text-night">Une question ?</h2>
              <p className="mt-2 text-slate">Votre conseiller répond sur WhatsApp et par email.</p>
              <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block font-bold text-ocean hover:underline">WhatsApp {contact.phone}</a>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
