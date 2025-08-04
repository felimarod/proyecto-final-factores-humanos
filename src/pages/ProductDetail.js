import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Chip,
  Alert,
  Card,
  CardContent,
  Breadcrumbs,
  Link,
  IconButton,
  ButtonGroup,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Star,
  ShoppingCart,
  FavoriteBorder,
  Favorite,
  NavigateNext,
  Remove,
  Add,
  CheckCircle,
  Info,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert 
          severity="error"
          sx={{
            backgroundColor: '#363636',
            color: 'white',
            '& .MuiAlert-icon': {
              color: '#ff4444',
            },
          }}
        >
          Product not found.
          <Button 
            onClick={() => navigate('/')} 
            sx={{ 
              ml: 2,
              color: '#3d98f4',
            }}
          >
            Go back home
          </Button>
        </Alert>
      </Container>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, Math.min(product.inStock, prev + delta)));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price / 1000);
  };

  const productImages = [
    product.image,
    product.image, // Placeholder for additional images
    product.image,
  ];

  const features = [
    'Hot-swappable switches',
    'RGB backlighting',
    'Premium build quality',
    'Compatible with MX-style switches',
    'Programmable keys',
    'Detachable USB-C cable',
  ];

  const specifications = [
    { label: 'Layout', value: '75%' },
    { label: 'Switch Type', value: 'Cherry MX Red' },
    { label: 'Keycaps', value: 'Double-shot PBT' },
    { label: 'Case Material', value: 'Aluminum' },
    { label: 'Connectivity', value: 'USB-C' },
    { label: 'Weight', value: '1.2 kg' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs 
        separator={<NavigateNext fontSize="small" />} 
        sx={{ 
          mb: 3,
          '& .MuiBreadcrumbs-ol': {
            color: '#9cabba',
          },
          '& .MuiBreadcrumbs-separator': {
            color: '#9cabba',
          },
        }}
      >
        <Link 
          color="inherit" 
          onClick={() => navigate('/')} 
          sx={{ 
            cursor: 'pointer',
            '&:hover': { color: '#3d98f4' },
          }}
        >
          Home
        </Link>
        <Link 
          color="inherit" 
          onClick={() => navigate('/search')} 
          sx={{ 
            cursor: 'pointer',
            '&:hover': { color: '#3d98f4' },
          }}
        >
          Products
        </Link>
        <Typography sx={{ color: 'white' }}>
          {product.name}
        </Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'sticky', top: 100 }}>
            {/* Main Image */}
            <Box sx={{ mb: 2 }}>
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  backgroundColor: '#1a1a1a',
                }}
              />
            </Box>
            
            {/* Thumbnail Images */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {productImages.map((image, index) => (
                <Box
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '8px',
                    border: selectedImage === index ? '2px solid #3d98f4' : '2px solid transparent',
                    cursor: 'pointer',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <Box>
            {/* Product Title and Brand */}
            <Box sx={{ mb: 2 }}>
              <Chip 
                label={product.brand} 
                sx={{ 
                  mb: 1,
                  backgroundColor: '#363636',
                  color: 'white',
                }} 
              />
              <Typography 
                variant="h4" 
                component="h1" 
                sx={{ 
                  color: 'white',
                  fontWeight: 700,
                  fontSize: { xs: '1.75rem', md: '2.125rem' },
                  lineHeight: 1.2,
                  mb: 1,
                }}
              >
                {product.name}
              </Typography>
              
              {/* Rating */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      sx={{
                        color: i < Math.floor(product.rating) ? '#ffd700' : '#4d4d4d',
                        fontSize: '1.25rem',
                      }}
                    />
                  ))}
                  <Typography sx={{ ml: 1, color: '#9cabba' }}>
                    {product.rating} ({product.inStock} available)
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Price */}
            <Typography 
              variant="h3" 
              sx={{ 
                color: '#3d98f4',
                fontWeight: 700,
                mb: 3,
              }}
            >
              {formatPrice(product.price)}
            </Typography>

            {/* Description */}
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#9cabba',
                mb: 3,
                lineHeight: 1.6,
              }}
            >
              {product.description}
            </Typography>

            {/* Quantity Selector */}
            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: 'white',
                  mb: 2,
                  fontWeight: 600,
                }}
              >
                Quantity
              </Typography>
              <ButtonGroup 
                variant="outlined" 
                sx={{ 
                  '& .MuiButton-root': {
                    borderColor: '#4d4d4d',
                    color: 'white',
                    '&:hover': {
                      borderColor: '#3d98f4',
                      backgroundColor: 'rgba(61, 152, 244, 0.1)',
                    },
                  },
                }}
              >
                <IconButton 
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  sx={{ color: 'white' }}
                >
                  <Remove />
                </IconButton>
                <Box 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    px: 3,
                    border: '1px solid #4d4d4d',
                    color: 'white',
                    minWidth: 60,
                    justifyContent: 'center',
                  }}
                >
                  {quantity}
                </Box>
                <IconButton 
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.inStock}
                  sx={{ color: 'white' }}
                >
                  <Add />
                </IconButton>
              </ButtonGroup>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
                disabled={product.inStock === 0}
                sx={{
                  backgroundColor: '#3d98f4',
                  '&:hover': {
                    backgroundColor: '#2984e6',
                  },
                  textTransform: 'none',
                  fontWeight: 600,
                  py: 1.5,
                  px: 4,
                  flexGrow: 1,
                }}
              >
                Add to Cart
              </Button>
              <IconButton
                onClick={() => setIsFavorite(!isFavorite)}
                sx={{
                  border: '2px solid #4d4d4d',
                  color: isFavorite ? '#ff4444' : '#9cabba',
                  '&:hover': {
                    borderColor: '#3d98f4',
                    backgroundColor: 'rgba(61, 152, 244, 0.1)',
                  },
                }}
              >
                {isFavorite ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </Box>

            {/* Stock Status */}
            <Box sx={{ mb: 4 }}>
              {product.inStock > 0 ? (
                <Box sx={{ display: 'flex', alignItems: 'center', color: '#4caf50' }}>
                  <CheckCircle sx={{ mr: 1, fontSize: '1.25rem' }} />
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    In Stock ({product.inStock} available)
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', color: '#ff4444' }}>
                  <Info sx={{ mr: 1, fontSize: '1.25rem' }} />
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Out of Stock
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Additional Info Section */}
      <Box sx={{ mt: 6 }}>
        <Grid container spacing={4}>
          {/* Features */}
          <Grid item xs={12} md={6}>
            <Card sx={{ backgroundColor: '#1a1a1a', borderRadius: '12px' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: 'white',
                    fontWeight: 700,
                    mb: 3,
                  }}
                >
                  Key Features
                </Typography>
                <List sx={{ p: 0 }}>
                  {features.map((feature, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircle sx={{ color: '#4caf50', fontSize: '1.25rem' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={feature}
                        sx={{ 
                          '& .MuiListItemText-primary': {
                            color: '#9cabba',
                            fontSize: '0.95rem',
                          },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Specifications */}
          <Grid item xs={12} md={6}>
            <Card sx={{ backgroundColor: '#1a1a1a', borderRadius: '12px' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: 'white',
                    fontWeight: 700,
                    mb: 3,
                  }}
                >
                  Specifications
                </Typography>
                <List sx={{ p: 0 }}>
                  {specifications.map((spec, index) => (
                    <React.Fragment key={index}>
                      <ListItem sx={{ px: 0, py: 1.5 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                          <Typography sx={{ color: '#9cabba', fontWeight: 500 }}>
                            {spec.label}
                          </Typography>
                          <Typography sx={{ color: 'white' }}>
                            {spec.value}
                          </Typography>
                        </Box>
                      </ListItem>
                      {index < specifications.length - 1 && (
                        <Divider sx={{ backgroundColor: '#363636' }} />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductDetail;
