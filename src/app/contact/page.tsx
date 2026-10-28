'use client';

import { useState } from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { sendForm, SendFormResult } from "@/services/sendForm";

export default function Contact() {
  const { t, language } = useLanguage();
  const fr = language === 'fr';
  const emptyForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    website: '' // honeypot, hidden from visitors
  };
  const [formData, setFormData] = useState(emptyForm);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | SendFormResult>('idle');

  const serviceOptions = fr
    ? ['Fret Cameroun → Canada', 'Fret Chine → Afrique (maritime / aérien)', 'Achats et sourcing en Chine', 'Change de devises', 'Visa et immigration', "Création d'entreprise et comptabilité", 'Solutions informatiques', 'Dédouanement et transit', 'Autre demande']
    : ['Freight Cameroon → Canada', 'Freight China → Africa (sea / air)', 'Purchasing and sourcing in China', 'Currency exchange', 'Visa and immigration', 'Business creation and accounting', 'IT solutions', 'Customs clearance and transit', 'Other request'];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await sendForm('contact', formData);
    setSubmitStatus(result);
    if (result === 'success') setFormData(emptyForm);
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header Section */}
        <section className="bg-blue-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4">{t('contact.title')}</h1>
            <p className="text-xl">{t('contact.subtitle')}</p>
          </div>
        </section>
        
        {/* Contact Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">{t('contact.send_message')}</h2>
                <form name="contact" className="space-y-6" onSubmit={handleSubmit}>
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website">Site web</label>
                    <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" value={formData.website} onChange={handleChange} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('contact.first_name')}
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('contact.last_name')}
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contact.email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      {fr ? 'Téléphone / WhatsApp (facultatif)' : 'Phone / WhatsApp (optional)'}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      autoComplete="tel"
                      placeholder="+237 6 XX XX XX XX"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                      {fr ? 'Service concerné' : 'Service'}
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="" disabled>{fr ? 'Choisissez un service' : 'Choose a service'}</option>
                      {serviceOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contact.message')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder={fr ? 'Décrivez votre besoin : type de marchandise, poids ou volume, ville de départ et d\'arrivée, délai souhaité…' : 'Describe what you need: type of goods, weight or volume, departure and arrival cities, timing…'}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? t('contact.sending') : t('contact.send_button')}
                    </button>
                  </div>
                  
                  <div aria-live="polite">
                    {submitStatus === 'success' && (
                      <div className="p-4 bg-green-100 text-green-700 rounded-md">
                        {fr ? 'Merci ! Votre message a bien été envoyé. Nous vous répondons sous 24 h ouvrées.' : 'Thank you! Your message has been sent. We reply within one business day.'}
                      </div>
                    )}
                    {submitStatus === 'invalid' && (
                      <div className="p-4 bg-red-100 text-red-700 rounded-md">
                        {fr ? 'Vérifiez votre nom, votre adresse email et votre message, puis réessayez.' : 'Check your name, email address and message, then try again.'}
                      </div>
                    )}
                    {(submitStatus === 'error' || submitStatus === 'not_configured') && (
                      <div className="p-4 bg-red-100 text-red-700 rounded-md">
                        {fr ? "Le message n'a pas pu être envoyé. Écrivez-nous à " : 'The message could not be sent. Email us at '}
                        <a href="mailto:paulworld2016@yahoo.com" className="underline">paulworld2016@yahoo.com</a>
                        {fr ? ' ou sur ' : ' or message us on '}
                        <a href="https://wa.me/237694244666" target="_blank" rel="noopener noreferrer" className="underline">WhatsApp</a>.
                      </div>
                    )}
                  </div>
                </form>
              </div>
              
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">{t('contact.our_coordinates')}</h2>
                <div className="space-y-8">
                  {/* China Office */}
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">{t('contact.china_office')}</h3>
                    <p className="text-gray-600 mb-4">{t('contact.china_address')}</p>
                    <div className="space-y-2">
                      <div className="flex items-start text-gray-500">
                        <svg className="w-5 h-5 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <div className="flex flex-col">
                          <a href="https://wa.me/8619068451378" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            +86 190 6845 1378 (Chine)
                          </a>
                          <a href="https://wa.me/237694244666" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            +237 6 94 24 46 66 (Cameroun)
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>{t('contact.email_address')}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Cameroon Office */}
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">{t('contact.cameroon_office')}</h3>
                    <p className="text-gray-600 mb-4">{t('contact.cameroon_address')}</p>
                    <div className="space-y-2">
                      <div className="flex items-start text-gray-500">
                        <svg className="w-5 h-5 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <div className="flex flex-col">
                          <a href="https://wa.me/8619068451378" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            +86 190 6845 1378 (Chine)
                          </a>
                          <a href="https://wa.me/237694244666" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            +237 6 94 24 46 66 (Cameroun)
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>{t('contact.email_address')}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Business Hours */}
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">{t('contact.business_hours')}</h3>
                    <div className="space-y-2 text-gray-600">
                      <p>{t('contact.monday_friday')}</p>
                      <p>{t('contact.saturday')}</p>
                      <p>{t('contact.sunday')}</p>
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
