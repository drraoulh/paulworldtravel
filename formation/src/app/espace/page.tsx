import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ButtonLink, Container } from '@/components/ui';
import CourseProgressCard from '@/components/parcours/CourseProgressCard';
import { contact } from '@/content/contact';
import { FREE_TRIAL, freeSeriesRange, isPackId } from '@/content/offers';
import TrialBanner from '@/components/access/TrialBanner';
import { buildCourse } from '@/content/parcours/course';
import { publishedModules } from '@/lib/training-content';
import { createClient } from '@/lib/supabase/server';
import { supabaseConfigured } from '@/lib/supabase/config';
import { effectiveStatus, formatDate, formuleName, statusLabel, statusTone, type Enrollment, type Profile } from '@/lib/labels';
import { signOut } from './actions';
import PayByCard from '@/components/packs/PayByCard';
import { stripeConfigured } from '@/lib/stripe';
import { headers } from 'next/headers';
import { zoneForCountry } from '@/content/offers';

export const metadata: Metadata = { title: 'Mon espace', robots: { index: false } };
export const dynamic = 'force-dynamic';

export default async function Espace({ searchParams }: { searchParams: Promise<{ paiement?: string }> }) {
  const paiement = (await searchParams).paiement;
  if (!supabaseConfigured) redirect('/connexion/');
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/connexion/?suite=/espace/');

  const [{ data: profile }, { data: enrollments }, { data: results }, { data: submissions }] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).single<Profile>(),
    supabase.from('enrollments').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).returns<Enrollment[]>(),
    supabase.from('level_test_results').select('level, score, total, created_at').eq('user_id', user.id).order('created_at', { ascending: false }).limit(3),
    supabase.from('submissions').select('id, kind, task_prompt, ai_score, trainer_score, trainer_comment, status, created_at').eq('user_id', user.id).order('created_at', { ascending: false }).limit(10),
  ]);
  const courseItems = buildCourse(await publishedModules()).flatMap((m) => m.items);
  const isStaff = profile?.role === 'admin' || profile?.role === 'trainer';
  const active = enrollments?.find((e) => effectiveStatus(e) === 'active');
  const card = stripeConfigured();
  const zone = zoneForCountry((await headers()).get('x-vercel-ip-country'));

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
              <button className="rounded-full border border-white/50 px-6 py-3.5 font-bold transition-colors hover:bg-white hover:text-night">Me déconnecter</button>
            </form>
          </div>
        </Container>
      </header>

      <section className="bg-paper py-12 sm:py-16">
        <Container className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            <div className="rounded-2xl bg-white p-6 sm:p-8">
              <h2 className="heading text-2xl text-night">Ma prochaine séance</h2>
              <p className="mt-2 text-slate">Retrouvez votre dernière activité et la prochaine étape de votre préparation.</p>
              <ButtonLink href="/parcours/" className="mt-5">Reprendre ma préparation</ButtonLink>
            </div>
            {paiement === 'ok' && (
              <p role="status" className="rounded-lg border border-green-200 bg-green-50 p-5 text-green-800">
                Paiement reçu, merci. Votre pack s’active dans quelques instants : actualisez la page si l’accès n’apparaît pas encore. Un reçu vous est envoyé par email.
              </p>
            )}
            {paiement === 'annule' && (
              <p role="status" className="rounded-lg border border-rule bg-white p-5 text-slate">Le paiement a été interrompu, rien n’a été débité. Vous pouvez réessayer ci-dessous ou payer avec un conseiller.</p>
            )}
            <h2 className="heading text-2xl text-night">Mon accès et mes packs</h2>
            {(enrollments ?? []).length === 0 && (
              <div className="rounded-lg bg-white p-6">
                <p>Votre compte gratuit est prêt : commencez les leçons et {freeSeriesRange} de chaque compréhension. Vous pourrez choisir un pack plus tard.</p>
                <ButtonLink href="/packs/" variant="dark" className="mt-4">Choisir un pack</ButtonLink>
              </div>
            )}
            {(enrollments ?? []).map((e) => {
              const status = effectiveStatus(e);
              return (
                <article key={e.id} className="rounded-lg bg-white p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="heading text-xl text-night">Pack {formuleName(e.formule)}</h3>
                    <span className={`rounded-full px-3 py-1 text-sm font-semibold ${statusTone[status]}`}>{statusLabel[status]}</span>
                  </div>
                  {status === 'pending' && card && isPackId(e.formule) && <PayByCard pack={e.formule} zone={zone} enabled className="mt-4" />}
                  {status === 'pending' && (
                    <p className="mt-4 text-slate">
                      Inscription reçue le {formatDate(e.created_at)}. {card ? 'Payez par carte pour ouvrir votre accès tout de suite, ou un conseiller vous contacte pour le paiement par Mobile Money.' : 'Un conseiller vous contacte pour le paiement ; votre accès est activé dès réception.'}
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
                  ? 'Vos corrections d’expression écrite et orale par l’IA et le tuteur sont disponibles chaque jour.'
                  : `Votre compte gratuit comprend ${FREE_TRIAL.writing} corrections écrites, ${FREE_TRIAL.speaking} corrections orales et ${FREE_TRIAL.tutor} questions au tuteur. Un pack les débloque chaque jour, avec toutes les séries et les examens blancs.`}
              </p>
              <div className="mt-4 space-y-2"><TrialBanner feature="writing" /><TrialBanner feature="speaking" /></div>
              <div className="mt-5 flex flex-wrap gap-3">
                <ButtonLink href="/epreuve/expression-ecrite/simulateur/" variant="dark">Expression écrite</ButtonLink>
                <ButtonLink href="/epreuve/expression-orale/simulateur/" variant="dark">Expression orale</ButtonLink>
                <ButtonLink href="/entrainement/tuteur/">Tuteur</ButtonLink>
              </div>
            </div>

            <div className="rounded-2xl border border-rule bg-white p-6">
              <h3 className="heading text-lg text-night">Vous avez passé le TCF ?</h3>
              <p className="mt-2 text-slate">Partagez les sujets d’expression écrite que vous avez eus. Nous les reformulons et les publions pour les prochains candidats.</p>
              <ButtonLink href="/partager-mes-sujets/" variant="dark" className="mt-4">Partager mes sujets</ButtonLink>
            </div>

            <div className="rounded-2xl border border-rule bg-white p-6">
              <h3 className="heading text-lg text-night">Mes corrections</h3>
              {(submissions ?? []).length === 0 ? (
                <p className="mt-2 text-slate">Vos productions corrigées apparaîtront ici.</p>
              ) : (
                <ul className="mt-4 divide-y divide-rule">
                  {(submissions ?? []).map((s) => (
                    <li key={s.id} className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                      <div>
                        <p className="font-semibold text-night">{s.kind === 'ee' ? 'Expression écrite' : 'Expression orale'}, {formatDate(s.created_at)}</p>
                        <p className="line-clamp-1 text-sm text-slate">{s.task_prompt}</p>
                        {s.trainer_comment && <p className="mt-1 text-sm"><span className="font-semibold">Votre formateur : </span>{s.trainer_comment}</p>}
                      </div>
                      <p className="shrink-0 text-sm sm:text-right">
                        {s.status === 'trainer_reviewed'
                          ? <><span className="heading text-xl text-night">{s.trainer_score} / 20</span><span className="block text-slate">note du formateur</span></>
                          : <><span className="heading text-xl text-night">{s.ai_score} / 20</span><span className="block text-slate">estimation IA</span></>}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <aside className="space-y-6 lg:col-span-4">
            <div className="rounded-2xl bg-container/30 p-6">
              <h2 className="heading text-lg text-night">Nouveau sur la plateforme ?</h2>
              <p className="mt-1 text-sm text-ink">Huit étapes pour bien démarrer, du test de niveau à l’examen blanc.</p>
              <Link href="/guide/" className="mt-3 inline-block font-bold text-ocean underline decoration-ocean/30 decoration-2 underline-offset-4 hover:decoration-ocean">Lire le guide</Link>
            </div>
            <CourseProgressCard ids={courseItems.map((it) => it.id)} />
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
              <Link href="/test-de-niveau/" className="mt-4 inline-block font-bold text-ocean underline decoration-ocean/30 decoration-2 underline-offset-4 hover:decoration-ocean">Passer le test</Link>
            </div>
            <div className="rounded-lg bg-white p-6">
              <h2 className="heading text-lg text-night">Une question ?</h2>
              <p className="mt-2 text-slate">Votre conseiller répond sur WhatsApp et par email.</p>
              <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block font-bold text-ocean underline decoration-ocean/30 decoration-2 underline-offset-4 hover:decoration-ocean">WhatsApp {contact.phone}</a>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
