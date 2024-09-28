import { useState } from 'react';
import Footer from '../../components/Footer'; // Import the Footer component
import Navbar from '../../components/Navbar'; // Import the Navbar component
import ServiceCard from '../../components/Servicecard'; 

function Cproduct() {
  const services = [
    {
      imageSrc: 'https://cdn11.bigcommerce.com/s-xyx0x9ybhg/images/stencil/1280x1280/products/316/9012/51wZC83hRrL._SL1500___02415.1721204262.jpg?c=2',
      imageAlt: 'Hair spa',
      serviceName: 'Pantene Shampoo',
      outlets: 'Outlet 1',
      description: 'Pantene Advanced Hair Fall Solution Shampoo, 1 L',
      price: 500,
      category: 'Hair',
    },
    {
      imageSrc: 'https://cdn.anscommerce.com/image/tr:e-sharpen-01,h-1500,w-1500,cm-pad_resize/catalog/philipspc/product/BHS732-10/BHS732-10_1.jpg',
      imageAlt: 'facial',
      serviceName: 'Hair Straightener',
      outlets: 'Outlet 2',
      description: 'UV Protect Hair Straightener | Argan oil Floating plates | ThermoShield Tech | BHS732/10',
      price: 800,
      category: 'Hair',
    },
    {
      imageSrc: 'https://dazller.co.in/cdn/shop/products/FRONTIMAGEBROWN.jpg?v=1712668524',
      imageAlt: 'manicure',
      serviceName: 'Eye Liner',
      outlets: 'Outlet 1',
      description: 'Ultimate choice for anyone looking for a smudge-proof, waterproof, long-lasting, quick-drying, lightweight, single stroke application eyeliner with a velvet finish.',
      price: 300,
      category: 'Makeup',
    },
    {
      imageSrc: 'https://www.reneecosmetics.in/cdn/shop/files/Renee_Stunner_Lipstick_Listing_Image_1_3060bef8-8ee6-4f75-b930-78fb60e9e5b2.jpg?v=1704702917',
      imageAlt: 'facial',
      serviceName: 'RENEE Stunner Matte Lipstick',
      outlets: 'Outlet 3',
      description: 'RENEE Stunner Matte Lipstick‘s velvety texture glides effortlessly onto your lips',
      price: 1200,
      category: 'Makeup',
    },
    {
      imageSrc: 'https://cdn11.bigcommerce.com/s-xyx0x9ybhg/images/stencil/1280x1280/products/316/9012/51wZC83hRrL._SL1500___02415.1721204262.jpg?c=2',
      imageAlt: 'Hair spa',
      serviceName: 'Pantene Shampoo',
      outlets: 'Outlet 1',
      description: 'Pantene Advanced Hair Fall Solution Shampoo, 1 L',
      price: 500,
      category: 'Hair',
    },
    {
      imageSrc: 'https://cdn.anscommerce.com/image/tr:e-sharpen-01,h-1500,w-1500,cm-pad_resize/catalog/philipspc/product/BHS732-10/BHS732-10_1.jpg',
      imageAlt: 'facial',
      serviceName: 'Hair Straightener',
      outlets: 'Outlet 2',
      description: 'UV Protect Hair Straightener | Argan oil Floating plates | ThermoShield Tech | BHS732/10',
      price: 800,
      category: 'Hair',
    },
    {
      imageSrc: 'https://dazller.co.in/cdn/shop/products/FRONTIMAGEBROWN.jpg?v=1712668524',
      imageAlt: 'manicure',
      serviceName: 'Eye Liner',
      outlets: 'Outlet 1',
      description: 'Ultimate choice for anyone looking for a smudge-proof, waterproof, long-lasting, quick-drying, lightweight, single stroke application eyeliner with a velvet finish.',
      price: 300,
      category: 'Makeup',
    },
    {
      imageSrc: 'https://www.reneecosmetics.in/cdn/shop/files/Renee_Stunner_Lipstick_Listing_Image_1_3060bef8-8ee6-4f75-b930-78fb60e9e5b2.jpg?v=1704702917',
      imageAlt: 'facial',
      serviceName: 'RENEE Stunner Matte Lipstick',
      outlets: 'Outlet 3',
      description: 'RENEE Stunner Matte Lipstick‘s velvety texture glides effortlessly onto your lips',
      price: 1200,
      category: 'Makeup',
    },
    {
      imageSrc: 'https://cdn11.bigcommerce.com/s-xyx0x9ybhg/images/stencil/1280x1280/products/316/9012/51wZC83hRrL._SL1500___02415.1721204262.jpg?c=2',
      imageAlt: 'Hair spa',
      serviceName: 'Pantene Shampoo',
      outlets: 'Outlet 1',
      description: 'Pantene Advanced Hair Fall Solution Shampoo, 1 L',
      price: 500,
      category: 'Hair',
    },
    {
      imageSrc: 'https://cdn.anscommerce.com/image/tr:e-sharpen-01,h-1500,w-1500,cm-pad_resize/catalog/philipspc/product/BHS732-10/BHS732-10_1.jpg',
      imageAlt: 'facial',
      serviceName: 'Hair Straightener',
      outlets: 'Outlet 2',
      description: 'UV Protect Hair Straightener | Argan oil Floating plates | ThermoShield Tech | BHS732/10',
      price: 800,
      category: 'Hair',
    },
    {
      imageSrc: 'https://dazller.co.in/cdn/shop/products/FRONTIMAGEBROWN.jpg?v=1712668524',
      imageAlt: 'manicure',
      serviceName: 'Eye Liner',
      outlets: 'Outlet 1',
      description: 'Ultimate choice for anyone looking for a smudge-proof, waterproof, long-lasting, quick-drying, lightweight, single stroke application eyeliner with a velvet finish.',
      price: 300,
      category: 'Makeup',
    },
    {
      imageSrc: 'https://www.reneecosmetics.in/cdn/shop/files/Renee_Stunner_Lipstick_Listing_Image_1_3060bef8-8ee6-4f75-b930-78fb60e9e5b2.jpg?v=1704702917',
      imageAlt: 'facial',
      serviceName: 'RENEE Stunner Matte Lipstick',
      outlets: 'Outlet 3',
      description: 'RENEE Stunner Matte Lipstick‘s velvety texture glides effortlessly onto your lips',
      price: 1200,
      category: 'Makeup',
    },
  ];

  const outlets = ['All', 'Outlet 1', 'Outlet 2', 'Outlet 3'];
  const priceRanges = ['All', 'Below ₹500', '₹500 - ₹1000', 'Above ₹1000'];
  const categories = ['All', 'Hair', 'Makeup', 'Skin', 'Eyes', 'Other'];

  const [selectedOutlet, setSelectedOutlet] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter services based on the selected outlet, price range, and category
  const filteredServices = services.filter(service => {
    const outletMatch = selectedOutlet === 'All' || service.outlets === selectedOutlet;
    const categoryMatch = selectedCategory === 'All' || service.category === selectedCategory;
    let priceMatch = true;

    if (selectedPriceRange === 'Below ₹500') {
      priceMatch = service.price < 500;
    } else if (selectedPriceRange === '₹500 - ₹1000') {
      priceMatch = service.price >= 500 && service.price <= 1000;
    } else if (selectedPriceRange === 'Above ₹1000') {
      priceMatch = service.price > 1000;
    }

    return outletMatch && categoryMatch && priceMatch;
  });

  return (
    <>
    <Navbar />
    <div className="bg-white py-2 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="md:mb-16 flex flex-col items-end justify-between ">
          <h5 className="mb-2 mx-auto max-w-screen-md font-bold text-gray-900 md:text-2xl">
            Where Your Beauty Dreams Become Reality
          </h5>
          <p className='w-max mx-auto text-center max-w-screen-lg text-gray-900 md:text-xl mb-2'>
            Explore our diverse range of services designed to pamper you from head to toe, making your beauty dreams a reality. Your journey to radiant beauty starts here!
          </p>
        </div>

        {/* Filters Section */}
        <div className="mb-8 flex gap-8 border-b border-gray-300 pb-4">
          <div className="flex gap-2 items-center">
            <label className="text-gray-700 font-semibold" htmlFor="outlet-select">Filter by Outlet:</label>
            <select
              id="outlet-select"
              value={selectedOutlet}
              onChange={(e) => setSelectedOutlet(e.target.value)}
              className="p-2 border rounded shadow-sm hover:border-teal-500 transition duration-200"
            >
              {outlets.map((outlet, index) => (
                <option key={index} value={outlet}>
                  {outlet}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 items-center">
            <label className="text-gray-700 font-semibold" htmlFor="price-range-select">Filter by Price Range:</label>
            <select
              id="price-range-select"
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="p-2 border rounded shadow-sm hover:border-teal-500 transition duration-200"
            >
              {priceRanges.map((priceRange, index) => (
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
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4 xl:grid-cols-4 xl:gap-8">
          {filteredServices.map((service, index) => (
            <ServiceCard 
              key={index}
              imageSrc={service.imageSrc}
              imageAlt={service.imageAlt}
              serviceName={service.serviceName}
              outlets={service.outlets}  
              description={service.description}
              price={`₹${service.price}`}
              category={service.category} 
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
