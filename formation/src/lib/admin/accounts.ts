import 'server-only';
import type { SupabaseClient } from '@supabase/supabase-js';
import { createAdminClient } from '@/lib/supabase/admin';
import { escapeHtml, sendEmail } from '@/lib/brevo';
import { authLink, emailLayout, SITE } from '@/lib/email-layout';
import { packName } from '@/content/offers';
import { formatDate } from '@/lib/labels';

/*
 * Account operations of the admin area that need the secret key: creating an
 * account, sending a sign-in link, disabling or deleting it, changing a role and
 * recording payments. Every caller checks requireAdmin() first.
 */

export const validEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) && v.length <= 254;
export const cleanText = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max);
const isoDay = (d: Date) => d.toISOString().slice(0, 10);
export const ACCESS_DAYS = [7, 30, 60, 90, 180] as const;

export function service() {
  const admin = createAdminClient();
  if (!admin) throw new Error('SUPABASE_SECRET_KEY is missing');
  return admin;
}

/** International digits for WhatsApp: 6XXXXXXXX (Cameroon) gets the 237 prefix. */
export function whatsappNumber(phone: string | null | undefined) {
  let d = String(phone ?? '').replace(/\D/g, '');
  if (d.startsWith('00')) d = d.slice(2);
  if (/^6\d{8}$/.test(d)) d = `237${d}`;
  return d.length >= 10 ? d : null;
}

export const whatsappLink = (phone: string | null | undefined, text: string) => {
  const n = whatsappNumber(phone);
  return n ? `https://wa.me/${n}?text=${encodeURIComponent(text)}` : null;
};

export interface NewAccount { email: string; first_name: string; last_name: string; phone: string; city: string }

/** Creates a confirmed account (the database trigger adds the profile). */
export async function createAccount(input: NewAccount): Promise<{ id: string } | { error: 'exists' | 'invalid' | 'failed' }> {
  const email = input.email.trim().toLowerCase();
  if (!validEmail(email)) return { error: 'invalid' };
  const admin = service();
  const { data, error } = await admin.auth.admin.createUser({
    email,
    email_confirm: true,
    user_metadata: { first_name: input.first_name, last_name: input.last_name, phone: input.phone, city: input.city },
  });
  if (error || !data.user) {
    if (/already|exists|registered/i.test(error?.message ?? '')) return { error: 'exists' };
    console.error('Account creation failed', error);
    return { error: 'failed' };
  }
  return { id: data.user.id };
}

/** One-time link to choose a password (valid about one hour), sent by email when possible. */
export async function sendAccessLink(email: string, firstName: string | null, welcome: boolean) {
  const { data, error } = await service().auth.admin.generateLink({ type: 'recovery', email });
  if (error || !data.properties?.hashed_token) {
    console.error('Link generation failed', error);
    return { sent: false, link: null };
  }
  const link = authLink(data.properties.hashed_token, 'recovery', '/auth/nouveau-mot-de-passe/');
  const hello = firstName ? `Bonjour ${escapeHtml(firstName)},` : 'Bonjour,';
  try {
    await sendEmail({
      to: [{ email }],
      subject: welcome ? 'Votre compte de préparation au TCF Canada est prêt' : 'Votre lien de connexion',
      htmlContent: emailLayout(
        welcome ? 'Bienvenue dans votre préparation au TCF Canada' : 'Connexion à votre espace',
        welcome
          ? `${hello} notre équipe a créé votre compte sur la plateforme de formation Paul World Travel. Choisissez votre mot de passe pour accéder à votre espace, aux leçons et aux entraînements.`
          : `${hello} choisissez un mot de passe pour vous connecter à votre espace.`,
        'Choisir mon mot de passe',
        link,
        `Ce lien est valable une heure. Ensuite, utilisez « Mot de passe oublié » sur ${SITE}/connexion/.`,
      ),
      tags: ['formation', welcome ? 'compte-cree' : 'lien-connexion'],
    });
    return { sent: true, link };
  } catch (e) {
    console.error('Access email failed', e);
    return { sent: false, link };
  }
}

/** Tells the candidate their pack is open (best effort). */
export async function sendActivationEmail(email: string, firstName: string | null, pack: string, endsAt: string | null) {
  try {
    await sendEmail({
      to: [{ email }],
      subject: 'Votre accès à la préparation au TCF Canada est activé',
      htmlContent: emailLayout(
        'Votre accès est activé',
        `${firstName ? `Bonjour ${escapeHtml(firstName)},` : 'Bonjour,'} votre pack <strong>${escapeHtml(packName(pack))}</strong> est actif jusqu’au ${formatDate(endsAt)}.`,
        'Ouvrir mon espace',
        `${SITE}/espace/`,
        'Bonne préparation.',
      ),
      tags: ['formation', 'activation'],
    });
  } catch (e) {
    console.error('Activation email failed', e);
  }
}

export type Reminder = 'inactif' | 'expiration';

export const reminderText = (kind: Reminder, firstName: string | null, endsAt?: string | null) =>
  kind === 'inactif'
    ? `Bonjour${firstName ? ` ${firstName}` : ''}, c’est l’équipe Paul World Travel. Nous n’avons pas vu d’activité sur votre préparation au TCF Canada depuis quelques jours. Une série de 20 minutes aujourd’hui suffit pour garder le rythme : ${SITE}/parcours/`
    : `Bonjour${firstName ? ` ${firstName}` : ''}, c’est l’équipe Paul World Travel. Votre pack de préparation au TCF Canada se termine le ${formatDate(endsAt ?? null)}. Répondez à ce message pour le prolonger.`;

