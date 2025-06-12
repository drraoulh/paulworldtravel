'use client';

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

// Composant pour les services avec animation avancée au survol
const ServiceCard = ({ icon, title, description, link }: { icon: string, title: string, description: string, link: string }) => {
  const { t } = useLanguage();
  return (
    <div className="group relative overflow-hidden bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-transparent hover:border-blue-200">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      <div className="relative p-5 h-full flex flex-col">
        <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors duration-300">{title}</h3>
        <p className="text-gray-600 mb-4 flex-grow text-sm sm:text-base">{description}</p>
        <Link 
          href={link} 
          className="mt-auto inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300 group-hover:font-semibold"
        >
          <span>{t('home.services.learn_more')}</span>
          <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

const ServiceCarousel = ({ services }: { services: Array<{icon: string, name: string, description: string, link: string}> }) => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Gestion du défilement automatique amélioré
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        changeSlide(activeIndex + 1);
      }, 3000); // 3 secondes par carte pour une expérience plus confortable
      
      return () => clearInterval(interval);
    }
  }, [services.length, isPaused, activeIndex]);
  
  // Fonction pour changer de slide avec animation fluide
  const changeSlide = (newIndex: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveIndex(newIndex % services.length);
    
    // Réinitialisation de l'indicateur de transition après l'animation
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500); // Correspond à la durée de transition CSS
  };
  
  // Gestion du swipe sur mobile améliorée
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true); // Pause pendant le toucher
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    const swipeThreshold = 70; // Rend le swipe plus confortable
    
    if (touchStart - touchEnd > swipeThreshold) {
      // Swipe gauche - carte suivante
      changeSlide(activeIndex + 1);
    } else if (touchStart - touchEnd < -swipeThreshold) {
      // Swipe droit - carte précédente
      changeSlide(activeIndex - 1 + services.length);
    }
    
    // Réactive le défilement automatique après un court délai
    setTimeout(() => setIsPaused(false), 4000);
  };
  
  // Animation fluide avec transition
  const getCardStyle = () => {
    return {
      transform: `translateX(-${activeIndex * 100}%)`,
      transition: 'transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)' // Animation plus fluide
    };
  };
  
  return (
    <div 
      className="relative w-full overflow-hidden rounded-xl shadow-lg border border-blue-100" 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setTimeout(() => setIsPaused(false), 1000)} // Délai court avant de reprendre
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Fond décoré avec motif subtil */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-white/80 opacity-80"></div>
      
      {/* Carrousel avec transition plus fluide */}
      <div 
        className="flex transition-all duration-500 ease-out h-full relative z-10"
        style={getCardStyle()}
      >
        {services.map((service, index) => (
          <div 
            key={index} 
            className={`w-full flex-shrink-0 px-2 sm:px-3 py-2 transition-all duration-500 ${index === activeIndex ? 'scale-100' : 'scale-95'}`}
          >
            <ServiceCard
              icon={service.icon}
              title={service.name}
              description={service.description}
              link={service.link}
            />
          </div>
        ))}
      </div>
      
      {/* Indicateurs améliorés avec animation */}
      <div className="absolute -bottom-1 left-0 right-0 flex justify-center space-x-2 pb-3 pt-2 bg-gradient-to-t from-gray-50/90 to-transparent z-20">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              changeSlide(index);
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 4000);
            }}
            className={`h-2 rounded-full transition-all duration-300 shadow-sm transform hover:scale-110 ${index === activeIndex ? 'bg-blue-600 w-8' : 'bg-gray-300 hover:bg-blue-400 w-3'}`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Boutons de navigation améliorés avec effets */}
      <button 
        onClick={() => {
          changeSlide(activeIndex - 1 + services.length);
          setIsPaused(true);
          setTimeout(() => setIsPaused(false), 4000);
        }}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white w-9 h-9 rounded-full flex items-center justify-center shadow-lg z-20 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Précédent"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
      <button 
        onClick={() => {
          changeSlide(activeIndex + 1);
          setIsPaused(true);
          setTimeout(() => setIsPaused(false), 4000);
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white w-9 h-9 rounded-full flex items-center justify-center shadow-lg z-20 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Suivant"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Badge d'auto-défilement - Amélioré et internationalisé */}
      <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs px-2 py-1 rounded-full shadow-md z-20 transition-all duration-300 transform hover:scale-105">
        {isPaused ? (
          <span className="flex items-center">
            <svg className="w-3 h-3 mr-1 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t('home.carousel.paused')}
          </span>
        ) : (
          <span className="flex items-center">
            <svg className="w-3 h-3 mr-1 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1.998 1.998 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t('home.carousel.auto')}
          </span>
        )}
      </div>
    </div>
  );
};

