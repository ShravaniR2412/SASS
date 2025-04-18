import { useState } from 'react';

export default function GlamEaseRecommender() {
  const [productType, setProductType] = useState('Serum');
  const [skinType, setSkinType] = useState('Dry');
  const [priceRange, setPriceRange] = useState(500);
  const [showRecommendations, setShowRecommendations] = useState(true);

  const products = [
    {
      id: 1,
      name: 'BE THE SKIN Botanical Pore Serum',
      image: '/api/placeholder/200/300',
      price: 547.00,
      similarity: 0.102
    },
    {
      id: 2,
      name: 'Innisfree Green Tea Seed Serum 160 mL',
      image: '/api/placeholder/200/300',
      price: 500.00,
      similarity: 0.075
    },
    {
      id: 3,
      name: 'VOTRE PEAU Serum Retinol Concentrate',
      image: '/api/placeholder/200/300',
      price: 215.00,
      similarity: 0.054
    },
    {
      id: 4,
      name: 'The Ordinary Niacinamide 10% + Zinc 1%',
      image: '/api/placeholder/200/300',
      price: 350.00,
      similarity: 0.123
    },
    {
      id: 5,
      name: 'Klairs Freshly Juiced Vitamin C Serum',
      image: '/api/placeholder/200/300',
      price: 650.00,
      similarity: 0.078
    },
    {
      id: 6,
      name: 'Cosrx Advanced Snail 96 Mucin Power Essence',
      image: '/api/placeholder/200/300',
      price: 450.00,
      similarity: 0.089
    },
    {
      id: 7,
      name: 'Dr. Jart+ Cicapair Serum',
      image: '/api/placeholder/200/300',
      price: 720.00,
      similarity: 0.067
    },
    {
      id: 8,
      name: 'Laneige Water Bank Hydro Essence',
      image: '/api/placeholder/200/300',
      price: 590.00,
      similarity: 0.092
    },
    {
      id: 9,
      name: 'Some By Mi AHA-BHA-PHA 30 Days Miracle Serum',
      image: '/api/placeholder/200/300',
      price: 420.00,
      similarity: 0.114
    }
  ];

  const handleGetRecommendations = () => {
    setShowRecommendations(true);
  };

  const handlePriceChange = (e) => {
    setPriceRange(Number(e.target.value));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white">
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
          className="bg-white border border-gray-300 rounded-md px-4 py-2 w-full md:w-auto flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <span className="text-yellow-400">✨</span> Get Recommendations
        </button>
      </div>
      
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
                    <span>Similarity: {product.similarity}</span>
                  </div>
                  
                  <button className="bg-teal-600 text-white rounded-md py-2 px-4 w-full flex items-center justify-center gap-2 hover:bg-teal-700 transition-colors">
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