import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function ProductCard({
  imageSrc,
  imageAlt,
  serviceName,
  description,
  price,
  category,
  salonName,
  salonNameClass,
  productId
}) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Navigate to the product detail page with the product ID
    navigate(`/product/${productId || 'default-product'}`);
  };

  return (
    <motion.div
      whileHover={{ 
        scale: 1.03,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      transition={{ type: 'spring', stiffness: 300 }}
      onClick={handleCardClick}
      className="flex flex-col h-full overflow-hidden rounded-lg border-2 border-gray-200 cursor-pointer"
    >
      {/* Image container with fixed aspect ratio */}
     
      <div className="w-full h-48 overflow-hidden bg-gray-100 flex justify-center items-center">
        <img
          src={imageSrc || "/api/placeholder/300/300"}
          alt={imageAlt}
          className="object-cover w-full h-full"
        />
        <div className="absolute top-2 left-2 bg-white/80 rounded-full px-2 py-1 text-xs font-semibold text-gray-700">
          {category}
        </div>
      </div>
        
      
      
      {/* Content section */}
      <div className="flex flex-col flex-grow p-4">
        <div className={salonNameClass || "text-gray-600 text-sm"}>
          {salonName}
        </div>
        
        <h3 className="text-lg font-semibold text-gray-800 mt-1">
          {serviceName}
        </h3>
        
        <p className="mt-2 text-gray-600 line-clamp-2 text-sm flex-grow">
          {description}
        </p>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-gray-900 font-bold">{price}</span>
          <div className="flex items-center space-x-1">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4].map((star) => (
                <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M12 17.27L15 19.5l-1.64-7.03L22 9.24l-7.19-.61L12 2" fill="currentColor" />
              </svg>
            </div>
            <span className="text-xs text-gray-500">(4.5)</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;