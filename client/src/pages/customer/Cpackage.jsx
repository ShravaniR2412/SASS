import { useState } from 'react';
import { motion } from 'framer-motion'; // Import framer-motion
import Footer from '../../components/Footer'; // Import the Footer component
import Navbar from '../../components/Navbar'; // Import the Navbar component
import PackageCard from '../../components/Packagecard';

function Cpackage() {
  const packages = [
    {
        imageSrc: 'https://cdn11.bigcommerce.com/s-xyx0x9ybhg/images/stencil/1280x1280/products/316/9012/51wZC83hRrL._SL1500___02415.1721204262.jpg?c=2',
        imageAlt: 'Pantene Advanced Hair Fall Solution Shampoo',
        packageName: 'Hair Nourishment Treatment',
        outlets: 'Outlet 1',
        description: 'Deeply nourishes hair and strengthens from root to tip.',
        price: 500,
        duration: '30 min',
        services: ['Shampooing', 'Scalp Massage', 'Conditioning'],
      },
      {
        imageSrc: 'https://cdn.anscommerce.com/image/tr:e-sharpen-01,h-1500,w-1500,cm-pad_resize/catalog/philipspc/product/BHS732-10/BHS732-10_1.jpg',
        imageAlt: 'Professional Hair Straightener',
        packageName: 'Silk Straightening',
        outlets: 'Outlet 2',
        description: 'Achieve smooth, straight hair with our professional treatment.',
        price: 800,
        duration: '45 min',
        services: ['Straightening', 'Heat Protection Treatment'],
      },
      {
        imageSrc: 'https://dazller.co.in/cdn/shop/products/FRONTIMAGEBROWN.jpg?v=1712668524',
        imageAlt: 'Smudge-proof Eye Liner',
        packageName: 'Glamour Eye Makeup',
        outlets: 'Outlet 1',
        description: 'Elevate your look with our expert eye makeup application.',
        price: 300,
        duration: '15 min',
        services: ['Eyeliner Application', 'Makeup Touch-up'],
      },
      {
        imageSrc: 'https://www.reneecosmetics.in/cdn/shop/files/Renee_Stunner_Lipstick_Listing_Image_1_3060bef8-8ee6-4f75-b930-78fb60e9e5b2.jpg?v=1704702917',
        imageAlt: 'RENEE Stunner Matte Lipstick',
        packageName: 'Luxe Lip Makeover',
        outlets: 'Outlet 3',
        description: 'Get the perfect pout with our luxurious lip services.',
        price: 1200,
        duration: '1 hour',
        services: ['Lip Application', 'Makeup Consultation'],
      },
      {
        imageSrc: 'https://img1.wsimg.com/isteam/stock/2738/:/cr=t:0%25,l:0.12%25,w:99.75%25,h:100%25/rs=w:360,h:270.6766917293233,cg:true', // Add your new image URL
        imageAlt: 'Refreshing Facial Treatment',
        packageName: 'Rejuvenating Facial',
        outlets: 'Outlet 1',
        description: 'Revitalize your skin with our hydrating facial.',
        price: 900,
        duration: '1 hour',
        services: ['Cleansing', 'Exfoliation', 'Moisturizing'],
      },
      {
        imageSrc: 'https://img.freepik.com/premium-photo/professional-manicure-pedicure-services_269655-28591.jpg', // Add your new image URL
        imageAlt: 'Manicure and Pedicure',
        packageName: 'Spa Manicure & Pedicure',
        outlets: 'Outlet 2',
        description: 'Indulge in our soothing manicure and pedicure treatment.',
        price: 700,
        duration: '1 hour 30 min',
        services: ['Nail Shaping', 'Exfoliation', 'Moisturizing'],
      },
      {
        imageSrc: 'https://yesmadam.com/blog/wp-content/uploads/2021/07/WhatsApp-Image-2021-07-12-at-12.27.04-PM.jpeg', // Add your new image URL
        imageAlt: 'Professional Hair Color',
        packageName: 'Premium Hair Coloring',
        outlets: 'Outlet 3',
        description: 'Transform your look with vibrant, long-lasting hair color.',
        price: 1500,
        duration: '2 hours',
        services: ['Hair Coloring', 'Conditioning Treatment'],
      },
      {
        imageSrc: 'https://mjgorgeous.com/wp-content/uploads/2020/12/MACost2.jpg', // Add your new image URL
        imageAlt: 'Bridal Makeup Service',
        packageName: 'Bridal Makeup Package',
        outlets: 'Outlet 1',
        description: 'Look stunning on your special day with our bridal makeup services.',
        price: 3000,
        duration: '3 hours',
        services: ['Bridal Makeup', 'Trial Session'],
      },
      {
        imageSrc: 'https://img3.exportersindia.com/product_images/bc-full/2022/11/11343467/full-body-massage-services-1668578033-6626571.jpeg', // Add your new image URL
        imageAlt: 'Body Massage Therapy',
        packageName: 'Full Body Massage',
        outlets: 'Outlet 2',
        description: 'Relax and unwind with our therapeutic body massage.',
        price: 1200,
        duration: '1 hour',
        services: ['Swedish Massage', 'Aromatherapy'],
      },

  ];

  const outlets = ['All', 'Outlet 1', 'Outlet 2', 'Outlet 3'];
  const priceRanges = ['All', 'Below ₹500', '₹500 - ₹1000', 'Above ₹1000'];
  const durationRanges = ['All', 'Below 30 min', '30 min - 1 hour', 'Above 1 hour'];

  const [selectedOutlet, setSelectedOutlet] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [selectedDurationRange, setSelectedDurationRange] = useState('All');

  const getDurationInMinutes = (duration) => {
    const [value, unit] = duration.split(' ');
    return unit === 'hour' ? parseInt(value) * 60 : parseInt(value);
  };

  const filteredPackages = packages.filter(pkg => {
    const outletMatch = selectedOutlet === 'All' || pkg.outlets === selectedOutlet;

    let priceMatch = true;
    if (selectedPriceRange === 'Below ₹500') {
      priceMatch = pkg.price < 500;
    } else if (selectedPriceRange === '₹500 - ₹1000') {
      priceMatch = pkg.price >= 500 && pkg.price <= 1000;
    } else if (selectedPriceRange === 'Above ₹1000') {
      priceMatch = pkg.price > 1000;
    }

    let durationMatch = true;
    const durationInMinutes = getDurationInMinutes(pkg.duration);
    if (selectedDurationRange === 'Below 30 min') {
      durationMatch = durationInMinutes < 30;
    } else if (selectedDurationRange === '30 min - 1 hour') {
      durationMatch = durationInMinutes >= 30 && durationInMinutes <= 60;
    } else if (selectedDurationRange === 'Above 1 hour') {
      durationMatch = durationInMinutes > 60;
    }

    return outletMatch && priceMatch && durationMatch;
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
            <p className='w-max mx-auto text-center max-w-screen-lg text-gray-900 md:text-xl mb-2'>
              Explore our diverse range of beauty packages designed to pamper you from head to toe, making your beauty dreams a reality. Your journey to radiant beauty starts here!
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
              <label className="text-gray-700 font-semibold" htmlFor="duration-range-select">Filter by Duration:</label>
              <select
                id="duration-range-select"
                value={selectedDurationRange}
                onChange={(e) => setSelectedDurationRange(e.target.value)}
                className="p-2 border rounded shadow-sm hover:border-teal-500 transition duration-200"
              >
                {durationRanges.map((durationRange, index) => (
                  <option key={index} value={durationRange}>
                    {durationRange}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4 xl:grid-cols-4 xl:gap-8">
            {filteredPackages.map((pkg, index) => (
              <PackageCard
                key={index} // Add a key prop to help React identify each element
                imageSrc={pkg.imageSrc}
                imageAlt={pkg.imageAlt}
                packageName={pkg.packageName}
                outlets={pkg.outlets}  
                description={pkg.description}
                price={`₹${pkg.price}`}
                duration={pkg.duration}  
                services={pkg.services} // Pass the services here
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cpackage;
