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
    const services = await Service.find();
    return res.status(200).json({
      message: 'Services retrieved successfully',
      data: services,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error retrieving services',
      error: error.message,
    });
  }
};

// Get a service by ID
export const getServiceById = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({
        message: 'Service not found',
      });
    }

    return res.status(200).json({
      message: 'Service retrieved successfully',
      data: service,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error retrieving service',
      error: error.message,
    });
  }
};

// Update a service
export const updateService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const updates = req.body;

    // Find the service by ID and update it
    const updatedService = await Service.findByIdAndUpdate(serviceId, updates, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators on update
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
    return res.status(500).json({
      message: 'Error updating service',
      error: error.message,
    });
  }
};

// Delete a service
export const deleteService = async (req, res) => {
  try {
    const serviceId = req.params.id;

    // Find the service by ID and delete it
    const deletedService = await Service.findByIdAndDelete(serviceId);

    if (!deletedService) {
      return res.status(404).json({
        message: 'Service not found',
      });
    }

    return res.status(200).json({
      message: 'Service deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error deleting service',
      error: error.message,
    });
  }
};
