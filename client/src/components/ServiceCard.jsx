import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ServiceCard = ({ imageSrc, imageAlt, serviceName, description, price, duration }) => {
  return (
    <motion.div 
      className="flex flex-col overflow-hidden rounded-lg border bg-white shadow-lg"
      initial={{ opacity: 0, y: 20 }}  // Fade in and slide up when entering
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5, ease: 'easeOut' }}  // Animation timing
    >
      <a href="#" className="group relative block h-70 overflow-hidden bg-gray-100 md:h-64">
        <motion.img
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover object-center"
          whileHover={{ scale: 1.1 }}  // Image zoom on hover
          transition={{ duration: 0.3 }}
          loading="lazy"
        />
      </a>

      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <h2 className="mb-2 text-lg font-semibold text-gray-800">
          <a href="#" className="transition duration-100 hover:text-teal-500 active:text-teal-600">
            {serviceName}
          </a>
        </h2>

        <p className="mb-4 text-gray-500">
          {description}
        </p>

        <div className="mt-auto flex items-end justify-between">
          <div className="flex items-center gap-2">
            <div>
              <span className="block text-teal-600">{price}</span>
              <span className="block text-gray-600 text-sm">Duration: {duration}</span>
            </div>
          </div>

          <motion.span
            className="rounded border px-2 py-1 text-sm text-gray-500 cursor-pointer"
            whileHover={{
              backgroundColor: '#38b2ac', // Change to teal
              color: '#fff', // White text on hover
              transition: { duration: 0.3 },
            }}
          >
             <Link
            to='/booking'>
            Book Now
            </Link>
          </motion.span>  {/* Framer Motion hover effect on button */}
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
