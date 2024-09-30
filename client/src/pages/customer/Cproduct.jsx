import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Footer from '../../components/Footer'; // Import the Footer component
import Navbar from '../../components/Navbar'; // Import the Navbar component
import ProductCard from '../../components/ProductCard';

function Cproduct() {
  const [products, setProducts] = useState([]);
  const [selectedOutlet, setSelectedOutlet] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5050/api/products/getallproducts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('authToken'), // Include the token if needed
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setProducts(data); // Set the fetched products in state
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };
  

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on the selected outlet, price range, and category
  const filteredProducts = products.filter(product => {
    const outletMatch = selectedOutlet === 'All' || product.outlets === selectedOutlet;
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    let priceMatch = true;

    if (selectedPriceRange === 'Below ₹500') {
      priceMatch = product.price < 500;
    } else if (selectedPriceRange === '₹500 - ₹1000') {
      priceMatch = product.price >= 500 && product.price <= 1000;
    } else if (selectedPriceRange === 'Above ₹1000') {
      priceMatch = product.price > 1000;
    }

    return outletMatch && categoryMatch && priceMatch;
  });

  return (
    <>
      <Navbar />
      <div className="bg-white py-2 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:mb-16 flex flex-col items-end justify-between"
          >
            <h5 className="mb-2 mx-auto max-w-screen-md font-bold text-gray-900 md:text-2xl">
              Where Your Beauty Dreams Become Reality
            </h5>
            <p className="w-max mx-auto text-center max-w-screen-lg text-gray-900 md:text-xl mb-2">
              Explore our diverse range of services designed to pamper you from head to toe, making your beauty dreams a reality. Your journey to radiant beauty starts here!
            </p>
          </motion.div>

          {/* Filters Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex gap-8 border-b border-gray-300 pb-4"
          >
            <div className="flex gap-2 items-center">
              <label className="text-gray-700 font-semibold" htmlFor="price-range-select">Filter by Price Range:</label>
              <select
                id="price-range-select"
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="p-2 border rounded shadow-sm hover:border-teal-500 transition duration-200"
              >
                {['All', 'Below ₹500', '₹500 - ₹1000', 'Above ₹1000'].map((priceRange, index) => (
                  <option key={index} value={priceRange}>
                    {priceRange}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 items-center">
              <label className="text-gray-700 font-semibold" htmlFor="category-select">Filter by Category:</label>
              <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-2 border rounded shadow-sm hover:border-teal-500 transition duration-200"
              >
                {['All', 'Hair', 'Makeup', 'Skin', 'Eyes', 'Other'].map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4 xl:grid-cols-4 xl:gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={index}
                imageSrc={product.imageUrl}
                imageAlt={product.productName}
                serviceName={product.productName}
                description={product.description}
                price={`₹${product.price}`}
                category={product.category}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cproduct;
