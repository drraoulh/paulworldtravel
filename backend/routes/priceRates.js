const express = require('express');
const router = express.Router();
const { 
  getAllPriceRates, 
  getPriceRatesByCategory,
  getPriceRateById, 
  createPriceRate, 
  updatePriceRate, 
  deletePriceRate,
  calculatePriceEstimate
} = require('../controllers/priceRateController');

// Get all price rates
router.get('/', getAllPriceRates);

// Get price rates by category
router.get('/category/:category', getPriceRatesByCategory);

// Get single price rate
router.get('/:id', getPriceRateById);

// Create price rate
router.post('/', createPriceRate);

// Update price rate
router.put('/:id', updatePriceRate);

// Delete price rate
router.delete('/:id', deletePriceRate);

// Calculate price estimate
router.post('/calculate', calculatePriceEstimate);

module.exports = router;
