'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const SimpleFooter = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <footer className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo et info */}
          <div className="mb-6 md:mb-0 relative">
            <div className="flex items-center mb-3">
              <div className="bg-white text-blue-700 w-10 h-10 flex items-center justify-center rounded-full font-bold mr-2 shadow-lg">
                PW3T
              </div>
              <h3 className="text-xl font-bold">Paul World Travel</h3>
            </div>
            <p className="text-lg text-blue-100 font-bold">paulworld2016@yahoo.com</p>
            <p className="text-sm text-blue-100">+8619068451378</p>
            <div className="absolute -left-4 -top-4 w-24 h-24 bg-blue-500 rounded-full opacity-10 blur-xl z-0"></div>
          </div>

          {/* Liens */}
          <div className="flex flex-wrap justify-center gap-5 mb-6 md:mb-0 z-10">
            <Link href="/" className="text-blue-100 hover:text-white hover:underline transition-colors">
              {t('nav.home')}
            </Link>
            <Link href="/services" className="text-blue-100 hover:text-white hover:underline transition-colors">
              {t('nav.services')}
            </Link>
            <Link href="/calculator" className="text-blue-100 hover:text-white hover:underline transition-colors">
              {t('nav.calculator')}
            </Link>
            <Link href="/locations" className="text-blue-100 hover:text-white hover:underline transition-colors">
              {t('nav.locations')}
            </Link>
            <Link href="/contact" className="text-blue-100 hover:text-white hover:underline transition-colors">
              {t('nav.contact')}
            </Link>
          </div>

          {/* Langues */}
          <div className="flex gap-3 z-10">
            <button 
              className={`px-3 py-1.5 text-sm rounded-full transition-all duration-300 ${language === 'fr' ? 'bg-white text-blue-700 font-bold shadow-md' : 'bg-blue-800/50 hover:bg-blue-800 text-white'}`}
              onClick={toggleLanguage}
            >
              FR
            </button>
            <button 
              className={`px-3 py-1.5 text-sm rounded-full transition-all duration-300 ${language === 'en' ? 'bg-white text-blue-700 font-bold shadow-md' : 'bg-blue-800/50 hover:bg-blue-800 text-white'}`}
              onClick={toggleLanguage}
            >
              EN
            </button>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-blue-600/30 flex flex-col md:flex-row justify-between items-center text-sm text-blue-200">
          <p>&copy; {new Date().getFullYear()} Paul World Travel. {t('footer.rights')}</p>
          <div className="flex mt-4 md:mt-0 space-x-4">
            <span className="inline-flex items-center">
              <div className="w-1.5 h-1.5 bg-blue-300 rounded-full mr-2"></div>
              {t('home.china.foshan')}
            </span>
            <span className="inline-flex items-center">
              <div className="w-1.5 h-1.5 bg-blue-300 rounded-full mr-2"></div>
              {t('home.locations.douala')}
            </span>
            <span className="inline-flex items-center">
              <div className="w-1.5 h-1.5 bg-blue-300 rounded-full mr-2"></div>
              paulworld2016@yahoo.com
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;
