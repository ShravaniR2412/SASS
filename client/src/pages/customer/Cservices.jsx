import { useState } from 'react';
import { motion } from 'framer-motion';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import ServiceCard from '../../components/ServiceCard';

function Cservices() {
      const services = [
      {
        imageSrc: 'https://cdn.pixabay.com/photo/2021/08/12/04/42/wedding-6539887_1280.jpg',
        imageAlt: 'Hair Styling',
        serviceName: 'Hair Styling',
        outlets: 'Outlet 1',
        description: 'Professional styling for all occasions.',
        price: 600,
        duration: '1 hour',
        services: ['Haircut', 'Styling', 'Finishing'],
      },
      {
        imageSrc: 'https://cdn.pixabay.com/photo/2023/08/31/08/58/facial-8224799_1280.jpg',
        imageAlt: 'Facial Treatment',
        serviceName: 'Facial Treatment',
        outlets: 'Outlet 2',
        description: 'Rejuvenating facial for glowing skin.',
        price: 800,
        duration: '1 hour',
        services: ['Cleansing', 'Exfoliating', 'Moisturizing'],
      },


      {
        imageSrc: 'https://cdn.pixabay.com/photo/2016/06/11/12/13/pink-hair-1450045_1280.jpg',
        imageAlt: 'Hair Color',
        serviceName: 'Hair Coloring',
        outlets: 'Outlet 3',
        description: 'Dazzle with a new hair color.',
        price: 1200,
        duration: '2 hours',
        services: ['Color Consultation', 'Application', 'Styling'],
      },
      {
        imageSrc: 'https://media.istockphoto.com/id/1308840699/photo/woman-doing-manicure.jpg?s=2048x2048&w=is&k=20&c=TbwVEkMBxLTVKJ9JDbvcnha4E-5m87BAoC3k1-y2NSs=',
        imageAlt: 'Manicure',
        serviceName: 'Manicure',
        outlets: 'Outlet 3',
        description: 'Pampering your hands with a perfect manicure.',
        price: 400,
        duration: '45 minutes',
        services: ['Nail Shaping', 'Cuticle Care', 'Polish'],
      },
      {
        imageSrc: 'https://cdn.pixabay.com/photo/2016/12/06/04/18/foot-1885546_1280.jpg',
        imageAlt: 'Pedicure',
        serviceName: 'Pedicure',
        outlets: 'Outlet 1',
        description: 'Relaxing pedicure for your feet.',
        price: 500,
        duration: '1 hour',
        services: ['Soaking', 'Exfoliation', 'Foot Massage'],
      },
      {
        imageSrc: 'https://media.istockphoto.com/id/1345846348/photo/young-woman-hair-care-stock-photo.jpg?s=2048x2048&w=is&k=20&c=fJFQf0XK5ZVQhLQcX3xQ3zhBCn_O-UcxDV207xjhDf4=',
        imageAlt: 'Waxing',
        serviceName: 'Full Body Waxing',
        outlets: 'Outlet 2',
        description: 'Smooth skin with our full body waxing service.',
        price: 1500,
        duration: '1.5 hours',
        services: ['Legs', 'Arms', 'Underarms', 'Bikini'],
      },
      
      {
        imageSrc: 'https://cdn.pixabay.com/photo/2019/11/22/18/21/cosmetics-4645407_1280.jpg',
        imageAlt: 'Makeup',
        serviceName: 'Makeup Application',
        outlets: 'Outlet 1',
        description: 'Get glammed up for any occasion.',
        price: 900,
        duration: '1 hour',
        services: ['Foundation', 'Eyes', 'Lips'],
      },
      {
        imageSrc: 'https://mjgorgeous.com/wp-content/uploads/2020/12/MACost2.jpg',
        imageAlt: 'Bridal Makeup',
        serviceName: 'Bridal Makeup',
        outlets: 'Outlet 2',
        description: 'Special makeup for your special day.',
        price: 3000,
        duration: '2.5 hours',
        services: ['Consultation', 'Makeup', 'Touch-up'],
      },
      {
        imageSrc: 'https://cdn.pixabay.com/photo/2019/10/11/12/33/make-up-4541782_1280.jpg',
        imageAlt: 'Body Massage',
        serviceName: 'Relaxing Body Massage',
        outlets: 'Outlet 3',
        description: 'Unwind with a full-body massage.',
        price: 1200,
        duration: '1 hour',
        services: ['Swedish', 'Deep Tissue', 'Aromatherapy'],
      },
      {
        imageSrc: 'https://cdn.pixabay.com/photo/2019/10/11/12/33/make-up-4541782_1280.jpg',
        imageAlt: 'Acne Treatment',
        serviceName: 'Acne Treatment',
        outlets: 'Outlet 1',
        description: 'Effective treatment for acne-prone skin.',
        price: 1000,
        duration: '1 hour',
        services: ['Cleansing', 'Treatment Mask', 'Moisturizer'],
      },
      {
        imageSrc: 'https://cdn.pixabay.com/photo/2019/11/22/18/21/cosmetics-4645407_1280.jpg',
        imageAlt: 'Eyebrow Shaping',
        serviceName: 'Eyebrow Shaping',
        outlets: 'Outlet 2',
        description: 'Get perfectly shaped eyebrows.',
        price: 300,
        duration: '30 minutes',
        services: ['Waxing', 'Tweezing', 'Trimming'],
      },
    ];

  const outlets = ['All', 'Outlet 1', 'Outlet 2', 'Outlet 3'];
  const priceRanges = ['All', 'Below ₹500', '₹500 - ₹1000', 'Above ₹1000'];
  const durationRanges = ['All', 'Below 30 min', '30 min - 1 hour', 'Above 1 hour'];
  
  // Step 1: Create state for service name filter
  const [selectedOutlet, setSelectedOutlet] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [selectedDurationRange, setSelectedDurationRange] = useState('All');
  const [selectedServiceName, setSelectedServiceName] = useState('All');

  // Step 2: Create unique list of service names
  const serviceNames = ['All', ...new Set(services.map(service => service.serviceName))];

  const getDurationInMinutes = (duration) => {
    const [value, unit] = duration.split(' ');
    return unit === 'hour' ? parseInt(value) * 60 : parseInt(value);
  };

  const filteredServices = services.filter(service => {
    const outletMatch = selectedOutlet === 'All' || service.outlets === selectedOutlet;

    let priceMatch = true;
    if (selectedPriceRange === 'Below ₹500') {
      priceMatch = service.price < 500;
    } else if (selectedPriceRange === '₹500 - ₹1000') {
      priceMatch = service.price >= 500 && service.price <= 1000;
    } else if (selectedPriceRange === 'Above ₹1000') {
      priceMatch = service.price > 1000;
    }

    let durationMatch = true;
    const durationInMinutes = getDurationInMinutes(service.duration);
    if (selectedDurationRange === 'Below 30 min') {
      durationMatch = durationInMinutes < 30;
    } else if (selectedDurationRange === '30 min - 1 hour') {
      durationMatch = durationInMinutes >= 30 && durationInMinutes <= 60;
    } else if (selectedDurationRange === 'Above 1 hour') {
      durationMatch = durationInMinutes > 60;
    }

    // Step 3: Add service name filter
    const serviceNameMatch = selectedServiceName === 'All' || service.serviceName === selectedServiceName;

    return outletMatch && priceMatch && durationMatch && serviceNameMatch;
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
              Explore Our Exclusive Services
            </h5>
            <p className='w-max mx-auto text-center max-w-screen-lg text-gray-900 md:text-xl mb-2'>
              Discover a wide range of services that cater to your beauty needs. Your transformation begins here!
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

            {/* Step 4: Add Service Name Filter */}
            <div className="flex gap-2 items-center">
              <label className="text-gray-700 font-semibold" htmlFor="service-name-select">Filter by Service Name:</label>
              <select
                id="service-name-select"
                value={selectedServiceName}
                onChange={(e) => setSelectedServiceName(e.target.value)}
                className="p-2 border rounded shadow-sm hover:border-teal-500 transition duration-200"
              >
                {serviceNames.map((serviceName, index) => (
                  <option key={index} value={serviceName}>
                    {serviceName}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredServices.map((service, index) => (
              <ServiceCard
                key={index}
                imageSrc={service.imageSrc}
                imageAlt={service.imageAlt}
                serviceName={service.serviceName}
                outlets={service.outlets}  
                description={service.description}
                price={`₹${service.price}`}
                duration={service.duration}  
                services={service.services}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cservices;
