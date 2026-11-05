import 'server-only';
import { headers } from 'next/headers';
import { zoneForCountry } from '@/content/offers';

/** Price zone of the visitor, from Vercel's geolocation header. Never chosen by the browser. */
export async function visitorZone() {
  return zoneForCountry((await headers()).get('x-vercel-ip-country'));
}
