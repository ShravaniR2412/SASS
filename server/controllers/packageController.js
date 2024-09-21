// controllers/packageController.js
import Package from '../models/package.js';

// Create a new package
export const createPackage = async (req, res) => {
  try {
    const packages = req.body.packages;

    if (!packages || packages.length === 0) {
      return res.status(400).json({
        message: 'No packages provided',
      });
    }

    const savedPackages = [];

    for (const packageData of packages) {
      const { packageName, description, price, duration, servicesIncluded, licenseNumber, imageUrl } = packageData;

      if (!packageName || !description || !price || !duration || !licenseNumber) {
        return res.status(400).json({ message: 'All fields are required for each package.' });
      }

      const newPackage = new Package({
        packageName,
        description,
        price,
        duration,
        servicesIncluded,
        licenseNumber,
        imageUrl,
      });

      const savedPackage = await newPackage.save();
      savedPackages.push(savedPackage);
    }

    return res.status(201).json({
      message: 'Packages created successfully',
      data: savedPackages,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: 'Error creating packages',
      error: error.message,
    });
  }
};

// Get all packages by license number
export const getPackages = async (req, res) => {
  try {
    const { licenseNumber } = req.body;

    if (!licenseNumber) {
      return res.status(400).json({ message: 'License number is required.' });
    }

    const packages = await Package.find({ licenseNumber });
    res.status(200).json({data:packages});
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

// Get a single package by ID
export const getPackageById = async (req, res) => {
  try {
    const packageId = req.params.id;
    const packageData = await Package.findById(packageId);

    if (!packageData) {
      return res.status(404).json({ message: 'Package not found' });
    }

    res.status(200).json(packageData);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

// Update a package by ID
export const updatePackage = async (req, res) => {
  try {
    const packageId = req.params.id;
    const updates = req.body;

    const updatedPackage = await Package.findByIdAndUpdate(packageId, updates, { new: true });

    if (!updatedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    res.status(200).json({
      message: 'Package updated successfully',
      package: updatedPackage,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};

// Delete a package by ID
export const deletePackage = async (req, res) => {
  try {
    const packageId = req.params.id;
    const deletedPackage = await Package.findByIdAndDelete(packageId);

    if (!deletedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    res.status(200).json({
      message: 'Package deleted successfully',
      package: deletedPackage,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};
