import express from 'express';
import {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
} from '../controllers/appointmentController.js';

const router = express.Router();

// Route to create a new appointment
router.post('/createappointments', createAppointment);
// Route to get all appointments
router.get('/getappointments', getAllAppointments);

// Route to get appointment by ID
router.get('/appointments/:id', getAppointmentById);

// Route to update an appointment
router.put('/appointments/:id', updateAppointment);

// Route to delete an appointment
router.delete('/appointments/:id', deleteAppointment);

export default router;
