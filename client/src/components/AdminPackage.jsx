import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Use for navigation

export default function AdminPackages() {
  const [packages, setPackages] = useState([]);
  const [licenseNumber, setLicenseNumber] = useState('');
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    const storedLicenseNumber = localStorage.getItem('licenseNumber');
    setLicenseNumber(storedLicenseNumber || '');

    // Fetch packages from the server
    const fetchPackages = async () => {
      try {
        const response = await fetch('http://localhost:5050/api/packages/getpackages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('authToken'), // Include the token if needed
          },
          body: JSON.stringify({ licenseNumber: storedLicenseNumber }), // Send license number in body
        });

        if (response.ok) {
          const data = await response.json();
          setPackages(data);
        } else {
          console.error('Failed to fetch packages');
        }
      } catch (error) {
        console.error('Error fetching packages:', error.message);
      }
    };

    fetchPackages();
  }, []);

  const handleDelete = async (packageId) => {
    try {
      const response = await fetch(`http://localhost:5050/api/packages/${packageId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('authToken'), // Include the token if needed
        },
      });
  
      // Check for successful response
      if (response.ok) {
        setPackages(packages.filter((pkg) => pkg._id !== packageId));
        alert('Package deleted successfully');
      } else {
        const responseText = await response.text();
        console.error('Failed to delete package:', responseText);
      }
    } catch (error) {
      console.error('Error deleting package:', error.message);
    }
  };

  const handleUpdate = (pkg) => {
    navigate(`update/${pkg._id}`); // Navigate to the update form with package ID
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center">Package List</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-teal-200 text-teal-800">
          <tr>
            <th className="py-3 px-4 border-b border-r">Package Name</th>
            <th className="py-3 px-4 border-b border-r">Description</th>
            <th className="py-3 px-4 border-b border-r">Price</th>
            <th className="py-3 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg) => (
            <tr key={pkg._id} className="hover:bg-gray-100">
              <td className="py-3 px-4 border-b border-r">{pkg.packageName}</td>
              <td className="py-3 px-4 border-b border-r">{pkg.description}</td>
              <td className="py-3 px-4 border-b border-r">{pkg.price}</td>
              <td className="py-3 px-4 border-b flex space-x-2">
                <button
                  className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition duration-200"
                  onClick={() => handleUpdate(pkg)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                  onClick={() => handleDelete(pkg._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
