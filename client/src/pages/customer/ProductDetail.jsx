import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Divider,
  Rating,
  Card,
  CardMedia,
  CardContent,
  Chip,
  CircularProgress,
  IconButton,
  Breadcrumbs,
  Link,
  Tab,
  Tabs,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Static product data
const staticProducts = {
  "product-1": {
    _id: "product-1",
    productName: "Hydrating Face Serum",
    description: "An intensive hydrating serum that deeply nourishes the skin with a blend of hyaluronic acid and natural extracts. Perfect for daily use to maintain skin hydration and elasticity.",
    price: 29.99,
    category: "Skin Care",
    brand: "GLAMEASE",
    imageUrl: "https://moonstarsworld.in/cdn/shop/files/83.jpg?v=1721285604"
  },
  "product-2": {
    _id: "product-2",
    productName: "Anti-Aging Night Cream",
    description: "A regenerative night cream that works while you sleep to reduce fine lines and restore skin vitality. Contains retinol and peptides for optimal results.",
    price: 39.99,
    category: "Skin Care",
    brand: "GLAMEASE",
    imageUrl: "https://m.media-amazon.com/images/I/81HHI-Vtw5L.jpg"
  },
  "product-3": {
    _id: "product-3",
    productName: "Vitamin C Brightening Mask",
    description: "A revitalizing face mask infused with Vitamin C to brighten skin tone and reduce dark spots. Use weekly for a radiant complexion.",
    price: 24.99,
    category: "Skin Care",
    brand: "GLAMEASE",
    imageUrl: "https://www.twasa.com/cdn/shop/files/buy-vitamin-c-face-sheet-mask-online_1162x.jpg?v=1704784800"
  },
  "product-4": {
    _id: "product-4",
    productName: "Exfoliating Facial Scrub",
    description: "A gentle yet effective facial scrub that removes dead skin cells and unclogs pores. Made with bamboo particles for natural exfoliation.",
    price: 19.99,
    category: "Skin Care",
    brand: "GLAMEASE",
    imageUrl: "https://astaberry.com/cdn/shop/files/Coffeescrub_sidestrip.jpg?v=1690882275"
  },
  "product-5": {
    _id: "product-5",
    productName: "Hydrating Lip Balm",
    description: "An ultra-moisturizing lip balm that provides long-lasting hydration. Infused with shea butter and natural oils.",
    price: 9.99,
    category: "Lip Care",
    brand: "GLAMEASE",
    imageUrl: "https://brownliving.in/cdn/shop/products/nava-hydrating-lip-balm-8-g-verified-sustainable-lip-balms-on-brown-living-681215.jpg?v=1735061966"
  },
  "product-6": {
    _id: "product-6",
    productName: "Volumizing Mascara",
    description: "A lengthening and volumizing mascara that provides dramatic lashes without clumping. Smudge-proof and long-lasting.",
    price: 18.99,
    category: "Makeup",
    brand: "GLAMEASE",
    imageUrl: "https://www.lakmeindia.com/cdn/shop/files/29112_S2-8901030859073_1000x.jpg?v=1742202692"
  }
};

