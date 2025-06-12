'use client';

import { useState, useRef, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Services() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('all');
  const serviceRefs = {
    cargo: useRef<HTMLDivElement>(null),
    currency: useRef<HTMLDivElement>(null),
    consulting: useRef<HTMLDivElement>(null),
    visa: useRef<HTMLDivElement>(null),
    business: useRef<HTMLDivElement>(null),
    it: useRef<HTMLDivElement>(null),
    customs: useRef<HTMLDivElement>(null)
  };
  
  useEffect(() => {
    // Gérer les liens d'ancrage au chargement de la page
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && serviceRefs[hash as keyof typeof serviceRefs]?.current) {
        setTimeout(() => {
          serviceRefs[hash as keyof typeof serviceRefs].current?.scrollIntoView({ behavior: 'smooth' });
          setActiveTab(hash);
        }, 100);
      }
    };
    
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    const element = serviceRefs[tabId as keyof typeof serviceRefs].current;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header Section - Hero avec design amélioré */}
        <section className="relative bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400 opacity-20 rounded-full"></div>
            <div className="absolute top-40 right-20 w-20 h-20 bg-blue-300 opacity-20 rounded-full"></div>
            <div className="absolute bottom-0 left-10 w-60 h-60 bg-blue-400 opacity-10 rounded-full"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('services.title')}</h1>
                <p className="text-xl md:text-2xl font-light mb-8">{t('services.global_solutions')}</p>
                <div className="w-20 h-1 bg-yellow-400 mb-6"></div>
                <p className="text-blue-100 mb-8 max-w-lg">
                  {t('services.global_presence')}
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link href="#cargo" 
                    className="bg-white text-blue-700 hover:bg-blue-50 px-5 py-2 rounded-full shadow-md transition-all duration-300 font-medium text-sm">
                    {t('services.cargo_title')}
                  </Link>
                  <Link href="#consulting" 
                    className="bg-transparent border border-white text-white hover:bg-white hover:text-blue-700 px-5 py-2 rounded-full transition-all duration-300 font-medium text-sm">
                    {t('services.consulting_title')}
                  </Link>
                </div>
              </div>
              
              <div className="md:w-1/2 flex justify-center">
                <div className="relative w-full max-w-md h-80 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/cargobateauavions.jpg"
                    alt="Paul World Travel Services"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-60"></div>
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <p className="text-lg font-bold">{t('services.global_solutions')}</p>
                    <p className="text-sm">Cameroun · Chine · Amérique du Nord</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Navigation par onglets */}
        <div className="sticky top-0 bg-white shadow-md z-30 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto hide-scrollbar py-3 space-x-8">
              <button
                onClick={() => handleTabClick('cargo')}
                className={`whitespace-nowrap px-1 py-2 border-b-2 font-medium text-sm transition-colors duration-200 ${activeTab === 'cargo' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                {t('services.cargo_title')}
              </button>
              <button
                onClick={() => handleTabClick('currency')}
                className={`whitespace-nowrap px-1 py-2 border-b-2 font-medium text-sm transition-colors duration-200 ${activeTab === 'currency' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                {t('services.currency_title')}
              </button>
              <button
                onClick={() => handleTabClick('consulting')}
                className={`whitespace-nowrap px-1 py-2 border-b-2 font-medium text-sm transition-colors duration-200 ${activeTab === 'consulting' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                {t('services.consulting_title')}
              </button>
              <button
                onClick={() => handleTabClick('visa')}
                className={`whitespace-nowrap px-1 py-2 border-b-2 font-medium text-sm transition-colors duration-200 ${activeTab === 'visa' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                {t('services.visa_title')}
              </button>
              <button
                onClick={() => handleTabClick('business')}
                className={`whitespace-nowrap px-1 py-2 border-b-2 font-medium text-sm transition-colors duration-200 ${activeTab === 'business' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                {t('services.business_title')}
              </button>
              <button
                onClick={() => handleTabClick('it')}
                className={`whitespace-nowrap px-1 py-2 border-b-2 font-medium text-sm transition-colors duration-200 ${activeTab === 'it' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                {t('services.it_title')}
              </button>
              <button
                onClick={() => handleTabClick('customs')}
                className={`whitespace-nowrap px-1 py-2 border-b-2 font-medium text-sm transition-colors duration-200 ${activeTab === 'customs' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                {t('services.customs_title')}
              </button>
            </div>
          </div>
        </div>
        
        {/* Services Content */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Cargo Services - Redesign avec visuels */}
            <div className="mb-20" id="cargo" ref={serviceRefs.cargo}>
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1M9 16h6M15 10h6" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">{t('services.cargo_title')}</h2>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                <div className="lg:flex">
                  <div className="lg:w-1/3 relative">
                    <div className="h-60 lg:h-full relative">
                      <Image
                        src="/cargobateauavions.jpg"
                        alt="Cargo maritime"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/60 to-transparent opacity-60"></div>
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <h3 className="text-xl font-bold">{t('services.sea_transport')}</h3>
                      <p>Chine · Afrique · Amérique du Nord</p>
                    </div>
                  </div>
                  
                  <div className="lg:w-2/3 p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500 transition-all duration-300 hover:shadow-md">
                        <h3 className="text-xl font-semibold mb-4 text-blue-800">{t('services.sea_transport')}</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-600">{t('services.sea_transport_desc')}</span>
                          </li>

                          <li className="flex items-start">
                            <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-600">Solutions personnalisées pour tous types de marchandises</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-600">Gestion complète des formalités douanières</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500 transition-all duration-300 hover:shadow-md">
                        <h3 className="text-xl font-semibold mb-4 text-blue-800">{t('services.air_transport')}</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-600">{t('services.air_transport_desc')}</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-600">{t('services.door_to_door_desc')}</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-600">Respect des normes et réglementations nord-américaines</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-600">Coordination avec les services douaniers locaux</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex justify-center">
                      <a 
                        href="/contact?subject=Demande de renseignements douane"
                        className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 shadow-sm hover:shadow"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Demander des informations
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Financial Services - Design amélioré */}
            <div className="mb-20" id="currency" ref={serviceRefs.currency}>
              <div className="flex items-center mb-6">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">{t('services.currency_title')}</h2>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-gradient-to-br from-green-500 to-green-700 text-white p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-4">{t('services.currency_title')}</h3>
                    <p className="mb-6 text-green-100">{t('services.currency_desc')}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      <div className="bg-white/20 rounded-full px-3 py-1 text-sm backdrop-blur-sm">Yuan ¥</div>
                      <div className="bg-white/20 rounded-full px-3 py-1 text-sm backdrop-blur-sm">FCFA</div>
                      <div className="bg-white/20 rounded-full px-3 py-1 text-sm backdrop-blur-sm">Dollar $</div>
                      <div className="bg-white/20 rounded-full px-3 py-1 text-sm backdrop-blur-sm">Euro €</div>
                    </div>
                    
                    <a 
                      href="/contact?subject=Demande de renseignements sur le change" 
                      className="mt-auto inline-flex items-center bg-white text-green-700 hover:bg-green-50 font-medium py-2 px-4 rounded-lg transition-all duration-300 self-start"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Nous contacter
                    </a>
                  </div>
                  
                  <div className="md:w-2/3 p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white border border-green-100 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                        <div className="flex items-center mb-4">
                          <div className="bg-green-100 p-2 rounded-full mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          <h4 className="text-lg font-semibold text-gray-900">{t('services.competitive_rates')}</h4>
                        </div>
                        <p className="text-gray-600 ml-11">{t('services.competitive_rates_desc')}</p>
                      </div>
                      
                      <div className="bg-white border border-green-100 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                        <div className="flex items-center mb-4">
                          <div className="bg-green-100 p-2 rounded-full mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                          <h4 className="text-lg font-semibold text-gray-900">{t('services.reliability')}</h4>
                        </div>
                        <p className="text-gray-600 ml-11">{t('services.reliability_desc')}</p>
                      </div>
                      
                      <div className="bg-white border border-green-100 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                        <div className="flex items-center mb-4">
                          <div className="bg-green-100 p-2 rounded-full mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <h4 className="text-lg font-semibold text-gray-900">{t('services.real_time_tracking')}</h4>
                        </div>
                        <p className="text-gray-600 ml-11">{t('services.real_time_tracking_desc')}</p>
                      </div>
                      
                      <div className="bg-white border border-green-100 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                        <div className="flex items-center mb-4">
                          <div className="bg-green-100 p-2 rounded-full mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </div>
                          <h4 className="text-lg font-semibold text-gray-900">{t('services.personalized_service')}</h4>
                        </div>
                        <p className="text-gray-600 ml-11">{t('services.personalized_service_desc')}</p>
                      </div>
                    </div>
                    

                  </div>
                </div>
              </div>
            </div>
            
            {/* Consulting Services - Design amélioré */}
            <div className="mb-20" id="consulting" ref={serviceRefs.consulting}>
              <div className="flex items-center mb-6">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">{t('services.consulting_title')}</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Achats en Chine */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-48">
                    <Image
                      src="/marcherchine.jpg"
                      alt="Marché en Chine"
                      fill
                      className="object-cover group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900 to-purple-900/20 opacity-80"></div>
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <h3 className="text-xl font-bold">{t('services.consulting_title')}</h3>
                      <p className="text-purple-100">{t('services.consulting_desc')}</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-700 mb-6">
                      {t('services.consulting_desc')}
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-purple-100 p-2 rounded-full mr-3 flex-shrink-0 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{t('services.personalized_service')}</h4>
                          <p className="text-sm text-gray-600">{t('services.personalized_service_desc')}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-purple-100 p-2 rounded-full mr-3 flex-shrink-0 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{t('services.competitive_rates')}</h4>
                          <p className="text-sm text-gray-600">{t('services.competitive_rates_desc')}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-purple-100 p-2 rounded-full mr-3 flex-shrink-0 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{t('services.reliability')}</h4>
                          <p className="text-sm text-gray-600">{t('services.reliability_desc')}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-purple-100 p-2 rounded-full mr-3 flex-shrink-0 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{t('services.real_time_tracking')}</h4>
                          <p className="text-sm text-gray-600">{t('services.real_time_tracking_desc')}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Link href="/contact" className="inline-flex items-center text-purple-700 hover:text-purple-900 font-medium transition-colors duration-200">
                        {t('services.request_quote')}
                        <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Voyage et Tourisme */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-48">
                    <Image
                      src="/travel-tourism.jpg"
                      alt="Voyage d'affaires en Chine"
                      fill
                      className="object-cover group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900 to-purple-900/20 opacity-80"></div>
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <h3 className="text-xl font-bold">{t('services.tourism_title')}</h3>
                      <p className="text-purple-100">{t('services.tourism_desc')}</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-700 mb-6">
                      {t('services.tourism_desc')}
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-purple-100 p-2 rounded-full mr-3 flex-shrink-0 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{t('services.business_travel')}</h4>
                          <p className="text-sm text-gray-600">{t('services.business_travel_desc')}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-purple-100 p-2 rounded-full mr-3 flex-shrink-0 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{t('services.tourism_title')}</h4>
                          <p className="text-sm text-gray-600">{t('services.tourism_desc')}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-purple-100 p-2 rounded-full mr-3 flex-shrink-0 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{t('services.translation_title')}</h4>
                          <p className="text-sm text-gray-600">{t('services.translation_desc')}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-purple-100 p-2 rounded-full mr-3 flex-shrink-0 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{t('services.training_title')}</h4>
                          <p className="text-sm text-gray-600">{t('services.training_desc')}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Link href="/contact" className="inline-flex items-center text-purple-700 hover:text-purple-900 font-medium transition-colors duration-200">
                        {t('services.plan_trip')}
                        <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Call to action box */}
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-2/3 p-8 text-white">
                    <h3 className="text-2xl font-bold mb-4">{t('services.need_custom_service')}</h3>
                    <p className="mb-6 text-purple-100">{t('services.custom_service_desc')}</p>
                    <div className="flex gap-4">
                      <Link 
                        href="/contact" 
                        className="bg-white text-purple-700 hover:bg-purple-50 px-5 py-2 rounded-lg shadow-md transition-all duration-300 font-medium inline-flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {t('common.contact_us')}
                      </Link>
                    </div>
                  </div>
                  <div className="md:w-1/3 relative">
                    <div className="h-60 md:h-full relative">
                      <Image
                        src="/vvoyageaff.jpg"
                        alt="Notre équipe de consultants"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-transparent opacity-70 md:opacity-0"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Visa Services - Design amélioré */}
            <div className="mb-20" id="visa" ref={serviceRefs.visa}>
              <div className="flex items-center mb-6">
                <div className="bg-red-100 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">{t('services.visa_title')}</h2>
              </div>
              
              <div className="bg-gradient-to-br from-red-50 to-white p-8 rounded-xl shadow-lg mb-8">
                <div className="text-center mb-10">
                  <h3 className="text-2xl font-bold text-red-800 mb-3">{t('services.visa_subtitle')}</h3>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    {t('services.visa_desc')}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                  <div className="col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Visa Étudiant */}
                    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-red-500">
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="bg-red-100 p-2 rounded-full mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path d="M12 14l9-5-9-5-9 5 9 5z" />
                              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">{t('services.student_visa')}</h3>
                        </div>
                        
                        <p className="text-gray-600 mb-6">
                          {t('services.student_visa_desc')}
                        </p>
                        
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">{t('services.student_visa_support')}</span>
                          </div>
                          <div className="flex items-start">
                            <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">{t('services.student_visa_counseling')}</span>
                          </div>
                          <div className="flex items-start">
                            <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">{t('services.student_visa_interview')}</span>
                          </div>
                          <div className="flex items-start">
                            <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">{t('services.student_visa_follow_up')}</span>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <Link href="/contact" className="text-red-600 hover:text-red-800 font-medium inline-flex items-center transition-colors duration-200">
                            {t('services.free_consultation')}
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                    
                    {/* Résidence Permanente */}
                    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-red-500">
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="bg-red-100 p-2 rounded-full mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">{t('services.permanent_residence')}</h3>
                        </div>
                        
                        <p className="text-gray-600 mb-6">
                          {t('services.permanent_residence_desc')}
                        </p>
                        
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">{t('services.permanent_residence_support')}</span>
                          </div>
                          <div className="flex items-start">
                            <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">{t('services.permanent_residence_eligibility')}</span>
                          </div>
                          <div className="flex items-start">
                            <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">{t('services.permanent_residence_preparation')}</span>
                          </div>
                          <div className="flex items-start">
                            <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">{t('services.permanent_residence_follow_up')}</span>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <Link href="/contact" className="text-red-600 hover:text-red-800 font-medium inline-flex items-center transition-colors duration-200">
                            {t('services.free_consultation')}
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bloc informatif avec image */}
                  <div className="col-span-1">
                    <div className="bg-white rounded-xl overflow-hidden shadow-md h-full relative group">
                      <div className="h-40 relative">
                        <Image 
                          src="/serviceimmigration.jpg" 
                          alt={t('services.immigration_services_alt')} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-red-900 to-transparent opacity-60"></div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">{t('services.other_immigration_services')}</h3>
                        
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="bg-red-100 p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-800">{t('services.business_visa')}</h4>
                              <p className="text-sm text-gray-600">{t('services.business_visa_desc')}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="bg-red-100 p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-800">{t('services.work_visa')}</h4>
                              <p className="text-sm text-gray-600">{t('services.work_visa_desc')}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="bg-red-100 p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-800">{t('services.family_reunification')}</h4>
                              <p className="text-sm text-gray-600">{t('services.family_reunification_desc')}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="bg-red-100 p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-800">{t('services.refugee_status')}</h4>
                              <p className="text-sm text-gray-600">{t('services.refugee_status_desc')}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <Link href="/contact" className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            {t('services.free_consultation')}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Bannière de statistiques */}
                <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-xl p-8 text-white">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                    <div>
                      <div className="text-4xl font-bold mb-2">98%</div>
                      <p className="text-red-100">Taux de réussite pour les visas étudiants</p>
                    </div>
                    <div>
                      <div className="text-4xl font-bold mb-2">30+</div>
                      <p className="text-red-100">Dossiers d'immigration traités avec succès</p>
                    </div>
                    <div>
                      <div className="text-4xl font-bold mb-2">5+</div>
                      <p className="text-red-100">Années d'expérience en immigration</p>
                    </div>
                    <div>
                      <div className="text-4xl font-bold mb-2">15+</div>
                      <p className="text-red-100">Pays de destination</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Business Services - Design amélioré */}
            <div className="mb-20" id="business" ref={serviceRefs.business}>
              <div className="flex items-center mb-6">
                <div className="bg-amber-100 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Création d'Entreprise & Services Comptables</h2>
              </div>
              
              <div className="relative bg-amber-50 rounded-xl p-8 overflow-hidden mb-8">
                {/* Eléments décoratifs */}
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-amber-200 opacity-20 rounded-full"></div>
                <div className="absolute -left-16 bottom-0 w-48 h-48 bg-amber-200 opacity-20 rounded-full"></div>
                
                <div className="relative z-10">
                  <div className="md:flex items-center justify-between mb-10">
                    <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                      <h3 className="text-2xl font-bold text-amber-800 mb-4">Lancez votre entreprise avec confiance</h3>
                      <p className="text-gray-600">
                        Que vous souhaitiez créer une entreprise au Cameroun, en Chine ou en Amérique du Nord, notre équipe d'experts vous accompagne à chaque étape, de la conception à la mise en œuvre, en passant par la gestion comptable et fiscale.
                      </p>
                      <div className="mt-6">
                        <Link href="/contact" className="inline-flex items-center bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg shadow-md transition-colors duration-300 font-medium">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Prendre rendez-vous
                        </Link>
                      </div>
                    </div>
                    
                    <div className="md:w-1/2 flex justify-center">
                      <div className="relative w-full max-w-md h-60 rounded-xl overflow-hidden shadow-lg">
                        <Image 
                          src="/business-creation.jpg" 
                          alt="Création d'entreprise" 
                          fill 
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-amber-900 to-transparent opacity-50"></div>
                        <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                          <div className="flex items-center space-x-3">
                            <div className="flex -space-x-2">
                              <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center text-amber-700 font-bold text-xs border-2 border-white">CM</div>
                              <div className="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center text-red-700 font-bold text-xs border-2 border-white">CN</div>
                              <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-bold text-xs border-2 border-white">US</div>
                            </div>
                            <span className="text-sm">Services disponibles dans plusieurs pays</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Création de Sociétés */}
                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-amber-500 hover:shadow-lg transition-shadow duration-300">
                      <div className="flex items-center mb-5">
                        <div className="bg-amber-100 p-2 rounded-full mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Création de Sociétés</h3>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="bg-amber-100 p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Entreprise Individuelle</h4>
                            <p className="text-sm text-gray-600">Création rapide et simplifiée pour les entrepreneurs indépendants</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-amber-100 p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">SARL / LLC</h4>
                            <p className="text-sm text-gray-600">Création de sociétés à responsabilité limitée avec protections juridiques</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-amber-100 p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">SA / Corporation</h4>
                            <p className="text-sm text-gray-600">Création de sociétés anonymes pour projets d'envergure</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-amber-100 p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Business Plans & DSF</h4>
                            <p className="text-sm text-gray-600">Développement de plans d'affaires et montage de dossiers</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 text-right">
                        <Link href="/calculator#business-creation" className="text-amber-600 hover:text-amber-800 font-medium inline-flex items-center transition-colors duration-200">
                          Détails et tarifs
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                    
                    {/* Services Comptables et Fiscaux */}
                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-amber-500 hover:shadow-lg transition-shadow duration-300">
                      <div className="flex items-center mb-5">
                        <div className="bg-amber-100 p-2 rounded-full mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Services Comptables et Fiscaux</h3>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="bg-amber-100 p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Suivi Comptable</h4>
                            <p className="text-sm text-gray-600">Tenue de comptabilité régulière et gestion des livres comptables</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-amber-100 p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Conseil Fiscal</h4>
                            <p className="text-sm text-gray-600">Optimisation fiscale et conseil stratégique pour votre entreprise</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-amber-100 p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Déclarations Fiscales</h4>
                            <p className="text-sm text-gray-600">Préparation et soumission des déclarations aux autorités fiscales</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-amber-100 p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Optimisation Structurelle</h4>
                            <p className="text-sm text-gray-600">Amélioration de la structure fiscale pour maximiser les avantages</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 text-right">
                        <Link href="/calculator#accounting-services" className="text-amber-600 hover:text-amber-800 font-medium inline-flex items-center transition-colors duration-200">
                          Détails et tarifs
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* IT Services - Design amélioré */}
            <div className="mb-20" id="it" ref={serviceRefs.it}>
              <div className="flex items-center mb-6">
                <div className="bg-indigo-100 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Solutions Informatiques</h2>
              </div>
              
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl overflow-hidden shadow-xl mb-8">
                <div className="md:flex">
                  <div className="md:w-1/2 p-8 text-white relative z-10">
                    <h3 className="text-2xl font-bold mb-4">Transformez votre entreprise grâce au digital</h3>
                    <p className="mb-6 text-indigo-100">
                      Paul World Travel propose des solutions informatiques complètes pour digitaliser et optimiser vos processus d'affaires. De l'implémentation de logiciels de gestion à la création de sites web performants, nous vous accompagnons dans votre transformation numérique.
                    </p>
                    
                    <div className="mt-6">
                      <Link href="/contact" className="inline-flex items-center bg-white text-indigo-700 hover:bg-indigo-50 px-6 py-2 rounded-lg shadow-md transition-all duration-300 font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Demander un devis gratuit
                      </Link>
                    </div>
                  </div>
                  
                  <div className="md:w-1/2 relative">
                    <div className="h-64 md:h-full relative">
                      <Image 
                        src="/it-solutions.jpg" 
                        alt="Solutions informatiques" 
                        fill 
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-l from-transparent to-indigo-900/70 md:bg-none"></div>
                    </div>
                    
                    {/* Éléments décoratifs */}
                    <div className="hidden md:block absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-400 opacity-20 rounded-full"></div>
                    <div className="hidden md:block absolute top-10 right-10 w-20 h-20 bg-purple-400 opacity-20 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Logiciels de Gestion */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="md:flex h-full">
                    <div className="md:w-2/5 bg-gradient-to-br from-indigo-600 to-indigo-800 p-6 text-white relative">
                      <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 0L100 0L100 100L0 100L0 0Z" fill="white"/>
                          <path d="M10 10L90 10L90 90L10 90L10 10Z" stroke="white" strokeWidth="1"/>
                          <path d="M20 20L80 20L80 80L20 80L20 20Z" stroke="white" strokeWidth="1"/>
                          <path d="M30 30L70 30L70 70L30 70L30 30Z" stroke="white" strokeWidth="1"/>
                          <path d="M40 40L60 40L60 60L40 60L40 40Z" stroke="white" strokeWidth="1"/>
                        </svg>
                      </div>
                      
                      <div className="relative z-10">
                        <div className="bg-white/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-3">Logiciels de Gestion</h3>
                        <p className="text-indigo-100 mb-6">Solutions d'automatisation pour la comptabilité, la paie et la gestion commerciale de votre entreprise</p>
                        
                        <div className="mt-auto">
                          <span className="text-xs uppercase tracking-wider bg-indigo-700/50 py-1 px-2 rounded">SAGE Partenaire Certifié</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-3/5 p-6">
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="bg-indigo-100 p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">SAGE Comptable</h4>
                            <p className="text-sm text-gray-600">Installation, paramétrage et personnalisation selon vos besoins comptables</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-indigo-100 p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">SAGE Paie</h4>
                            <p className="text-sm text-gray-600">Automatisation des processus de paie et gestion des ressources humaines</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-indigo-100 p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">SAGE Gestion Commerciale</h4>
                            <p className="text-sm text-gray-600">Gestion efficace des ventes, stocks et relation client</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-indigo-100 p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path d="M12 14l9-5-9-5-9 5 9 5z" />
                              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Formation et Support</h4>
                            <p className="text-sm text-gray-600">Formation complète des utilisateurs et assistance technique continue</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <Link href="/calculator#it-sage" className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center transition-colors duration-200">
                          Explorer les options
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Développement Web */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="md:flex h-full">
                    <div className="md:w-2/5 bg-gradient-to-br from-purple-600 to-indigo-800 p-6 text-white relative">
                      <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 10L40 10L40 40L10 40L10 10Z" stroke="white" strokeWidth="1"/>
                          <path d="M60 10L90 10L90 40L60 40L60 10Z" stroke="white" strokeWidth="1"/>
                          <path d="M10 60L40 60L40 90L10 90L10 60Z" stroke="white" strokeWidth="1"/>
                          <path d="M60 60L90 60L90 90L60 90L60 60Z" stroke="white" strokeWidth="1"/>
                        </svg>
                      </div>
                      
                      <div className="relative z-10">
                        <div className="bg-white/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-3">Développement Web</h3>
                        <p className="text-indigo-100 mb-6">Création de sites web et applications performants pour booster votre présence en ligne</p>
                        
                        <div className="mt-auto">
                          <span className="text-xs uppercase tracking-wider bg-purple-700/50 py-1 px-2 rounded">Livraison Rapide</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-3/5 p-6">
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="bg-purple-100 p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Sites Web en 48h</h4>
                            <p className="text-sm text-gray-600">Création de sites vitrines professionnels avec un délai de livraison ultra-rapide</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-purple-100 p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">E-commerce</h4>
                            <p className="text-sm text-gray-600">Développement de boutiques en ligne personnalisées avec systèmes de paiement sécurisés</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-purple-100 p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Applications Sur Mesure</h4>
                            <p className="text-sm text-gray-600">Conception d'applications web adaptées à vos processus d'affaires spécifiques</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-purple-100 p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Maintenance et Support</h4>
                            <p className="text-sm text-gray-600">Services de maintenance continue, mises à jour et support technique réactif</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <Link href="/calculator#it-web" className="text-purple-600 hover:text-purple-800 font-medium inline-flex items-center transition-colors duration-200">
                          Explorer les options
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Customs Services - Design amélioré */}
            <div className="mb-20" id="customs" ref={serviceRefs.customs}>
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Douane et Transit</h2>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-8 shadow-lg mb-8 relative overflow-hidden">
                {/* Éléments décoratifs */}
                <div className="absolute right-0 top-0 h-full w-1/3 overflow-hidden pointer-events-none hidden lg:block">
                  <div className="absolute right-0 top-0 w-full h-full">
                    <Image 
                      src="/customs-bg.jpg" 
                      alt="Services douaniers" 
                      fill 
                      className="object-cover opacity-20"
                    />
                  </div>
                </div>
                
                <div className="relative z-10 lg:w-2/3">
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-600 text-white p-3 rounded-xl mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-blue-800">Simplifiez vos procédures douanières</h3>
                      <p className="text-blue-600">Solutions complètes pour l'import-export international</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-8 max-w-3xl">
                    Notre équipe d'experts en douane et transit vous accompagne dans toutes vos opérations d'import-export, en simplifiant les procédures administratives et en optimisant les coûts. Grâce à notre présence en Chine, au Cameroun et nos partenariats en Amérique du Nord, nous vous offrons un service international complet.
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mb-8">
                    <div className="flex items-center bg-white py-2 px-4 rounded-full shadow-sm">
                      <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                      <span className="text-sm font-medium">Dédouanement express</span>
                    </div>
                    <div className="flex items-center bg-white py-2 px-4 rounded-full shadow-sm">
                      <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                      <span className="text-sm font-medium">Conformité réglementaire</span>
                    </div>
                    <div className="flex items-center bg-white py-2 px-4 rounded-full shadow-sm">
                      <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                      <span className="text-sm font-medium">Optimisation fiscale</span>
                    </div>
                    <div className="flex items-center bg-white py-2 px-4 rounded-full shadow-sm">
                      <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                      <span className="text-sm font-medium">Traitement prioritaire</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <a 
                      href="/contact?subject=Demande de renseignements sur le change"
                      className="mt-auto inline-flex items-center bg-white text-green-700 hover:bg-green-50 font-medium py-2 px-4 rounded-lg transition-all duration-300 self-start"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Nous contacter
                    </a>
                    <Link 
                      href="/contact" 
                      className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg transition-all duration-300 font-medium inline-flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      Nous contacter
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Licences et Formalités */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100 hover:shadow-xl transition-all duration-300 group">
                  <div className="p-6">
                    <div className="flex items-center mb-6">
                      <div className="bg-blue-100 p-3 rounded-xl mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Licences et Formalités</h3>
                    </div>
                    
                    <div className="space-y-5">
                      <div className="flex items-start">
                        <div className="bg-blue-100 text-blue-600 p-1 rounded-md mr-3 flex-shrink-0 mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Licences d'importation et d'exportation</h4>
                          <p className="text-gray-600 text-sm">Assistance pour l'obtention des autorisations nécessaires auprès des organismes compétents</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-blue-100 text-blue-600 p-1 rounded-md mr-3 flex-shrink-0 mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Gestion des formalités douanières</h4>
                          <p className="text-gray-600 text-sm">Préparation et soumission des déclarations en douane, vérification des documents</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-blue-100 text-blue-600 p-1 rounded-md mr-3 flex-shrink-0 mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Conseil en réglementation douanière</h4>
                          <p className="text-gray-600 text-sm">Informations sur les exigences réglementaires, les restrictions et les quotas</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-blue-100 text-blue-600 p-1 rounded-md mr-3 flex-shrink-0 mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Optimisation des coûts de transit</h4>
                          <p className="text-gray-600 text-sm">Stratégies pour réduire les frais de douane et taxes d'importation</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 border-t border-gray-100 pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          Service rapide et fiable
                        </div>
                        <Link href="/calculator#customs-licenses" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                          Détails
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Services Complémentaires */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100 hover:shadow-xl transition-all duration-300 group">
                  <div className="p-6">
                    <div className="flex items-center mb-6">
                      <div className="bg-blue-100 p-3 rounded-xl mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Services Complémentaires</h3>
                    </div>
                    
                    <div className="space-y-5">
                      <div className="flex items-start">
                        <div className="bg-blue-100 text-blue-600 p-1 rounded-md mr-3 flex-shrink-0 mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Entreposage temporaire</h4>
                          <p className="text-gray-600 text-sm">Solutions de stockage sécurisé pour vos marchandises en attente de dédouanement</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-blue-100 text-blue-600 p-1 rounded-md mr-3 flex-shrink-0 mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Transport local après dédouanement</h4>
                          <p className="text-gray-600 text-sm">Livraison de vos marchandises à leur destination finale après passage en douane</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-blue-100 text-blue-600 p-1 rounded-md mr-3 flex-shrink-0 mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Assurance transport internationale</h4>
                          <p className="text-gray-600 text-sm">Protection complète de vos marchandises durant toutes les étapes du transport</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-blue-100 text-blue-600 p-1 rounded-md mr-3 flex-shrink-0 mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Suivi administratif des opérations</h4>
                          <p className="text-gray-600 text-sm">Gestion de la documentation et reporting régulier sur l'état de vos expéditions</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 border-t border-gray-100 pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          Service de bout en bout
                        </div>
                        <Link href="/calculator#customs-additional" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                          Détails
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
