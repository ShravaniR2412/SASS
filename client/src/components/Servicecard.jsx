import React from 'react';

const ServiceCard = ({ imageSrc, imageAlt, serviceName, outlets, description, price, category }) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border bg-white transition-shadow duration-300 shadow-lg">
      <a href="#" className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64">
        <img 
          src={imageSrc} 
          alt={imageAlt} 
          className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" 
          loading="lazy"
        />
      </a>

      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <h2 className="mb-2 text-lg font-semibold text-gray-800">
          <a href="#" className="transition duration-100 hover:text-teal-500 active:text-teal-600">
            {serviceName}
          </a>
          <span className="block text-sm text-pink-700">{outlets}</span>
          <span className="block text-xs text-white">{category}</span> {/* Added category field */}
        </h2>

        <p className="mb-8 text-gray-500">
          {description}
        </p>

        <div className="mt-auto flex items-end justify-between">
          <div className="flex items-center gap-2">
            <div>
              <span className="block text-teal-600">{price}</span>
            </div>
          </div>

          <span className="rounded border px-2 py-1 text-sm text-gray-500 hover:bg-teal-600 hover:text-white cursor-pointer active:bg-teal-500">
            Buy Now
          </span>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
