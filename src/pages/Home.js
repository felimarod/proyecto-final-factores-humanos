import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
  Paper,
} from '@mui/material';
import { Star, ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getFeaturedProducts } from '../data/products';

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const featuredProducts = getFeaturedProducts();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
          color: 'white',
          py: 8,
          mb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom>
                Encuentra tu Teclado Perfecto
              </Typography>
              <Typography variant="h5" paragraph>
                La mejor selección de teclados mecánicos y accesorios para gaming,
                trabajo y uso diario.
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => navigate('/search')}
                  sx={{ mr: 2 }}
                >
                  Explorar Productos
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  onClick={() => navigate('/search?category=gaming')}
                >
                  Gaming
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600"
                alt="Teclado mecánico"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Categories Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Categorías Populares
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {[
              {
                name: 'Teclados Mecánicos',
                category: 'mechanical',
                image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300',
                description: 'Switches premium y construcción de calidad'
              },
              {
                name: 'Gaming',
                category: 'gaming',
                image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300',
                description: 'Diseñados para el máximo rendimiento'
              },
              {
                name: 'Accesorios',
                category: 'accessories',
                image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300',
                description: 'Complementa tu setup perfecto'
              },
              {
                name: 'Keycaps',
                category: 'keycaps',
                image: 'https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=300',
                description: 'Personaliza tu teclado con estilo'
              },
            ].map((category) => (
              <Grid item xs={12} sm={6} md={3} key={category.category}>
                <Paper
                  sx={{
                    p: 0,
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.05)' },
                  }}
                  onClick={() => navigate(`/search?category=${category.category}`)}
                >
                  <Box
                    component="img"
                    src={category.image}
                    alt={category.name}
                    sx={{
                      width: '100%',
                      height: 200,
                      objectFit: 'cover',
                    }}
                  />
                  <Box sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      {category.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {category.description}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Featured Products Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Productos Destacados
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {featuredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h3">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {product.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Star sx={{ color: 'gold', mr: 0.5 }} />
                      <Typography variant="body2">
                        {product.rating} ({product.inStock} disponibles)
                      </Typography>
                    </Box>
                    <Chip label={product.brand} size="small" sx={{ mb: 1 }} />
                    <Typography variant="h6" color="primary">
                      {formatPrice(product.price)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      Ver Detalles
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<ShoppingCart />}
                      onClick={() => handleAddToCart(product)}
                    >
                      Agregar
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Home;
