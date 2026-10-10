'use client';

import Image from 'next/image';
import { FiArrowRight, FiMail, FiPhone } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button, Container, Eyebrow, PageHeader, Section } from '@/components/ui';

type Item = { title: string; desc?: string };
type Group = { title: string; items: Item[] };
type Service = {
  id: string;
  title: string;
  lead: string;
  tags?: string[];
  stats?: { value: string; label: string }[];
  image?: { src: string; alt: string };
  groups: Group[];
};

const copy = {
  fr: {
    eyebrow: 'Services',
    indexLabel: 'Sur cette page',
    contactCta: 'Demander un devis',
    routes: 'Chine · Afrique · Amérique du Nord',
    cargo: {
      lead: 'Expédition de marchandises entre la Chine, l’Afrique et l’Amérique du Nord, par mer ou par air, avec suivi et formalités pris en charge.',
      sea: ['Solutions personnalisées pour tous types de marchandises', 'Gestion complète des formalités douanières'],
      air: ['Respect des normes et réglementations nord-américaines', 'Coordination avec les services douaniers locaux'],
    },
    currency: { lead: 'Échange de devises entre Yuan, FCFA, Dollar et Euro pour vos paiements fournisseurs et vos opérations à l’international.', group: 'Nos engagements' },
    consulting: { purchasing: 'Achats en Chine', travel: 'Voyages & formation' },
    visa: {
      student: ['Orientation et choix du programme', 'Préparation à l’entretien', 'Suivi jusqu’à l’arrivée'],
      pr: ['Évaluation de l’éligibilité', 'Préparation du dossier', 'Suivi de la demande'],
      stats: [
        { value: '98%', label: 'Taux de réussite visas étudiants' },
        { value: '30+', label: 'Dossiers d’immigration réussis' },
        { value: '5+', label: 'Années d’expérience' },
        { value: '15+', label: 'Pays de destination' },
      ],
    },
    business: {
      title: 'Création d’entreprise & comptabilité',
      lead: 'Que vous souhaitiez créer une entreprise au Cameroun, en Chine ou en Amérique du Nord, nous vous accompagnons de la conception à la mise en œuvre, jusqu’à la gestion comptable et fiscale.',
      creation: 'Création de sociétés',
      creationItems: [
        { title: 'Entreprise individuelle', desc: 'Création rapide et simplifiée pour les entrepreneurs indépendants' },
        { title: 'SARL / LLC', desc: 'Sociétés à responsabilité limitée avec protection juridique' },
        { title: 'SA / Corporation', desc: 'Sociétés anonymes pour les projets d’envergure' },
        { title: 'Business plans & DSF', desc: 'Plans d’affaires et montage de dossiers' },
      ],
      accounting: 'Comptabilité & fiscalité',
      accountingItems: [
        { title: 'Suivi comptable', desc: 'Tenue régulière de la comptabilité et des livres' },
        { title: 'Conseil fiscal', desc: 'Optimisation fiscale et conseil stratégique' },
        { title: 'Déclarations fiscales', desc: 'Préparation et dépôt auprès des autorités' },
        { title: 'Optimisation structurelle', desc: 'Une structure adaptée pour maximiser vos avantages' },
      ],
    },
    it: {
      title: 'Solutions informatiques',
      lead: 'Des logiciels de gestion aux sites web performants, nous digitalisons et optimisons vos processus d’affaires.',
      sage: 'Logiciels de gestion — partenaire SAGE',
      sageItems: [
        { title: 'SAGE Comptable', desc: 'Installation, paramétrage et personnalisation' },
        { title: 'SAGE Paie', desc: 'Automatisation de la paie et gestion RH' },
        { title: 'SAGE Gestion Commerciale', desc: 'Ventes, stocks et relation client' },
        { title: 'Formation & support', desc: 'Formation des utilisateurs et assistance continue' },
      ],
      web: 'Développement web',
      webItems: [
        { title: 'Sites web en 48h', desc: 'Sites vitrines professionnels livrés rapidement' },
        { title: 'E-commerce', desc: 'Boutiques en ligne avec paiement sécurisé' },
        { title: 'Applications sur mesure', desc: 'Applications web adaptées à vos processus' },
        { title: 'Maintenance & support', desc: 'Mises à jour et support technique réactif' },
      ],
    },
    customs: {
      title: 'Douane & transit',
      lead: 'Nous simplifions vos opérations d’import-export et optimisons vos coûts, grâce à notre présence en Chine et au Cameroun et à nos partenaires en Amérique du Nord.',
      tags: ['Dédouanement express', 'Conformité réglementaire', 'Optimisation fiscale', 'Traitement prioritaire'],
      licenses: 'Licences & formalités',
      licensesItems: [
        { title: 'Licences d’import et d’export', desc: 'Obtention des autorisations auprès des organismes compétents' },
        { title: 'Formalités douanières', desc: 'Préparation des déclarations et vérification des documents' },
        { title: 'Conseil réglementaire', desc: 'Exigences, restrictions et quotas applicables' },
        { title: 'Optimisation des coûts', desc: 'Réduction des frais de douane et taxes d’importation' },
      ],
      extra: 'Services complémentaires',
      extraItems: [
        { title: 'Entreposage temporaire', desc: 'Stockage sécurisé en attente de dédouanement' },
        { title: 'Transport local', desc: 'Livraison à destination finale après dédouanement' },
        { title: 'Assurance transport', desc: 'Protection de vos marchandises à chaque étape' },
        { title: 'Suivi administratif', desc: 'Documentation et reporting réguliers' },
      ],
    },
    ctaTitle: 'Un projet entre l’Afrique, la Chine et l’Amérique du Nord ?',
    ctaIntro: 'Parlez-nous de votre besoin : nous vous répondons rapidement avec une solution adaptée.',
  },
  en: {
    eyebrow: 'Services',
    indexLabel: 'On this page',
    contactCta: 'Request a quote',
    routes: 'China · Africa · North America',
    cargo: {
      lead: 'Shipping between China, Africa and North America by sea or air, with tracking and paperwork handled for you.',
      sea: ['Tailored solutions for all types of goods', 'Full handling of customs formalities'],
      air: ['Compliance with North American standards and regulations', 'Coordination with local customs services'],
    },
    currency: { lead: 'Currency exchange between Yuan, CFA franc, Dollar and Euro for supplier payments and international operations.', group: 'Our commitments' },
    consulting: { purchasing: 'Purchasing in China', travel: 'Travel & training' },
    visa: {
      student: ['Guidance and program selection', 'Interview preparation', 'Follow-up until arrival'],
      pr: ['Eligibility assessment', 'File preparation', 'Application follow-up'],
      stats: [
        { value: '98%', label: 'Student visa success rate' },
        { value: '30+', label: 'Successful immigration files' },
        { value: '5+', label: 'Years of experience' },
        { value: '15+', label: 'Destination countries' },
      ],
    },
    business: {
      title: 'Business creation & accounting',
      lead: 'Whether you are starting a company in Cameroon, China or North America, we support you from concept to launch, through to accounting and tax management.',
      creation: 'Company formation',
      creationItems: [
        { title: 'Sole proprietorship', desc: 'Fast, simple setup for independent entrepreneurs' },
        { title: 'SARL / LLC', desc: 'Limited liability companies with legal protection' },
        { title: 'SA / Corporation', desc: 'Corporations for large-scale projects' },
        { title: 'Business plans & DSF', desc: 'Business plans and application files' },
      ],
      accounting: 'Accounting & tax',
      accountingItems: [
        { title: 'Bookkeeping', desc: 'Regular accounting and ledger management' },
        { title: 'Tax advice', desc: 'Tax optimization and strategic advice' },
        { title: 'Tax filings', desc: 'Preparation and submission to tax authorities' },
        { title: 'Structural optimization', desc: 'The right structure to maximize your benefits' },
      ],
    },
    it: {
      title: 'IT solutions',
      lead: 'From management software to fast websites, we digitize and streamline your business processes.',
      sage: 'Management software — SAGE partner',
      sageItems: [
        { title: 'SAGE Accounting', desc: 'Installation, configuration and customization' },
        { title: 'SAGE Payroll', desc: 'Payroll automation and HR management' },
        { title: 'SAGE Sales Management', desc: 'Sales, inventory and customer relations' },
        { title: 'Training & support', desc: 'User training and ongoing assistance' },
      ],
      web: 'Web development',
      webItems: [
        { title: 'Websites in 48h', desc: 'Professional showcase sites, delivered fast' },
        { title: 'E-commerce', desc: 'Online stores with secure payments' },
        { title: 'Custom applications', desc: 'Web apps built around your processes' },
        { title: 'Maintenance & support', desc: 'Updates and responsive technical support' },
      ],
    },
    customs: {
      title: 'Customs & transit',
      lead: 'We simplify your import-export operations and reduce costs, through our presence in China and Cameroon and our partners in North America.',
      tags: ['Express clearance', 'Regulatory compliance', 'Tax optimization', 'Priority handling'],
      licenses: 'Licenses & formalities',
      licensesItems: [
        { title: 'Import and export licenses', desc: 'Obtaining permits from the relevant authorities' },
        { title: 'Customs formalities', desc: 'Declaration preparation and document checks' },
        { title: 'Regulatory advice', desc: 'Applicable requirements, restrictions and quotas' },
        { title: 'Cost optimization', desc: 'Lower customs fees and import taxes' },
      ],
      extra: 'Additional services',
      extraItems: [
        { title: 'Temporary storage', desc: 'Secure storage pending customs clearance' },
        { title: 'Local transport', desc: 'Final delivery after customs clearance' },
        { title: 'Transport insurance', desc: 'Protection for your goods at every stage' },
        { title: 'Administrative follow-up', desc: 'Documentation and regular reporting' },
      ],
    },
    ctaTitle: 'A project between Africa, China and North America?',
    ctaIntro: 'Tell us what you need and we will get back to you quickly with a tailored solution.',
  },
};

