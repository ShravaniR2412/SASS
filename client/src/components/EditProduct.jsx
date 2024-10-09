import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Make sure to import toast
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications

export default function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    productName: '',
    description: '',
    price: '',
    imageUrl: '',
    licenseNumber: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5050/api/products/${id}`, {
          headers: {
            'x-auth-token': localStorage.getItem('authToken'),
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          console.error('Failed to fetch product details');
          toast.error('Failed to fetch product details'); // Notify user
        }
      } catch (error) {
        console.error('Error fetching product:', error.message);
        toast.error('Error fetching product details'); // Notify user
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5050/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('authToken'),
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        toast.success("Product updated successfully!");


        

        setTimeout(() => {
          navigate('/admin/products'); // Navigate after a delay to allow toast to display
        }, 2500);




      } else {
        const responseText = await response.text();
        console.error('Failed to update product:', responseText);
        toast.error(`Failed to update product: ${responseText}`); // Notify user
      }
    } catch (error) {
      console.error('Error updating product:', error.message);
      toast.error('Error updating product. Please try again.'); // Notify user
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto mr-20">
      <h2 className="text-2xl font-semibold mb-6 text-center">Edit Product</h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Product Name:
          </label>
          <input
            type="text"
            name="productName"
            value={product.productName}
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
            value={product.description}
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
            value={product.price}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Image URL:
          </label>
          <input
            type="text"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            License Number:
          </label>
          <input
            type="text"
            name="licenseNumber"
            value={product.licenseNumber}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition duration-200"
          >
            Update Product
          </button>
        </div>
      </form>
      <ToastContainer autoClose={2000} />
    </div>
  );
}
