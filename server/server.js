import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // Import cors
import userRoutes from './routes/userRoute.js';
import productRoutes from './routes/productRoute.js';
import { auth } from './middleware/auth.js'; // Import named export

const app = express();

app.use(cors()); // Use cors middleware
app.use(express.json()); // Middleware to parse JSON requests

const dbURI = process.env.ATLAS_URI;
const jwtSecret = process.env.JWT_SECRET;
if (!dbURI || !jwtSecret) {
  console.error('Missing ATLAS_URI or JWT_SECRET in .env file');
  process.exit(1);
}

mongoose.connect(dbURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use the authentication middleware for product routes
app.use('/api/products', auth, productRoutes); // Apply auth middleware to /api/products

// User routes do not require authentication middleware
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
