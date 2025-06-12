// API configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Service interface
interface Service {
  _id?: string;
  name: string;
  description: string;
  category: string;
  icon?: string;
  featured?: boolean;
  createdAt?: Date;
}

// Contact interface
interface Contact {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: Date;
}

// Testimonial interface
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

// PriceRate interface
interface AdditionalFactor {
  name: string;
  description?: string;
  multiplier: number;
  fixedAmount: number;
}

interface PriceRate {
  _id?: string;
  serviceCategory: string;
  name: string;
  description: string;
  basePrice: number;
  unit: string;
  currency: string;
  additionalFactors?: AdditionalFactor[];
  isActive?: boolean;
  createdAt?: Date;
}

// PriceEstimate interface
interface PriceEstimateRequest {
  rateId: string;
  quantity?: number;
  factors?: { name: string }[];
}

interface PriceEstimateResponse {
  serviceCategory: string;
  rateName: string;
  basePrice: number;
  quantity: number;
  totalPrice: number;
  currency: string;
  unit: string;
}

// Fetch all services
export const getServices = async (): Promise<Service[]> => {
  try {
    const response = await fetch(`${API_URL}/services`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
};

// Fetch a single service by ID
export const getServiceById = async (id: string): Promise<Service | null> => {
  try {
    const response = await fetch(`${API_URL}/services/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching service with ID ${id}:`, error);
    return null;
  }
};

// Create a new service (admin functionality)
export const createService = async (service: Service): Promise<Service | null> => {
  try {
    const response = await fetch(`${API_URL}/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(service),
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error creating service:', error);
    return null;
  }
};

// Submit contact form
export const submitContactForm = async (contact: Contact): Promise<Contact | null> => {
  try {
    const response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return null;
  }
};

// Fetch all testimonials
export const getTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const response = await fetch(`${API_URL}/testimonials`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
};

// Fetch featured testimonials
export const getFeaturedTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const response = await fetch(`${API_URL}/testimonials/featured`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching featured testimonials:', error);
    return [];
  }
};

// Submit a testimonial
export const submitTestimonial = async (testimonial: Testimonial): Promise<Testimonial | null> => {
  try {
    const response = await fetch(`${API_URL}/testimonials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testimonial),
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error submitting testimonial:', error);
    return null;
  }
};

// Fetch all price rates
export const getPriceRates = async (): Promise<PriceRate[]> => {
  try {
    const response = await fetch(`${API_URL}/price-rates`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching price rates:', error);
    return [];
  }
};

// Fetch price rates by category
export const getPriceRatesByCategory = async (category: string): Promise<PriceRate[]> => {
  try {
    const response = await fetch(`${API_URL}/price-rates/category/${category}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching price rates for category ${category}:`, error);
    return [];
  }
};

// Calculate price estimate
export const calculatePriceEstimate = async (
  request: PriceEstimateRequest
): Promise<PriceEstimateResponse | null> => {
  try {
    const response = await fetch(`${API_URL}/price-rates/calculate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error calculating price estimate:', error);
    return null;
  }
};
