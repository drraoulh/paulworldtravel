'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaLanguage, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const { t, language, setLanguage } = useLanguage();
  const currentYear = new Date().getFullYear();

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <footer className="bg-gradient-to-br from-blue-900 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <div className="bg-white w-14 h-14 flex items-center justify-center rounded-full shadow-lg">
                <Image src="/brand/symbole-nav.png" alt="PW3T" width={160} height={131} className="h-10 w-auto" />
              </div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 ml-3">
                Paul World Travel
              </h3>
            </div>
            <p className="text-blue-100 mb-6">
              {t('footer.slogan')}
            </p>
            <div className="flex space-x-6 text-blue-200 hover:text-white transition-colors">
              <a href="#" className="hover:text-white transition-colors">
                <FaFacebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              {t('footer.services')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-blue-200 hover:text-white transition-colors flex items-center">
                  <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link href="/locations" className="text-blue-200 hover:text-white transition-colors flex items-center">
                  <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                  {t('nav.locations')}
                </Link>
              </li>
            </ul>

            <h4 className="text-lg font-semibold text-white mt-6 mb-4">
              {t('footer.our_services')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-blue-200 hover:text-white transition-colors flex items-center">
                  <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                  {t('services.cargo_shipping')}
                </Link>
              </li>
              <li>
                <Link href="/services/#canada" className="text-blue-200 hover:text-white transition-colors flex items-center">
                  <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
                  {language === 'fr' ? 'Fret Cameroun → Canada' : 'Freight Cameroon → Canada'}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-blue-200 hover:text-white transition-colors flex items-center">
                  <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                  {t('services.air_freight')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-blue-200 hover:text-white transition-colors flex items-center">
                  <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                  {t('services.ocean_freight')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-blue-200 hover:text-white transition-colors flex items-center">
                  <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                  {t('services.customs_clearance')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-blue-200 hover:text-white transition-colors flex items-center">
                  <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                  {t('services.logistics_solutions')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              {t('contact.contact_us')}
            </h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <FaEnvelope className="text-blue-300 w-6 h-6 mr-3 flex-shrink-0" />
                <a href="mailto:paulworld2016@yahoo.com" className="text-blue-200 hover:text-white transition-colors">
                  paulworld2016@yahoo.com
                </a>
              </div>

              <div className="flex items-start">
                <FaPhoneAlt className="text-blue-300 w-6 h-6 mr-3 flex-shrink-0" />
                <a href="tel:+237694244666" className="text-blue-200 hover:text-white transition-colors">
                  +237 6 94 24 46 66
                </a>
              </div>

              <div className="flex items-start">
                <FaMapMarkerAlt className="text-blue-300 w-6 h-6 mr-3 flex-shrink-0" />
                <span className="text-blue-200">
                  Yaoundé, Cameroun
                </span>
              </div>

              <div className="mt-6">
                <button 
                  onClick={toggleLanguage}
                  className="w-full bg-blue-800/50 hover:bg-blue-800/70 text-blue-200 hover:text-white transition-colors flex items-center justify-center rounded-md py-2"
                >
                  <FaLanguage className="w-5 h-5 mr-2" />
                  <span>{language === 'fr' ? '🇫🇷' : '🇬🇧'}</span>
                  <span className="ml-2">{language === 'fr' ? 'English' : 'Français'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-blue-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <p className="text-blue-300 text-sm">
                © {currentYear} Paul World Travel. {t('footer.all_rights_reserved')}
              </p>
              <p className="text-blue-400 text-xs mt-1">
                Photos : Unsplash · Port autonome de Douala : Mboupda Talla Roger,{' '}
                <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">CC BY-SA 3.0</a>
              </p>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/privacy" className="text-blue-300 hover:text-white transition-colors">
                {t('footer.privacy_policy')}
              </Link>
              <Link href="/terms" className="text-blue-300 hover:text-white transition-colors">
                {t('footer.terms_of_service')}
              </Link>
              <Link href="/cookies" className="text-blue-300 hover:text-white transition-colors">
                {t('footer.cookies')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
