const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config({ path: './config/config.env' });

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const serviceRoutes = require('./routes/services');
const contactRoutes = require('./routes/contact');
const testimonialRoutes = require('./routes/testimonials');
const priceRateRoutes = require('./routes/priceRates');

// Use routes
app.use('/api/services', serviceRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/price-rates', priceRateRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Paul World Travel API is running');
});

// Connect to MongoDB
connectDB();

// Error Middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
