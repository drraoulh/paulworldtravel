/**
 * Pictures and recordings of the licensed series (TCF Canada Ltd licence, October 2026).
 * They live in our own Supabase storage (public bucket "tcf": audio/*.mp3 at 64 kbit/s,
 * images/*.webp); nothing is loaded from the seller's site any more.
 * NEXT_PUBLIC_MEDIA_BASE moves them elsewhere (same paths).
 */
export const MEDIA_BASE = (process.env.NEXT_PUBLIC_MEDIA_BASE || 'https://losobefiezietwpurwok.supabase.co/storage/v1/object/public/tcf').replace(/\/+$/, '');

/** Local files ("/images/...") are returned as they are. */
export const mediaUrl = (path: string) => (path.startsWith('/') || /^https?:/.test(path) ? path : `${MEDIA_BASE}/${path}`);
