import type { Metadata } from 'next';
import { Container, PageHeader, ButtonLink } from '@/components/ui';
import { getTcfNews, doualaToday, frenchDay } from '@/lib/tcf/data';
import { TCF_SOURCES } from '@/lib/tcf/feed';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'TCF Cameroun : actualités et dates des examens', description: 'Annonces sourcées, suivi des sites officiels et dates du TCF Canada à Douala et Yaoundé.' };
export default async function News({ searchParams }: { searchParams: Promise<{ mois?: string; ville?: string; archives?: string }> }) {
  const { sources, items, unavailable } = await getTcfNews();
  const params = await searchParams; const today = doualaToday();
  const month = /^\d{4}-\d{2}$/.test(params.mois ?? '') ? params.mois! : '';
  const city = ['Douala', 'Yaoundé'].includes(params.ville ?? '') ? params.ville! : '';
  const archive = params.archives === '1';
  const sessions = items.filter((i) => i.kind === 'session' && i.status === 'published' && i.starts_on && (archive || i.starts_on >= today) && (!month || i.starts_on.startsWith(month)) && (!city || i.city === city)).sort((a, b) => a.starts_on!.localeCompare(b.starts_on!));
  const news = items.filter((i) => i.kind === 'news' && i.status === 'published').sort((a,b) => (b.published_on ?? b.verified_at).localeCompare(a.published_on ?? a.verified_at));
  return <>
    <PageHeader title="TCF au Cameroun : actualités et dates" intro="Retrouvez les annonces des sources officielles et les sessions identifiées à Douala et Yaoundé. Les horaires sont ceux du Cameroun." />
    <section className="bg-paper py-12"><Container className="space-y-12">
      {unavailable && <p role="status" className="rounded-xl bg-amber-50 p-5">Le suivi est momentanément indisponible. Consultez directement les sources ci-dessous.</p>}
      <div><h2 className="heading text-2xl text-night">Prochaines sessions</h2>
        <p className="mt-3 text-slate">Une date affichée ne garantit pas une place disponible. Confirmez la session et le lieu sur la plateforme du centre avant de payer ou de vous déplacer.</p>
        <form className="my-6 flex flex-wrap items-end gap-4">
          <label className="grid gap-2 text-sm font-semibold">Mois et année<input type="month" name="mois" defaultValue={month} className="rounded-lg border border-rule bg-white p-3" /></label>
          <label className="grid gap-2 text-sm font-semibold">Ville<select name="ville" defaultValue={city} className="rounded-lg border border-rule bg-white p-3"><option value="">Toutes les villes suivies</option><option>Douala</option><option>Yaoundé</option></select></label>
          <label className="flex items-center gap-2 py-3"><input type="checkbox" name="archives" value="1" defaultChecked={archive} /> Inclure les sessions passées</label>
          <button className="rounded-lg bg-night px-5 py-3 font-bold text-white">Filtrer</button>
        </form>
        {!sessions.length && <p className="rounded-xl border border-rule bg-white p-6">Aucune date confirmée ne correspond à cette sélection dans notre suivi. Cela ne signifie pas qu’il n’existe aucune session : certains créneaux ne sont visibles qu’après connexion sur la plateforme officielle.</p>}
        <div className="grid gap-4 sm:grid-cols-2">{sessions.map((s) => <article key={s.id} className="rounded-xl border border-rule bg-white p-6"><p className="font-semibold text-ocean">{s.city} · {frenchDay(s.starts_on!)}</p><h3 className="heading mt-2 text-xl">{s.title}</h3><p className="mt-3 text-sm text-slate">Vérifiée le {frenchDay(s.verified_at)}{Date.now() - Date.parse(s.verified_at) > 172800000 ? ' · À reconfirmer : dernière vérification il y a plus de 48 h.' : ''}</p><a className="mt-4 inline-block font-bold text-ocean underline" href={s.source_url} target="_blank" rel="noopener noreferrer">Vérifier auprès du centre</a></article>)}</div>
      </div>
      <div><h2 className="heading text-2xl text-night">Actualités et informations utiles</h2><p className="mt-3 text-slate">Les liens automatiques renvoient aux annonces d’origine ; leur date de détection ne remplace pas leur date de publication.</p>
        {!news.length && <p className="mt-5 rounded-xl bg-white p-6">Aucune nouvelle annonce récupérée pour le moment. Les sources restent accessibles ci-dessous.</p>}
        <div className="mt-5 grid gap-4 sm:grid-cols-2">{news.map((n) => <article key={n.id} className="rounded-xl border border-rule bg-white p-6"><p className="text-sm text-slate">{sources.find(s => s.id === n.source_id)?.name ?? 'Source officielle'} · {n.published_on ? `Publié le ${frenchDay(n.published_on)}` : `Repéré le ${frenchDay(n.verified_at)} · date de publication non fournie`}</p><h3 className="heading mt-3 text-xl"><a className="text-ocean hover:underline" href={n.source_url} target="_blank" rel="noopener noreferrer">{n.title} ↗</a></h3></article>)}</div>
      </div>
      <div><h2 className="heading text-2xl text-night">État du suivi des sources</h2><p className="mt-3 text-slate">Vérification quotidienne prévue à 7 h, heure du Cameroun. Une source bloquée reste signalée ; aucune date n’est déduite d’un résultat de recherche.</p>
        <ul className="mt-5 divide-y divide-rule rounded-xl border border-rule bg-white px-6">{TCF_SOURCES.map((source) => { const state = sources.find(s => s.id === source.id); return <li key={source.id} className="py-5"><a href={source.url} className="font-bold text-ocean underline" target="_blank" rel="noopener noreferrer">{source.name} ↗</a><p className="mt-2 text-sm text-slate">{state?.checked_at ? `Dernière tentative : ${frenchDay(state.checked_at)}. ` : 'Première vérification en attente. '}{state?.state === 'ok' ? 'Page consultée ; seules les informations reconnues sont reprises.' : state?.state === 'partial' ? 'Suivi partiel : certaines pages sont indisponibles.' : state?.state === 'error' ? 'Consultation automatique indisponible. Consultez le site directement.' : ''}</p></li>; })}</ul>
      </div>
      <ButtonLink href="/entrainement/#comprehension-ecrite" variant="dark">Préparer la compréhension écrite</ButtonLink>
    </Container></section>
  </>;
}
