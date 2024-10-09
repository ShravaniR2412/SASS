import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications

export default function EditPackage() {
  const { id } = useParams(); // Get the package ID from the URL
  const [packageData, setPackageData] = useState({
    packageName: '',
    description: '',
    price: '',
    duration: '',
    servicesIncluded: '',
    imageUrl: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await fetch(`http://localhost:5050/api/packages/${id}`, {
          headers: {
            'x-auth-token': localStorage.getItem('authToken'), // Include the token if needed
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPackageData(data);
        } else {
          console.error('Failed to fetch package details');
          toast.error('Failed to fetch package details'); // Notify user
        }
      } catch (error) {
        console.error('Error fetching package:', error.message);
        toast.error('Error fetching package details'); // Notify user
      }
    };

    fetchPackage();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackageData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5050/api/packages/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('authToken'), // Include the token if needed
        },
        body: JSON.stringify(packageData),
      });

      if (response.ok) {
        toast.success("Package updated successfully!");
        // Wait for toast to finish before navigating
        setTimeout(() => navigate('/admin/packages'), 2500);
      } else {
        const responseText = await response.text();
        console.error('Failed to update package:', responseText);
        toast.error(`Failed to update package: ${responseText}`); // Notify user
      }
    } catch (error) {
      console.error('Error updating package:', error.message);
      toast.error('Error updating package. Please try again.'); // Notify user
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto mr-20">
      <h2 className="text-2xl font-semibold mb-6 text-center">Edit Package</h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Package Name:
          </label>
          <input
            type="text"
            name="packageName"
            value={packageData.packageName}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description:
          </label>
          <textarea
            name="description"
            value={packageData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Price:
          </label>
          <input
            type="number"
            name="price"
            value={packageData.price}
            onChange={handleChange}
            required
            min="0" // Ensure price is non-negative
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Duration:
          </label>
          <input
            type="text"
            name="duration"
            value={packageData.duration}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Services Included:
          </label>
          <input
            type="text"
            name="servicesIncluded"
            value={packageData.servicesIncluded}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Comma-separated"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Image URL:
          </label>
          <input
            type="text"
            name="imageUrl"
            value={packageData.imageUrl}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition duration-200"
          >
            Update Package
          </button>
        </div>
      </form>
      <ToastContainer autoClose={2000} />
    </div>
  );
}
