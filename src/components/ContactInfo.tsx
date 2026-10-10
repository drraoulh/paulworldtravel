'use client';

import { FiClock, FiMail, FiMapPin, FiMessageCircle, FiPhone } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';

const EMAIL = 'paulworld2016@yahoo.com';

const copy = {
  fr: {
    email: 'Email',
    phone: 'Téléphone',
    whatsapp: 'WhatsApp',
    whatsappCta: 'Écrire sur WhatsApp',
    offices: 'Bureaux',
    cameroon: 'Cameroun',
    china: 'Chine',
  },
  en: {
    email: 'Email',
    phone: 'Phone',
    whatsapp: 'WhatsApp',
    whatsappCta: 'Message us on WhatsApp',
    offices: 'Offices',
    cameroon: 'Cameroon',
    china: 'China',
  },
};

function Row({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 border-t border-line py-6 first:border-t-0 first:pt-0">
      <span className="mt-0.5 text-accent" aria-hidden="true">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">{label}</p>
        <div className="mt-2 space-y-1 text-foreground">{children}</div>
      </div>
    </div>
  );
}

/** Contact details column: email, phones, WhatsApp, offices and hours. */
export default function ContactInfo() {
  const { t, language } = useLanguage();
  const c = copy[language];
  const linkClass = 'hover:text-accent transition-colors';

  return (
    <div>
      <h2 className="mb-8 text-2xl font-semibold tracking-tight text-foreground">{t('contact.our_coordinates')}</h2>

      <Row icon={<FiMail className="h-4 w-4" />} label={c.email}>
        <a href={`mailto:${EMAIL}`} className={`${linkClass} break-all`}>
          {EMAIL}
        </a>
      </Row>

      <Row icon={<FiPhone className="h-4 w-4" />} label={c.phone}>
        <p>
          <a href="tel:+237694244666" className={linkClass}>
            +237 6 94 24 46 66
          </a>{' '}
          <span className="text-muted">({c.cameroon})</span>
        </p>
        <p>
          <a href="tel:+8619068451378" className={linkClass}>
            +86 190 6845 1378
          </a>{' '}
          <span className="text-muted">({c.china})</span>
        </p>
      </Row>

      <Row icon={<FiMessageCircle className="h-4 w-4" />} label={c.whatsapp}>
        <p>
          <a href="https://wa.me/237694244666" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover underline-offset-4 hover:underline">
            {c.whatsappCta} &rarr;
          </a>
        </p>
        <p className="text-sm text-muted">
          <a href="https://wa.me/8619068451378" target="_blank" rel="noopener noreferrer" className={linkClass}>
            +86 190 6845 1378 ({c.china})
          </a>
        </p>
      </Row>

      <Row icon={<FiMapPin className="h-4 w-4" />} label={c.offices}>
        <div>
          <p className="font-medium">{t('contact.cameroon_office')}</p>
          <p className="text-muted">{t('contact.cameroon_address')}</p>
        </div>
        <div className="pt-3">
          <p className="font-medium">{t('contact.china_office')}</p>
          <p className="text-muted">{t('contact.china_address')}</p>
        </div>
      </Row>

      <Row icon={<FiClock className="h-4 w-4" />} label={t('contact.business_hours')}>
        <p className="text-muted">{t('contact.monday_friday')}</p>
        <p className="text-muted">{t('contact.saturday')}</p>
        <p className="text-muted">{t('contact.sunday')}</p>
      </Row>
    </div>
  );
}
