const express = require('express');
const router = express.Router();
const {
  getTestimonials,
  getFeaturedTestimonials,
  getTestimonialById,
  createTestimonial,
  updateFeaturedStatus,
} = require('../controllers/testimonialController');

// @route   GET /api/testimonials
// @desc    Fetch all testimonials
// @access  Public
router.get('/', getTestimonials);

// @route   GET /api/testimonials/featured
// @desc    Fetch featured testimonials
// @access  Public
router.get('/featured', getFeaturedTestimonials);

// @route   GET /api/testimonials/:id
// @desc    Fetch single testimonial
// @access  Public
router.get('/:id', getTestimonialById);

// @route   POST /api/testimonials
// @desc    Create a new testimonial
// @access  Public
router.post('/', createTestimonial);

// @route   PUT /api/testimonials/:id/featured
// @desc    Update testimonial featured status
// @access  Private/Admin (to be implemented)
router.put('/:id/featured', updateFeaturedStatus);

module.exports = router;