export default function Services() {
  const { t, language } = useLanguage();
  const c = copy[language];
  const s = (key: string) => t(`services.${key}`);
  const pair = (key: string): Item => ({ title: s(key), desc: s(`${key}_desc`) });

  const services: Service[] = [
    {
      id: 'cargo',
      title: s('cargo_title'),
      lead: c.cargo.lead,
      tags: [c.routes],
      image: { src: '/images/cargo.svg', alt: s('cargo_title') },
      groups: [
        { title: s('sea_transport'), items: [{ title: s('sea_transport_desc') }, ...c.cargo.sea.map((title) => ({ title }))] },
        {
          title: s('air_transport'),
          items: [{ title: s('air_transport_desc') }, { title: s('door_to_door_desc') }, ...c.cargo.air.map((title) => ({ title }))],
        },
      ],
    },
    {
      id: 'currency',
      title: s('currency_title'),
      lead: c.currency.lead,
      tags: ['Yuan ¥', 'FCFA', 'Dollar $', 'Euro €'],
      groups: [
        {
          title: c.currency.group,
          items: ['competitive_rates', 'reliability', 'real_time_tracking', 'personalized_service'].map(pair),
        },
      ],
    },
    {
      id: 'consulting',
      title: s('consulting_title'),
      lead: s('consulting_desc'),
      image: { src: '/images/consulting.svg', alt: s('consulting_title') },
      groups: [
        { title: c.consulting.purchasing, items: ['personalized_service', 'competitive_rates', 'reliability'].map(pair) },
        { title: c.consulting.travel, items: ['business_travel', 'tourism', 'translation', 'training'].map((k) => ({ title: s(k === 'business_travel' ? k : `${k}_title`), desc: s(`${k}_desc`) })) },
      ],
    },
    {
      id: 'visa',
      title: s('visa_title'),
      lead: s('visa_desc'),
      stats: c.visa.stats,
      image: { src: '/images/visa.svg', alt: s('visa_title') },
      groups: [
        { title: s('student_visa'), items: [{ title: s('student_visa_desc') }, ...c.visa.student.map((title) => ({ title }))] },
        { title: s('permanent_residence'), items: [{ title: s('permanent_residence_desc') }, ...c.visa.pr.map((title) => ({ title }))] },
        { title: s('other_immigration_services'), items: ['business_visa', 'work_visa', 'family_reunification', 'refugee_status'].map(pair) },
      ],
    },
    {
      id: 'business',
      title: c.business.title,
      lead: c.business.lead,
      image: { src: '/images/business.svg', alt: c.business.title },
      groups: [
        { title: c.business.creation, items: c.business.creationItems },
        { title: c.business.accounting, items: c.business.accountingItems },
      ],
    },
    {
      id: 'it',
      title: c.it.title,
      lead: c.it.lead,
      image: { src: '/images/it.svg', alt: c.it.title },
      groups: [
        { title: c.it.sage, items: c.it.sageItems },
        { title: c.it.web, items: c.it.webItems },
      ],
    },
    {
      id: 'customs',
      title: c.customs.title,
      lead: c.customs.lead,
      tags: c.customs.tags,
      groups: [
        { title: c.customs.licenses, items: c.customs.licensesItems },
        { title: c.customs.extra, items: c.customs.extraItems },
      ],
    },
  ];

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={s('global_solutions')} intro={s('global_presence')} />

      {/* In-page index */}
      <nav aria-label={c.indexLabel} className="border-b border-line">
        <Container className="py-8">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-muted">{c.indexLabel}</p>
          <ol className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((svc, i) => (
              <li key={svc.id} className="border-t border-line">
                <a href={`#${svc.id}`} className="group flex items-baseline gap-3 py-3 text-sm text-foreground transition-colors hover:text-accent">
                  <span className="tabular-nums text-muted">{String(i + 1).padStart(2, '0')}</span>
                  <span>{svc.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </Container>
      </nav>

      {services.map((svc, i) => (
        <Section key={svc.id} id={svc.id} muted={i % 2 === 1} className="scroll-mt-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
              <Eyebrow>{String(i + 1).padStart(2, '0')}</Eyebrow>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{svc.title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">{svc.lead}</p>

              {svc.tags && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {svc.tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-line px-3 py-1 text-sm text-foreground">
                      {tag}
                    </li>
                  ))}
                </ul>
              )}

              {svc.stats && (
                <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
                  {svc.stats.map((st) => (
                    <div key={st.label} className={`p-5 ${i % 2 === 1 ? 'bg-surface' : 'bg-white'}`}>
                      <dt className="text-sm leading-snug text-muted">{st.label}</dt>
                      <dd className="mt-1 text-2xl font-semibold tracking-tight text-foreground">{st.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {svc.image && (
                <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image src={svc.image.src} alt={svc.image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                </div>
              )}

              <div className="mt-8">
                <Button href="/contact/" variant="link">
                  {c.contactCta} <FiArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              </div>
            </div>

            <div className={`space-y-12 lg:col-span-7 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
              {svc.groups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">{group.title}</h3>
                  <ul className="mt-4 divide-y divide-line border-y border-line">
                    {group.items.map((item) => (
                      <li key={item.title} className="py-4">
                        <p className="text-foreground">{item.title}</p>
                        {item.desc && <p className="mt-1 text-sm leading-relaxed text-muted">{item.desc}</p>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Section>
      ))}

      {/* Closing CTA */}
      <section className="border-t border-line bg-surface py-20 sm:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{c.ctaTitle}</h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{c.ctaIntro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/contact/">{t('common.contact_us')}</Button>
                <Button href="tel:+237694244666" variant="secondary">
                  <FiPhone className="h-4 w-4" aria-hidden /> +237 6 94 24 46 66
                </Button>
              </div>
            </div>
            <div className="lg:col-span-5">
              <a
                href="mailto:paulworld2016@yahoo.com"
                className="flex items-center gap-3 border-t border-line pt-4 text-foreground transition-colors hover:text-accent"
              >
                <FiMail className="h-4 w-4 text-muted" aria-hidden />
                paulworld2016@yahoo.com
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
