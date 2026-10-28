import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, PageHeader } from '@/components/ui';
import { doualaToday } from '@/lib/tcf/data';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'TCF Canada : combinaisons mensuelles CO, CE, EO et EE' };
const modules = [
  { code:'CO', name:'Compréhension orale', href:'/entrainement/comprehension-orale/', duration:'35 minutes', format:'39 questions à choix multiple', description:'Écoutez les documents et choisissez une réponse parmi quatre. Consultez les transcriptions et les explications après la remise.' },
  { code:'CE', name:'Compréhension écrite', href:'/entrainement/comprehension-ecrite/', duration:'60 minutes', format:'39 questions à choix multiple', description:'Lisez des documents de difficulté progressive et entraînez-vous au repérage, à la reformulation et à l’interprétation.' },
  { code:'EO', name:'Expression orale', href:'/entrainement/expression-orale/series/', duration:'12 minutes', format:'3 tâches, dont 2 minutes de préparation en tâche 2', description:'Présentez-vous, menez une interaction, puis exprimez un point de vue. Suivez les étapes et la grille d’autoévaluation.' },
  { code:'EE', name:'Expression écrite', href:'/entrainement/expression-ecrite/series/', duration:'60 minutes', format:'3 tâches de rédaction', description:'Rédigez un message, un récit ou compte rendu, puis une synthèse de points de vue accompagnée de votre avis.' },
] as const;
export default async function SeriesCatalogue({ searchParams }: { searchParams: Promise<{ mois?: string; serie?: string }> }) {
  const params=await searchParams;
  const month=/^\d{4}-(0[1-9]|1[0-2])$/.test(params.mois ?? '') ? params.mois! : doualaToday().slice(0,7);
  const variant=['1','2','3'].includes(params.serie ?? '') ? params.serie! : '1';
  const label=new Date(month+'-01T12:00:00Z').toLocaleDateString('fr-FR',{month:'long',year:'numeric',timeZone:'Africa/Douala'});
  const query=new URLSearchParams({mois:month,serie:variant}).toString();
  return <><PageHeader title="Vos combinaisons TCF, mois par mois" intro="Choisissez une période et une combinaison, puis travaillez les quatre épreuves. Chaque rubrique propose ses documents, ses consignes et son bilan d’entraînement." />
    <section className="bg-paper py-12"><Container>
      <form className="flex flex-wrap items-end gap-4 rounded-2xl border border-rule bg-white p-6">
        <label className="grid gap-2 text-sm font-semibold">Mois et année<input required type="month" name="mois" defaultValue={month} className="rounded-lg border border-rule p-3" /></label>
        <label className="grid gap-2 text-sm font-semibold">Combinaison<select name="serie" defaultValue={variant} className="rounded-lg border border-rule p-3"><option value="1">Série 1</option><option value="2">Série 2</option><option value="3">Série 3</option></select></label>
        <button className="rounded-lg bg-night px-6 py-3 font-bold text-white">Afficher les quatre épreuves</button>
      </form>
      <h2 className="heading mt-10 text-2xl text-night">{label} · Combinaison {variant}</h2>
      <p className="mt-3 max-w-3xl text-slate">Le mois et l’année servent à organiser votre programme. Les sujets sont originaux, conçus à partir des formats et ressources consultés en ligne ; ils ne constituent pas des annales de cette période. Les différentes combinaisons peuvent partager des documents de la banque.</p>
      <div className="mt-7 grid gap-5 md:grid-cols-2">{modules.map(module=><article key={module.code} className="flex flex-col rounded-2xl border border-rule bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3"><span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-ocean">{module.code}</span><span className="font-semibold text-slate">{module.duration}</span></div>
        <h3 className="heading mt-5 text-2xl text-night">{module.name}</h3><p className="mt-2 text-sm font-semibold text-ocean">{module.format}</p><p className="mt-4 flex-1 text-slate">{module.description}</p>
        <Link href={`${module.href}?${query}`} className="mt-6 inline-flex self-start rounded-xl bg-night px-5 py-3 font-bold text-white hover:bg-ocean">Ouvrir la série {module.code}</Link>
      </article>)}</div>
      <aside className="mt-10 rounded-xl border border-rule bg-white p-6"><h2 className="heading text-xl">Un entraînement, sans note officielle</h2><p className="mt-3 text-slate">Les QCM affichent un nombre de réponses justes ; les tâches d’expression proposent des critères de révision. Ces bilans ne remplacent pas l’évaluation du centre et ne délivrent pas de score TCF ou de niveau NCLC certifié.</p><a className="mt-4 inline-block font-bold text-ocean underline" href="https://www.france-education-international.fr/test/tcf-canada" target="_blank" rel="noopener noreferrer">Consulter le format officiel de France Éducation international</a></aside>
      <Link href="/actualites/" className="mt-8 inline-block font-bold text-ocean underline">Consulter les actualités et dates du TCF au Cameroun</Link>
    </Container></section></>;
}
