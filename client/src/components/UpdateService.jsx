import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateService() {
  const { id } = useParams(); // Get service ID from URL
  const navigate = useNavigate();
  const [service, setService] = useState({
    serviceName: '',
    category: '',
    cost: '',
    duration: '',
    imageUrl: '',
    description: '',
    additionalInfo: '',
  });

  useEffect(() => {
    
    if (id) {
        const fetchService = async () => {
            try {
              const token = localStorage.getItem("authToken");
              const response = await fetch(`http://localhost:5050/api/services/getservicebyid`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'x-auth-token': token,
                },
                body: JSON.stringify({ id }) // Send the ID in the request body
              });
          
              if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
              }
          
              const data = await response.json();
              setService(data.data); // Adjust based on your API response structure
            } catch (error) {
              console.error('Error fetching service:', error.message);
            }
          };
          

      fetchService();
    }
  }, [id]);

  const handleChange = (e) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`http://localhost:5050/api/services/updateservice/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(service),
      });
  
      const responseText = await response.text(); // Read the response as text first
      console.log('Response Text:', responseText); // Log the response for debugging
  
      if (response.ok) {
        // Try to parse the response as JSON
        const data = JSON.parse(responseText);
        alert('Service updated successfully');
        navigate('/admin/services'); // Redirect to the service list page or any desired route
      } else {
        // Handle non-200 responses
        console.error('Failed to update service:', responseText);
        alert('Failed to update service. Please try again.');
      }
    } catch (error) {
      console.error('Error updating service:', error.message);
      alert('Error updating service. Please try again later.');
    }
  };
  

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Update Service</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Service Name</label>
          <input
            type="text"
            name="serviceName"
            value={service.serviceName}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={service.category}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Cost</label>
          <input
            type="number"
            name="cost"
            value={service.cost}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Duration</label>
          <input
            type="text"
            name="duration"
            value={service.duration}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={service.imageUrl}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={service.description}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Additional Info</label>
          <textarea
            name="additionalInfo"
            value={service.additionalInfo}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
}
