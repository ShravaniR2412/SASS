import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Tooltip,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  CircularProgress,
} from '@mui/material';
import Carousel from 'react-material-ui-carousel'; // Carousel library
import Footer from '../../components/Footer'; // Import the Footer component
import Navbar from '../../components/Navbar'; // Import the Navbar component
import carouselImage1 from '../../assets/carousel1.png';
import carouselImage2 from '../../assets/carousel2.png';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Home = () => {
  // State variables for products, services, packages, loading, and error
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [packages, setPackages] = useState([]);
  const [testimonials, setTestimonials] = useState([
    { name: 'Riya Beauty Salon', review: 'Excellent service and friendly staff! Highly recommended.' },
    { name: 'Glamour Salon', review: 'Loved the haircut! They know what they are doing.' },
    { name: 'Urban Chic Salon', review: 'The spa package was so relaxing. Will visit again.' },
    { name: 'Style Studio', review: 'Great customer service and attention to detail.' }
  ]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Helper function to get random items from an array
  const getRandomItems = (array, num) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error

      try {
        // Fetch Products
        const productsResponse = await fetch('http://localhost:5050/api/products/getallproducts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('authToken'), // Include the token if needed
          },
        });

        if (!productsResponse.ok) {
          throw new Error('Failed to fetch products');
        }

        const productsData = await productsResponse.json();
        const randomProducts = getRandomItems(productsData, 4);
        setProducts(randomProducts);

        // Fetch Services
        const servicesResponse = await fetch('http://localhost:5050/api/services/getallservices', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('authToken'), // Include the token if needed
          },
        });

        if (!servicesResponse.ok) {
          throw new Error('Failed to fetch services');
        }

        const servicesData = await servicesResponse.json();
        const randomServices = getRandomItems(servicesData, 4);
        setServices(randomServices);

        // Fetch Packages
        const packagesResponse = await fetch('http://localhost:5050/api/packages/getallpackages', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('authToken'), // Include the token if needed
          },
        });

        if (!packagesResponse.ok) {
          throw new Error('Failed to fetch packages');
        }

        const packagesData = await packagesResponse.json();
        const randomPackages = getRandomItems(packagesData, 4);
        setPackages(randomPackages);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once on mount

  // Testimonials navigation handlers
  const handleNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      {/* Carousel Section */}
      <Carousel indicators={true} interval={3000}>
        <img src={carouselImage1} alt="Slide 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <img src={carouselImage2} alt="Slide 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <img src={carouselImage1} alt="Slide 3" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Carousel>


{/* Products Section */}
<Box sx={{ my: 4,mx: 4, padding: 2 }}>
  <Typography
    variant="h5"
    align="center"
    sx={{
      color: 'black',
      fontWeight: 'bold',
      py: 1,
      marginBottom: 4,
    }}>
    New Product Arrivals
  </Typography>

  <Grid container spacing={4} justifyContent="center">
    {products.map((product, index) => (
      <Grid item xs={12} sm={6} md={3} key={index}>
        <Tooltip
          title={product.description}
          arrow
          placement="top"
          sx={{
            "& .MuiTooltip-tooltip": {
              fontSize: '1.1rem',
              backgroundColor: '#D9E8E8',
            }
          }}>
          <Card
            sx={{
              height: '90%',
              transition: 'transform 0.3s',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              '&:hover': {
                transform: 'scale(1.05)',
              },
              padding: 2,  // Increased padding
            }}>
            <CardMedia component="img" height="180" image={product.imageUrl} alt={product.productName} />
            <CardContent>
              <Typography variant="h6">{product.productName}</Typography>
              <Typography>Price: {product.price}</Typography>
            </CardContent>
          </Card>
        </Tooltip>
      </Grid>
    ))}
  </Grid>

  <Box textAlign="right" mt={4}>
    <Button
      variant="contained"
      sx={{
        backgroundColor: '#0B7D7D',
        borderRadius: '8px',
        '&:hover': { backgroundColor: '#0A6D6D' }
      }}
      onClick={() => window.location.href = '/products'}
    >
      Explore More
    </Button>
  </Box>
</Box>

