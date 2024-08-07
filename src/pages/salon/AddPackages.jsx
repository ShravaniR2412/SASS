// src/Packages.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPackages = () => {
  const [packageData, setPackageData] = useState({
    packageName: '',
    packageDescription: '',
    packagePrice: ''
  });
  const navigate = useNavigate();

  const handlePackageChange = (e) => {
    const { name, value } = e.target;
    setPackageData({
      ...packageData,
      [name]: value
    });
  };

  const handleNext = () => {
    // You may want to add validation and save data here
    navigate('/addproducts');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6">3. Add Package</h3>
      <form>
        <div className="mb-4">
          <label htmlFor="packageName" className="block text-lg font-medium mb-2">Package Name</label>
          <input
            type="text"
            id="packageName"
            name="packageName"
            value={packageData.packageName}
            onChange={handlePackageChange}
            className="block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter package name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="packageDescription" className="block text-lg font-medium mb-2">Description</label>
          <textarea
            id="packageDescription"
            name="packageDescription"
            value={packageData.packageDescription}
            onChange={handlePackageChange}
            rows="3"
            className="block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter package description"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="packagePrice" className="block text-lg font-medium mb-2">Price</label>
          <input
            type="text"
            id="packagePrice"
            name="packagePrice"
            value={packageData.packagePrice}
            onChange={handlePackageChange}
            className="block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter package price"
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

export default AddPackages;

