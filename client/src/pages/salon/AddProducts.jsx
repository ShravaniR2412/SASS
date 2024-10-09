import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddProduct() {
  const [forms, setForms] = useState([
    { id: Date.now(), productName: '', description: '', price: '', imageUrl: '', category: '' }
  ]);
  const navigate = useNavigate();

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedForms = [...forms];
    updatedForms[index][name] = value;
    setForms(updatedForms);
  };

  const addForm = () => {
    setForms([...forms, { id: Date.now(), productName: '', description: '', price: '', imageUrl: '', category: '' }]);
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
      toast.error('All fields are required. Please fill out product details.');
      return;
    }

    // Prepare product data for submission
    const productsData = forms.map((form) => ({
      productName: form.productName,
      description: form.description,
      price: parseFloat(form.price), // Ensure price is a number
      imageUrl: form.imageUrl,
      licenseNumber: licenseNumber,
      category: form.category,
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
        toast.error('Session expired or invalid token. Please log in again.');
        localStorage.removeItem('authToken');
        navigate('/login');
      } else  if (response.ok) {
        toast.success("Products Added Successfully!"); // Show toast notification
        setTimeout(() => {
          navigate('/admin/products'); // Navigate after a delay to allow toast to display
        }, 2500);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add products');
      }
    } catch (error) {
      console.error('Error adding products:', error.message);
      toast.error('Error adding products: ' + error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mr-20">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <header className="text-center mb-4 p-4 bg-teal-500 rounded-t-lg">
          <h1 className="text-2xl font-semibold text-white">Add Products</h1>
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

              {/* Category Dropdown */}
              <label className="block mb-2 text-sm">
                <span className="text-gray-700">Category:</span>
                <select
                  name="category"
                  value={form.category}
                  onChange={(event) => handleChange(index, event)}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">Select Category</option>
                  <option value="Hair">Hair</option>
                  <option value="Makeup">Makeup</option>
                  <option value="Skin">Skin</option>
                  <option value="Eyes">Eyes</option>
                  <option value="Other">Other</option>
                </select>
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
      <ToastContainer autoClose={2000} /> {/* Auto close after 5 seconds */}
    </div>
  );
}
