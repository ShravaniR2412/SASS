import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // Import CORS
import userRoutes from './routes/userRoute.js';
import productRoutes from './routes/productRoute.js';
import serviceRoutes from './routes/serviceRoute.js';
import packageRoutes from './routes/packageRoute.js';
import appointmentRoutes from './routes/appointmentRoute.js'; // Import appointment routes
import { auth } from './middleware/auth.js'; // Import named export

const app = express();

// Middleware to handle JSON payloads
app.use(express.json()); 

// Middleware to handle URL-encoded form data
app.use(express.urlencoded({ extended: true })); 

// Enable CORS for all origins
app.use(cors()); 

// Database URI and JWT secret from environment variables
const dbURI = process.env.ATLAS_URI;
const jwtSecret = process.env.JWT_SECRET;

// Check for required environment variables
if (!dbURI || !jwtSecret) {
  console.error('Missing ATLAS_URI or JWT_SECRET in .env file');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Public routes (no auth required)
app.use('/api/users', userRoutes);

// Protected routes (authentication required)
app.use('/api/products', auth, productRoutes); 
app.use('/api/services', auth, serviceRoutes); 
app.use('/api/packages', auth, packageRoutes); 
app.use('/api/appointments', auth, appointmentRoutes); // Add appointment routes

// 404 Handler for unsupported routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
