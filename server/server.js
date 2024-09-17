import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // Import cors
import userRoutes from './routes/userRoute.js';
import productRoutes from './routes/productRoute.js';
import serviceRoutes from './routes/serviceRoute.js';
import { auth } from './middleware/auth.js'; // Import named export

const app = express();

// Middleware to handle JSON payloads
app.use(express.json()); 

// Middleware to handle URL-encoded form data
app.use(express.urlencoded({ extended: true })); 

app.use(cors()); // Use cors middleware

const dbURI = process.env.ATLAS_URI;
const jwtSecret = process.env.JWT_SECRET;
if (!dbURI || !jwtSecret) {
  console.error('Missing ATLAS_URI or JWT_SECRET in .env file');
  process.exit(1);
}

mongoose.connect(dbURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use the authentication middleware routes
app.use('/api/products', auth, productRoutes); 
app.use('/api/services', auth, serviceRoutes); 


app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
