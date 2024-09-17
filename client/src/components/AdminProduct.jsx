import React, { useState, useEffect } from 'react';

export default function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [licenseNumber, setLicenseNumber] = useState('');

  useEffect(() => {
    
    const storedLicenseNumber = localStorage.getItem('licenseNumber');
    setLicenseNumber(storedLicenseNumber || '');

    // Fetch products from the server
    const fetchProducts = async () => {
      try {
        const storedLicenseNumber = localStorage.getItem('licenseNumber');
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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Product List</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Product Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="py-2 px-4 border-b">{product.productName}</td>
              <td className="py-2 px-4 border-b">{product.description}</td>
              <td className="py-2 px-4 border-b">{product.price}</td>
              <td className="py-2 px-4 border-b flex space-x-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded">Update</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
