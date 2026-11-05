import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { verifyStripeSignature } from '@/lib/stripe';
import { openEnrollment } from '@/lib/admin/accounts';
import { escapeHtml, sendEmail } from '@/lib/brevo';
import { packs, packName } from '@/content/offers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Session = { id: string; payment_status: string; payment_intent: string | null; amount_total: number | null; currency: string | null; customer_details?: { email?: string | null } | null; metadata?: Record<string, string> };

/** Tells the team that a card payment arrived (best effort). */
async function notifyTeam(pack: string, amount: number, currency: string, email: string) {
  try {
    await sendEmail({
      to: (process.env.SIGNUP_TO_EMAIL || 'infos@paulworldtravel.com').split(',').map((e) => ({ email: e.trim() })).filter((e) => e.email),
      subject: `Paiement par carte reçu : pack ${packName(pack)}`,
      htmlContent: `<div style="font-family:Arial,sans-serif;font-size:14px"><p>${escapeHtml(email)} a payé le pack <strong>${escapeHtml(packName(pack))}</strong> par carte : ${amount.toLocaleString('fr-FR')} ${escapeHtml(currency)}.</p><p>L’accès est activé automatiquement. Détail dans l’administration, page Paiements.</p></div>`,
      tags: ['formation', 'paiement-carte'],
    });
  } catch (e) {
    console.error('Card payment email failed', e);
  }
}

/**
 * Stripe notifications. A paid checkout marks the payment paid and opens the pack
 * for its duration. Stripe may send the same event twice: a payment already paid
 * is left alone.
 */
export async function POST(request: Request) {
  const body = await request.text();
  if (!verifyStripeSignature(body, request.headers.get('stripe-signature'))) return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  const event = JSON.parse(body) as { type: string; data: { object: Session } };
  const s = event.data.object;
  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: 'Not configured' }, { status: 503 });

  const { data: payment } = await admin.from('payments').select('id,status,pack,enrollment_id,amount,currency').eq('provider', 'stripe').eq('provider_reference', s.id).maybeSingle();
  if (!payment) return NextResponse.json({ received: true, note: 'unknown checkout' });

  const paid = (event.type === 'checkout.session.completed' && s.payment_status === 'paid') || event.type === 'checkout.session.async_payment_succeeded';
  if (paid) {
    if (payment.status === 'paid') return NextResponse.json({ received: true });
    const { data: claimed } = await admin.from('payments')
      .update({ status: 'paid', paid_at: new Date().toISOString(), reference: s.payment_intent })
      .eq('id', payment.id).neq('status', 'paid').select('id').maybeSingle();
    // Another delivery of the same event got there first.
    if (!claimed) return NextResponse.json({ received: true });
    const pack = packs.find((p) => p.id === payment.pack);
    if (payment.enrollment_id && pack) {
      const opened = await openEnrollment(admin, payment.enrollment_id, pack.days, null);
      if (!opened) console.error('Card payment: activation failed', payment.id);
    }
    await notifyTeam(payment.pack, Number(payment.amount), payment.currency, s.customer_details?.email ?? '');
  } else if (event.type === 'checkout.session.async_payment_failed' || event.type === 'checkout.session.expired') {
    await admin.from('payments').update({ status: event.type === 'checkout.session.expired' ? 'cancelled' : 'failed' }).eq('id', payment.id).eq('status', 'pending');
  }
  return NextResponse.json({ received: true });
}
