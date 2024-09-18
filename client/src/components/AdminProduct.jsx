import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Use for navigation

export default function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [licenseNumber, setLicenseNumber] = useState('');
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    const storedLicenseNumber = localStorage.getItem('licenseNumber');
    setLicenseNumber(storedLicenseNumber || '');

    // Fetch products from the server
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5050/api/products/getproducts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('authToken'), // Include the token if needed
          },
          body: JSON.stringify({ licenseNumber: storedLicenseNumber }), // Send license number in body
        });

        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5050/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('authToken'), // Include the token if needed
        },
      });
  
      // Check for successful response
      if (response.ok) {
        setProducts(products.filter((product) => product._id !== productId));
        alert('Product deleted successfully');
      } else {
        const responseText = await response.text();
        console.error('Failed to delete product:', responseText);
      }
    } catch (error) {
      console.error('Error deleting product:', error.message);
    }
  };

  const handleUpdate = (product) => {
    navigate(`update/${product._id}`); // Navigate to the update form with product ID
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center">Product List</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-teal-200 text-teal-800">
          <tr>
            <th className="py-3 px-4 border-b border-r">Product Name</th>
            <th className="py-3 px-4 border-b border-r">Description</th>
            <th className="py-3 px-4 border-b border-r">Price</th>
            <th className="py-3 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-gray-100">
              <td className="py-3 px-4 border-b border-r">{product.productName}</td>
              <td className="py-3 px-4 border-b border-r">{product.description}</td>
              <td className="py-3 px-4 border-b border-r">{product.price}</td>
              <td className="py-3 px-4 border-b flex space-x-2">
                <button
                  className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition duration-200"
                  onClick={() => handleUpdate(product)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                  onClick={() => handleDelete(product._id)}
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
