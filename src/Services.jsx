// src/Services.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const [serviceData, setServiceData] = useState({
    serviceName: '',
    serviceDescription: '',
    servicePrice: ''
  });
  const navigate = useNavigate();

  const handleServiceChange = (e) => {
    const { name, value } = e.target;
    setServiceData({
      ...serviceData,
      [name]: value
    });
  };

  const handleNext = () => {
    // You may want to add validation and save data here
    navigate('/packages');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6">2. Add Your Service</h3>
      <form>
        <div className="mb-4">
          <label htmlFor="serviceName" className="block text-lg font-medium mb-2">Service Name</label>
          <input
            type="text"
            id="serviceName"
            name="serviceName"
            value={serviceData.serviceName}
            onChange={handleServiceChange}
            className="block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter service name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="serviceDescription" className="block text-lg font-medium mb-2">Description</label>
          <textarea
            id="serviceDescription"
            name="serviceDescription"
            value={serviceData.serviceDescription}
            onChange={handleServiceChange}
            rows="3"
            className="block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter service description"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="servicePrice" className="block text-lg font-medium mb-2">Price</label>
          <input
            type="text"
            id="servicePrice"
            name="servicePrice"
            value={serviceData.servicePrice}
            onChange={handleServiceChange}
            className="block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter service price"
          />
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default Services;
