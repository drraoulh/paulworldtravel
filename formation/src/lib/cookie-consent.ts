export const CONSENT_COOKIE = 'pwt-cookie-consent';
export const CONSENT_VERSION = 1;
export const CONSENT_DAYS = 180;
export const CONSENT_MAX_AGE = CONSENT_DAYS * 24 * 60 * 60;
export const OPEN_PREFERENCES = 'pwt-cookie-preferences';
export interface CookieConsent { version: number; analytics: boolean; updatedAt: number }

export function parseConsent(value: string | undefined, now = Date.now()): CookieConsent | null {
  try {
    const consent = JSON.parse(decodeURIComponent(value ?? ''));
    if (consent?.version !== CONSENT_VERSION || typeof consent.analytics !== 'boolean' || !Number.isFinite(consent.updatedAt)) return null;
    if (consent.updatedAt > now || now - consent.updatedAt >= CONSENT_MAX_AGE * 1000) return null;
    return { version: consent.version, analytics: consent.analytics, updatedAt: consent.updatedAt };
  } catch { return null; }
}
export function readConsent(): CookieConsent | null {
  if (typeof document === 'undefined') return null;
  return parseConsent(document.cookie.split('; ').find((row) => row.startsWith(`${CONSENT_COOKIE}=`))?.slice(CONSENT_COOKIE.length + 1));
}
export function saveConsent(analytics: boolean): CookieConsent {
  const consent = { version: CONSENT_VERSION, analytics, updatedAt: Date.now() };
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(consent))}; Path=/; Max-Age=${CONSENT_MAX_AGE}; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
  return consent;
}
/** Keep account, auth, payment and AI screens out of optional statistics. */
export function publicAnalyticsUrl(raw: string): string | null {
  try {
    const url = new URL(raw);
    if (/^\/(admin|auth|connexion|inscription|espace|paiement|api|entrainement\/tuteur)(\/|$)/.test(url.pathname) || /\/(simulateur|tableau-de-bord)(\/|$)/.test(url.pathname) || url.pathname.startsWith('/examen-blanc')) return null;
    url.search = ''; url.hash = '';
    return url.toString();
  } catch { return null; }
}
