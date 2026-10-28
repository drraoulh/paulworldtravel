import { NextResponse } from 'next/server';
import { formules } from '@/content/offers';

/*
 * Sends a sign-up to the team by email (Brevo), with the candidate in reply-to,
 * then a confirmation to the candidate.
 *
 * Environment variables (Vercel project settings, never in the code):
 *   BREVO_API_KEY       required
 *   BREVO_SENDER_EMAIL  required, a sender validated in Brevo
 *   BREVO_SENDER_NAME   optional, default "PAULWORLD TRAVEL"
 *   SIGNUP_TO_EMAIL     optional, comma-separated, default infos@paulworldtravel.com
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const BREVO_URL = 'https://api.brevo.com/v3/smtp/email';
const DEFAULT_TO = 'infos@paulworldtravel.com';
const MAX = 3000;

const LABELS: Record<string, string> = {
  firstName: 'Prénom',
  lastName: 'Nom',
  email: 'Email',
  phone: 'Téléphone / WhatsApp',
  city: 'Ville et pays',
  formule: 'Formule',
  level: 'Niveau actuel',
  goal: 'NCLC visé',
  examDate: 'Date d’examen prévue',
  message: 'Message',
};

const escapeHtml = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length <= 254;

async function send(apiKey: string, payload: object) {
  const res = await fetch(BREVO_URL, {
    method: 'POST',
    headers: { 'api-key': apiKey, 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Brevo ${res.status}: ${await res.text()}`);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_request' }, { status: 400 });
  }

  if (typeof body.website === 'string' && body.website.trim()) return NextResponse.json({ ok: true });

  const f: Record<string, string> = {};
  for (const key of Object.keys(LABELS)) {
    const value = body[key] == null ? '' : String(body[key]).trim().slice(0, MAX);
    if (value) f[key] = value;
  }
  const formule = formules.find((x) => x.id === f.formule);
  if (!f.firstName || !f.lastName || !f.phone || !formule || !isEmail(f.email ?? '')) {
    return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 422 });
  }
  f.formule = formule.name;

  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  if (!apiKey || !senderEmail) {
    console.error('Brevo is not configured: set BREVO_API_KEY and BREVO_SENDER_EMAIL.');
    return NextResponse.json({ ok: false, error: 'email_not_configured' }, { status: 503 });
  }
  const sender = { name: process.env.BREVO_SENDER_NAME || 'PAULWORLD TRAVEL', email: senderEmail };
  const name = `${f.firstName} ${f.lastName}`;

  const rows = Object.entries(f)
    .map(([k, v]) => `<tr><td style="padding:6px 12px;color:#555;vertical-align:top"><strong>${LABELS[k]}</strong></td><td style="padding:6px 12px;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`)
    .join('');

  try {
    await send(apiKey, {
      sender,
      to: (process.env.SIGNUP_TO_EMAIL || DEFAULT_TO).split(',').map((e) => e.trim()).filter(Boolean).map((email) => ({ email })),
      replyTo: { email: f.email, name: name.slice(0, 70) },
      subject: `Inscription TCF Canada — ${name} (${formule.name})`.slice(0, 200),
      htmlContent: `<div style="font-family:Arial,sans-serif;font-size:14px"><h2 style="color:#1452c8">Nouvelle inscription TCF Canada</h2><table style="border-collapse:collapse">${rows}</table></div>`,
      textContent: Object.entries(f).map(([k, v]) => `${LABELS[k]} : ${v}`).join('\n'),
      tags: ['formation', 'inscription-tcf'],
    });
  } catch (error) {
    console.error('Sign-up email failed', error);
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 });
  }

  // The confirmation is a courtesy: the sign-up is already recorded if it fails.
  try {
    await send(apiKey, {
      sender,
      to: [{ email: f.email, name: name.slice(0, 70) }],
      replyTo: { email: senderEmail, name: sender.name },
      subject: 'Votre inscription à la préparation au TCF Canada',
      htmlContent:
        `<div style="font-family:Arial,sans-serif;font-size:15px;color:#0e1726"><p>Bonjour ${escapeHtml(f.firstName)},</p>` +
        `<p>Nous avons bien reçu votre inscription à la formule <strong>${escapeHtml(formule.name)}</strong>.</p>` +
        `<p>Un conseiller vous contacte sous 24 h ouvrées avec le tarif, le calendrier et les moyens de paiement.</p>` +
        `<p>À très bientôt,<br>Paul World Travel Formation<br>WhatsApp : +237 6 94 24 46 66</p></div>`,
      tags: ['formation', 'confirmation-tcf'],
    });
  } catch (error) {
    console.error('Confirmation email failed', error);
  }

  return NextResponse.json({ ok: true });
}
