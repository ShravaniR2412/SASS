import React, { useState } from 'react';
import backgroundImage from '../../assets/imgbg.png';
import { useNavigate } from 'react-router-dom';

const AddServices = () => {
  const [forms, setForms] = useState([{ id: Date.now(), serviceName: '', cost: '', duration: '', category: '', imageUrl: '', description: '', additionalInfo: '' }]);
  const navigate = useNavigate();

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedForms = [...forms];
    updatedForms[index][name] = value; 
    setForms(updatedForms);
  };

  const addForm = () => {
    setForms([...forms, { id: Date.now(), serviceName: '', cost: '', duration: '', category: '', imageUrl: '', description: '', additionalInfo: '' }]);
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
  
    if (!licenseNumber || forms.some(form => !form.serviceName || !form.cost || !form.duration || !form.category)) {
      alert('All fields are required. Please fill out the service details and license number.');
      return;
    }
  
    const servicesData = forms.map((form) => ({
      serviceName: form.serviceName,
      cost: parseFloat(form.cost),
      duration: form.duration,
      category: form.category,
      imageUrl: form.imageUrl,
      description: form.description,
      additionalInfo: form.additionalInfo,
      licenseNumber: licenseNumber,
    }));
  
    try {
      const token = localStorage.getItem('authToken');
  
      const response = await fetch('http://localhost:5050/api/services/addservices', {
        method: 'POST',
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ services: servicesData }),
      });
  
      if (response.status === 401) {
        alert('Session expired or Invalid token. Please log in again.');
        localStorage.removeItem('authToken');
        navigate('/login');
      } else if (response.ok) {
        const data = await response.json();
        alert(data.message || 'Services added successfully.');
        navigate('/dashboard');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add services');
      }
    } catch (error) {
      console.error('Error adding services:', error.message);
      alert('Error adding services: ' + error.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <header className="text-center mb-6 p-6 bg-gradient-to-r from-teal-400 to-teal-500 rounded-t-lg">
        <h1 className="text-3xl font-bold text-white">Unleash Your Potential—List Your Services Here</h1>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        {forms.map((form, index) => (
          <div key={form.id} className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-center mb-4">Service {index + 1}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor={`category-${index}`} className="block mb-2 text-gray-700">Category:</label>
                <select
                  id={`category-${index}`}
                  name="category"
                  value={form.category}
                  onChange={(event) => handleChange(index, event)}
                  className="border border-gray-300 rounded-md p-2 w-full text-sm"
                >
                  <option value="" className="text-gray-500">Select a category</option>
                  <option value="HAIR">HAIR</option>
                  <option value="SKIN">SKIN</option>
                  <option value="MAKEUP">MAKEUP</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-gray-700">Name of Service:</label>
                <input 
                  type="text" 
                  name="serviceName" 
                  value={form.serviceName} 
                  onChange={(event) => handleChange(index, event)}
                  className="border border-gray-300 rounded-md p-2 w-full text-sm"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700">Cost:</label>
                <input 
                  type="text" 
                  name="cost" 
                  value={form.cost}
                  onChange={(event) => handleChange(index, event)}
                  className="border border-gray-300 rounded-md p-2 w-full text-sm"
                />
              </div>

              <div>
                <label htmlFor={`duration-${index}`} className="block mb-2 text-gray-700">Duration:</label>
                <input
                  type="text"
                  id={`duration-${index}`}
                  name="duration"
                  value={form.duration}
                  onChange={(event) => handleChange(index, event)}
                  placeholder="Enter duration"
                  className="border border-gray-300 rounded-md p-2 w-full text-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 text-gray-700">Description:</label>
                <textarea 
                  name="description"
                  value={form.description}
                  onChange={(event) => handleChange(index, event)}
                  className="border border-gray-300 rounded-md p-2 w-full text-sm"
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 text-gray-700">Additional Information:</label>
                <textarea 
                  name="additionalInfo"
                  value={form.additionalInfo}
                  onChange={(event) => handleChange(index, event)}
                  className="border border-gray-300 rounded-md p-2 w-full text-sm"
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <label htmlFor={`imageUrl-${index}`} className="block mb-2 text-gray-700">Image URL:</label>
                <input
                  type="text"
                  id={`imageUrl-${index}`}
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={(event) => handleChange(index, event)}
                  placeholder="Enter image URL"
                  className="border border-gray-300 rounded-md p-2 w-full text-sm"
                />
              </div>
            </div>
            <hr className="my-6 border-gray-300" />
          </div>
        ))}
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={addForm}
            className="bg-teal-500 text-white py-2 px-6 rounded-lg hover:bg-teal-600 transition duration-300 text-sm"
          >
            Add More Services
          </button>
          {forms.length > 1 && (
            <button
              type="button"
              onClick={() => deleteForm(forms.length - 1)}
              className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300 text-sm"
            >
              Delete
            </button>
          )}
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-teal-500 text-white py-2 px-6 rounded-lg hover:bg-teal-600 transition duration-300 text-sm"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddServices;
