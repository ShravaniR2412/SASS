import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaClock, FaCut, FaBox } from 'react-icons/fa';

const CustomerAppointmentBooking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    package: '',
    date: '',
    time: '',
  });

  const [errors, setErrors] = useState({});

  const services = ['Haircut', 'Hair Coloring', 'Manicure', 'Pedicure', 'Facial'];
  const packages = ['Basic', 'Premium', 'Deluxe'];
  const availableTimeSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = 'Name is required';
    if (!formData.email) formErrors.email = 'Email is required';
    if (!formData.phone) formErrors.phone = 'Phone number is required';
    if (!formData.date) formErrors.date = 'Please select a date';
    if (!formData.time) formErrors.time = 'Please select a time slot';

    // Validate that at least one of service or package is selected
    if (!formData.service && !formData.package) {
      formErrors.service = 'Please select at least one service or package';
    }

    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      alert('Appointment successfully booked!');
      // Here you can send the formData to the backend
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-10 bg-gradient-to-r from-teal-50 to-white shadow-2xl rounded-lg border border-teal-200 mt-12">
      <h2 className="text-4xl font-bold mb-8 text-center text-teal-600">Book Your Appointment</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-6">
          <label className="block text-gray-700 text-lg mb-2">
            <FaUser className="inline mr-2 text-teal-600" /> Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter your full name"
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-gray-700 text-lg mb-2">
            <FaEnvelope className="inline mr-2 text-teal-600" /> Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter your email"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
        </div>

        {/* Phone */}
        <div className="mb-6">
          <label className="block text-gray-700 text-lg mb-2">
            <FaPhone className="inline mr-2 text-teal-600" /> Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter your phone number"
          />
          {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
        </div>

        {/* Service Selection */}
        <div className="mb-6">
          <label className="block text-gray-700 text-lg mb-2">
            <FaCut className="inline mr-2 text-teal-600" /> Select Service
          </label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Choose a service...</option>
            {services.map((service, index) => (
              <option key={index} value={service}>
                {service}
              </option>
            ))}
          </select>
          {errors.service && <span className="text-red-500 text-sm">{errors.service}</span>}
        </div>

        {/* Package Selection */}
        <div className="mb-6">
          <label className="block text-gray-700 text-lg mb-2">
            <FaBox className="inline mr-2 text-teal-600" /> Select Package
          </label>
          <select
            name="package"
            value={formData.package}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Choose a package...</option>
            {packages.map((pkg, index) => (
              <option key={index} value={pkg}>
                {pkg}
              </option>
            ))}
          </select>
          {errors.package && <span className="text-red-500 text-sm">{errors.package}</span>}
        </div>

        {/* Date Picker */}
        <div className="mb-6">
          <label className="block text-gray-700 text-lg mb-2">
            <FaCalendarAlt className="inline mr-2 text-teal-600" /> Appointment Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {errors.date && <span className="text-red-500 text-sm">{errors.date}</span>}
        </div>

        {/* Time Slot Selection */}
        <div className="mb-6">
          <label className="block text-gray-700 text-lg mb-2">
            <FaClock className="inline mr-2 text-teal-600" /> Select Time Slot
          </label>
          <select
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Choose a time slot...</option>
            {availableTimeSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {errors.time && <span className="text-red-500 text-sm">{errors.time}</span>}
        </div>

        {/* Submit Button */}
        <div className="mt-8 text-center">
          <button
            type="submit"
            className="px-8 bg-teal-600 text-white font-bold py-4 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
          >
            Book Appointment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerAppointmentBooking;
