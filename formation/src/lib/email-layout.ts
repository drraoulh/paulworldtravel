import { emailSignature } from '@/content/contact';

// Shared look of the emails the platform sends through Brevo.

export const SITE = 'https://formation.paulworldtravel.com';
const LOGO = 'https://www.paulworldtravel.com/brand/symbole-nav.png';

/** Link to /auth/confirm, which checks the one-time token and opens the session. */
export const authLink = (tokenHash: string, type: string, suite: string) =>
  `${SITE}/auth/confirm/?token_hash=${encodeURIComponent(tokenHash)}&type=${type}&suite=${encodeURIComponent(suite)}`;

/** Title, paragraph (trusted HTML), one button and a small footer line. */
export function emailLayout(title: string, intro: string, button: string, href: string, footer: string) {
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

/**
 * A message written by the team: plain text (escaped, line breaks kept),
 * an optional button, and the usual signature.
 */
export function messageLayout(title: string, text: string, button?: { label: string; href: string }) {
  const esc = (v: string) => v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const body = text.split(/\n{2,}/).map((p) => `<p>${esc(p).replace(/\n/g, '<br>')}</p>`).join('');
  return (
    `<div style="font-family:Arial,sans-serif;font-size:15px;color:#0e1726;max-width:560px">` +
    `<table role="presentation" style="margin:0 0 20px"><tr><td style="vertical-align:middle"><img src="${LOGO}" alt="Paul World Travel" width="56" height="46" style="display:block;border:0"></td>` +
    `<td style="vertical-align:middle;padding-left:12px;font-size:18px;font-weight:bold;color:#0a2a5e">Paul World Travel Formation</td></tr></table>` +
    `<h2 style="color:#0a2a5e;margin:0 0 12px">${esc(title)}</h2>${body}` +
    (button ? `<p style="margin:24px 0"><a href="${esc(button.href)}" style="display:inline-block;background:#f2b705;color:#0a2a5e;font-weight:bold;padding:12px 24px;border-radius:6px;text-decoration:none">${esc(button.label)}</a></p>` +
      `<p style="color:#4a5872;font-size:13px">Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :<br>${esc(button.href)}</p>` : '') +
    `<p style="color:#4a5872;font-size:13px">Une question ? Répondez simplement à cet email.<br>${emailSignature}</p></div>`
  );
}
