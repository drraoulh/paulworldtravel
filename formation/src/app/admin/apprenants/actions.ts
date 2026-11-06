'use server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/staff';
import { validUuid } from '@/lib/admin/learners';
import { packs } from '@/content/offers';
import { parseLearners } from '@/lib/admin/csv';
import {
  ACCESS_DAYS, cleanText, createAccount, currencies, deleteAccount, extendEnrollment, grantPack, paymentMethods,
  recordPayment, sendAccessLink, sendMessage, sendReminder, service, setDisabled, type Reminder,
} from '@/lib/admin/accounts';

const isPack = (v: string) => packs.some((p) => p.id === v);
const refresh = () => { revalidatePath('/admin/', 'layout'); revalidatePath('/espace/'); };

/** Payment fields shared by the new-learner form and the learner page. Null when no amount was entered. */
function paymentFrom(form: FormData) {
  const amount = Number(String(form.get('amount') ?? '').replace(/\s/g, '').replace(',', '.'));
  if (!amount || amount <= 0) return null;
  const currency = String(form.get('currency'));
  const method = String(form.get('method'));
  return {
    amount,
    currency: (currencies as readonly string[]).includes(currency) ? currency : 'XAF',
    method: paymentMethods.some(([v]) => v === method) ? method : 'autre',
    reference: cleanText(form.get('reference'), 120),
  };
}

const daysFrom = (form: FormData) => {
  const d = Number(form.get('days'));
  return (ACCESS_DAYS as readonly number[]).includes(d) ? d : 30;
};

export async function createLearner(form: FormData) {
  const { supabase, user } = await requireAdmin('/admin/apprenants/nouveau/');
  const input = {
    email: cleanText(form.get('email'), 254).toLowerCase(),
    first_name: cleanText(form.get('first_name'), 100),
    last_name: cleanText(form.get('last_name'), 100),
    phone: cleanText(form.get('phone'), 40),
    city: cleanText(form.get('city'), 120),
  };
  const created = await createAccount(input);
  if ('error' in created) {
    if (created.error === 'exists') {
      const { data } = await service().from('profiles').select('id').eq('email', input.email).maybeSingle();
      redirect(`/admin/apprenants/nouveau/?erreur=existe${data ? `&id=${data.id}` : ''}`);
    }
    redirect(`/admin/apprenants/nouveau/?erreur=${created.error}`);
  }

  // Optional pack: requested (pending) or opened right away when already paid.
  const pack = String(form.get('pack') ?? '');
  const mode = String(form.get('mode') ?? 'pending');
  let packError = false;
  if (isPack(pack)) {
    if (mode === 'active') {
      const e = await grantPack(supabase, created.id, pack, daysFrom(form), user.id);
      packError = !e;
      const pay = paymentFrom(form);
      if (e && pay) packError = !(await recordPayment({ userId: created.id, enrollmentId: e.id, pack, ...pay }));
    } else {
      const { error } = await supabase.from('enrollments').insert({ user_id: created.id, formule: pack, status: 'pending' });
      packError = Boolean(error);
    }
  }

  let mail = 'non';
  if (form.get('send_email') === 'on') mail = (await sendAccessLink(input.email, input.first_name || null, true)).sent ? 'oui' : 'echec';
  refresh();
  redirect(`/admin/apprenants/${created.id}/?succes=cree&mail=${mail}${packError ? '&erreur=pack' : ''}`);
}

export interface ImportResult { line: number; email: string; name: string; status: 'cree' | 'existe' | 'invalide' | 'erreur'; id?: string; detail?: string }
export interface ImportState { results: ImportResult[]; error?: string; tooMany?: boolean }

export async function importLearners(_: ImportState, form: FormData): Promise<ImportState> {
  const { supabase, user } = await requireAdmin('/admin/apprenants/importer/');
  const file = form.get('file');
  let text = String(form.get('text') ?? '');
  if (file instanceof File && file.size > 0) {
    if (file.size > 1_000_000) return { results: [], error: 'Le fichier dépasse 1 Mo.' };
    text = await file.text();
  }
  const { rows, tooMany } = parseLearners(text);
  if (!rows.length) return { results: [], error: 'Aucune ligne trouvée. Collez la liste ou choisissez un fichier CSV.' };

  const activate = form.get('activate') === 'on';
  const days = daysFrom(form);
  const sendMail = form.get('send_email') === 'on';
  const results: ImportResult[] = [];
  for (const r of rows) {
    const name = [r.first_name, r.last_name].filter(Boolean).join(' ');
    const created = await createAccount(r);
    if ('error' in created) {
      results.push({ line: r.line, email: r.email, name, status: created.error === 'exists' ? 'existe' : created.error === 'invalid' ? 'invalide' : 'erreur' });
      continue;
    }
    let detail = '';
    if (r.pack) {
      if (!isPack(r.pack)) detail = `Pack « ${r.pack} » inconnu, aucun pack créé`;
      else if (activate) detail = (await grantPack(supabase, created.id, r.pack, days, user.id)) ? 'Pack activé' : 'Pack non activé';
      else detail = (await supabase.from('enrollments').insert({ user_id: created.id, formule: r.pack, status: 'pending' })).error ? 'Pack non créé' : 'Pack en attente';
    }
    if (sendMail && !(await sendAccessLink(r.email, r.first_name || null, true)).sent) detail = [detail, 'email non envoyé'].filter(Boolean).join(', ');
    results.push({ line: r.line, email: r.email, name, status: 'cree', id: created.id, detail });
  }
  refresh();
  return { results, tooMany };
}

