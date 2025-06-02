const Testimonial = require('../models/Testimonial');

// @desc    Fetch all testimonials
// @route   GET /api/testimonials
// @access  Public
const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des témoignages',
      error: error.message,
    });
  }
};

// @desc    Fetch featured testimonials
// @route   GET /api/testimonials/featured
// @access  Public
const getFeaturedTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ featured: true }).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des témoignages à la une',
      error: error.message,
    });
  }
};

// @desc    Fetch single testimonial
// @route   GET /api/testimonials/:id
// @access  Public
const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    
    if (testimonial) {
      res.json({
        success: true,
        data: testimonial,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Témoignage non trouvé',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du témoignage',
      error: error.message,
    });
  }
};

// @desc    Create a testimonial
// @route   POST /api/testimonials
// @access  Public
const createTestimonial = async (req, res) => {
  try {
    const { name, role, company, content, rating, language } = req.body;
    
    // Validation
    if (!name || !role || !content || !rating) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez remplir tous les champs obligatoires',
      });
    }
    
    const testimonial = await Testimonial.create({
      name,
      role,
      company,
      content,
      rating,
      language: language || 'fr',
      featured: false // Par défaut, les nouveaux témoignages ne sont pas mis en avant
    });
    
    res.status(201).json({
      success: true,
      data: testimonial,
      message: 'Témoignage créé avec succès',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du témoignage',
      error: error.message,
    });
  }
};

// @desc    Update testimonial featured status
// @route   PUT /api/testimonials/:id/featured
// @access  Private/Admin (to be implemented)
const updateFeaturedStatus = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    
    if (testimonial) {
      testimonial.featured = req.body.featured;
      
      const updatedTestimonial = await testimonial.save();
      
      res.json({
        success: true,
        data: updatedTestimonial,
        message: 'Statut mis à jour avec succès',
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Témoignage non trouvé',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du statut',
      error: error.message,
    });
  }
};

module.exports = {
  getTestimonials,
  getFeaturedTestimonials,
  getTestimonialById,
  createTestimonial,
  updateFeaturedStatus,
};
