import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { supabaseConfigured } from '@/lib/supabase/config';
import { createCheckout, stripeConfigured } from '@/lib/stripe';
import { SITE } from '@/lib/email-layout';
import { isZone, packDuration, packs, zones, type Zone } from '@/content/offers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Whether card payment is available (the pack pages show the button only then). */
export function GET() {
  return NextResponse.json({ enabled: stripeConfigured() });
}

/**
 * A signed-in candidate pays a pack by card: a pending enrollment (reused if one
 * exists for this pack), a pending payment row, then the Stripe payment page.
 * The pack is activated by the webhook, never by this route.
 */
export async function POST(request: Request) {
  const fail = (status: number, error: string) => NextResponse.json({ error }, { status });
  if (!stripeConfigured() || !supabaseConfigured) return fail(503, 'Le paiement par carte n’est pas encore disponible.');
  const admin = createAdminClient();
  if (!admin) return fail(503, 'Le paiement par carte n’est pas encore disponible.');

  const body = await request.json().catch(() => ({}));
  const pack = packs.find((p) => p.id === body.pack);
  if (!pack) return fail(400, 'Pack inconnu.');
  const zone: Zone = isZone(body.zone) ? body.zone : 'cm';
  const currency = zones.find((z) => z.id === zone)!.currency;
  const amount = pack.prices[zone];

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) return fail(401, 'Connectez-vous pour payer votre pack.');

  const { data: existing } = await supabase.from('enrollments').select('id').eq('user_id', user.id).eq('formule', pack.id).eq('status', 'pending').order('created_at', { ascending: false }).limit(1).maybeSingle();
  let enrollmentId = existing?.id as string | undefined;
  if (!enrollmentId) {
    const { data, error } = await supabase.from('enrollments').insert({ user_id: user.id, formule: pack.id }).select('id').single();
    if (error || !data) { console.error('Checkout: enrollment insert failed', error); return fail(500, 'Le paiement n’a pas pu démarrer. Réessayez.'); }
    enrollmentId = data.id;
  }

  const { data: payment, error: payError } = await admin.from('payments')
    .insert({ user_id: user.id, enrollment_id: enrollmentId, pack: pack.id, amount, currency, provider: 'stripe', status: 'pending' })
    .select('id').single();
  if (payError || !payment) { console.error('Checkout: payment insert failed', payError); return fail(500, 'Le paiement n’a pas pu démarrer. Réessayez.'); }

  try {
    const session = await createCheckout({
      paymentId: payment.id,
      email: user.email,
      productName: `Pack ${pack.name} : préparation au TCF Canada (${packDuration(pack)})`,
      amount,
      currency,
      successUrl: `${SITE}/espace/?paiement=ok`,
      cancelUrl: `${SITE}/espace/?paiement=annule`,
      metadata: { payment_id: payment.id, enrollment_id: enrollmentId!, user_id: user.id, pack: pack.id },
    });
    await admin.from('payments').update({ provider_reference: session.id }).eq('id', payment.id);
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error('Checkout: Stripe session failed', e);
    await admin.from('payments').update({ status: 'failed' }).eq('id', payment.id);
    return fail(502, 'Le paiement par carte est momentanément indisponible. Réessayez ou payez par Mobile Money.');
  }
}