export async function sendReminder(kind: Reminder, email: string, firstName: string | null, endsAt?: string | null) {
  await sendEmail({
    to: [{ email }],
    subject: kind === 'inactif' ? 'On reprend votre préparation au TCF Canada ?' : 'Votre pack se termine bientôt',
    htmlContent: emailLayout(
      kind === 'inactif' ? 'Votre préparation vous attend' : 'Votre pack se termine bientôt',
      escapeHtml(reminderText(kind, firstName, endsAt)),
      kind === 'inactif' ? 'Reprendre mon parcours' : 'Voir les packs',
      kind === 'inactif' ? `${SITE}/parcours/` : `${SITE}/packs/`,
      'Une question ? Répondez simplement à cet email.',
    ),
    tags: ['formation', `relance-${kind}`],
  });
}

/**
 * Opens a pack right away: the enrollment is created pending (the only state the
 * policies allow on insert), then activated. Uses the admin's own session.
 */
export async function grantPack(supabase: SupabaseClient, userId: string, pack: string, days: number, by: string) {
  const { data: created, error } = await supabase.from('enrollments').insert({ user_id: userId, formule: pack, status: 'pending' }).select('id').single();
  if (error || !created) return null;
  return openEnrollment(supabase, created.id, days, by);
}

/** Activates an enrollment for `days` days from today. */
export async function openEnrollment(supabase: SupabaseClient, id: string, days: number, by: string | null, endDate?: string) {
  const start = new Date();
  const end = endDate ?? isoDay(new Date(start.getTime() + days * 86_400_000));
  const { data, error } = await supabase
    .from('enrollments')
    .update({ status: 'active', starts_at: isoDay(start), ends_at: end, activated_by: by, activated_at: new Date().toISOString() })
    .eq('id', id)
    .select('id, formule, ends_at, profiles!enrollments_user_id_fkey(email, first_name)')
    .single();
  if (error || !data) {
    console.error('Activation failed', error);
    return null;
  }
  const p = data.profiles as unknown as { email: string; first_name: string | null } | null;
  if (p?.email) await sendActivationEmail(p.email, p.first_name, data.formule, data.ends_at);
  return data;
}

/** Adds days to an active pack, counted from its end (or from today if already over). */
export async function extendEnrollment(supabase: SupabaseClient, id: string, days: number) {
  const { data: e } = await supabase.from('enrollments').select('ends_at, status').eq('id', id).single();
  if (!e || e.status !== 'active') return false;
  const today = isoDay(new Date());
  const from = e.ends_at && e.ends_at > today ? new Date(e.ends_at) : new Date();
  const { error } = await supabase.from('enrollments').update({ ends_at: isoDay(new Date(from.getTime() + days * 86_400_000)) }).eq('id', id);
  return !error;
}

export const paymentMethods = [
  ['mtn', 'MTN Mobile Money'],
  ['orange', 'Orange Money'],
  ['especes', 'Espèces au bureau'],
  ['virement', 'Virement bancaire'],
  ['interac', 'Virement Interac'],
  ['carte', 'Carte bancaire'],
  ['stripe', 'Carte bancaire en ligne (Stripe)'],
  ['autre', 'Autre'],
] as const;
export const paymentMethodName = (id: string) => paymentMethods.find(([v]) => v === id)?.[1] ?? id;
export const currencies = ['XAF', 'CAD', 'USD', 'EUR'] as const;

export interface PaymentInput { userId: string; enrollmentId?: string | null; pack: string; amount: number; currency: string; method: string; reference: string }

/** Records a payment received outside the site (Mobile Money, cash, transfer). */
export async function recordPayment(p: PaymentInput) {
  const { error } = await service().from('payments').insert({
    user_id: p.userId,
    enrollment_id: p.enrollmentId ?? null,
    pack: p.pack,
    amount: Math.round(p.amount * 100) / 100,
    currency: p.currency,
    provider: p.method,
    reference: p.reference || null,
    status: 'paid',
    paid_at: new Date().toISOString(),
  });
  if (error) console.error('Payment record failed', error);
  return !error;
}

/** Sign-in data that only the auth schema has: last sign-in and suspension. */
export async function authUsers() {
  const map = new Map<string, { lastSignIn: string | null; disabled: boolean }>();
  const admin = createAdminClient();
  if (!admin) return map;
  for (let page = 1; page <= 20; page++) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) break;
    for (const u of data.users) {
      const banned = (u as { banned_until?: string | null }).banned_until;
      map.set(u.id, { lastSignIn: u.last_sign_in_at ?? null, disabled: Boolean(banned && new Date(banned) > new Date()) });
    }
    if (data.users.length < 1000) break;
  }
  return map;
}

/** Suspends sign-in (about 100 years) or lifts the suspension. */
export async function setDisabled(id: string, disabled: boolean) {
  const { error } = await service().auth.admin.updateUserById(id, { ban_duration: disabled ? '876000h' : 'none' });
  return !error;
}

/** Deletes the account and, by cascade, its profile, packs, progress and productions. */
export async function deleteAccount(id: string) {
  const { error } = await service().auth.admin.deleteUser(id);
  if (error) console.error('Account deletion failed', error);
  return !error;
}

export type Role = 'candidate' | 'trainer' | 'admin';
export const roleName: Record<Role, string> = { candidate: 'Apprenant', trainer: 'Formateur', admin: 'Administrateur' };

/** The role column is not writable with a user session, only with the secret key. */
export async function setRole(id: string, role: Role) {
  const { error } = await service().from('profiles').update({ role }).eq('id', id);
  return !error;
}
