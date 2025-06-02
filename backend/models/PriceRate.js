const mongoose = require('mongoose');

const PriceRateSchema = new mongoose.Schema({
  serviceCategory: {
    type: String,
    required: true,
    enum: ['cargo', 'currency', 'consulting', 'tourism', 'visa', 'business', 'it', 'customs']
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  basePrice: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true,
    default: 'unit'
  },
  currency: {
    type: String,
    required: true,
    enum: ['USD', 'EUR', 'CNY', 'XAF'],
    default: 'USD'
  },
  additionalFactors: [{
    name: {
      type: String,
      required: true
    },
    description: String,
    multiplier: {
      type: Number,
      default: 1
    },
    fixedAmount: {
      type: Number,
      default: 0
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PriceRate', PriceRateSchema);
