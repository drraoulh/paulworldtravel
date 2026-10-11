'use client';

import { useState, useEffect, ReactElement } from 'react';
import Link from 'next/link';
import { getServices } from '../services/api';

// Interface pour le type Service
interface Service {
  _id?: string;
  name: string;
  description: string;
  category: string;
  icon?: string;
  featured?: boolean;
}

// Icônes pour chaque catégorie de service
const categoryIcons: Record<string, ReactElement> = {
  cargo: (
    <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  currency: (
    <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  consulting: (
    <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  visa: (
    <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  business: (
    <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  it: (
    <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  customs: (
    <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  )
};

// Noms des catégories en français
const categoryNames: Record<string, string> = {
  cargo: 'Cargo',
  currency: 'Change de Devises',
  consulting: 'Conseils',
  visa: 'Visas',
  business: 'Création d\'Entreprise',
  it: 'Solutions Informatiques',
  customs: 'Douane et Transit'
};

const ServicesList = ({ featured = false, limit = 8 }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const data = await getServices();
        
        // Filtrer les services si featured est true
        let filteredServices = featured 
          ? data.filter((service) => service.featured) 
          : data;
        
        // Limiter le nombre de services si nécessaire
        if (limit > 0 && filteredServices.length > limit) {
          filteredServices = filteredServices.slice(0, limit);
        }
        
        setServices(filteredServices);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
        setError('Une erreur est survenue lors du chargement des services.');
        setLoading(false);
      }
    };

    fetchServices();
  }, [featured, limit]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-600">{error}</p>
        <p className="mt-4">Veuillez réessayer ultérieurement.</p>
      </div>
    );
  }

  // Si aucun service n'est disponible depuis l'API, afficher des exemples statiques
  if (services.length === 0) {
    // Services statiques de secours
    const staticServices = [
      {
        _id: '1',
        name: 'Cargo Aérien Chine-Afrique',
        description: 'Service de transport aérien rapide entre la Chine et divers pays d\'Afrique.',
        category: 'cargo',
        featured: true
      },
      {
        _id: '2',
        name: 'Change Yuan-FCFA',
        description: 'Services de change de devises à des taux compétitifs.',
        category: 'currency',
        featured: true
      },
      {
        _id: '3',
        name: 'Conseils Achats',
        description: 'Assistance pour trouver les meilleurs fournisseurs en Chine.',
        category: 'consulting',
        featured: true
      },
      {
        _id: '4',
        name: 'Visa Étudiant',
        description: 'Assistance pour les demandes de visa étudiant.',
        category: 'visa',
        featured: true
      }
    ];
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {staticServices.map((service) => (
          <div key={service._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              {categoryIcons[service.category] || (
                <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <Link href={`/services#${service.category}`} className="text-blue-700 font-medium hover:text-blue-800">
              En savoir plus
            </Link>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {services.map((service) => (
        <div key={service._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            {categoryIcons[service.category] || (
              <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
          <p className="text-gray-600 mb-4">{service.description}</p>
          <div className="flex justify-between items-center">
            <Link href={`/services#${service.category}`} className="text-blue-700 font-medium hover:text-blue-800">
              En savoir plus
            </Link>
            <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded-full">
              {categoryNames[service.category] || service.category}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesList;
