import Appointment from '../models/appointment.js';

// Create a new appointment
e// Create a new appointment
export const createAppointment = async (req, res) => {
    try {
      const { name, email, phone, services, packages, date, time, licenseNumber } = req.body;
  
      // Validate required fields
      if (!name || !email || !phone || !services || !packages || !date || !time || !licenseNumber) {
        return res.status(400).json({
          message: 'All fields are required for booking an appointment.',
        });
      }
  
      // Create a new appointment object
      const newAppointment = new Appointment({
        name,
        email,
        phone,
        services,
        packages,
        date,
        time,
        licenseNumber,
      });
  
      // Save the appointment to the database
      const savedAppointment = await newAppointment.save();
  
      return res.status(201).json({
        message: 'Appointment booked successfully!',
        data: savedAppointment, // Return the saved appointment
      });
    } catch (error) {
      console.error('Error creating appointment:', error.message);
      return res.status(500).json({
        message: 'Error creating appointment',
        error: error.message,
      });
    }
  };
  

// Get all appointments
export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        return res.status(200).json({ data: appointments });
    } catch (error) {
        console.error('Error fetching appointments:', error.message);
        return res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
};

// Get an appointment by ID
export const getAppointmentById = async (req, res) => {
    try {
        const { id } = req.params; // Get appointment ID from request parameters

        if (!id) {
            return res.status(400).json({ message: 'Appointment ID is required.' });
        }

        const appointment = await Appointment.findById(id);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }

        return res.status(200).json({ data: appointment });
    } catch (error) {
        console.error('Error finding appointment:', error.message);
        return res.status(500).json({ message: 'Error finding appointment', error: error.message });
    }
};

// Update an appointment
export const updateAppointment = async (req, res) => {
    try {
        const { id } = req.params; // Get appointment ID from request parameters
        const updates = req.body; // Get the updates from the request body

        const updatedAppointment = await Appointment.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });

        if (!updatedAppointment) {
            return res.status(404).json({
                message: 'Appointment not found',
            });
        }

        return res.status(200).json({
            message: 'Appointment updated successfully',
            data: updatedAppointment,
        });
    } catch (error) {
        console.error('Error updating appointment:', error.message);
        return res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
};

// Delete an appointment
export const deleteAppointment = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Appointment.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        return res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error('Error deleting appointment:', error.message);
        return res.status(500).json({ message: 'Error deleting appointment', error: error.message });
    }
};
