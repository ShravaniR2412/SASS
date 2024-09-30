import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import PackageCard from '../../components/Packagecard';

function Cpackage() {
  const outlets = ['All', 'Outlet 1', 'Outlet 2', 'Outlet 3'];
  const priceRanges = ['All', 'Below ₹500', '₹500 - ₹1000', 'Above ₹1000'];
  const durationRanges = ['All', 'Below 30 min', '30 min - 1 hour', 'Above 1 hour'];

  const [selectedOutlet, setSelectedOutlet] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [selectedDurationRange, setSelectedDurationRange] = useState('All');
  const [packages, setPackages] = useState([]); // State for packages

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("http://localhost:5050/api/packages/getallpackages", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("authToken"), // Include the token if needed
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPackages(data); // Set the fetched packages in state
        } else {
          console.error("Failed to fetch packages");
        }
      } catch (error) {
        console.error("Error fetching packages:", error.message);
      }
    };

    fetchPackages(); // Call the function when component mounts
  }, []); // Empty dependency array to run once on mount

  const getDurationInMinutes = (duration) => {
    const [value, unit] = duration.split(' ');
    return unit === 'hour' ? parseInt(value) * 60 : parseInt(value);
  };

  const filteredPackages = packages.filter(pkg => {
   
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

    return  priceMatch && durationMatch;
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
            {/* Filter by Price Range */}
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

            {/* Filter by Duration */}
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

          {/* Package Cards */}
          <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4 xl:grid-cols-4 xl:gap-8">
            {filteredPackages.map((pkg, index) => (
              <PackageCard
                key={index}
                imageSrc={pkg.imageUrl}
                imageAlt={pkg.imageAlt}
                packageName={pkg.packageName}
                outlets={pkg.outlets}
                description={pkg.description}
                price={`₹${pkg.price}`}
                duration={pkg.duration}
                services={pkg.servicesIncluded} // Pass the services here
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
