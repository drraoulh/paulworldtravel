import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireStaff } from '@/lib/staff';
import { createAdminClient } from '@/lib/supabase/admin';
import { validUuid, learnerName, daysSince } from '@/lib/admin/learners';
import { ACCESS_DAYS, paymentMethodName, reminderText, whatsappLink } from '@/lib/admin/accounts';
import { buildCourse } from '@/content/parcours/course';
import { publishedModules } from '@/lib/training-content';
import { progressSummary } from '@/lib/admin/progress';
import { packs, packName } from '@/content/offers';
import { effectiveStatus, formatDate, statusLabel, type Profile, type Enrollment } from '@/lib/labels';
import { AdminHeading, AdminBody, DataError, fieldClass, adminButton } from '@/components/admin/ui';
import PaymentFields from '@/components/admin/PaymentFields';
import { saveLearner } from '../actions';

const done: Record<string, string> = {
  cree: 'Le compte est créé.', profile: 'Coordonnées enregistrées.', notes: 'Note enregistrée.', pack: 'Demande de pack créée.',
  grant: 'Pack activé. L’apprenant a reçu un email de confirmation.', extend: 'Pack prolongé.', payment: 'Paiement enregistré.',
  link: 'Lien de connexion envoyé par email.', remind: 'Relance envoyée par email.', disable: 'Compte désactivé : l’apprenant ne peut plus se connecter.', enable: 'Compte réactivé.',
};
const failed: Record<string, string> = {
  pack: 'Le pack n’a pas pu être créé ou activé.', paiement: 'Le paiement n’a pas pu être enregistré. Vérifiez le montant.',
  prolongation: 'Le pack n’a pas pu être prolongé.', email: 'L’email n’a pas pu être envoyé. Réessayez ou contactez l’apprenant sur WhatsApp.',
  confirmation: 'Pour supprimer le compte, recopiez exactement son adresse email.', compte: 'Le compte n’a pas pu être modifié.',
};

const card = 'rounded-xl border border-rule bg-white p-6';
const secondary = 'inline-flex items-center justify-center rounded-lg border border-rule bg-white px-3 py-2 text-xs font-bold text-night hover:border-ocean';

function Hidden({ id, intent, extra }: { id: string; intent: string; extra?: Record<string, string> }) {
  return <><input type="hidden" name="id" value={id} /><input type="hidden" name="intent" value={intent} />{Object.entries(extra ?? {}).map(([k, v]) => <input key={k} type="hidden" name={k} value={v} />)}</>;
}