// Convert object to array for easier filtering
const productsArray = Object.values(staticProducts);

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [frequentlyBoughtTogether, setFrequentlyBoughtTogether] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Use static data instead of fetching from API
  useEffect(() => {
    // Simulate loading time
    const loadData = setTimeout(() => {
      try {
        // Find product by ID
        const currentProduct = staticProducts[productId] || productsArray[0];
        setProduct(currentProduct);
        
        // Find similar products based on category
        const similar = productsArray
          .filter(p => p._id !== currentProduct._id && p.category === currentProduct.category)
          .slice(0, 4);
        setSimilarProducts(similar);
        
        // Select random products for "frequently bought together"
        const bought = productsArray
          .filter(p => p._id !== currentProduct._id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        setFrequentlyBoughtTogether(bought);
        
        setLoading(false);
      } catch (err) {
        console.error('Error loading static data:', err);
        setError('Error loading product data');
        setLoading(false);
      }
    }, 800); // Simulate network delay
    
    return () => clearTimeout(loadData);
  }, [productId]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const addToCart = () => {
    // Add to cart functionality would go here
    console.log(`Added ${quantity} of ${product.productName} to cart`);
    // Show success message or redirect to cart
    alert(`Added ${quantity} of ${product.productName} to cart`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress sx={{ color: '#0B7D7D' }} />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h6" color="error">
          {error || 'Product not found'}
        </Typography>
      </Box>
    );
  }

  // Enhanced product details with additional static information
  const productDetails = {
    name: product.productName,
    description: product.description,
    price: product.price,
    originalPrice: product.price * 1.2,
    rating: 4.7,
    reviews: 187,
    category: product.category,
    brand: product.brand,
    inStock: true,
    features: [
      'Hypoallergenic formula',
      'No harmful chemicals',
      'Cruelty-free and vegan',
      'Long-lasting effect'
    ],
    specifications: {
      'Weight': '150ml',
      'Ingredients': 'Water, Glycerin, Natural extracts',
      'Suitable for': 'All skin types',
      'Usage': 'Apply daily for best results'
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Box sx={{ mt: 3, mb: 2 }}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Link underline="hover" color="inherit" href="/product-recommender">
              Products
            </Link>
            <Link underline="hover" color="inherit" href={`/products/category/${productDetails.category}`}>
              {productDetails.category}
            </Link>
            <Typography color="text.primary">{productDetails.name}</Typography>
          </Breadcrumbs>
        </Box>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          {/* Product Image */}
          <Grid item xs={12} md={6}>
            <Card elevation={0} sx={{ bgcolor: 'transparent' }}>
              <CardMedia
                component="img"
                height="400"
                image={product.imageUrl || 'https://via.placeholder.com/500x500?text=Product+Image'}
                alt={productDetails.name}
                sx={{ 
                  objectFit: 'contain',
                  bgcolor: '#f5f5f5',
                  borderRadius: 2
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Box
                  component="img"
                  src={product.imageUrl || 'https://via.placeholder.com/100x100?text=Thumbnail'}
                  sx={{
                    width: 70,
                    height: 70,
                    objectFit: 'cover',
                    borderRadius: 1,
                    mx: 1,
                    border: '2px solid #0B7D7D',
                    cursor: 'pointer'
                  }}
                />
                {[1, 2, 3].map((i) => (
                  <Box
                    key={i}
                    component="img"
                    src={`https://via.placeholder.com/100x100?text=View+${i}`}
                    sx={{
                      width: 70,
                      height: 70,
                      objectFit: 'cover',
                      borderRadius: 1,
                      mx: 1,
                      border: '1px solid #ddd',
                      cursor: 'pointer'
                    }}
                  />
                ))}
              </Box>
            </Card>
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <Box sx={{ pl: { md: 2 } }}>
              {productDetails.inStock ? (
                <Chip 
                  icon={<CheckCircleIcon />} 
                  label="In Stock" 
                  size="small" 
                  color="success" 
                  sx={{ mb: 2 }} 
                />
              ) : (
                <Chip 
                  label="Out of Stock" 
                  size="small" 
                  color="error" 
                  sx={{ mb: 2 }} 
                />
              )}
              
              <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
                {productDetails.name}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating value={productDetails.rating} precision={0.1} readOnly />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  ({productDetails.reviews} reviews)
                </Typography>
                <Typography variant="body2" sx={{ ml: 2, color: '#0B7D7D' }}>
                  By <Link href="#" underline="hover" color="inherit">{productDetails.brand}</Link>
                </Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                  <Typography variant="h5" component="span" sx={{ fontWeight: 'bold', color: '#0B7D7D' }}>
                    ${productDetails.price}
                  </Typography>
                  {productDetails.originalPrice > productDetails.price && (
                    <Typography 
                      variant="body1" 
                      component="span" 
                      sx={{ 
                        textDecoration: 'line-through', 
                        color: 'text.secondary',
                        ml: 2 
                      }}
                    >
                      ${productDetails.originalPrice.toFixed(2)}
                    </Typography>
                  )}
                </Box>
                {productDetails.originalPrice > productDetails.price && (
                  <Typography variant="body2" sx={{ color: 'error.main', fontWeight: 'bold' }}>
                    Save ${(productDetails.originalPrice - productDetails.price).toFixed(2)} ({Math.round((1 - productDetails.price / productDetails.originalPrice) * 100)}% OFF)
                  </Typography>
                )}
              </Box>
              
              <Typography variant="body1" sx={{ mb: 3 }}>
                {productDetails.description}
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Key Features:
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  {productDetails.features.map((feature, index) => (
                    <Typography component="li" key={index} variant="body2" sx={{ mb: 0.5 }}>
                      {feature}
                    </Typography>
                  ))}
                </Box>
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box sx={{ mr: 2 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Quantity:
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button 
                      variant="outlined" 
                      size="small" 
                      onClick={() => handleQuantityChange(-1)}
                      sx={{ minWidth: '40px' }}
                    >
                      -
                    </Button>
                    <Typography sx={{ mx: 2 }}>{quantity}</Typography>
                    <Button 
                      variant="outlined" 
                      size="small" 
                      onClick={() => handleQuantityChange(1)}
                      sx={{ minWidth: '40px' }}
                    >
                      +
                    </Button>
                  </Box>
                </Box>
                
                <Box sx={{ flexGrow: 1 }}>
                  <Button 
                    variant="contained" 
                    startIcon={<AddShoppingCartIcon />}
                    fullWidth
                    onClick={addToCart}
                    sx={{ 
                      backgroundColor: '#0B7D7D', 
                      '&:hover': { backgroundColor: '#0A6D6D' },
                      py: 1.5
                    }}
                  >
                    Add to Cart
                  </Button>
                </Box>
                
                <IconButton 
                  aria-label="add to favorites" 
                  onClick={toggleFavorite}
                  sx={{ ml: 2 }}
                >
                  {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                </IconButton>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocalShippingIcon sx={{ mr: 1, color: '#0B7D7D' }} />
                      <Typography variant="body2">Free shipping over $50</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AssignmentReturnIcon sx={{ mr: 1, color: '#0B7D7D' }} />
                      <Typography variant="body2">Easy 30-day returns</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              
              <Button 
                startIcon={<PlayCircleOutlineIcon />}
                variant="text"
                sx={{ color: '#0B7D7D' }}
              >
                Watch application tutorial
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Product Details Tabs */}
        <Box sx={{ mb: 6 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={selectedTab} 
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Product Details" />
              <Tab label="Specifications" />
              <Tab label="How to Use" />
              <Tab label="Reviews" />
            </Tabs>
          </Box>
          
          <Box sx={{ p: 3 }}>
            {selectedTab === 0 && (
              <Typography variant="body1">
                {productDetails.description}
                <br /><br />
                Enhance your beauty routine with this premium product from GLAMEASE. Designed to provide maximum effectiveness while being gentle on your skin, this product is perfect for daily use. The carefully selected ingredients work together to deliver visible results and long-lasting benefits.
              </Typography>
            )}
            
            {selectedTab === 1 && (
              <Box>
                {Object.entries(productDetails.specifications).map(([key, value]) => (
                  <Box key={key} sx={{ display: 'flex', borderBottom: '1px solid #eee', py: 1.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', width: '30%' }}>
                      {key}:
                    </Typography>
                    <Typography variant="body2" sx={{ width: '70%' }}>
                      {value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
            
            {selectedTab === 2 && (
              <Typography variant="body1">
                For best results, apply a small amount to clean skin and massage gently until absorbed. Use daily as part of your morning and evening routine. Can be used alongside other GLAMEASE products for enhanced results.
              </Typography>
            )}
            
            {selectedTab === 3 && (
              <Typography variant="body1">
                This product has received {productDetails.reviews} reviews from verified customers, with an average rating of {productDetails.rating} out of 5 stars. Most customers praise its effectiveness and gentle formula.
              </Typography>
            )}
          </Box>
        </Box>

        {/* Frequently Bought Together Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
            Frequently Bought Together
          </Typography>
          
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                  {[product, ...frequentlyBoughtTogether].map((item, index) => (
                    <React.Fragment key={index}>
                      <Box
                        sx={{
                          position: 'relative',
                          p: 2,
                          mr: index < frequentlyBoughtTogether.length ? 0 : 1
                        }}
                      >
                        <Box
                          component="img"
                          src={item?.imageUrl || 'https://via.placeholder.com/150x150?text=Product'}
                          alt={item?.productName}
                          sx={{
                            width: 100,
                            height: 100,
                            objectFit: 'contain',
                          }}
                        />
                        {index === 0 && (
                          <Chip 
                            label="This item" 
                            size="small" 
                            sx={{ 
                              position: 'absolute', 
                              top: 8, 
                              left: 8,
                              fontSize: '0.7rem',
                              backgroundColor: '#0B7D7D',
                              color: 'white'
                            }} 
                          />
                        )}
                      </Box>
                      {index < frequentlyBoughtTogether.length && (
                        <Typography sx={{ fontSize: 20, mx: 1 }}>+</Typography>
                      )}
                    </React.Fragment>
                  ))}
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Box sx={{ p: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Buy these items together and save 10%
                  </Typography>
                  
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Price for all: ${(Number(product.price) + frequentlyBoughtTogether.reduce((sum, item) => sum + Number(item.price || 0), 0) * 0.9).toFixed(2)}
                  </Typography>
                  
                  <Button
                    variant="contained"
                    startIcon={<AddShoppingCartIcon />}
                    sx={{ 
                      backgroundColor: '#0B7D7D', 
                      '&:hover': { backgroundColor: '#0A6D6D' }
                    }}
                  >
                    Add all to cart
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* Similar Products Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
            Similar Products
          </Typography>
          
          <Grid container spacing={3}>
            {similarProducts.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item._id || item.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                    },
                    cursor: 'pointer',
                  }}
                  onClick={() => window.location.href = `/product-detail/${item._id || item.id}`}
                >
                  <CardMedia
                    component="img"
                    height="160"
                    image={item.imageUrl || 'https://via.placeholder.com/200x200?text=Product'}
                    alt={item.productName}
                    sx={{ objectFit: 'contain', pt: 2 }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="body1" component="div" noWrap>
                      {item.productName}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, mt: 1 }}>
                      <Rating value={4.5} precision={0.5} size="small" readOnly />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        (24)
                      </Typography>
                    </Box>
                    
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#0B7D7D' }}>
                      ${item.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Customers Who Bought This Also Viewed */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
            Customers Who Bought This Also Viewed
          </Typography>
          
          <Grid container spacing={3}>
            {[...frequentlyBoughtTogether, ...similarProducts].slice(0, 4).map((item) => (
              <Grid item xs={12} sm={6} md={3} key={`viewed-${item._id || item.id}`}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                    },
                    cursor: 'pointer',
                  }}
                  onClick={() => window.location.href = `/product-detail/${item._id || item.id}`}
                >
                  <CardMedia
                    component="img"
                    height="160"
                    image={item.imageUrl || 'https://via.placeholder.com/200x200?text=Product'}
                    alt={item.productName}
                    sx={{ objectFit: 'contain', pt: 2 }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="body1" component="div" noWrap>
                      {item.productName}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, mt: 1 }}>
                      <Rating value={4.5} precision={0.5} size="small" readOnly />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        (24)
                      </Typography>
                    </Box>
                    
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#0B7D7D' }}>
                      ${item.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default ProductDetail;