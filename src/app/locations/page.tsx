'use client';

import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom icon for markers
const customIcon = new L.Icon({
  iconUrl: 'https://example.com/marker-icon.png', // Replace with your custom icon URL
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://example.com/marker-shadow.png', // Replace with your custom shadow URL
  shadowSize: [41, 41]
});

export default function Locations() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header Section */}
        <section className="bg-blue-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4">{t('locations.title')}</h1>
            <p className="text-xl">{t('locations.subtitle')}</p>
          </div>
        </section>
        
        {/* Locations Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* China Office */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">{t('locations.china_office')}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative h-96">
                  <Image
                    src="/china-office.jpg"
                    alt={t('locations.china_office_alt')}
                    fill
                    className="object-cover rounded-lg shadow-xl"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">{t('home.china.foshan')}</h3>
                  <p className="text-gray-600 mb-6">
                    {t('locations.china_description')}
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-700">
                      <svg className="w-6 h-6 mr-3 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{t('locations.china_address')}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <svg className="w-6 h-6 mr-3 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>+8619068451378</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <svg className="w-6 h-6 mr-3 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-lg font-bold text-blue-700">paulworld2016@yahoo.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Cameroon Office */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900">{t('locations.cameroon_office')}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <h3 className="text-2xl font-semibold mb-4">{t('home.cameroon.douala_lendi')}</h3>
                  <p className="text-gray-600 mb-6">
                    {t('locations.cameroon_description')}
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-700">
                      <svg className="w-6 h-6 mr-3 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{t('locations.cameroon_address')}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <svg className="w-6 h-6 mr-3 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>+237694244666</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <svg className="w-6 h-6 mr-3 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-lg font-bold text-blue-700">paulworld2016@yahoo.com</span>
                    </div>
                  </div>
                </div>
                <div className="relative h-96 order-1 lg:order-2">
                  <Image
                    src="/cameroon-office.jpg"
                    alt={t('locations.cameroon_office_alt')}
                    fill
                    className="object-cover rounded-lg shadow-xl"
                  />
                </div>
              </div>
            </div>
            
            {/* Map Section */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">{t('locations.global_presence')}</h2>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600 mb-8 text-center">
                  {t('locations.global_description')}
                </p>
                <div className="relative h-96">
                  <MapContainer center={[13.0, 60.0]} zoom={3} className="h-full"> {/* Adjusted zoom and center */}
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[23.1291, 113.2644]} icon={customIcon}>
                      <Popup>{t('locations.china_office')}</Popup>
                    </Marker>
                    <Marker position={[4.0511, 9.7679]} icon={customIcon}>
                      <Popup>{t('locations.cameroon_office')}</Popup>
                    </Marker>
                  </MapContainer>
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
