// src/components/SalonRegistrationForm.js
import React, { useState } from 'react';


const Registration = () => {
  const [formData, setFormData] = useState({
    ownerName: '',
    salonName: '',
    licenseNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.salonName) {
      formErrors.salonName = 'Salon name is required';
    }
    if (!formData.licenseNumber) {
      formErrors.licenseNumber = 'License number is required';
    } else if (!/^[A-Za-z0-9]+$/.test(formData.licenseNumber)) {
      formErrors.licenseNumber = 'License number must be alphanumeric';
    }
    if (!formData.password) {
      formErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
    }
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      console.log('Form submitted successfully', formData);
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="text-2xl font-bold text-customTeal mb-6">Shape the Future of Beauty: Register Your Salon</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">Salon Owner Name:</label>
            <input 
              type="text" 
              id="ownerName"
              name="ownerName" 
              value={formData.ownerName} 
              onChange={handleChange} 
              required 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-customTeal focus:ring focus:ring-customTeal focus:ring-opacity-50"
            />
          </div>
          <div className="form-group">
            <label htmlFor="salonName" className="block text-sm font-medium text-gray-700">Salon Name:</label>
            <input 
              type="text" 
              id="salonName"
              name="salonName" 
              value={formData.salonName} 
              onChange={handleChange} 
              required 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-customTeal focus:ring focus:ring-customTeal focus:ring-opacity-50"
            />
            {errors.salonName && <p className="text-red-500 text-sm mt-1">{errors.salonName}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">Salon License Number:</label>
            <input 
              type="text" 
              id="licenseNumber"
              name="licenseNumber" 
              value={formData.licenseNumber} 
              onChange={handleChange} 
              required 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-customTeal focus:ring focus:ring-customTeal focus:ring-opacity-50"
            />
            {errors.licenseNumber && <p className="text-red-500 text-sm mt-1">{errors.licenseNumber}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email ID:</label>
            <input 
              type="email" 
              id="email"
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-customTeal focus:ring focus:ring-customTeal focus:ring-opacity-50"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Create Password:</label>
            <input 
              type="password" 
              id="password"
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-customTeal focus:ring focus:ring-customTeal focus:ring-opacity-50"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password:</label>
            <input 
              type="password" 
              id="confirmPassword"
              name="confirmPassword" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
              required 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-customTeal focus:ring focus:ring-customTeal focus:ring-opacity-50"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
          <button 
            type="submit" 
            className="w-auto bg-customTeal text-white py-2 px-3 rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-customTeal"
          >
            Register
          </button>
        </form>
      </div>
      <div className="image-container"></div>
    </div>
  );
};

export default Registration;