/** Every change made from a learner page. */
export async function saveLearner(form: FormData) {
  const { supabase, user } = await requireAdmin('/admin/apprenants/');
  const id = String(form.get('id') ?? '');
  if (!validUuid(id)) redirect('/admin/apprenants/');
  const path = `/admin/apprenants/${id}/`;
  const intent = String(form.get('intent'));
  const { data: target } = await supabase.from('profiles').select('id,email,first_name').eq('id', id).eq('role', 'candidate').single();
  if (!target) redirect('/admin/apprenants/');
  const fail = (what: string) => redirect(`${path}?erreur=${what}`);

  switch (intent) {
    case 'profile': {
      const { error } = await supabase.from('profiles').update({
        first_name: cleanText(form.get('first_name'), 100), last_name: cleanText(form.get('last_name'), 100),
        phone: cleanText(form.get('phone'), 40), city: cleanText(form.get('city'), 120),
      }).eq('id', id);
      if (error) fail('profil');
      break;
    }
    case 'notes': {
      const { error } = await supabase.from('learner_notes').upsert({ user_id: id, note: String(form.get('note') ?? '').slice(0, 5000), updated_by: user.id }, { onConflict: 'user_id' });
      if (error) fail('notes');
      break;
    }
    case 'pack': {
      const pack = String(form.get('pack'));
      if (!isPack(pack)) fail('pack');
      const { error } = await supabase.from('enrollments').insert({ user_id: id, formule: pack, status: 'pending' });
      if (error) fail('pack');
      break;
    }
    case 'grant': {
      const pack = String(form.get('pack'));
      if (!isPack(pack)) fail('pack');
      const e = await grantPack(supabase, id, pack, daysFrom(form), user.id);
      if (!e) fail('pack');
      const pay = paymentFrom(form);
      if (e && pay && !(await recordPayment({ userId: id, enrollmentId: e.id, pack, ...pay }))) fail('paiement');
      break;
    }
    case 'extend': {
      const enrollment = String(form.get('enrollment'));
      const days = Number(form.get('days'));
      if (!validUuid(enrollment) || ![7, 30, 60, 90].includes(days) || !(await extendEnrollment(supabase, enrollment, days))) fail('prolongation');
      break;
    }
    case 'payment': {
      const pack = String(form.get('pack'));
      const pay = paymentFrom(form);
      const enrollment = String(form.get('enrollment') ?? '');
      if (!isPack(pack) || !pay) fail('paiement');
      if (!(await recordPayment({ userId: id, enrollmentId: validUuid(enrollment) ? enrollment : null, pack, ...pay! }))) fail('paiement');
      break;
    }
    case 'link': {
      if (!(await sendAccessLink(target!.email, target!.first_name, false)).sent) fail('email');
      break;
    }
    case 'email': {
      const subject = cleanText(form.get('subject'), 150);
      const message = String(form.get('message') ?? '').trim().slice(0, 5000);
      if (!subject || !message) fail('message');
      const { sent } = await sendMessage([target!], subject, message);
      if (!sent) fail('email');
      break;
    }
    case 'remind': {
      const kind = String(form.get('kind')) as Reminder;
      if (kind !== 'inactif' && kind !== 'expiration') fail('action');
      try { await sendReminder(kind, target!.email, target!.first_name, String(form.get('ends_at') ?? '') || null); } catch { fail('email'); }
      break;
    }
    case 'disable':
    case 'enable':
      if (!(await setDisabled(id, intent === 'disable'))) fail('compte');
      break;
    case 'delete': {
      if (cleanText(form.get('confirm'), 254).toLowerCase() !== target!.email.toLowerCase()) fail('confirmation');
      if (!(await deleteAccount(id))) fail('compte');
      refresh();
      redirect('/admin/apprenants/?succes=supprime');
    }
    default:
      fail('action');
  }
  refresh();
  redirect(`${path}?succes=${intent}`);
}
