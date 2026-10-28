import { load } from 'cheerio';

export const TCF_SOURCES = [
  { id: 'ifc', name: 'Institut français du Cameroun', url: 'https://www.ifcameroun.com/', kind: 'centre' },
  { id: 'tls', name: 'TLScontact — inscriptions IFC', url: 'https://ifc-polelangue.tlscontact.com/', kind: 'inscription' },
  { id: 'fei', name: 'France Éducation international', url: 'https://www.france-education-international.fr/test/tcf-canada', kind: 'reference' },
] as const;
export type Publication = {
  id: string; source_id: string; source_url: string; title: string;
  kind: 'news' | 'session'; city: string | null; starts_on: string | null;
  published_on: string | null; verified_at: string; status: 'published' | 'draft';
};
export function officialUrl(raw: string, base: string) {
  try {
    const url = new URL(raw, base);
    const host = new URL(base).hostname;
    if (url.protocol !== 'https:' || url.hostname !== host || url.username || url.password || (url.port && url.port !== '443')) return null;
    url.hash = '';
    return url.href;
  } catch { return null; }
}
export function validDay(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const day = value.slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) return null;
  const parsed = new Date(day + 'T00:00:00Z');
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === day ? day : null;
}
const clean = (value: string) => value.replace(/\s+/g, ' ').trim().slice(0, 220);
const related = (value: string) => /\bTCF\b/i.test(value);
export function parseOfficialPage(html: string, source: typeof TCF_SOURCES[number], checkedAt: string, pageUrl: string = source.url): Publication[] {
  if (/ERR-BOT-403|cf-mitigated|Just a moment|Vérifiez que vous êtes humain|Access denied|Service Unavailable/i.test(html)) throw new Error('Accès automatisé indisponible');
  const $ = load(html, { xmlMode: /<\?xml|<rss\b|<feed\b/i.test(html.slice(0, 500)) });
  const found = new Map<string, Publication>();
  const add = (title: string, rawUrl: string, kind: 'news' | 'session', day: string | null = null, city: string | null = null, published: string | null = null) => {
    const url = officialUrl(rawUrl, source.url);
    title = clean(title);
    if (!url || !related(title) || title.length < 12) return;
    const id = `${source.id}:${url}:${day ?? 'news'}`;
    found.set(id, { id, source_id: source.id, source_url: url, title, kind, starts_on: day, city, published_on: published, verified_at: checkedAt, status: 'published' });
  };
  // Publish only links and titles from official feeds/articles, never invented summaries.
  $('item, entry').each((_, el) => {
    const item = $(el);
    const title = item.find('title').first().text();
    const link = item.find('link').first();
    add(title, link.attr('href') || link.text(), 'news', null, null, validDay(item.find('pubDate, published, updated').first().text()));
  });
  $('article').each((_, el) => {
    const article = $(el); const link = article.find('h1 a, h2 a, h3 a').first();
    if (link.length) add(link.text(), link.attr('href') ?? '', 'news', null, null, validDay(article.find('time').attr('datetime')));
  });
  // Dates require an explicit structured Event, TCF Canada, a Cameroon location and exact day.
  const walk = (value: unknown) => {
    if (Array.isArray(value)) { value.forEach(walk); return; }
    if (!value || typeof value !== 'object') return;
    const obj = value as Record<string, unknown>;
    const types = Array.isArray(obj['@type']) ? obj['@type'] : [obj['@type']];
    if (types.includes('Event')) {
      const name = typeof obj.name === 'string' ? obj.name : '';
      const loc = obj.location as { name?: string; address?: { addressLocality?: string; addressCountry?: string | { name?: string } } } | undefined;
      const country = loc?.address?.addressCountry;
      const countryText = typeof country === 'string' ? country : country?.name ?? '';
      const cityText = `${loc?.address?.addressLocality ?? ''} ${loc?.name ?? ''}`;
      const city = /douala/i.test(cityText) ? 'Douala' : /yaound[eé]/i.test(cityText) ? 'Yaoundé' : null;
      const day = validDay(obj.startDate);
      const cancelled = typeof obj.eventStatus === 'string' && !obj.eventStatus.endsWith('EventScheduled');
      if (/\bTCF\b.*\bCanada\b/i.test(name) && day && city && /^(CM|Cameroun|Cameroon)$/i.test(countryText) && !cancelled) {
        add(name, typeof obj.url === 'string' ? obj.url : pageUrl, 'session', day, city);
      }
    }
    Object.values(obj).forEach(walk);
  };
  $('script[type="application/ld+json"]').each((_, el) => { try { walk(JSON.parse($(el).text())); } catch { /* malformed metadata is not a confirmed session */ } });
  return [...found.values()].slice(0, 30);
}
export function discoverPages(html: string, source: typeof TCF_SOURCES[number]) {
  const $ = load(html); const urls = new Set<string>();
  $('a[href], link[rel="alternate"]').each((_, el) => {
    const raw = $(el).attr('href') ?? '';
    const url = officialUrl(raw, source.url);
    if (url && url !== source.url && /tcf|certification|actualit|\/feed|rss/i.test(raw + ' ' + $(el).text()) && !/\.(pdf|png|jpg|zip)(\?|$)/i.test(url)) urls.add(url);
  });
  return [...urls].slice(0, 3);
}
export async function fetchOfficial(url: string, base: string, fetcher: typeof fetch = fetch): Promise<string> {
  let current = officialUrl(url, base);
  if (!current) throw new Error('Source non autorisée');
  for (let redirects = 0; redirects < 3; redirects++) {
    const response = await fetcher(current, { redirect: 'manual', signal: AbortSignal.timeout(10000), headers: { 'User-Agent': 'PaulWorldTravel-TCFWatch/1.0 (official public announcements only)' } });
    if (response.status >= 300 && response.status < 400) {
      current = officialUrl(response.headers.get('location') ?? '', base);
      if (!current) throw new Error('Redirection hors de la source officielle');
      continue;
    }
    if (!response.ok) throw new Error(`Source indisponible (HTTP ${response.status})`);
    if (!/text\/html|xml|application\/xhtml/i.test(response.headers.get('content-type') ?? '')) throw new Error('Format de source non pris en charge');
    // Bound response size even if the upstream omits Content-Length.
    const reader = response.body?.getReader(); if (!reader) throw new Error('Réponse vide');
    const decoder = new TextDecoder(); let body = ''; let bytes = 0;
    try {
      while (true) { const part = await reader.read(); if (part.done) break; bytes += part.value.length; if (bytes > 1500000) throw new Error('Source trop volumineuse'); body += decoder.decode(part.value, { stream: true }); }
      body += decoder.decode();
    } finally { await reader.cancel(); }
    return body;
  }
  throw new Error('Trop de redirections');
}
