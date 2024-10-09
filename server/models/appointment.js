import mongoose from 'mongoose'; // ES Module import


const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  services: { // Should be plural `services`, not `service`
    type: [String],
    required: true,
  },
  packages: { 
    type: [String],
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  licenseNumber: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
