// src/Products.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProducts = () => {
  const [productData, setProductData] = useState({
    productName: '',
    productDescription: '',
    productPrice: '',
    productPictures: []
  });
  const navigate = useNavigate();

  const handleProductChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setProductData({
        ...productData,
        [name]: files
      });
    } else {
      setProductData({
        ...productData,
        [name]: value
      });
    }
  };

  const handleSubmit = () => {
    // You may want to add validation and save data here
    navigate('/dashboard');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6">4. Add Products</h3>
      <form>
        <div className="mb-4">
          <label htmlFor="productName" className="block text-lg font-medium mb-2">Product Name</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={productData.productName}
            onChange={handleProductChange}
            className="block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter product name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="productDescription" className="block text-lg font-medium mb-2">Description</label>
          <textarea
            id="productDescription"
            name="productDescription"
            value={productData.productDescription}
            onChange={handleProductChange}
            rows="3"
            className="block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter product description"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="productPrice" className="block text-lg font-medium mb-2">Price</label>
          <input
            type="text"
            id="productPrice"
            name="productPrice"
            value={productData.productPrice}
            onChange={handleProductChange}
            className="block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter product price"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="productPictures" className="block text-lg font-medium mb-2">Product Pictures</label>
          <input
            type="file"
            id="productPictures"
            name="productPictures"
            multiple
            onChange={handleProductChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-semibold file:bg-teal-100 file:text-teal-700 hover:file:bg-teal-200"
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700"
        >
          Save Details
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
