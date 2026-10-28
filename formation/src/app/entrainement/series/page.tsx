import type { Metadata } from 'next';
import { doualaToday } from '@/lib/tcf/data';
import MonthlyCatalogue from './MonthlyCatalogue';
export const dynamic='force-dynamic';
export const metadata:Metadata={title:'Combinaisons d’entraînement TCF par année et par mois'};
export default async function SeriesCatalogue({searchParams}:{searchParams:Promise<{epreuve?:string;annee?:string;mois?:string;serie?:string}>}){
 const params=await searchParams;const currentYear=Number(doualaToday().slice(0,4));
 const year=Number(params.annee);const initialYear=Number.isInteger(year)&&year>=2000&&year<=currentYear+1?year:currentYear;
 const initialModule=['ee','eo','ce','co'].includes(params.epreuve??'')?params.epreuve!:'ee';
 const parsed=/^(\d{4})-(0[1-9]|1[0-2])$/.exec(params.mois??'');
 return <MonthlyCatalogue currentYear={currentYear} initialYear={parsed?Number(parsed[1]):initialYear} initialModule={initialModule} initialMonth={parsed?Number(parsed[2]):undefined}/>;
}
