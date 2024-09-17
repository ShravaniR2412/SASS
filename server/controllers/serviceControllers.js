import Service from '../models/service.js';

// Create new services
export const createServices = async (req, res) => {
    try {
        // Expecting an array of services in the request body
        const services = req.body.services;

        if (!services || services.length === 0) {
            return res.status(400).json({
                message: 'No services provided',
            });
        }

        // Create an array to hold the saved services
        const savedServices = [];

        // Iterate over each service and save it to the database
        for (const service of services) {
            const { category, serviceName, cost, duration, imageUrl, description, additionalInfo,licenseNumber } = service;

            // Create a new service object
            const newService = new Service({
                category,
                serviceName,
                cost,
                duration,
                imageUrl,
                description,
                additionalInfo,
                licenseNumber,
            });

            // Save the service to the database
            const savedService = await newService.save();
            savedServices.push(savedService); // Add each saved service to the array
        }

        return res.status(201).json({
            message: 'Services created successfully',
            data: savedServices,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error creating services',
            error: error.message,
        });
    }
};


// Get all services
export const getAllServices = async (req, res) => {
    try {
      const { licenseNumber } = req.body; // Extract licenseNumber from request body
  
      if (!licenseNumber) {
        return res.status(400).json({ message: 'License number is required.' });
      }
  
      // Fetch services matching the license number
      const services = await Service.find({ licenseNumber });
      res.status(200).json({ data: services }); // Wrap the result in a data field for consistency
    } catch (error) {
      console.error(error.message);
      res.status(500).json({
        message: 'Server error',
        error: error.message
      });
    }
  };
  

// Get a service by Name
export const getServiceByName = async (req, res) => {
    try {
        // console.log(req.body)
      const { serviceName, licenseNumber } = req.body;
  
      if (!serviceName || !licenseNumber) {
        return res.status(400).json({ message: 'Service name and license number are required' });
      }
  
      const service = await Service.findOne({ serviceName, licenseNumber });
  
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
  
      return res.status(200).json({ service });
    } catch (error) {
      return res.status(500).json({ message: 'Error finding service', error: error.message });
    }
  };

// Controller function to get service by ID
export const getServiceById = async (req, res) => {
    try {
      const { id } = req.body; // Get service ID from request body
  
      if (!id) {
        return res.status(400).json({ message: 'Service ID is required.' });
      }
  
      // Fetch service from the database using the ID
      const service = await Service.findById(id);
  
      if (!service) {
        return res.status(404).json({ message: 'Service not found.' });
      }
  
      res.status(200).json({ data: service });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  

// Update a service
export const updateService = async (req, res) => {
    try {
      const { id } = req.params; // Get service ID from request parameters
      const updates = req.body; // Get the updates from the request body
  
      // Find the service by ID and update it
      const updatedService = await Service.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });
  
      if (!updatedService) {
        return res.status(404).json({
          message: 'Service not found',
        });
      }
  
      return res.status(200).json({
        message: 'Service updated successfully',
        data: updatedService,
      });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({
        message: 'Server error',
        error: error.message,
      });
    }
  };
  

// Delete a service
export const deleteService = async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await Service.findByIdAndDelete(id);
  
      if (!result) {
        return res.status(404).json({ message: 'Service not found' });
      }
  
      return res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
      console.error('Error deleting service:', error.message);
      return res.status(500).json({ message: 'Error deleting service', error: error.message });
    }
  };
  