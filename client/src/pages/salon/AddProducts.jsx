import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProducts = () => {
  const [productData, setProductData] = useState({
    productName: '',
    productDescription: '',
    productPrice: '',
    productPictures: undefined,
    licenseNumber: localStorage.getItem('licenseNumber') || '' // Fetch license number from localStorage
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem('authToken');
    if (!token) {
      // If no token, redirect to login page
      alert('Please log in to access this page');
      navigate('/login');
    }
  }, [navigate]);

  const handleProductChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setProductData(prevData => ({
        ...prevData,
        productPictures: files
      }));
    } else {
      setProductData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('productName', productData.productName);
    formData.append('productDescription', productData.productDescription);
    formData.append('productPrice', productData.productPrice);
    formData.append('licenseNumber', productData.licenseNumber);
  
    try {
      const token = localStorage.getItem('authToken');
  
      const response = await fetch('http://localhost:5050/api/products/addproducts', {
        method: 'POST',
        headers: {
          'x-auth-token': token,
        },
        body: formData
      });
  
      if (response.status === 401) {
        // If token is invalid or missing, redirect to login page
        alert('Session expired or Invalid token. Please log in again.');
        localStorage.removeItem('authToken'); // Remove invalid token
        navigate('/login');
      } else if (response.ok) {
        const data = await response.json();
        alert(data.message);
        navigate('/dashboard');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error.message);
      alert('Error adding product: ' + error.message);
    }
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
