/*
 * Security headers on every page. The content policy only allows this site,
 * Supabase (accounts and data) and Vercel (statistics, preview toolbar); Next.js
 * needs inline scripts. The microphone is allowed for the oral practice only on
 * this site; camera, location and payment APIs are off (Stripe opens on its own page).
 */
const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://*.supabase.co';
const dev = process.env.NODE_ENV !== 'production';
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ''} https://va.vercel-scripts.com https://vercel.live`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://vercel.live https://vercel.com",
  "font-src 'self' data: https://vercel.live",
  "media-src 'self' blob: data:",
  `connect-src 'self' ${supabase} ${supabase.replace('https://', 'wss://')} https://va.vercel-scripts.com https://vercel.live wss://ws-us3.pusher.com`,
  'frame-src https://vercel.live',
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(self), geolocation=(), payment=(), usb=(), interest-cohort=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
];

/** @type {import('next').NextConfig} */
module.exports = {
  trailingSlash: true,
  poweredByHeader: false,
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      // Private pages and APIs are never kept in a shared cache.
      { source: '/(espace|admin|api)/:path*', headers: [{ key: 'Cache-Control', value: 'private, no-store' }, { key: 'X-Robots-Tag', value: 'noindex' }] },
    ];
  },
  eslint: { ignoreDuringBuilds: true },
  // Old addresses, kept working after the site was reorganised by épreuve.
  async redirects() {
    return [
      { source: '/cours', destination: '/parcours/', permanent: true },
      { source: '/formules', destination: '/packs/', permanent: true },
      { source: '/entrainement', destination: '/#epreuves', permanent: false },
      { source: '/entrainement/expression-ecrite', destination: '/epreuve/expression-ecrite/simulateur/', permanent: true },
      { source: '/entrainement/expression-orale', destination: '/epreuve/expression-orale/simulateur/', permanent: true },
      { source: '/entrainement/comprehension-orale', destination: '/epreuve/comprehension-orale/series/', permanent: true },
      { source: '/parcours/:module/:lecon', destination: '/epreuve/:module/methodologie/:lecon/', permanent: true },
      { source: '/parcours/:module', destination: '/epreuve/:module/methodologie/', permanent: true },
    ];
  },
};
