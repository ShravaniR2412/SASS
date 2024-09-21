import React, { useEffect, useState } from 'react';
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
  const [successMessage, setSuccessMessage] = useState('');
  const [services, setServices] = useState([]);
  const [packages, setPackages] = useState([]);
  const storedLicenseNumber = localStorage.getItem('licenseNumber');
  const availableTimeSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM'];

  const fetchPackages = async () => {
    try {
      const response = await fetch('http://localhost:5050/api/packages/getpackages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('authToken'),
        },
        body: JSON.stringify({ licenseNumber: storedLicenseNumber }),
      });

      if (response.ok) {
        const data = await response.json();
        setPackages(data.data || []);
      } else {
        const errorMessage = await response.text();
        console.error('Failed to fetch packages:', errorMessage);
      }
    } catch (error) {
      console.error('Error fetching packages:', error.message);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch('http://localhost:5050/api/services/getservices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('authToken'),
        },
        body: JSON.stringify({ licenseNumber: storedLicenseNumber }),
      });

      if (response.ok) {
        const data = await response.json();
        setServices(data.data || []);
      } else {
        const errorMessage = await response.text();
        console.error('Failed to fetch services:', errorMessage);
      }
    } catch (error) {
      console.error('Error fetching services:', error.message);
    }
  };

  useEffect(() => {
    fetchPackages();
    fetchServices();
  }, []);

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
    if (!formData.service && !formData.package) {
      formErrors.service = 'Please select at least one service or package';
    }
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
  
    setErrors({}); // Clear previous errors
    try {
      const appointmentData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        package: formData.package,
        date: formData.date,
        time: formData.time,
        licenseNumber: storedLicenseNumber,
      };
  
      console.log('Submitting appointment data:', appointmentData); // Log the data being sent
  
      const response = await fetch('http://localhost:5050/api/appointments/createappointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('authToken'),
        },
        body: JSON.stringify({appointments: appointmentData}),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to book appointment: ${errorMessage}`);
      }
  
      const result = await response.json();
      setSuccessMessage('Appointment booked successfully!');
      // Reset form after success
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        package: '',
        date: '',
        time: '',
      });
    } catch (error) {
      console.error('Error:', error.message);
      setErrors({ submit: error.message });
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200 mt-12">
      <h2 className="text-4xl font-bold mb-8 text-center text-teal-600">Book Your Appointment</h2>
      {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}
      {errors.submit && <div className="text-red-500 mb-4">{errors.submit}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form Fields */}
        <div>
          <label className="block text-gray-700 text-lg mb-1">
            <FaUser className="inline mr-2 text-teal-600" /> Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            placeholder="Enter your full name"
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
        </div>
        
        <div>
          <label className="block text-gray-700 text-lg mb-1">
            <FaEnvelope className="inline mr-2 text-teal-600" /> Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            placeholder="Enter your email"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
        </div>
        
        <div>
          <label className="block text-gray-700 text-lg mb-1">
            <FaPhone className="inline mr-2 text-teal-600" /> Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            placeholder="Enter your phone number"
          />
          {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
        </div>
        
        <div>
          <label className="block text-gray-700 text-lg mb-1">
            <FaCut className="inline mr-2 text-teal-600" /> Select Service
          </label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          >
            <option value="">Choose a service...</option>
            {services.map((service) => (
              <option key={service._id} value={service.serviceName}>
                {service.serviceName} - {service.cost}
              </option>
            ))}
          </select>
          {errors.service && <span className="text-red-500 text-sm">{errors.service}</span>}
        </div>
        
        <div>
          <label className="block text-gray-700 text-lg mb-1">
            <FaBox className="inline mr-2 text-teal-600" /> Select Package
          </label>
          <select
            name="package"
            value={formData.package}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          >
            <option value="">Choose a package...</option>
            {packages.map((pkg) => (
              <option key={pkg._id} value={pkg.packageName}>
                {pkg.packageName} - [{pkg.servicesIncluded.join(', ')}] - ₹{pkg.price}
              </option>
            ))}
          </select>
          {errors.package && <span className="text-red-500 text-sm">{errors.package}</span>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-lg mb-1">
              <FaCalendarAlt className="inline mr-2 text-teal-600" /> Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
            {errors.date && <span className="text-red-500 text-sm">{errors.date}</span>}
          </div>

          <div>
            <label className="block text-gray-700 text-lg mb-1">
              <FaClock className="inline mr-2 text-teal-600" /> Time
            </label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            >
              <option value="">Select a time slot...</option>
              {availableTimeSlots.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
            {errors.time && <span className="text-red-500 text-sm">{errors.time}</span>}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-500 transition"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default CustomerAppointmentBooking;
