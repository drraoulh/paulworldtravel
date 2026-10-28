import type { Metadata } from 'next';
import { Container, PageHeader } from '@/components/ui';
import OralMonthlySeries from './OralMonthlySeries';
export const dynamic='force-dynamic';
export const metadata:Metadata={title:'Expression orale : combinaisons mensuelles et simulation de 12 minutes'};
export default async function OralSeriesPage({searchParams}:{searchParams:Promise<{mois?:string;serie?:string}>}) {
 const params=await searchParams;
 const currentMonth=new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Douala',year:'numeric',month:'2-digit'}).format(new Date());
 const month=/^\d{4}-(0[1-9]|1[0-2])$/.test(params.mois??'')?params.mois!:currentMonth;
 const variant=/^[1-3]$/.test(params.serie??'')?Number(params.serie):1;
 return <><PageHeader title="Expression orale : vos séries mensuelles" intro="Trois tâches pour échanger, obtenir des informations et défendre un point de vue. Explorez les scénarios puis entraînez-vous avec un partenaire pendant 12 minutes."/><section className="bg-paper py-12 sm:py-16"><Container><OralMonthlySeries initialMonth={month} initialVariant={variant}/></Container></section></>;
}
