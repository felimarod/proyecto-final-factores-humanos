import React, { useState, useEffect } from 'react';
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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Pagination,
  Alert,
} from '@mui/material';
import { Star, ShoppingCart, Search as SearchIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products, searchProducts, getProductsByCategory } from '../data/products';

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    const category = params.get('category') || 'all';
    
    setSearchTerm(query);
    setSelectedCategory(category);
    setCurrentPage(1);
  }, [location.search]);

  useEffect(() => {
    let results = [];
    
    if (searchTerm) {
      results = searchProducts(searchTerm);
    } else if (selectedCategory !== 'all') {
      results = getProductsByCategory(selectedCategory);
    } else {
      results = [...products];
    }

    // Apply sorting
    results.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(results);
  }, [searchTerm, selectedCategory, sortBy]);

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      navigate('/search');
    } else {
      navigate(`/search?category=${category}`);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const categories = [
    { value: 'all', label: 'Todas las categorías' },
    { value: 'mechanical', label: 'Teclados Mecánicos' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'accessories', label: 'Accesorios' },
    { value: 'keycaps', label: 'Keycaps' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Buscar Productos
      </Typography>

      {/* Search and Filters */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex' }}>
              <TextField
                fullWidth
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ mr: 1 }}
              />
              <Button type="submit" variant="contained" sx={{ minWidth: 'auto', px: 2 }}>
                <SearchIcon />
              </Button>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Categoría</InputLabel>
              <Select
                value={selectedCategory}
                label="Categoría"
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Ordenar por</InputLabel>
              <Select
                value={sortBy}
                label="Ordenar por"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="name">Nombre</MenuItem>
                <MenuItem value="price-low">Precio: Menor a Mayor</MenuItem>
                <MenuItem value="price-high">Precio: Mayor a Menor</MenuItem>
                <MenuItem value="rating">Mejor Valorados</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Results Info */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">
          {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
        </Typography>
        {searchTerm && (
          <Typography variant="body2" color="text.secondary">
            Resultados para: "{searchTerm}"
          </Typography>
        )}
      </Box>

      {/* Products Grid */}
      {currentProducts.length > 0 ? (
        <>
          <Grid container spacing={3}>
            {currentProducts.map((product) => (
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
                      {product.description.length > 100 
                        ? `${product.description.substring(0, 100)}...` 
                        : product.description
                      }
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
                      onClick={() => addToCart(product)}
                      disabled={product.inStock === 0}
                    >
                      Agregar
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(event, value) => setCurrentPage(value)}
                color="primary"
              />
            </Box>
          )}
        </>
      ) : (
        <Alert severity="info">
          No se encontraron productos que coincidan con tu búsqueda.
          <Button onClick={() => navigate('/')} sx={{ ml: 2 }}>
            Volver al inicio
          </Button>
        </Alert>
      )}
    </Container>
  );
};

export default Search;
