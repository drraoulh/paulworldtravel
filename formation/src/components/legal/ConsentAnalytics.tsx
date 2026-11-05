'use client';
import { Analytics } from '@vercel/analytics/next';
import { publicAnalyticsUrl } from '@/lib/cookie-consent';

export default function ConsentAnalytics({ allowed, pathname }: { allowed: () => boolean; pathname: string }) {
  if (!publicAnalyticsUrl(`https://formation.paulworldtravel.com${pathname}`)) return null;
  return <Analytics beforeSend={(event) => {
    if (!allowed()) return null;
    const url = publicAnalyticsUrl(event.url);
    return url ? { ...event, url } : null;
  }} />;
}
