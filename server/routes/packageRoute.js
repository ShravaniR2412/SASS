// routes/packageRoutes.js
import express from 'express';
import { createPackage,getAllPackages, getPackages, getPackageById, updatePackage, deletePackage } from '../controllers/packageController.js';

const router = express.Router();

// Route to create new packages
router.post('/addpackages', createPackage);

// Route to get packages by license number
router.post('/getpackages', getPackages);

// Route to get all packages 
router.get('/getallpackages', getAllPackages);

// Route to get a single package by ID
router.get('/:id', getPackageById);

// Route to update a package by ID
router.put('/:id', updatePackage);

// Route to delete a package by ID
router.delete('/:id', deletePackage);

export default router;
