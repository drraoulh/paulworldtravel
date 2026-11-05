import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';

/*
 * Card payment with Stripe Checkout (a payment page hosted by Stripe), called
 * through the REST API. STRIPE_SECRET_KEY opens the checkout; STRIPE_WEBHOOK_SECRET
 * checks the notifications Stripe sends to /api/stripe/webhook once a payment is done.
 */

const API = 'https://api.stripe.com/v1';

export const stripeConfigured = () => Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_WEBHOOK_SECRET);

/** With a test key (sk_test_), card payment is shown to the team only: test cards must not open real packs. */
export const stripeTestMode = () => Boolean(process.env.STRIPE_SECRET_KEY?.startsWith('sk_test_'));

/** Whether this visitor may pay by card: live key for everyone, test key for admins and trainers only. */
export const cardPaymentFor = (role: string | null | undefined) =>
  stripeConfigured() && (!stripeTestMode() || role === 'admin' || role === 'trainer');

/** Currencies without cents (Stripe "zero-decimal"): the FCFA amount is sent as is. */
const ZERO_DECIMAL = ['XAF', 'XOF'];
export const toStripeAmount = (amount: number, currency: string) =>
  ZERO_DECIMAL.includes(currency.toUpperCase()) ? Math.round(amount) : Math.round(amount * 100);

/** Nested parameters in Stripe's form encoding: line_items[0][price_data][currency]=cad. */
function encode(params: Record<string, unknown>, prefix = '', out = new URLSearchParams()) {
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) continue;
    const key = prefix ? `${prefix}[${k}]` : k;
    if (typeof v === 'object') encode(v as Record<string, unknown>, key, out);
    else out.append(key, String(v));
  }
  return out;
}

async function stripe<T>(path: string, params: Record<string, unknown>, idempotencyKey?: string): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      'content-type': 'application/x-www-form-urlencoded',
      ...(idempotencyKey ? { 'idempotency-key': idempotencyKey } : {}),
    },
    body: encode(params),
    signal: AbortSignal.timeout(20_000),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Stripe ${res.status}: ${data?.error?.message ?? 'error'}`);
  return data as T;
}

export interface CheckoutInput {
  paymentId: string;
  email: string;
  productName: string;
  amount: number;
  currency: string;
  successUrl: string;
  cancelUrl: string;
  metadata: Record<string, string>;
}

/** Opens a Stripe payment page for one pack; returns its id and address. */
export function createCheckout(c: CheckoutInput) {
  return stripe<{ id: string; url: string }>('/checkout/sessions', {
    mode: 'payment',
    customer_email: c.email,
    client_reference_id: c.paymentId,
    locale: 'fr',
    success_url: c.successUrl,
    cancel_url: c.cancelUrl,
    line_items: { 0: { quantity: 1, price_data: { currency: c.currency.toLowerCase(), unit_amount: toStripeAmount(c.amount, c.currency), product_data: { name: c.productName } } } },
    metadata: c.metadata,
    payment_intent_data: { metadata: c.metadata, description: c.productName },
  }, `checkout-${c.paymentId}`);
}

/** Creates the notification endpoint in the Stripe account; returns its signing secret. */
export function createWebhookEndpoint(url: string) {
  return stripe<{ id: string; secret: string }>('/webhook_endpoints', {
    url,
    description: 'Paul World Travel Formation : activation des packs',
    enabled_events: { 0: 'checkout.session.completed', 1: 'checkout.session.async_payment_succeeded', 2: 'checkout.session.async_payment_failed', 3: 'checkout.session.expired' },
  });
}

/** Checks the Stripe-Signature header (t=timestamp,v1=hmac) of a notification. */
export function verifyStripeSignature(body: string, header: string | null, secret = process.env.STRIPE_WEBHOOK_SECRET ?? '', toleranceSeconds = 300) {
  if (!header || !secret) return false;
  const parts = Object.fromEntries(header.split(',').map((p) => p.split('=') as [string, string]).filter(([k]) => k === 't'));
  const t = Number(parts.t);
  if (!t || Math.abs(Date.now() / 1000 - t) > toleranceSeconds) return false;
  const expected = createHmac('sha256', secret).update(`${t}.${body}`).digest();
  return header.split(',').filter((p) => p.startsWith('v1=')).some((p) => {
    const given = Buffer.from(p.slice(3), 'hex');
    return given.length === expected.length && timingSafeEqual(given, expected);
  });
}
