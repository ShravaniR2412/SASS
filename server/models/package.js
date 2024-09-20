// models/package.js
import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
  packageName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: String, // Example: "1 hour", "30 minutes"
    required: true,
  },
  servicesIncluded: [String], // Array of service names included in the package
  licenseNumber: {
    type: String,
    required: true, // To associate the package with a specific salon
  },
  imageUrl: {
    type: String, // Optional image for the package
  },
}, {
  timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
});

const Package = mongoose.model('Package', packageSchema);

export default Package;