{/* Services Section */}
<Box sx={{ my: 4,mx: 4, padding: 2 }}>
  <Typography
    variant="h5"
    align="center"
    sx={{
      color: 'black',
      fontWeight: 'bold',
      py: 1,
      marginBottom: 4,
    }}>
    Explore our Services
  </Typography>

  <Grid container spacing={4} justifyContent="center">
    {services.map((service, index) => (
      <Grid item xs={12} sm={6} md={3} key={index}>
        <Tooltip
          title={service.description}
          arrow
          placement="top"
          sx={{
            "& .MuiTooltip-tooltip": {
              fontSize: '1.1rem',
              backgroundColor: '#D9E8E8',
            }
          }}>
          <Card
            sx={{
              height: '100%',
              transition: 'transform 0.3s',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              '&:hover': {
                transform: 'scale(1.05)',
              },
              padding: 2,  // Increased padding
            }}>
            <CardMedia component="img" height="200" image={service.imageUrl} alt={service.serviceName} />
            <CardContent>
              <Typography variant="h6">{service.serviceName}</Typography>
              <Typography>Cost: {service.cost}</Typography>
              <Typography>Duration: {service.duration}</Typography>
            </CardContent>
          </Card>
        </Tooltip>
      </Grid>
    ))}
  </Grid>

  <Box textAlign="right" mt={4}>
    <Button
      variant="contained"
      sx={{
        backgroundColor: '#0B7D7D',
        borderRadius: '8px',
        '&:hover': { backgroundColor: '#0A6D6D' }
      }}
      onClick={() => window.location.href = '/services'}
    >
      Explore More
    </Button>
  </Box>
</Box>

{/* Packages Section */}
<Box sx={{ my: 4,mx: 4, padding: 2 }}>
  <Typography
    variant="h5"
    align="center"
    sx={{
      color: 'black',
      fontWeight: 'bold',
      py: 1,
      marginBottom: 4,
    }}>
    Explore our Packages
  </Typography>

  <Grid container spacing={4} justifyContent="center">
    {packages.map((pkg, index) => (
      <Grid item xs={12} sm={6} md={3} key={index}>
        <Tooltip
          title={pkg.description}
          arrow
          placement="top"
          sx={{
            "& .MuiTooltip-tooltip": {
              fontSize: '1.1rem',
              backgroundColor: '#D9E8E8',
            }
          }}>
          <Card
            sx={{
              height: '100%',
              transition: 'transform 0.3s',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              '&:hover': {
                transform: 'scale(1.05)',
              },
              padding: 2,  // Increased padding
            }}>
            <CardMedia component="img" height="200" image={pkg.imageUrl} alt={pkg.packageName} />
            <CardContent>
              <Typography variant="h6">{pkg.packageName}</Typography>
              <Typography>Price: {pkg.price}</Typography>
              <Typography>Duration: {pkg.duration}</Typography>
            </CardContent>
          </Card>
        </Tooltip>
      </Grid>
    ))}
  </Grid>

  <Box textAlign="right" mt={4}>
    <Button
      variant="contained"
      sx={{
        backgroundColor: '#0B7D7D',
        borderRadius: '8px',
        '&:hover': { backgroundColor: '#0A6D6D' }
      }}
      onClick={() => window.location.href = '/packages'}
    >
      Explore More
    </Button>
  </Box>
</Box>


      {/* Testimonials Section */}
      <Box
        sx={{
          my: 4,
          padding: 2,
          textAlign: 'center',
          backgroundColor: '#F9F9F9',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          p: 4
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: '#0B7D7D',
            fontWeight: 'bold',
            py: 2,
          }}
        >
          Testimonials
        </Typography>

        <Box display="flex" justifyContent="center" alignItems="center">
          <IconButton
            onClick={handlePrev}
            sx={{
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.2)',  // Slightly enlarge the icon on hover
              }
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>

          <Card
            sx={{
              width: '50%',
              padding: 2,
              backgroundColor: '#FFFFFF',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              m: 2,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Add transition for hover effect
              '&:hover': {
                transform: 'scale(1.05)',  // Slightly enlarge the card on hover
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',  // Increase shadow on hover
              }
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {testimonials[currentTestimonial].name}
            </Typography>
            <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
              {testimonials[currentTestimonial].review}
            </Typography>
          </Card>

          <IconButton
            onClick={handleNext}
            sx={{
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.2)',  // Slightly enlarge the icon on hover
              }
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
