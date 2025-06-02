const PriceRate = require('../models/PriceRate');

// Get all price rates
exports.getAllPriceRates = async (req, res) => {
  try {
    const priceRates = await PriceRate.find({ isActive: true });
    
    res.status(200).json({
      success: true,
      count: priceRates.length,
      data: priceRates
    });
  } catch (error) {
    console.error('Error fetching price rates:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get price rates by service category
exports.getPriceRatesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    const priceRates = await PriceRate.find({ 
      serviceCategory: category,
      isActive: true 
    });
    
    res.status(200).json({
      success: true,
      count: priceRates.length,
      data: priceRates
    });
  } catch (error) {
    console.error(`Error fetching price rates for category ${req.params.category}:`, error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get a single price rate by ID
exports.getPriceRateById = async (req, res) => {
  try {
    const priceRate = await PriceRate.findById(req.params.id);
    
    if (!priceRate) {
      return res.status(404).json({
        success: false,
        error: 'Price rate not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: priceRate
    });
  } catch (error) {
    console.error(`Error fetching price rate with ID ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Create a new price rate
exports.createPriceRate = async (req, res) => {
  try {
    const priceRate = await PriceRate.create(req.body);
    
    res.status(201).json({
      success: true,
      data: priceRate
    });
  } catch (error) {
    console.error('Error creating price rate:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Update a price rate
exports.updatePriceRate = async (req, res) => {
  try {
    const priceRate = await PriceRate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!priceRate) {
      return res.status(404).json({
        success: false,
        error: 'Price rate not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: priceRate
    });
  } catch (error) {
    console.error(`Error updating price rate with ID ${req.params.id}:`, error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Delete a price rate
exports.deletePriceRate = async (req, res) => {
  try {
    const priceRate = await PriceRate.findByIdAndDelete(req.params.id);
    
    if (!priceRate) {
      return res.status(404).json({
        success: false,
        error: 'Price rate not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error(`Error deleting price rate with ID ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Calculate price estimate
exports.calculatePriceEstimate = async (req, res) => {
  try {
    const { rateId, quantity = 1, factors = [] } = req.body;
    
    const priceRate = await PriceRate.findById(rateId);
    
    if (!priceRate) {
      return res.status(404).json({
        success: false,
        error: 'Price rate not found'
      });
    }
    
    // Start with base calculation
    let totalPrice = priceRate.basePrice * quantity;
    
    // Apply additional factors if provided
    if (factors && factors.length > 0) {
      // Filter valid factors that exist in the price rate
      const validFactors = factors.filter(factor => 
        priceRate.additionalFactors.some(af => af.name === factor.name)
      );
      
      // Apply each valid factor
      validFactors.forEach(factor => {
        const rateFactorDetails = priceRate.additionalFactors.find(af => 
          af.name === factor.name
        );
        
        if (rateFactorDetails) {
          // Apply multiplier
          if (rateFactorDetails.multiplier !== 1) {
            totalPrice *= rateFactorDetails.multiplier;
          }
          
          // Apply fixed amount
          if (rateFactorDetails.fixedAmount !== 0) {
            totalPrice += rateFactorDetails.fixedAmount;
          }
        }
      });
    }
    
    // Round to 2 decimal places
    totalPrice = Math.round(totalPrice * 100) / 100;
    
    res.status(200).json({
      success: true,
      data: {
        serviceCategory: priceRate.serviceCategory,
        rateName: priceRate.name,
        basePrice: priceRate.basePrice,
        quantity,
        totalPrice,
        currency: priceRate.currency,
        unit: priceRate.unit
      }
    });
  } catch (error) {
    console.error('Error calculating price estimate:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