export default function Home() {
  const { t } = useLanguage();
  
  const services = [
    {
      icon: "🚢",
      name: t('home.services.cargo.title'),
      description: t('home.services.cargo.description'),
      link: "/services#cargo"
    },
    {
      icon: "💱",
      name: t('home.services.currency.title'),
      description: t('home.services.currency.description'),
      link: "/services#currency"
    },
    {
      icon: "🛍️",
      name: t('home.services.purchasing.title'),
      description: t('home.services.purchasing.description'),
      link: "/services#purchasing"
    },
    {
      icon: "🏢",
      name: t('home.services.business.title'),
      description: t('home.services.business.description'),
      link: "/services#business"
    },
    {
      icon: "🛂",
      name: t('home.services.visa.title'),
      description: t('home.services.visa.description'),
      link: "/services#visa"
    },
    {
      icon: "💼",
      name: t('home.services.it.title'),
      description: t('home.services.it.description'),
      link: "/services#it"
    }
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section - Version améliorée et optimisée pour mobile */}
        <section className="bg-white text-gray-800 py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-4 md:gap-6">
              <div className="w-full lg:w-3/5">
                <div className="mb-6 text-center lg:text-left">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4">Paul World Travel</h1>
                  <p className="text-lg sm:text-xl md:text-2xl font-light italic">
                    {t('home.slogan')}
                  </p>
                </div>
                
                <div className="p-4 md:p-6 bg-gray-100 rounded-xl border-l-4 border-green-500 mb-6 md:mb-10 shadow-lg">
                  <p className="font-semibold text-lg md:text-xl mb-2 text-gray-800">{t('home.cameroon.title')}</p>
                  <p className="text-gray-700 text-base md:text-lg">{t('home.cameroon.description')}</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full justify-center lg:justify-start">
                  <Link 
                    href="/services" 
                    className="bg-white text-gray-800 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg transform hover:-translate-y-1 flex items-center justify-center"
                  >
                    <span>{t('home.cta_button')}</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                  
                  <Link 
                    href="/contact" 
                    className="bg-transparent border-2 border-blue-500 text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:bg-blue-50 transition-all duration-300 flex items-center justify-center"
                  >
                    <span>{t('home.contact_button')}</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              <div className="w-full sm:w-4/5 md:w-3/4 lg:w-2/5 mt-6 lg:mt-0 mx-auto">
                <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white/20">
                  <Image
                    src="/cameroun1.jpg"
                    alt="Bureau au Cameroun"
                    width={600}
                    height={450}
                    quality={90}
                    priority
                    className="w-full h-auto"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white bg-gradient-to-t from-blue-900/80 to-transparent pt-10 md:pt-12">
                    <div className="inline-block px-2 py-1 md:px-3 md:py-1 bg-green-600/90 rounded-full text-xs md:text-sm font-semibold mb-1 md:mb-2">
                      {t('home.locations.douala')}
                    </div>
                    <p className="text-base md:text-lg font-bold">{t('home.cameroon.office_title')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Cameroon Office Section - Optimisée pour mobile */}
        <section className="py-8 sm:py-10 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center">
              <div className="w-full max-w-3xl">
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border-t-4 border-green-600 text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">{t('home.cameroon.office_title')}</h2>
                  <h3 className="text-lg sm:text-xl font-semibold text-green-600 mb-4 sm:mb-6">{t('home.cameroon.douala_lendi')}</h3>
                  
                  <p className="text-gray-700 text-base sm:text-lg mb-4 sm:mb-5">
                    {t('home.cameroon.office_description')}
                  </p>
                  
                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-5 max-w-md mx-auto">
                    <div className="flex items-center justify-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-gray-700 text-sm sm:text-base">{t('locations.douala_address')}</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <p className="text-gray-700 text-sm sm:text-base">+237 6 96 96 46 76</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <p className="text-gray-700 text-sm sm:text-base">paulworld2016@yahoo.com</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                    <Link href="/locations" className="bg-green-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-green-700 transition-all duration-300 shadow-md flex items-center justify-center">
                      {t('home.cameroon.learn_more')}
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                    <Link href="/contact" className="bg-white border border-green-600 text-green-600 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-green-50 transition-all duration-300 shadow-sm">
                      {t('home.cameroon.contact_team')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* China Services Section - Optimisée pour mobile */}
        <section className="py-8 sm:py-10 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">{t('home.china.services_title')}</h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                {t('home.china.services_subtitle')}
              </p>
            </div>
            
            <div className="space-y-4 sm:space-y-5 mt-4 sm:mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border-t-4 border-blue-600">
                <div className="flex items-center mb-1 sm:mb-2">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-2 sm:mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-800">{t('home.china.services.sourcing')}</h4>
                </div>
                <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-3">{t('home.china.services.sourcing_desc')}</p>
              </div>
              
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border-t-4 border-blue-600">
                <div className="flex items-center mb-1 sm:mb-2">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-2 sm:mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-800">{t('home.china.services.currency')}</h4>
                </div>
                <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-3">{t('home.china.services.currency_desc')}</p>
              </div>
              
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border-t-4 border-blue-600">
                <div className="flex items-center mb-1 sm:mb-2">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-2 sm:mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-800">{t('home.china.services.quality')}</h4>
                </div>
                <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-3">{t('home.china.services.quality_desc')}</p>
              </div>
              
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border-t-4 border-blue-600">
                <div className="flex items-center mb-1 sm:mb-2">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-2 sm:mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-800">{t('home.china.services.admin')}</h4>
                </div>
                <p className="text-sm sm:text-base text-gray-600 mb-1 sm:mb-2">{t('home.china.services.admin_desc')}</p>
              </div>
            </div>
            
            <div className="text-center mt-2 sm:mt-3">
              <Link 
                href="/services#china" 
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg text-sm sm:text-base transition-all duration-300 shadow-lg"
              >
                {t('home.china.discover_all')}
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-1.5 sm:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
        
        {/* CTA Section - Version améliorée et optimisée pour mobile */}
        <section className="py-4 sm:py-5 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
              <div className="w-full text-center md:text-left mb-4 md:mb-0">
                <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">{t('home.cta.title')}</h2>
                <p className="text-xs sm:text-sm text-white/90">{t('home.cta.subtitle')}</p>
              </div>
              
              <div className="w-full md:w-auto flex justify-center md:justify-end">
                <Link 
                  href="/contact" 
                  className="bg-white text-blue-700 px-4 py-2.5 rounded-md font-medium sm:font-bold hover:bg-blue-50 transition-all duration-300 shadow-md inline-flex items-center justify-center transform hover:-translate-y-1 group w-full sm:w-auto text-center text-sm sm:text-base"
                >
                  <span className="mr-1">{t('nav.contact_us')}</span>
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
