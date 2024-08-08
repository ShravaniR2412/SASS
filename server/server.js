import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // Import cors
import userRoutes from './routes/userRoute.js';

const app = express();

app.use(cors()); // Use cors middleware
app.use(express.json()); // Middleware to parse JSON requests

const dbURI = process.env.ATLAS_URI;
if (!dbURI) {
  console.error('ATLAS_URI is not defined in .env file');
  process.exit(1);
}

mongoose.connect(dbURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
