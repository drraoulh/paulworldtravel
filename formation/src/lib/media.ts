/**
 * Pictures and recordings of the licensed series (TCF Canada Ltd licence, October 2026).
 * They are still served from the seller's storage; once copied to our own bucket,
 * set NEXT_PUBLIC_MEDIA_BASE to its public address (the paths stay the same).
 */
export const MEDIA_BASE = (process.env.NEXT_PUBLIC_MEDIA_BASE || 'https://qrcmv2rhibwpawwn.public.blob.vercel-storage.com').replace(/\/+$/, '');

/** Local files ("/images/...") are returned as they are. */
export const mediaUrl = (path: string) => (path.startsWith('/') || /^https?:/.test(path) ? path : `${MEDIA_BASE}/${path}`);
