'use client';

import { useState } from 'react';
import { submitTestimonial } from '../services/api';

// Interface pour le type Testimonial
interface Testimonial {
  name: string;
  role: string;
  company?: string;
  content: string;
  rating: number;
  language?: string;
}

const TestimonialForm = () => {
  const [formData, setFormData] = useState<Testimonial>({
    name: '',
    role: '',
    company: '',
    content: '',
    rating: 5,
    language: 'fr'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  // Gérer les changements dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'rating' ? parseInt(value, 10) : value
    });
  };
  
  // Soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérifier que les champs obligatoires sont remplis
    if (!formData.name || !formData.role || !formData.content) {
      setSubmitError('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setSubmitError('');
      
      const result = await submitTestimonial(formData);
      
      if (result) {
        setSubmitSuccess(true);
        // Réinitialiser le formulaire
        setFormData({
          name: '',
          role: '',
          company: '',
          content: '',
          rating: 5,
          language: 'fr'
        });
        
        // Réinitialiser le message de succès après 5 secondes
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        setSubmitError('Une erreur est survenue lors de l\'envoi de votre témoignage. Veuillez réessayer plus tard.');
      }
    } catch (error) {
      setSubmitError('Une erreur est survenue lors de l\'envoi de votre témoignage. Veuillez réessayer plus tard.');
      console.error('Error submitting testimonial:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Composant pour le sélecteur d'étoiles
  const StarRating = () => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setFormData({ ...formData, rating: star })}
            className="focus:outline-none"
          >
            <svg
              className={`w-8 h-8 ${
                star <= formData.rating ? 'text-yellow-500' : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
        <input
          type="hidden"
          name="rating"
          value={formData.rating}
        />
      </div>
    );
  };
  
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Partagez votre expérience</h2>
      
      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
          Merci pour votre témoignage ! Il sera publié après validation par notre équipe.
        </div>
      )}
      
      {submitError && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
          {submitError}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Nom complet <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700 font-medium mb-2">
            Profession / Titre <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="company" className="block text-gray-700 font-medium mb-2">
            Entreprise (optionnel)
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
            Votre témoignage <span className="text-red-500">*</span>
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Votre évaluation <span className="text-red-500">*</span>
          </label>
          <StarRating />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 text-white font-medium rounded-md ${
            isSubmitting
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300'
          }`}
        >
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer mon témoignage'}
        </button>
      </form>
    </div>
  );
};

export default TestimonialForm;
