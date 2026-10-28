import { Container } from '@/components/ui';
import AdminNav from '@/components/admin/AdminNav';
import { requireStaff } from '@/lib/staff';
import { getTcfNews, frenchDay } from '@/lib/tcf/data';
import { TCF_SOURCES } from '@/lib/tcf/feed';
import { saveAnnouncement, setAnnouncementStatus } from './actions';
export const dynamic = 'force-dynamic';
export default async function AdminNews() {
  const { isAdmin } = await requireStaff('/admin/actualites/');
  const { items, unavailable } = await getTcfNews(true);
  const field = 'mt-2 w-full rounded-lg border border-rule bg-white p-3';
  return <Container className="space-y-8 py-12"><AdminNav current="/admin/actualites/" /><h1 className="heading text-3xl">Actualités et dates du TCF</h1>
    <p>La veille publie les titres officiels et les événements structurés identifiables. Pour une affiche, un PDF ou une date accessible après connexion, vérifiez directement auprès du centre puis ajoutez la session ici.</p>
    {unavailable && <p role="alert">Le stockage des actualités est indisponible.</p>}
    {isAdmin && <form action={saveAnnouncement} className="grid gap-5 rounded-xl border border-rule bg-paper p-6 sm:grid-cols-2">
      <label>Titre<input required name="title" minLength={12} maxLength={220} className={field} /></label>
      <label>Type<select name="kind" className={field}><option value="news">Actualité</option><option value="session">Session d’examen</option></select></label>
      <label>Source<select name="source_id" className={field}>{TCF_SOURCES.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></label>
      <label>Lien officiel vérifié<input required type="url" name="source_url" className={field} /></label>
      <label>Ville (session)<select name="city" className={field}><option value="">Choisir</option><option>Douala</option><option>Yaoundé</option></select></label>
      <label>Date de l’examen<input type="date" name="starts_on" className={field} /></label>
      <label>Date de publication (si connue)<input type="date" name="published_on" className={field} /></label>
      <p className="self-center text-sm">En publiant, vous confirmez avoir vérifié le contenu et la date sur la source indiquée.</p>
      <button className="rounded-lg bg-night px-5 py-3 font-bold text-white">Publier l’annonce vérifiée</button>
    </form>}
    <ul className="space-y-4">{items.map(item => <li key={item.id} className="rounded-xl border border-rule p-5"><p className="text-sm">{item.kind === 'session' ? `${item.city} · ${frenchDay(item.starts_on!)}` : 'Actualité'} · {item.status}</p><a href={item.source_url} target="_blank" rel="noopener noreferrer" className="mt-2 block font-bold text-ocean underline">{item.title}</a>{isAdmin && <form action={setAnnouncementStatus} className="mt-4"><input type="hidden" name="id" value={item.id} /><input type="hidden" name="status" value={item.status === 'published' ? 'withdrawn' : 'published'} /><button className="rounded-lg border border-rule px-4 py-2">{item.status === 'published' ? 'Retirer du site' : 'Publier'}</button></form>}</li>)}</ul>
  </Container>;
}
