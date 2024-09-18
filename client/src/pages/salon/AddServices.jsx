import React, { useState } from 'react';
import backgroundImage from '../../assets/imgbg.png';
import { useNavigate } from 'react-router-dom';

const AddServices = () => {
  const [forms, setForms] = useState([{ id: Date.now(), serviceName: '', cost: '', duration: '', category: '', imageUrl: '', description: '', additionalInfo: ''  }]);
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
  
    // Basic validation
    if (!licenseNumber || forms.some(form => !form.serviceName || !form.cost || !form.duration || !form.category)) {
      alert('All fields are required. Please fill out the service details and license number.');
      return;
    }
  
    // Prepare service data for submission
    const servicesData = forms.map((form) => ({
      serviceName: form.serviceName,
      cost: parseFloat(form.cost), // Ensure cost is a number
      duration: form.duration,
      category: form.category,
      imageUrl: form.imageUrl,
      description: form.description,
      additionalInfo: form.additionalInfo,
      licenseNumber: licenseNumber, // Include license number
    }));
  
    try {
      const token = localStorage.getItem('authToken');
  
      const response = await fetch('http://localhost:5050/api/services/addservices', {
        method: 'POST',
        headers: {
          'x-auth-token': token, // Pass token for authentication
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ services: servicesData }), // Wrap servicesData in an object with 'services' key
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
    <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
      <header className="text-center mb-6 w-full p-10 bg-gray-300">
        <h1 className="text-3xl font-bold">Unleash your potential—list your services here.</h1>
      </header>

      <form onSubmit={handleSubmit} className="service-form space-y-4 mb-8 justify-center">
        {forms.map((form, index) => (
          <div key={form.id}>
            <h1 className="text-center text-1xl mb-8 font-xl">Service {index + 1}</h1>
            <div className='mx-10'>
              <label htmlFor={`category-${index}`} className="block mb-2 text-gray-700">
                Category:
              </label>
              <select
                id={`category-${index}`}
                name="category"
                value={form.category}
                onChange={(event) => handleChange(index, event)}
                className="border border-gray-300 rounded-md shadow-custom-light hover:shadow-custom-dark text-gray-900 text-sm focus:ring-teal-500 focus:border-gray-900 block w-full p-2.5">
                <option value="" className='text-gray-500'>Select a category</option>
                <option value="HAIR">HAIR</option>
                <option value="SKIN">SKIN</option>
                <option value="MAKEUP">MAKEUP</option>
                <option value="OTHER">OTHER</option>
              </select>
            </div> 

            <div className='flex mt-8'>
              <div className='flex-1 space-y-4'>
                <label className="block">
                  <span className="text-gray-700 ml-10 mb-8">Name of service:</span>
                  <input 
                    type="text" 
                    name="serviceName" 
                    value={form.serviceName} 
                    onChange={(event) => handleChange(index, event)}
                    className="mt-1 ml-10 block w-[550px] p-1 border border-gray-300 rounded-md shadow-custom-light hover:shadow-custom-dark" />
                </label>
                <label className="block">
                  <span className="text-gray-700 ml-10 mb-8">Cost:</span>
                  <input 
                    type="text" 
                    name="cost" 
                    value={form.cost}
                    onChange={(event) => handleChange(index, event)}
                    className="mt-1 ml-10 block w-[550px] p-1 border border-gray-300 rounded-md shadow-custom-light hover:shadow-custom-dark" />
                </label>
                <div className='mx-10'>
                  <label htmlFor={`duration-${index}`} className="block mb-2 text-gray-700">
                    Duration (e.g. 30 minutes, 2 hours):
                  </label>
                  <input
                    type="text"
                    id={`duration-${index}`}
                    name="duration"
                    value={form.duration}
                    onChange={(event) => handleChange(index, event)}
                    placeholder="Enter duration"
                    className="border border-gray-300 rounded-md shadow-custom-light hover:shadow-custom-dark text-gray-900 text-sm focus:ring-teal-500 focus:border-gray-900 block w-full p-2.5"
                  />
                </div> 
              </div>
              <div className="flex-1 w-48 h-[250px] flex flex-col items-center mr-10 relative">
                <div
                  className="w-48 h-48 mt-4 bg-gray-200 rounded-md overflow-hidden relative bg-no-repeat bg-center"
                  style={{ backgroundImage: `url(${backgroundImage})` }}
                >
                  {form.imageUrl && (
                    <img
                      src={form.imageUrl}
                      alt="Service Image"
                      className="object-contain w-full h-full"
                    />
                  )}
                </div>
                <label className="block mt-2">
                  <span className="text-gray-700">Image URL:</span>
                  <input
                    type="text"
                    name="imageUrl"
                    value={form.imageUrl}
                    onChange={(event) => handleChange(index, event)}
                    placeholder="Enter image URL"
                    className="mt-1 block w-full p-1 border border-gray-300 rounded-md shadow-custom-light hover:shadow-custom-dark"
                  />
                </label>
              </div>
            </div>
            <label className="block">
              <span className="text-gray-700 ml-10 mb-8">Description about service:</span>
              <textarea 
                name="description"
                value={form.description}
                onChange={(event) => handleChange(index, event)}
                className="mt-1 ml-10 block w-4/5 p-1 border border-gray-300 rounded-md shadow-custom-light hover:shadow-custom-dark"></textarea>
            </label>
            <label className="block mt-2">
              <span className="text-gray-700 ml-10  mb-8">Additional Information:</span>
              <textarea 
                name="additionalInfo"
                value={form.additionalInfo}
                onChange={(event) => handleChange(index, event)}
                className="mt-1 ml-10 block w-4/5 p-2 border border-gray-300 rounded-md shadow-custom-light hover:shadow-custom-dark"></textarea>
            </label>
            <hr className="mt-8 mb-8" />
          </div>
        ))}
        <div className="flex justify-between ml-20 mr-40">
          <button type="button" onClick={addForm} className="submit-btn border-0 text-teal-500 py-2 px-4 rounded-lg w-max text-center hover:bg-teal-50 shadow-md transition-shadow duration-300 active:shadow-lg">
            Add More Services
          </button>
          {forms.length > 1 && (
            <button type="button" onClick={() => deleteForm(forms.length - 1)} className="submit-btn border-0 text-teal-500 py-2 px-4 rounded-lg w-max text-center hover:bg-teal-50 shadow-md transition-shadow duration-300 active:shadow-lg">
              Delete
            </button>
          )}
        </div>
        <div className="flex justify-center mt-4">
          <button type="submit" className="submit-btn bg-teal-500 text-white py-2 px-4 rounded-lg w-max text-center hover:shadow-custom-dark active:bg-gray-200 transition-shadow duration-300 shadow-custom-light">
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddServices;
