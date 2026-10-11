"use client";

import Image from "next/image";
import Navbar from "../../components/Navbar";
import SimpleFooter from "../../components/SimpleFooter";
import { useLanguage } from "../../contexts/LanguageContext";

export default function About() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header Section */}
        <section className="bg-blue-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4">{t('about.title')}</h1>
            <p className="text-xl">{t('about.subtitle')}</p>
          </div>
        </section>
        
        {/* About Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">{t('about.history_title')}</h2>
                <p className="text-gray-600 mb-4">
                  {t('about.history_p1')}
                </p>
                <p className="text-gray-600 mb-4">
                  {t('about.history_p2')}
                </p>
                <p className="text-gray-600">
                  {t('about.history_p3')}
                </p>
              </div>
              <div className="relative h-96">
                <Image
                  src="/vvoyageaff.jpg"
                  alt="L'équipe de Paul World Travel"
                  fill
                  className="object-cover rounded-lg shadow-xl"
                />
              </div>
            </div>
            
            {/* Mission & Values */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">{t('about.mission_values_title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t('about.mission_title')}</h3>
                  <p className="text-gray-600">
                    {t('about.mission_desc')}
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t('about.values_title')}</h3>
                  <p className="text-gray-600">
                    {t('about.values_desc')}
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t('about.vision_title')}</h3>
                  <p className="text-gray-600">
                    {t('about.vision_desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <SimpleFooter />
    </div>
  );
}
