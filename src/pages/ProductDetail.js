import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  Box,
  Button,
  Chip,
  Rating,
  Divider,
  Alert,
  Snackbar,
} from '@mui/material';
import { ShoppingCart, Inventory } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getProductById } from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [showAlert, setShowAlert] = useState(false);
  
  const product = getProductById(id);

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">
          Producto no encontrado. 
          <Button onClick={() => navigate('/')} sx={{ ml: 2 }}>
            Volver al inicio
          </Button>
        </Alert>
      </Container>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setShowAlert(true);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              image={product.image}
              alt={product.name}
              sx={{ height: 400, objectFit: 'cover' }}
            />
          </Card>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.rating} precision={0.1} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>
                ({product.rating} estrellas)
              </Typography>
            </Box>

            <Chip 
              label={product.brand} 
              color="primary" 
              sx={{ mb: 2 }} 
            />

            <Typography variant="h5" color="primary" gutterBottom>
              {formatPrice(product.price)}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Inventory sx={{ mr: 1, color: product.inStock > 0 ? 'success.main' : 'error.main' }} />
              <Typography 
                variant="body1" 
                color={product.inStock > 0 ? 'success.main' : 'error.main'}
              >
                {product.inStock > 0 ? `${product.inStock} disponibles` : 'Agotado'}
              </Typography>
            </Box>

            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Características:
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              {product.features.map((feature, index) => (
                <Typography component="li" key={index} variant="body2" sx={{ mb: 0.5 }}>
                  {feature}
                </Typography>
              ))}
            </Box>

            <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
                disabled={product.inStock === 0}
                sx={{ flexGrow: 1 }}
              >
                {product.inStock > 0 ? 'Agregar al Carrito' : 'No Disponible'}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate(-1)}
              >
                Volver
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Related Products Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Productos Relacionados
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Otros productos que podrían interesarte
        </Typography>
        {/* Aquí podrías agregar una sección de productos relacionados */}
      </Box>

      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowAlert(false)} 
          severity="success"
          sx={{ width: '100%' }}
        >
          ¡Producto agregado al carrito!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductDetail;
