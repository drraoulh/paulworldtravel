// Minimal Brevo transactional email sender (server only).
const BREVO_URL = 'https://api.brevo.com/v3/smtp/email';

export const escapeHtml = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export function brevoSender() {
  const apiKey = process.env.BREVO_API_KEY;
  const email = process.env.BREVO_SENDER_EMAIL;
  if (!apiKey || !email) return null;
  return { apiKey, sender: { name: process.env.BREVO_SENDER_NAME || 'PAULWORLD TRAVEL', email } };
}

export async function sendEmail(payload: Record<string, unknown>) {
  const cfg = brevoSender();
  if (!cfg) throw new Error('Brevo is not configured');
  const res = await fetch(BREVO_URL, {
    method: 'POST',
    headers: { 'api-key': cfg.apiKey, 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({ sender: cfg.sender, replyTo: cfg.sender, ...payload }),
  });
  if (!res.ok) throw new Error(`Brevo ${res.status}: ${await res.text()}`);
}
