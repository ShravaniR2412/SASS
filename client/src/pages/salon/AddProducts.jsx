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
    <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
      <header className="text-center mb-6 w-full p-10 bg-gray-300">
        <h1 className="text-3xl font-bold">Add Multiple Products</h1>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        {forms.map((form, index) => (
          <div key={form.id} className="mb-8">
            <h2 className="text-xl mb-4">Product {index + 1}</h2>
            <label className="block mb-2">
              <span className="text-gray-700">Product Name:</span>
              <input
                type="text"
                name="productName"
                value={form.productName}
                onChange={(event) => handleChange(index, event)}
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">Description:</span>
              <textarea
                name="description"
                value={form.description}
                onChange={(event) => handleChange(index, event)}
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">Price:</span>
              <input
                type="text"
                name="price"
                value={form.price}
                onChange={(event) => handleChange(index, event)}
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">Image URL:</span>
              <input
                type="text"
                name="imageUrl"
                value={form.imageUrl}
                onChange={(event) => handleChange(index, event)}
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
            </label>
            {forms.length > 1 && (
              <button type="button" onClick={() => deleteForm(index)} className="text-red-500">
                Remove Product
              </button>
            )}
            <hr className="my-4" />
          </div>
        ))}
        <button type="button" onClick={addForm} className="bg-blue-500 text-white py-2 px-4 rounded">
          Add Another Product
        </button>
        <button type="submit" className="bg-teal-500 text-white py-2 px-4 rounded ml-4">
          Submit Products
        </button>
      </form>
    </div>
  );
}
