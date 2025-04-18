import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/Navbar";
import {
  ShoppingCart,
  LocalMall,
  Search,
  ArrowForward,
  CheckCircle,
  Add,
  Remove
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Chip,
  Stack,
  Snackbar,
  Alert,
  Badge,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Paper
} from '@mui/material';

function MBA() {
  const [product, setProduct] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const fetchRecommendations = async () => {
    setLoading(true);
    setData(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/predict/mba', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product: product,
          top_n: 5,
        }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error('Failed to fetch:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + 1);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setSnackbarOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    setSnackbarOpen(true);
    setCart([]);
    setOpenCart(false);
    // navigate('/');
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Navbar cartCount={cart.length} onCartClick={() => setOpenCart(true)} />

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 6, flex: 1 }}>
        {/* Title */}
        <Typography 
          variant="h3" 
          align="center" 
          sx={{ 
            fontWeight: 'bold', 
            color: '#3E1F92', 
            mb: 6,
            fontSize: { xs: '2rem', sm: '3rem' }
          }}
        >
          People who bought this also bought
        </Typography>

        {/* Search Input */}
        <Box sx={{ maxWidth: 600, mx: 'auto', mb: 8 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter a product name"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={fetchRecommendations}>
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
              sx: { borderRadius: 28, bgcolor: 'background.paper' }
            }}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={fetchRecommendations}
            endIcon={<ArrowForward />}
            sx={{
              mt: 2,
              py: 1.5,
              borderRadius: 28,
              bgcolor: '#3ED3B0',
              '&:hover': { bgcolor: '#34b49a' }
            }}
          >
            Get Recommendations
          </Button>
        </Box>

        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress sx={{ color: '#3ED3B0' }} />
          </Box>
        )}

        {/* Results */}
        {data && (
          <Box>
            <Typography variant="h6" align="center" sx={{ mb: 4, color: 'text.secondary' }}>
              <Typography component="span" sx={{ color: '#3E1F92', fontWeight: 'bold' }}>
                {data.input_product}
              </Typography>{' '}
              was bought by <Typography component="span" sx={{ fontWeight: 'bold' }}>{data.bought_by_customers}</Typography> customers.
            </Typography>

            <Grid container spacing={4}>
              {data.recommendations.map((rec, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div whileHover={{ scale: 1.03 }}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <CardMedia
                        component="img"
                        image={rec.image_url}
                        alt={rec.item}
                        sx={{ 
                          height: 200, 
                          objectFit: 'contain', 
                          p: 2,
                          bgcolor: '#f9f9f9'
                        }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h6" component="h2" sx={{ color: '#3E1F92' }}>
                          {rec.item}
                        </Typography>
                        <Stack spacing={0.5} sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Confidence: <strong>{(rec.confidence * 100).toFixed(1)}%</strong>
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Lift: <strong>{rec.lift.toFixed(2)}</strong>
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Support: <strong>{rec.support.toFixed(3)}</strong>
                          </Typography>
                        </Stack>
                      </CardContent>
                      <Box sx={{ p: 2 }}>
                        <Button
                          fullWidth
                          variant="contained"
                          startIcon={<ShoppingCart />}
                          onClick={() => addToCart({
                            id: index,
                            name: rec.item,
                            price: 10, // You should replace with actual price from your data
                            image: rec.image_url,
                            confidence: rec.confidence
                          })}
                          sx={{
                            bgcolor: '#3ED3B0',
                            '&:hover': { bgcolor: '#34b49a' }
                          }}
                        >
                          Add to Cart
                        </Button>
                      </Box>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Cart Display */}
        {cart.length > 0 && (
          <Paper elevation={3} sx={{ mt: 4, p: 3, bgcolor: '#f5f5f5' }}>
            <Typography variant="h5" sx={{ mb: 2, color: '#3E1F92' }}>
              <ShoppingCart sx={{ verticalAlign: 'middle', mr: 1 }} />
              Your Cart
            </Typography>
            <List>
              {cart.map((item) => (
                <ListItem key={item.id} sx={{ py: 2 }}>
                  <ListItemAvatar>
                    <Avatar 
                      src={item.image} 
                      variant="square"
                      sx={{ width: 60, height: 60, mr: 2 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.name}
                    secondary={`₹${item.price.toFixed(2)}`}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      size="small"
                    >
                      <Remove />
                    </IconButton>
                    <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                    <IconButton 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      size="small"
                    >
                      <Add />
                    </IconButton>
                    <IconButton 
                      onClick={() => removeFromCart(item.id)}
                      sx={{ ml: 2, color: 'error.main' }}
                    >
                      <Typography>×</Typography>
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                ₹{getTotalPrice().toFixed(2)}
              </Typography>
            </Box>
            <Button
              fullWidth
              variant="contained"
              startIcon={<LocalMall />}
              onClick={handleCheckout}
              sx={{
                bgcolor: '#3E1F92',
                '&:hover': { bgcolor: '#2d1670' },
                py: 1.5
              }}
            >
              Proceed to Checkout
            </Button>
          </Paper>
        )}
      </Container>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          icon={<CheckCircle fontSize="inherit" />}
          sx={{ width: '100%' }}
        >
          {cart.length === 0 ? 'Checkout successful!' : 'Item added to cart!'}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default MBA;