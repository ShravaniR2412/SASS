import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const [forms, setForms] = useState([
    { id: Date.now(), productName: '', description: '', price: '', imageUrl: '' }
  ]);
  const navigate = useNavigate();

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedForms = [...forms];
    updatedForms[index][name] = value;
    setForms(updatedForms);
  };

  const addForm = () => {
    setForms([...forms, { id: Date.now(), productName: '', description: '', price: '', imageUrl: '' }]);
  };

  const deleteForm = (index) => {
    if (forms.length > 1) {
      const updatedForms = forms.filter((_, formIndex) => formIndex !== index);
      setForms(updatedForms);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const licenseNumber = localStorage.getItem('licenseNumber');

    // Basic validation
    if (!licenseNumber || forms.some(form => !form.productName || !form.price)) {
      alert('All fields are required. Please fill out product details.');
      return;
    }

    // Prepare product data for submission
    const productsData = forms.map((form) => ({
      productName: form.productName,
      description: form.description,
      price: parseFloat(form.price), // Ensure price is a number
      imageUrl: form.imageUrl,
      licenseNumber: licenseNumber,
    }));

    try {
      const token = localStorage.getItem('authToken');

      const response = await fetch('http://localhost:5050/api/products/addproducts', {
        method: 'POST',
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products: productsData }),
      });

      if (response.status === 401) {
        alert('Session expired or Invalid token. Please log in again.');
        localStorage.removeItem('authToken');
        navigate('/login');
      } else if (response.ok) {
        const data = await response.json();
        alert(data.message || 'Products added successfully.');
        navigate('/dashboard');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add products');
      }
    } catch (error) {
      console.error('Error adding products:', error.message);
      alert('Error adding products: ' + error.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <header className="text-center mb-4 p-4 bg-gradient-to-r from-teal-400 to-teal-500 rounded-t-lg">
          <h1 className="text-2xl font-semibold text-white">Add Multiple Products</h1>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          {forms.map((form, index) => (
            <div key={form.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h2 className="text-lg mb-3 font-medium">Product {index + 1}</h2>
              <label className="block mb-2 text-sm">
                <span className="text-gray-700">Product Name:</span>
                <input
                  type="text"
                  name="productName"
                  value={form.productName}
                  onChange={(event) => handleChange(index, event)}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md text-sm"
                />
              </label>
              <label className="block mb-2 text-sm">
                <span className="text-gray-700">Description:</span>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={(event) => handleChange(index, event)}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md text-sm"
                />
              </label>
              <label className="block mb-2 text-sm">
                <span className="text-gray-700">Price:</span>
                <input
                  type="text"
                  name="price"
                  value={form.price}
                  onChange={(event) => handleChange(index, event)}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md text-sm"
                />
              </label>
              <label className="block mb-4 text-sm">
                <span className="text-gray-700">Image URL:</span>
                <input
                  type="text"
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={(event) => handleChange(index, event)}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md text-sm"
                />
              </label>
              {forms.length > 1 && (
                <button
                  type="button"
                  onClick={() => deleteForm(index)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-600 transition duration-300 text-sm"
                >
                  Remove Product
                </button>
              )}
              <hr className="my-3 border-gray-300" />
            </div>
          ))}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={addForm}
              className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 transition duration-300 text-sm"
            >
              Add Another Product
            </button>
            <button
              type="submit"
              className="bg-teal-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-teal-600 transition duration-300 text-sm"
            >
              Submit Products
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}