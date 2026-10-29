import { createHmac, timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';
import { emailSignature } from '@/content/contact';
import { escapeHtml, sendEmail } from '@/lib/brevo';

/*
 * Supabase "Send Email" hook: Supabase calls this route instead of sending its own
 * emails, and we send them through Brevo, in French and with the logo.
 *
 * SEND_EMAIL_HOOK_SECRET is the secret shown in Supabase (format "v1,whsec_<base64>").
 * Requests are signed with the Standard Webhooks scheme.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SITE = 'https://formation.paulworldtravel.com';
const LOGO = 'https://www.paulworldtravel.com/brand/symbole-nav.png';
const TOLERANCE_SECONDS = 5 * 60;

type Payload = {
  user: { email: string; new_email?: string; user_metadata?: { first_name?: string } };
  email_data: {
    token: string;
    token_hash: string;
    redirect_to?: string;
    email_action_type: string;
    token_new?: string;
    token_hash_new?: string;
  };
};

function verify(body: string, headers: Headers) {
  const raw = process.env.SEND_EMAIL_HOOK_SECRET ?? '';
  const secret = raw.replace(/^v1,/, '').replace(/^whsec_/, '');
  const id = headers.get('webhook-id');
  const timestamp = headers.get('webhook-timestamp');
  const signatures = headers.get('webhook-signature');
  if (!secret || !id || !timestamp || !signatures) return false;
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > TOLERANCE_SECONDS) return false;
  const expected = createHmac('sha256', Buffer.from(secret, 'base64')).update(`${id}.${timestamp}.${body}`).digest();
  return signatures.split(' ').some((part) => {
    const [version, value] = part.split(',');
    if (version !== 'v1' || !value) return false;
    const given = Buffer.from(value, 'base64');
    return given.length === expected.length && timingSafeEqual(given, expected);
  });
}

/** Where to send the candidate after the link, taken from the redirect the app asked for. */
function nextPath(redirectTo?: string) {
  try {
    const suite = redirectTo ? new URL(redirectTo).searchParams.get('suite') : null;
    if (suite && suite.startsWith('/') && !suite.startsWith('//')) return suite;
  } catch {
    // Ignore malformed redirect and use the default.
  }
  return '/espace/';
}

const link = (tokenHash: string, type: string, suite: string) =>
  `${SITE}/auth/confirm/?token_hash=${encodeURIComponent(tokenHash)}&type=${type}&suite=${encodeURIComponent(suite)}`;

function layout(title: string, intro: string, button: string, href: string, footer: string) {
  return (
    `<div style="font-family:Arial,sans-serif;font-size:15px;color:#0e1726;max-width:560px">` +
    `<table role="presentation" style="margin:0 0 20px"><tr><td style="vertical-align:middle"><img src="${LOGO}" alt="Paul World Travel" width="56" height="46" style="display:block;border:0"></td>` +
    `<td style="vertical-align:middle;padding-left:12px;font-size:18px;font-weight:bold;color:#0a2a5e">Paul World Travel Formation</td></tr></table>` +
    `<h2 style="color:#0a2a5e;margin:0 0 12px">${title}</h2><p>${intro}</p>` +
    `<p style="margin:24px 0"><a href="${href}" style="display:inline-block;background:#f2b705;color:#0a2a5e;font-weight:bold;padding:12px 24px;border-radius:6px;text-decoration:none">${button}</a></p>` +
    `<p style="color:#4a5872;font-size:13px">Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :<br>${href}</p>` +
    `<p style="color:#4a5872;font-size:13px">${footer}<br>${emailSignature}</p></div>`
  );
}

function buildEmails(p: Payload): { to: string; subject: string; html: string }[] {
  const { user, email_data: d } = p;
  const hello = user.user_metadata?.first_name ? `Bonjour ${escapeHtml(user.user_metadata.first_name)},` : 'Bonjour,';
  const suite = nextPath(d.redirect_to);

  switch (d.email_action_type) {
    case 'signup':
      return [{
        to: user.email,
        subject: 'Confirmez votre compte Paul World Travel Formation',
        html: layout(
          'Bienvenue dans votre préparation au TCF Canada',
          `${hello} merci pour votre inscription. Confirmez votre adresse email pour accéder à votre espace candidat. Un conseiller vous contacte ensuite pour le tarif, le calendrier et le paiement.`,
          'Confirmer mon adresse',
          link(d.token_hash, 'signup', suite),
          'Si vous n’êtes pas à l’origine de cette inscription, ignorez cet email.'
        ),
      }];
    case 'recovery':
      return [{
        to: user.email,
        subject: 'Choisissez un nouveau mot de passe',
        html: layout(
          'Nouveau mot de passe',
          `${hello} vous avez demandé à changer le mot de passe de votre espace candidat.`,
          'Choisir un nouveau mot de passe',
          link(d.token_hash, 'recovery', '/auth/nouveau-mot-de-passe/'),
          'Ce lien est valable une heure. Si vous n’avez rien demandé, ignorez cet email : votre mot de passe reste inchangé.'
        ),
      }];
    case 'magiclink':
    case 'invite':
      return [{
        to: user.email,
        subject: 'Votre lien de connexion',
        html: layout('Connexion à votre espace', `${hello} cliquez ci-dessous pour vous connecter.`, 'Me connecter', link(d.token_hash, d.email_action_type, suite), 'Ce lien est valable une heure.'),
      }];
    case 'email_change': {
      // Supabase pairs token_hash_new with the current address and token_hash with the new one.
      const out = [];
      if (user.new_email) {
        out.push({
          to: user.new_email,
          subject: 'Confirmez votre nouvelle adresse email',
          html: layout('Nouvelle adresse email', `${hello} confirmez cette adresse pour votre espace candidat.`, 'Confirmer ma nouvelle adresse', link(d.token_hash, 'email_change', suite), 'Si vous n’avez rien demandé, ignorez cet email.'),
        });
      }
      if (d.token_hash_new) {
        out.push({
          to: user.email,
          subject: 'Confirmez le changement de votre adresse email',
          html: layout('Changement d’adresse email', `${hello} une demande de changement d’adresse a été faite pour votre espace candidat.`, 'Confirmer le changement', link(d.token_hash_new, 'email_change', suite), 'Si vous n’avez rien demandé, ignorez cet email et contactez-nous.'),
        });
      }
      return out;
    }
    case 'reauthentication':
      return [{
        to: user.email,
        subject: 'Votre code de vérification',
        html: layout('Code de vérification', `${hello} votre code est : <strong style="font-size:20px;letter-spacing:2px">${escapeHtml(d.token)}</strong>`, 'Aller sur mon espace', `${SITE}/espace/`, 'Ce code est valable quelques minutes.'),
      }];
    default:
      return [];
  }
}

const fail = (status: number, message: string) =>
  NextResponse.json({ error: { http_code: status, message } }, { status });

export async function POST(request: Request) {
  const body = await request.text();
  if (!verify(body, request.headers)) return fail(401, 'Invalid signature');

  let payload: Payload;
  try {
    payload = JSON.parse(body);
  } catch {
    return fail(400, 'Invalid payload');
  }

  const emails = buildEmails(payload);
  if (emails.length === 0) return fail(400, `Unsupported email type: ${payload.email_data?.email_action_type}`);

  try {
    for (const e of emails) {
      await sendEmail({ to: [{ email: e.to }], subject: e.subject, htmlContent: e.html, tags: ['formation', `auth-${payload.email_data.email_action_type}`] });
    }
  } catch (error) {
    console.error('Auth email failed', error);
    return fail(502, 'Email could not be sent');
  }
  return NextResponse.json({});
}
