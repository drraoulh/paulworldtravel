'use server';

import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/staff';
import { cleanText, sendMessage } from '@/lib/admin/accounts';
import { audiences, type Audience } from '@/lib/admin/audience';
import { SITE } from '@/lib/email-layout';

const PATH = '/admin/messages/';

/** Sends a group email, or a test copy to the admin who writes it. */
export async function sendGroupEmail(form: FormData) {
  const { user } = await requireAdmin(PATH);
  const audience = String(form.get('audience')) as Audience;
  const subject = cleanText(form.get('subject'), 150);
  const message = String(form.get('message') ?? '').trim().slice(0, 5000);
  const label = cleanText(form.get('button_label'), 60);
  let href = cleanText(form.get('button_href'), 300);
  if (href.startsWith('/')) href = `${SITE}${href}`;
  const button = label && /^https:\/\//.test(href) ? { label, href } : undefined;
  if (!subject || !message || !['tous', 'pack', 'gratuit'].includes(audience)) redirect(`${PATH}?erreur=champs`);

  if (form.get('mode') === 'test') {
    const { sent } = await sendMessage([{ email: user.email!, first_name: 'Prénom' }], subject, message, button);
    redirect(`${PATH}?${sent ? 'test=ok' : 'erreur=envoi'}`);
  }
  if (form.get('confirm') !== 'on') redirect(`${PATH}?erreur=confirmation`);
  const list = (await audiences())[audience];
  if (!list.length) redirect(`${PATH}?erreur=vide`);
  const { sent, failed } = await sendMessage(list, subject, message, button);
  console.info('Group email', { by: user.email, audience, subject, sent, failed });
  redirect(`${PATH}?envoye=${sent}&echecs=${failed}`);
}
