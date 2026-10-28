import { NextResponse } from 'next/server';

/*
 * Sends website form submissions (contact, quote, testimonial) by email
 * through Brevo's transactional email API.
 *
 * Required environment variables (set them in Vercel / Netlify, never in the code):
 *   BREVO_API_KEY        – Brevo API v3 key (SMTP & API > API keys)
 *   BREVO_SENDER_EMAIL   – a sender address validated in Brevo (Senders & IP)
 * Optional:
 *   BREVO_SENDER_NAME    – display name of the sender (default "PAULWORLD TRAVEL")
 *   CONTACT_TO_EMAIL     – where submissions are delivered, comma-separated
 *                          (default paulworld2016@yahoo.com and infos@paulworldtravel.com)
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EMAIL_LOGO =
  '<table role="presentation" style="margin:0 0 20px"><tr><td style="vertical-align:middle"><img src="https://www.paulworldtravel.com/brand/symbole-nav.png" alt="Paul World Travel" width="56" height="46" style="display:block;border:0"></td><td style="vertical-align:middle;padding-left:12px;font-family:Arial,sans-serif;font-size:18px;font-weight:bold;color:#0a2a5e">Paul World Travel</td></tr></table>';
const BREVO_URL = 'https://api.brevo.com/v3/smtp/email';

type FormType = 'contact' | 'quote' | 'testimonial';

const TYPE_LABELS: Record<FormType, string> = {
  contact: 'Nouveau message de contact',
  quote: 'Nouvelle demande de devis',
  testimonial: 'Nouveau témoignage client',
};

// Human-readable labels for the fields we accept, in display order.
const FIELD_LABELS: Record<string, string> = {
  name: 'Nom',
  firstName: 'Prénom',
  lastName: 'Nom',
  email: 'Email',
  phone: 'Téléphone',
  company: 'Entreprise',
  position: 'Fonction',
  service: 'Service',
  subject: 'Sujet',
  origin: 'Départ',
  destination: 'Destination',
  weight: 'Poids / volume',
  goods: 'Marchandise',
  rating: 'Note',
  message: 'Message',
  content: 'Témoignage',
};

const MAX_FIELD_LENGTH = 5000;
const DEFAULT_RECIPIENTS = 'paulworld2016@yahoo.com,infos@paulworldtravel.com';

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_request' }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const type: FormType = body.type === 'quote' || body.type === 'testimonial' ? body.type : 'contact';

  const fields: Record<string, string> = {};
  for (const key of Object.keys(FIELD_LABELS)) {
    const raw = body[key];
    if (raw === undefined || raw === null) continue;
    const value = String(raw).trim().slice(0, MAX_FIELD_LENGTH);
    if (value) fields[key] = value;
  }

  const email = fields.email ?? '';
  const name = fields.name ?? [fields.firstName, fields.lastName].filter(Boolean).join(' ');
  const text = fields.message ?? fields.content ?? '';

  if (!name || !isEmail(email) || !text) {
    return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 422 });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  if (!apiKey || !senderEmail) {
    console.error('Brevo is not configured: set BREVO_API_KEY and BREVO_SENDER_EMAIL.');
    return NextResponse.json({ ok: false, error: 'email_not_configured' }, { status: 503 });
  }

  const subjectLine = `${TYPE_LABELS[type]} — ${fields.service ?? fields.subject ?? name}`.slice(0, 200);
  const rows = Object.entries(fields)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:6px 12px;color:#555;vertical-align:top;white-space:nowrap"><strong>${FIELD_LABELS[key]}</strong></td>` +
        `<td style="padding:6px 12px;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`
    )
    .join('');
  const htmlContent =
    `<div style="font-family:Arial,sans-serif;font-size:14px;color:#111">${EMAIL_LOGO}` +
    `<h2 style="color:#1d4ed8">${TYPE_LABELS[type]}</h2>` +
    `<p>Reçu depuis le site Paul World Travel. Répondez directement à cet email pour écrire à ${escapeHtml(name)}.</p>` +
    `<table style="border-collapse:collapse">${rows}</table></div>`;
  const textContent = Object.entries(fields)
    .map(([key, value]) => `${FIELD_LABELS[key]} : ${value}`)
    .join('\n');

  try {
    const response = await fetch(BREVO_URL, {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        sender: { name: process.env.BREVO_SENDER_NAME || 'PAULWORLD TRAVEL', email: senderEmail },
        to: (process.env.CONTACT_TO_EMAIL || DEFAULT_RECIPIENTS)
          .split(',')
          .map((address) => address.trim())
          .filter(Boolean)
          .map((address) => ({ email: address, name: 'Paul World Travel' })),
        replyTo: { email, name: name.slice(0, 70) },
        subject: subjectLine,
        htmlContent,
        textContent,
        tags: ['site-web', type],
      }),
    });

    if (!response.ok) {
      console.error('Brevo error', response.status, await response.text());
      return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 });
    }
  } catch (error) {
    console.error('Brevo request failed', error);
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 });
  }

  // Acknowledgement to the visitor. Replies to it land in the sender's inbox (infos@).
  // It is a courtesy: the message is already delivered if this one fails.
  try {
    const firstName = escapeHtml((fields.firstName ?? name).split(' ')[0]);
    const ack = await fetch(BREVO_URL, {
      method: 'POST',
      headers: { 'api-key': apiKey, 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({
        sender: { name: process.env.BREVO_SENDER_NAME || 'PAULWORLD TRAVEL', email: senderEmail },
        to: [{ email, name: name.slice(0, 70) }],
        replyTo: { email: senderEmail, name: process.env.BREVO_SENDER_NAME || 'PAULWORLD TRAVEL' },
        subject: 'Nous avons bien reçu votre message | We received your message',
        htmlContent:
          `<div style="font-family:Arial,sans-serif;font-size:15px;color:#0e1726">${EMAIL_LOGO}` +
          `<p>Bonjour ${firstName},</p>` +
          `<p>Merci pour votre message${fields.service ? ` concernant <strong>${escapeHtml(fields.service)}</strong>` : ''}. ` +
          `Notre équipe vous répond sous 24 h ouvrées. Pour une demande urgente, écrivez-nous sur WhatsApp : +237 6 94 24 46 66.</p>` +
          `<p style="color:#4a5872">Thank you for your message. Our team will reply within one business day.</p>` +
          `<p>Paul World Travel<br>Lendi, entrée Commissaire, Douala</p></div>`,
        tags: ['site-web', 'accuse-reception'],
      }),
    });
    if (!ack.ok) console.error('Acknowledgement failed', ack.status, await ack.text());
  } catch (error) {
    console.error('Acknowledgement request failed', error);
  }

  return NextResponse.json({ ok: true });
}
