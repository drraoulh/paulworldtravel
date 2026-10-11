'use client';

import { useState, useEffect, ReactElement } from 'react';
import Image from 'next/image';
import { getFeaturedTestimonials } from '../services/api';

// Interface pour le type Testimonial
interface Testimonial {
  _id?: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  rating: number;
  featured?: boolean;
  language?: string;
  createdAt?: Date;
}

const TestimonialSlider = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Récupérer les témoignages depuis l'API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const data = await getFeaturedTestimonials();
        setTestimonials(data.length > 0 ? data : fallbackTestimonials);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setTestimonials(fallbackTestimonials);
        setError('Une erreur est survenue lors du chargement des témoignages.');
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Changer de témoignage toutes les 7 secondes
  useEffect(() => {
    if (testimonials.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 7000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Passer au témoignage suivant
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  // Passer au témoignage précédent
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Générer les étoiles en fonction de la note
  const renderStars = (rating: number): ReactElement[] => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg 
          key={i} 
          className={`w-5 h-5 ${i <= rating ? 'text-yellow-500' : 'text-gray-300'}`} 
          fill="currentColor" 
          viewBox="0 0 20 20" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  // Témoignages de secours si l'API ne répond pas
  const fallbackTestimonials = [
    {
      _id: '1',
      name: 'Jean Durand',
      role: 'Directeur Commercial',
      company: 'Import Export SARL',
      content: 'Nous travaillons avec Paul World Travel depuis plus de 3 ans pour nos importations de Chine. Leur service est impeccable et les délais sont toujours respectés.',
      rating: 5
    },
    {
      _id: '2',
      name: 'Marie Kouassi',
      role: 'Entrepreneure',
      company: 'Boutique Mode Afrique',
      content: 'Grâce à Paul World Travel, j\'ai pu établir des contacts solides avec des fournisseurs chinois pour ma boutique de mode.',
      rating: 5
    },
    {
      _id: '3',
      name: 'Robert Chen',
      role: 'Étudiant',
      company: '',
      content: 'Le service d\'assistance pour l\'obtention de mon visa étudiant a été excellent. Toutes les démarches ont été facilitées.',
      rating: 5
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (error && testimonials.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  const testimonial = testimonials[currentIndex];

  return (
    <div className="relative bg-blue-50 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Formes décoratives */}
      <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
        <div className="relative h-full text-lg max-w-prose mx-auto" aria-hidden="true">
          <svg
            className="absolute top-12 left-full transform translate-x-32"
            width="404"
            height="384"
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect x="0" y="0" width="4" height="4" className="text-blue-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="384" fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)" />
          </svg>
          <svg
            className="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32"
            width="404"
            height="384"
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect x="0" y="0" width="4" height="4" className="text-blue-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="384" fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
          </svg>
        </div>
      </div>
      
      {/* Contenu du testimonial */}
      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Ce que nos clients disent</h2>
          <p className="mt-4 text-lg text-gray-600">Découvrez les expériences de nos clients avec Paul World Travel</p>
        </div>
        
        <div className="bg-white shadow-xl rounded-lg p-8 mb-8 relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="bg-blue-700 rounded-full p-3 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
              </svg>
            </div>
          </div>
          
          <blockquote className="mt-6">
            <p className="text-xl text-gray-700 italic mb-6">{testimonial.content}</p>
            <div className="flex items-center justify-center gap-1 mb-4">
              {renderStars(testimonial.rating)}
            </div>
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-gray-200 mx-auto mb-3 overflow-hidden">
                <Image 
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=1d4ed8&color=fff`} 
                  alt={testimonial.name} 
                  width={64} 
                  height={64}
                />
              </div>
              <div className="font-semibold text-gray-900">{testimonial.name}</div>
              <div className="text-blue-700">{testimonial.role}{testimonial.company ? `, ${testimonial.company}` : ''}</div>
            </div>
          </blockquote>
        </div>
        
        {/* Navigation */}
        {testimonials.length > 1 && (
          <div className="flex justify-center space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 focus:outline-none"
              aria-label="Témoignage précédent"
            >
              <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Indicateurs */}
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full focus:outline-none ${
                    index === currentIndex ? 'bg-blue-700' : 'bg-gray-300'
                  }`}
                  aria-label={`Aller au témoignage ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 focus:outline-none"
              aria-label="Témoignage suivant"
            >
              <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialSlider;
