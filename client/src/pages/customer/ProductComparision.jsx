import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function GlamEaseRecommender() {
  const navigate = useNavigate();
  const [productType, setProductType] = useState('Serum');
  const [skinType, setSkinType] = useState('Dry');
  const [priceRange, setPriceRange] = useState(500);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  const handleGetRecommendations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:5000/api/recommendations', {
        productType,
        skinType,
        priceRange
      });
      setProducts(response.data);
      setShowRecommendations(true);
    } catch (err) {
      setError('Failed to fetch recommendations. Please try again.');
      console.error('Error fetching recommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePriceChange = (e) => {
    setPriceRange(Number(e.target.value));
  };

  const addToCart = (product) => {
    setCart(prevCart => {
      // Check if product already exists in cart
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Add new product to cart
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    // Here you can add any checkout logic like saving order to database
    alert('Order placed successfully! Thank you for shopping with us.');
    setCart([]); // Clear the cart
    navigate('/'); // Navigate to home page
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white">
      {/* Cart Section */}
      {cart.length > 0 && (
        <div className="bg-teal-50 rounded-xl shadow-sm p-6 mb-8 border border-teal-100">
          <h2 className="text-2xl font-semibold mb-4 text-teal-800">🛒 Your Cart</h2>
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg border border-teal-200">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
                  <div>
                    <h3 className="font-medium text-teal-700">{item.name}</h3>
                    <p className="text-sm text-gray-600">₹{item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 bg-teal-100 text-teal-700 rounded hover:bg-teal-200"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-teal-100 text-teal-700 rounded hover:bg-teal-200"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-teal-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-teal-800">Total:</span>
              <span className="text-xl font-bold text-teal-700">₹{getTotalPrice().toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
            >
              <span>💳</span> Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">GlamEase</h1>
        <p className="text-xl text-teal-600">Skin Care Product Recommender</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Select Product Type</label>
            <select 
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full focus:ring-2 focus:ring-teal-300 focus:border-teal-500"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            >
              <option value="Serum">Serum</option>
              <option value="Moisturizer">Moisturizer</option>
              <option value="Cleanser">Cleanser</option>
              <option value="Toner">Toner</option>
              <option value="Mask">Mask</option>
            </select>
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Select Skin Type</label>
            <select 
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 w-full focus:ring-2 focus:ring-teal-300 focus:border-teal-500"
              value={skinType}
              onChange={(e) => setSkinType(e.target.value)}
            >
              <option value="Dry">Dry</option>
              <option value="Oily">Oily</option>
              <option value="Combination">Combination</option>
              <option value="Normal">Normal</option>
              <option value="Sensitive">Sensitive</option>
            </select>
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Max Price Range (₹)</label>
            <div className="mt-2">
              <div className="text-right mb-1 font-medium text-teal-600">₹{priceRange}</div>
              <input 
                type="range" 
                min="100" 
                max="5000" 
                step="100"
                value={priceRange}
                onChange={handlePriceChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹100</span>
                <span>₹5000</span>
              </div>
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleGetRecommendations}
          disabled={loading}
          className="bg-white border border-gray-300 rounded-md px-4 py-2 w-full md:w-auto flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <span className="text-yellow-400">⏳</span>
          ) : (
            <span className="text-yellow-400">✨</span>
          )}
          {loading ? 'Loading...' : 'Get Recommendations'}
        </button>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      {showRecommendations && (
        <div>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-gray-800">
            <span className="text-pink-400">🧴</span> Top 10 Similar Products
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-green-50 rounded-lg overflow-hidden">
                <div className="bg-white p-4 m-2 mb-4 flex justify-center">
                  <img src={product.image} alt={product.name} className="h-48 object-contain" />
                </div>
                <div className="px-4 pb-4">
                  <h3 className="text-teal-700 font-medium text-center mb-3">{product.name}</h3>
                  
                  <div className="flex justify-center items-center gap-2 mb-3">
                    <span className="text-yellow-500">💰</span>
                    <span>₹{product.price.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-center items-center gap-2 mb-4 text-purple-600 text-sm">
                    <span>🔮</span>
                    <span>Similarity: {product.similarity.toFixed(3)}</span>
                  </div>
                  
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-teal-600 text-white rounded-md py-2 px-4 w-full flex items-center justify-center gap-2 hover:bg-teal-700 transition-colors"
                  >
                    <span>🛒</span> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}