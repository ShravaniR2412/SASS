import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ServiceCard from "../../components/ServiceCard";

function Cservices() {
  // Initialize services as an empty array
  const [services, setServices] = useState([]);
  const [selectedOutlet, setSelectedOutlet] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [selectedDurationRange, setSelectedDurationRange] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const priceRanges = ["All", "Below ₹500", "₹500 - ₹1000", "Above ₹1000"];
  const durationRanges = [
    "All",
    "Below 30 min",
    "30 min - 1 hour",
    "Above 1 hour",
  ];

  // Fetch services from the API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          "http://localhost:5050/api/services/getallservices",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": localStorage.getItem("authToken"), // Include the token if needed
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setServices(data); // Set the fetched services in state
        } else {
          console.error("Failed to fetch services");
        }
      } catch (error) {
        console.error("Error fetching services:", error.message);
      }
    };

    fetchServices(); // Call the function when component mounts
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  // Ensure service names list is only created when services are fetched
  const serviceNames = [
    "All",
    ...new Set(services.map((service) => service.serviceName)),
  ];

  const getDurationInMinutes = (duration) => {
    const [value, unit] = duration.split(" ");
    return unit === "hour" ? parseInt(value) * 60 : parseInt(value);
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
  
    // Filter by Category
    const categoryMatch = selectedCategory === 'All' || service.category === selectedCategory;
  
    return outletMatch && priceMatch && durationMatch && categoryMatch;
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
            <p className="w-max mx-auto text-center max-w-screen-lg text-gray-900 md:text-xl mb-2">
              Discover a wide range of services that cater to your beauty needs.
              Your transformation begins here!
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
              <label
                className="text-gray-700 font-semibold"
                htmlFor="price-range-select"
              >
                Filter by Price Range:
              </label>
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
              <label
                className="text-gray-700 font-semibold"
                htmlFor="duration-range-select"
              >
                Filter by Duration:
              </label>
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

            {/* Filter by Category */}
            <div className="flex gap-2 items-center">
              <label
                className="text-gray-700 font-semibold"
                htmlFor="category-select"
              >
                Filter by Category:
              </label>
              <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-2 border rounded shadow-sm hover:border-teal-500 transition duration-200"
              >
                {/* Define the categories */}
                {["All", "HAIR", "SKIN", "MAKEUP", "OTHER"].map(
                  (category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  )
                )}
              </select>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredServices.map((service, index) => (
              <ServiceCard
                key={index}
                imageSrc={service.imageUrl}
                imageAlt={service.imageAlt}
                serviceName={service.serviceName}
                outlets={service.outlets}
                description={service.description}
                price={`₹${service.cost}`}
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