export default async function Learner({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ erreur?: string; succes?: string; mail?: string }> }) {
  const { supabase, isAdmin } = await requireStaff('/admin/apprenants/');
  const id = (await params).id;
  if (!validUuid(id)) notFound();
  const admin = createAdminClient();
  const [profile, snapshot, notes, enrollments, submissions, tests, modules, payments, account] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', id).eq('role', 'candidate').single<Profile>(),
    supabase.from('learner_progress').select('snapshot,updated_at').eq('user_id', id).maybeSingle(),
    supabase.from('learner_notes').select('note,updated_at').eq('user_id', id).maybeSingle(),
    supabase.from('enrollments').select('*').eq('user_id', id).order('created_at', { ascending: false }).limit(30).returns<Enrollment[]>(),
    supabase.from('submissions').select('id,kind,ai_score,trainer_score,status,created_at').eq('user_id', id).order('created_at', { ascending: false }).limit(10),
    supabase.from('level_test_results').select('id,level,score,total,created_at').eq('user_id', id).order('created_at', { ascending: false }).limit(5),
    publishedModules(),
    admin ? admin.from('payments').select('id,pack,amount,currency,provider,reference,status,paid_at,created_at').eq('user_id', id).order('created_at', { ascending: false }).limit(30) : null,
    admin ? admin.auth.admin.getUserById(id) : null,
  ]);
  if (!profile.data) { if (profile.error && profile.error.code !== 'PGRST116') return <AdminBody><DataError>La fiche ne peut pas être chargée.</DataError></AdminBody>; notFound(); }
  const p = profile.data;
  const course = buildCourse(modules);
  const progress = progressSummary(snapshot.data?.snapshot, course);
  const state = await searchParams;
  const authUser = account?.data.user;
  const banned = (authUser as { banned_until?: string | null } | undefined)?.banned_until;
  const disabled = Boolean(banned && new Date(banned) > new Date());
  const lastActive = [snapshot.data?.updated_at, authUser?.last_sign_in_at].filter(Boolean).sort().at(-1) ?? null;
  const idle = daysSince(lastActive);
  const list = (enrollments.data ?? []).map((e) => ({ ...e, state: effectiveStatus(e) }));
  const activePack = list.find((e) => e.state === 'active');
  const expiresSoon = activePack?.ends_at && (daysSince(activePack.ends_at) ?? 0) >= -7;
  const waInactive = whatsappLink(p.phone, reminderText('inactif', p.first_name));
  const waExpire = activePack && whatsappLink(p.phone, reminderText('expiration', p.first_name, activePack.ends_at));
  const waHello = whatsappLink(p.phone, `Bonjour${p.first_name ? ` ${p.first_name}` : ''}, c’est l’équipe Paul World Travel Formation.`);

  return (
    <>
      <AdminHeading
        eyebrow="Apprenants / Fiche individuelle"
        title={learnerName(p)}
        description={`${p.email}${disabled ? ' · compte désactivé' : ''}`}
        action={<Link href="/admin/apprenants/" className="text-sm font-bold text-ocean">← Tous les apprenants</Link>}
      />
      <AdminBody>
        {state.erreur && <DataError>{failed[state.erreur] ?? 'La modification n’a pas pu être enregistrée. Rechargez la fiche et réessayez.'}</DataError>}
        {state.succes && done[state.succes] && (
          <p role="status" className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            {done[state.succes]}
            {state.succes === 'cree' && state.mail === 'oui' && ' Un email lui permet de choisir son mot de passe.'}
            {state.succes === 'cree' && state.mail === 'echec' && ' L’email de bienvenue n’est pas parti : utilisez « Envoyer le lien de connexion » ci-dessous.'}
            {state.succes === 'cree' && state.mail === 'non' && ' Aucun email envoyé : l’apprenant peut utiliser « Mot de passe oublié » sur la page de connexion.'}
          </p>
        )}
        {disabled && <p role="status" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-maple">Ce compte est désactivé. L’apprenant ne peut plus se connecter tant que vous ne le réactivez pas.</p>}

        <div className="grid grid-cols-2 gap-4 xl:grid-cols-5">
          {[
            [snapshot.data ? `${progress.percent} %` : 'Pas commencé', 'Progression du parcours'],
            [progress.read, 'Leçons consultées'],
            [`${progress.quizzes}/${progress.lessonCount}`, 'Quiz réussis'],
            [progress.series, 'Séries terminées'],
            [lastActive ? (idle === 0 ? 'Aujourd’hui' : `Il y a ${idle} j`) : 'Jamais', 'Dernière activité'],
          ].map(([v, title]) => <div key={String(title)} className="rounded-xl border border-rule bg-white p-5"><p className="text-xs text-slate">{title}</p><p className="mt-2 text-2xl font-extrabold">{v}</p></div>)}
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <div className="space-y-6">
            <section className={card}>
              <div className="flex flex-wrap justify-between gap-3"><h2 className="font-bold">Packs et accès</h2><Link href={`/admin/inscriptions/?apprenant=${id}&statut=all`} className="text-xs font-bold text-ocean">Voir dans les inscriptions</Link></div>
              {!enrollments.error && !list.length && <p className="mt-4 text-sm text-slate">Compte gratuit, aucun pack demandé.</p>}
              <ul className="mt-4 divide-y divide-rule">
                {list.map((e) => (
                  <li key={e.id} className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm">
                    <div>
                      <p className="font-bold">{packName(e.formule)} <span className="ml-2 text-xs font-semibold text-slate">{statusLabel[e.state]}</span></p>
                      <p className="mt-1 text-xs text-slate">{e.starts_at ? `Du ${formatDate(e.starts_at)} au ${formatDate(e.ends_at)}` : `Demande du ${formatDate(e.created_at)}`}</p>
                    </div>
                    {isAdmin && e.state === 'active' && (
                      <form action={saveLearner} className="flex items-center gap-2">
                        <Hidden id={id} intent="extend" extra={{ enrollment: e.id }} />
                        <select name="days" aria-label="Durée de la prolongation" className="rounded-lg border border-rule px-2 py-1.5 text-xs"><option value="30">+30 jours</option><option value="60">+60 jours</option><option value="90">+90 jours</option></select>
                        <button className={secondary}>Prolonger</button>
                      </form>
                    )}
                    {isAdmin && e.state === 'pending' && <Link href={`/admin/inscriptions/?apprenant=${id}&statut=pending`} className={secondary}>Activer cette demande</Link>}
                  </li>
                ))}
              </ul>
              {isAdmin && (
                <details className="mt-5 rounded-lg border border-rule p-4" open={!activePack}>
                  <summary className="cursor-pointer text-sm font-bold">Activer un pack maintenant (paiement reçu)</summary>
                  <form action={saveLearner} className="mt-4 space-y-4">
                    <Hidden id={id} intent="grant" />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <label className="text-xs font-semibold">Pack<select name="pack" className={`mt-1 ${fieldClass}`}>{packs.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select></label>
                      <label className="text-xs font-semibold">Durée<select name="days" defaultValue="30" className={`mt-1 ${fieldClass}`}>{ACCESS_DAYS.map((d) => <option key={d} value={d}>{d} jours</option>)}</select></label>
                    </div>
                    <PaymentFields />
                    <button className={adminButton}>Activer le pack</button>
                  </form>
                  <form action={saveLearner} className="mt-5 flex flex-wrap items-end gap-3 border-t border-rule pt-4">
                    <Hidden id={id} intent="pack" />
                    <label className="min-w-0 flex-1 text-xs font-semibold">Ou créer une demande en attente de paiement<select name="pack" className={`mt-1 ${fieldClass}`}>{packs.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select></label>
                    <button className={secondary}>Créer la demande</button>
                  </form>
                </details>
              )}
            </section>

            <section className={card}>
              <h2 className="font-bold">Paiements</h2>
              {!payments ? <p className="mt-4 text-sm text-slate">Paiements indisponibles : clé serveur Supabase manquante.</p> : payments.error ? <DataError /> : !payments.data?.length ? <p className="mt-4 text-sm text-slate">Aucun paiement enregistré.</p> : (
                <ul className="mt-4 divide-y divide-rule">
                  {payments.data.map((pay) => (
                    <li key={pay.id} className="flex flex-wrap justify-between gap-3 py-3 text-sm">
                      <span><span className="font-bold">{pay.amount.toLocaleString('fr-FR')} {pay.currency}</span> · {packName(pay.pack)}<span className="mt-1 block text-xs text-slate">{paymentMethodName(pay.provider)}{pay.reference ? `, réf. ${pay.reference}` : ''}</span></span>
                      <span className="text-xs text-slate">{formatDate(pay.paid_at ?? pay.created_at)}{pay.status !== 'paid' && ` · ${pay.status}`}</span>
                    </li>
                  ))}
                </ul>
              )}
              {isAdmin && payments && (
                <details className="mt-5 rounded-lg border border-rule p-4">
                  <summary className="cursor-pointer text-sm font-bold">Enregistrer un paiement</summary>
                  <form action={saveLearner} className="mt-4 space-y-4">
                    <Hidden id={id} intent="payment" extra={activePack ? { enrollment: activePack.id } : undefined} />
                    <label className="block text-xs font-semibold">Pack payé<select name="pack" defaultValue={activePack?.formule ?? list[0]?.formule} className={`mt-1 ${fieldClass}`}>{packs.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select></label>
                    <PaymentFields required />
                    <button className={adminButton}>Enregistrer le paiement</button>
                    <p className="text-xs text-slate">Enregistrer un paiement n’ouvre pas l’accès : utilisez « Activer un pack » pour cela.</p>
                  </form>
                </details>
              )}
            </section>

            <section className={card}>
              <h2 className="font-bold">Avancement par module</h2>
              <p className="mt-2 text-xs text-slate">{snapshot.data ? `Dernière synchronisation : ${formatDate(snapshot.data.updated_at)}. Suivi indicatif des activités du compte.` : 'Aucune progression synchronisée pour ce compte.'}</p>
              <ul className="mt-5 space-y-5">
                {progress.modules.map((m) => (
                  <li key={m.id}>
                    <div className="mb-2 flex justify-between gap-3 text-sm"><span className="font-semibold">{m.title}</span><span className="text-slate">{m.done}/{m.total}</span></div>
                    <div className="h-2 rounded-full bg-paper"><div className="h-full rounded-full bg-emerald-600" style={{ width: `${m.total ? (m.done / m.total) * 100 : 0}%` }} /></div>
                  </li>
                ))}
              </ul>
            </section>

            <section className={card}>
              <h2 className="font-bold">Dernières corrections</h2>
              {!submissions.error && !submissions.data?.length && <p className="mt-4 text-sm text-slate">Aucune production corrigée.</p>}
              <ul className="mt-4 divide-y divide-rule">
                {(submissions.data ?? []).map((s) => (
                  <li key={s.id} className="flex flex-wrap justify-between gap-3 py-3 text-sm">
                    <span>{s.kind === 'ee' ? 'Expression écrite' : 'Expression orale'}<span className="mt-1 block text-xs text-slate">{formatDate(s.created_at)}</span></span>
                    <span className="font-bold">{s.status === 'trainer_reviewed' ? `${s.trainer_score ?? '—'}/20 · formateur` : `${s.ai_score ?? '—'}/20 · estimation IA`}</span>
                  </li>
                ))}
              </ul>
              <Link href={`/admin/corrections/?apprenant=${id}`} className="mt-4 inline-block text-sm font-bold text-ocean">Consulter les productions</Link>
            </section>

            <section className={card}>
              <h2 className="font-bold">Activités du parcours</h2>
              <div className="mt-4 space-y-3">
                {course.map((m) => (
                  <details key={m.id} className="rounded-lg border border-rule p-3">
                    <summary className="cursor-pointer text-sm font-semibold">{m.title}</summary>
                    <ul className="mt-3 space-y-2 text-xs text-slate">
                      {m.items.map((it) => (
                        <li key={it.id} className="flex justify-between gap-3">
                          <span>{it.title}</span>
                          <span className={progress.isDone(it.id) ? 'shrink-0 font-bold text-green-700' : 'shrink-0'}>
                            {progress.isDone(it.id) ? (it.kind === 'lecon' && it.id !== 'guide' ? 'Quiz réussi' : 'Terminé') : progress.progress.done.includes(`read:${it.id}`) || progress.progress.done.includes(it.id) ? 'Consultée' : 'À faire'}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className={card}>
              <h2 className="font-bold">Contacter</h2>
              {idle !== null && idle >= 14 && <p className="mt-2 text-xs font-bold text-maple">Inactif depuis {idle} jours.</p>}
              {expiresSoon && <p className="mt-2 text-xs font-bold text-maple">Le pack se termine le {formatDate(activePack!.ends_at)}.</p>}
              <div className="mt-4 flex flex-wrap gap-2">
                {waHello && <a href={waHello} target="_blank" rel="noopener" className={secondary}>WhatsApp</a>}
                {waInactive && <a href={waInactive} target="_blank" rel="noopener" className={secondary}>WhatsApp : relance d’activité</a>}
                {waExpire && <a href={waExpire} target="_blank" rel="noopener" className={secondary}>WhatsApp : fin de pack</a>}
                <a href={`mailto:${p.email}`} className={secondary}>Écrire un email</a>
              </div>
              {!p.phone && <p className="mt-3 text-xs text-slate">Ajoutez un numéro pour contacter l’apprenant sur WhatsApp.</p>}
              {isAdmin && (
                <div className="mt-4 flex flex-wrap gap-2 border-t border-rule pt-4">
                  <form action={saveLearner}><Hidden id={id} intent="remind" extra={{ kind: 'inactif' }} /><button className={secondary}>Email : relance d’activité</button></form>
                  {activePack && <form action={saveLearner}><Hidden id={id} intent="remind" extra={{ kind: 'expiration', ends_at: activePack.ends_at ?? '' }} /><button className={secondary}>Email : fin de pack</button></form>}
                  <form action={saveLearner}><Hidden id={id} intent="link" /><button className={secondary}>Envoyer le lien de connexion</button></form>
                </div>
              )}
            </section>

            <section className={card}>
              <h2 className="font-bold">Coordonnées</h2>
              {isAdmin ? (
                <form action={saveLearner} className="mt-5 space-y-4">
                  <Hidden id={id} intent="profile" />
                  {([['first_name', 'Prénom', p.first_name, 100], ['last_name', 'Nom', p.last_name, 100], ['phone', 'Téléphone / WhatsApp', p.phone, 40], ['city', 'Ville et pays', p.city, 120]] as const).map(([name, label, value, max]) => (
                    <label key={name} className="block text-xs font-semibold">{label}<input name={name} defaultValue={value ?? ''} className={`mt-1 ${fieldClass}`} maxLength={max} /></label>
                  ))}
                  <p className="text-xs text-slate">L’email de connexion ne se modifie pas ici. Inscrit le {formatDate(p.created_at ?? null)}.</p>
                  <button className={adminButton}>Enregistrer les coordonnées</button>
                </form>
              ) : (
                <div className="mt-4 space-y-2 text-sm text-slate"><p>{p.phone || 'Téléphone non renseigné'}</p><p>{p.city || 'Ville non renseignée'}</p></div>
              )}
            </section>

            <section className={card}>
              <h2 className="font-bold">Note interne</h2>
              <p className="mt-2 text-xs text-slate">Visible uniquement par l’équipe pédagogique.</p>
              {isAdmin ? (
                <form action={saveLearner} className="mt-4 space-y-3">
                  <Hidden id={id} intent="notes" />
                  <textarea aria-label="Note interne" name="note" defaultValue={notes.data?.note ?? ''} rows={5} maxLength={5000} className={fieldClass} />
                  <button className={adminButton}>Enregistrer la note</button>
                </form>
              ) : <p className="mt-4 whitespace-pre-line text-sm text-slate">{notes.data?.note || 'Aucune note.'}</p>}
            </section>

            <section className={card}>
              <h2 className="font-bold">Tests de niveau</h2>
              {!tests.error && !tests.data?.length && <p className="mt-4 text-sm text-slate">Aucun résultat associé à ce compte.</p>}
              <ul className="mt-3 space-y-3">
                {(tests.data ?? []).map((t) => <li key={t.id} className="text-sm"><span className="font-bold">{t.level} · {t.score}/{t.total}</span><span className="mt-1 block text-xs text-slate">{formatDate(t.created_at)}</span></li>)}
              </ul>
            </section>

            {isAdmin && (
              <section className={`${card} border-red-200`}>
                <h2 className="font-bold">Compte</h2>
                <p className="mt-2 text-xs text-slate">Désactiver bloque la connexion sans rien effacer. Supprimer efface définitivement le compte, ses packs, sa progression et ses productions.</p>
                <form action={saveLearner} className="mt-4"><Hidden id={id} intent={disabled ? 'enable' : 'disable'} /><button className={secondary}>{disabled ? 'Réactiver le compte' : 'Désactiver le compte'}</button></form>
                <details className="mt-4">
                  <summary className="cursor-pointer text-xs font-bold text-maple">Supprimer le compte</summary>
                  <form action={saveLearner} className="mt-3 space-y-3">
                    <Hidden id={id} intent="delete" />
                    <label className="block text-xs font-semibold">Recopiez l’email {p.email} pour confirmer<input name="confirm" autoComplete="off" required className={`mt-1 ${fieldClass}`} /></label>
                    <button className="rounded-lg bg-maple px-4 py-2.5 text-sm font-bold text-white">Supprimer définitivement</button>
                  </form>
                </details>
              </section>
            )}
          </aside>
        </div>
      </AdminBody>
    </>
  );
}
