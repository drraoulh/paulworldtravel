'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Testimonials() {
  const router = useRouter();
  
  useEffect(() => {
    // Rediriger vers la page d'accueil
    router.push('/');
  }, [router]);
  
  // Afficher un message de redirection temporaire
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirection en cours...</p>
      </div>
    </div>
  );
}
