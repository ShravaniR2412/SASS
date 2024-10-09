import React, { useState } from 'react';
import { Box, Typography, Tooltip, Grid, Card, CardContent, CardMedia, Button, IconButton } from '@mui/material';
import Carousel from 'react-material-ui-carousel'; // Carousel library
import Footer from '../../components/Footer'; // Import the Footer component
import Navbar from '../../components/Navbar'; // Import the Navbar component
import carouselImage1 from '../../assets/carousel1.png';
import carouselImage2 from '../../assets/carousel2.png';

import product1 from '../../assets/product1.webp';
import product2 from '../../assets/product2.webp';
import product3 from '../../assets/product3.webp';
import product4 from '../../assets/product4.webp';

import service1 from '../../assets/service1.jpg';
import service2 from '../../assets/service2.jpg';

import package1 from '../../assets/package1.jpg';
import package2 from '../../assets/package2.webp';

// Arrow icons for navigating between testimonials
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Home = () => {
  const products = [
    { name: 'Shampoo', description: 'Deep cleansing formula.', price: '₹500', imgsrc: product1 },
    { name: 'Conditioner', description: 'Nourishes hair.', price: '₹600', imgsrc: product2 },
    { name: 'Hair Serum', description: 'Adds shine and smoothness.', price: '₹700', imgsrc: product3 },
    { name: 'Hair Mask', description: 'Restores damaged hair.', price: '₹800', imgsrc: product4 },
    { name: 'Hair Serum', description: 'Adds shine and smoothness.', price: '₹700', imgsrc: product3 },
    { name: 'Conditioner', description: 'Nourishes hair.', price: '₹600', imgsrc: product2 },


  ];

  const services = [
    { name: 'Haircut', category: 'Hair', cost: '₹300', duration: '30 mins', imgsrc: service2, description: 'Professional haircut.' },
    { name: 'Facial', category: 'Skin', cost: '₹700', duration: '60 mins', imgsrc: service1,  description: 'Revitalizing facial.' },
    { name: 'Manicure', category: 'Nails', cost: '₹400', duration: '30 mins', imgsrc: service2,  description: 'Nail grooming.' },
    { name: 'Facial', category: 'Skin', cost: '₹700', duration: '60 mins', imgsrc: service1,  description: 'Revitalizing facial.' },

        { name: 'Facial', category: 'Skin', cost: '₹700', duration: '60 mins', imgsrc: service2,  description: 'Revitalizing facial.' },

        { name: 'Facial', category: 'Skin', cost: '₹700', duration: '60 mins', imgsrc: service1,  description: 'Revitalizing facial.' },

  ];

  const packages = [
    { name: 'Bridal Package', price: '₹5000', duration: '5 hours', imgsrc: package1,  description: 'Perfect for weddings.' },
    { name: 'Party Package', price: '₹3000', duration: '3 hours', imgsrc: package2,  description: 'Get ready for the party.' },
    { name: 'Spa Package', price: '₹3500', duration: '4 hours',imgsrc: package1,  description: 'Relaxing spa experience.' },
    { name: 'Grooming Package', price: '₹4000', duration: '4 hours', imgsrc: package2,  description: 'Complete grooming service.' },
    { name: 'Spa Package', price: '₹3500', duration: '4 hours',imgsrc: package1,  description: 'Relaxing spa experience.' },

    { name: 'Grooming Package', price: '₹4000', duration: '4 hours', imgsrc: package2,  description: 'Complete grooming service.' },

  ];

  // Testimonials data
  const testimonials = [
    { name: 'Riya Beauty Salon', review: 'Excellent service and friendly staff! Highly recommended.' },
    { name: 'Glamour Salon', review: 'Loved the haircut! They know what they are doing.' },
    { name: 'Urban Chic Salon', review: 'The spa package was so relaxing. Will visit again.' },
    { name: 'Style Studio', review: 'Great customer service and attention to detail.' }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const handleNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

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
      <Box sx={{ my: 4, padding: 2 }}>
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

        <Grid container spacing={2} justifyContent="center">
          {products.map((product, index) => (
            <Grid item xs={10} sm={4} md={2} key={index}>
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
                    height: '100%',
                    transition: 'transform 0.3s',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                    padding: 1,
                  }}>
                  <CardMedia component="img" height="50" image={product.imgsrc} alt={product.name} />
                  <CardContent>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography>Price: {product.price}</Typography>
                  </CardContent>
                </Card>
              </Tooltip>
            </Grid>
          ))}
        </Grid>

        <Box textAlign="right" mt={2}>
          <Button 
            variant="contained" 
            sx={{ 
              backgroundColor: '#0B7D7D', 
              borderRadius: '8px', 
              '&:hover': { backgroundColor: '#0A6D6D' } 
            }} 
            onClick={() => window.location.href='/products'}
          >
            Explore More
          </Button>
        </Box>
      </Box>

      {/* Services Section */}
      <Box sx={{ my: 4, padding: 2 }}>
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

        <Grid container spacing={2} justifyContent="center">
          {services.map((service, index) => (
            <Grid item xs={10} sm={4} md={2} key={index}>
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
                    padding: 1,
                  }}>
                  <CardMedia component="img" height="200" image={service.imgsrc} alt={service.name} />
                  <CardContent>
                    <Typography variant="h6">{service.name}</Typography>
                    <Typography>Cost: {service.cost}</Typography>
                    <Typography>Duration: {service.duration}</Typography>
                  </CardContent>
                </Card>
              </Tooltip>
            </Grid>
          ))}
        </Grid>

        <Box textAlign="right" mt={2}>
          <Button 
            variant="contained" 
            sx={{ 
              backgroundColor: '#0B7D7D', 
              borderRadius: '8px', 
              '&:hover': { backgroundColor: '#0A6D6D' } 
            }} 
            onClick={() => window.location.href='/services'}          >
            Explore More
          </Button>
        </Box>
      </Box>

      {/* Packages Section */}
      <Box sx={{ my: 4, padding: 2 }}>
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

        <Grid container spacing={2} justifyContent="center">
          {packages.map((pkg, index) => (
            <Grid item xs={10} sm={4} md={2} key={index}>
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
                    padding: 1,
                  }}>
                  <CardMedia component="img" height="50" image={pkg.imgsrc} alt={pkg.name} />
                  <CardContent>
                    <Typography variant="h6">{pkg.name}</Typography>
                    <Typography>Price: {pkg.price}</Typography>
                    <Typography>Duration: {pkg.duration}</Typography>
                  </CardContent>
                </Card>
              </Tooltip>
            </Grid>
          ))}
        </Grid>

        <Box textAlign="right" mt={2}>
          <Button 
            variant="contained" 
            sx={{ 
              backgroundColor: '#0B7D7D', 
              borderRadius: '8px', 
              '&:hover': { backgroundColor: '#0A6D6D' } 
            }} 
            onClick={() => window.location.href='/packages'}
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
        boxShadow: '0 4px 8px rgba(0,0,0,0.7)', 
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
