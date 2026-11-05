'use server';

import { createClient } from '@/lib/supabase/server';
import { formatPrice, packDuration, packs } from '@/content/offers';
import { hasAcceptedTerms, type LegalAcceptance } from '@/lib/legal-acceptance';
import { LEGAL_VERSION } from '@/content/legal';
import { visitorZone } from '@/lib/zone';

const BREVO_URL = 'https://api.brevo.com/v3/smtp/email';
const esc = (v: string) => v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** A signed-in candidate asks for a pack: a pending enrollment, and an email to the team. */
export async function requestPack(packId: string, acceptance: LegalAcceptance): Promise<{ ok: boolean; error?: string }> {
  if (!hasAcceptedTerms(acceptance)) return { ok: false, error: 'Acceptez les conditions d’utilisation et de vente pour continuer.' };
  const pack = packs.find((p) => p.id === packId);
  if (!pack) return { ok: false, error: 'Pack inconnu.' };
  const zone = await visitorZone();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'Connectez-vous pour choisir un pack.' };

  // Row level security lets a candidate create their own pending enrollment.
  const { error } = await supabase.from('enrollments').insert({ user_id: user.id, formule: pack.id });
  if (error) console.error('Pack request: enrollment insert failed', error);

  const apiKey = process.env.BREVO_API_KEY;
  const sender = process.env.BREVO_SENDER_EMAIL;
  if (apiKey && sender) {
    const { data: profile } = await supabase.from('profiles').select('first_name, last_name, phone').eq('id', user.id).single();
    const name = [profile?.first_name, profile?.last_name].filter(Boolean).join(' ') || user.email || 'Candidat';
    try {
      await fetch(BREVO_URL, {
        method: 'POST',
        headers: { 'api-key': apiKey, 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({
          sender: { name: process.env.BREVO_SENDER_NAME || 'PAULWORLD TRAVEL', email: sender },
          to: (process.env.SIGNUP_TO_EMAIL || 'infos@paulworldtravel.com').split(',').map((e) => ({ email: e.trim() })).filter((e) => e.email),
          replyTo: user.email ? { email: user.email } : undefined,
          subject: `Demande de pack ${pack.name} : ${name}`.slice(0, 200),
          htmlContent: `<div style="font-family:Arial,sans-serif;font-size:14px"><p>${esc(name)} (${esc(user.email ?? '')}, ${esc(profile?.phone ?? 'téléphone non renseigné')}) demande le pack <strong>${pack.name}</strong> : ${formatPrice(pack, zone)}, ${packDuration(pack)}.</p><p>Conditions acceptées : version ${LEGAL_VERSION}. Demande reçue le ${new Date().toISOString()}.</p><p>Contactez-le pour le paiement puis activez l’inscription dans l’admin.${error ? ' Attention : l’inscription n’a pas pu être enregistrée en base, créez-la à la main.' : ''}</p></div>`,
        }),
      });
    } catch (e) {
      console.error('Pack request email failed', e);
    }
  }
  return error ? { ok: false, error: 'Votre demande est transmise à l’équipe, qui vous contacte pour le paiement.' } : { ok: true };
}
