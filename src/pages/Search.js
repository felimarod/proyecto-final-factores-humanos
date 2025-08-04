import { Search as SearchIcon, ShoppingCart, Star } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Pagination,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import usePageTitle from "../hooks/usePageTitle";
import {
  getProductsByCategory,
  products,
  searchProducts,
} from "../data/products";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  
  usePageTitle("Buscar Productos");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedFilters, setSelectedFilters] = useState({
    layout: [],
    switchType: [],
    material: [],
  });
  const productsPerPage = 9;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q") || "";
    const category = params.get("category") || "all";

    setSearchTerm(query);
    setSelectedCategory(category);
    setCurrentPage(1);
  }, [location.search]);

  useEffect(() => {
    let results = [];

    if (searchTerm) {
      results = searchProducts(searchTerm);
    } else if (selectedCategory !== "all") {
      results = getProductsByCategory(selectedCategory);
    } else {
      results = [...products];
    }

    // Apply price filter (convert COP to USD display range)
    results = results.filter((product) => {
      const usdPrice = product.price / 1000;
      return usdPrice >= priceRange[0] && usdPrice <= priceRange[1];
    });

    // Apply sorting
    results.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(results);
  }, [searchTerm, selectedCategory, sortBy, priceRange, selectedFilters]);

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "all") {
      navigate("/search");
    } else {
      navigate(`/search?category=${category}`);
    }
  };

  const handleFilterToggle = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value],
    }));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price / 1000);
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const filterChips = [
    {
      category: "main",
      items: ["Keyboards", "Keycaps", "Switches", "Accessories", "DIY Kits"],
    },
    { category: "layout", items: ["60%", "75%", "Full-size", "TKL"] },
    { category: "switchType", items: ["Linear", "Tactile", "Clicky"] },
    { category: "material", items: ["ABS", "PBT", "Metal"] },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Search Bar */}
      <Box sx={{ mb: 4 }}>
        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#363636",
            borderRadius: "12px",
            p: 1,
            maxWidth: 600,
          }}
        >
          <SearchIcon sx={{ color: "#adadad", ml: 2 }} />
          <TextField
            fullWidth
            label="Buscar productos"
            placeholder="Buscar productos"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="standard"
            title="Ingrese términos de búsqueda para encontrar productos"
            InputProps={{
              "aria-label": "Buscar productos",
              disableUnderline: true,
              sx: {
                pl: 2,
                color: "white",
                "& .MuiInputBase-input::placeholder": {
                  color: "#adadad",
                  opacity: 1,
                },
                "&.Mui-focused": {
                  color: "#3d98f4",
                },
              },
            }}
          />
        </Box>
      </Box>

      {/* Filters Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          sx={{
            fontSize: "22px",
            fontWeight: 700,
            letterSpacing: "-0.015em",
            mb: 3,
          }}
        >
          Filtros
        </Typography>

        {/* Category Filters */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {filterChips[0].items.map((item) => (
              <Chip
                key={item}
                label={item}
                onClick={() => {
                  // Map display names to actual categories
                  const categoryMap = {
                    Keyboards: "mechanical",
                    Keycaps: "keycaps",
                    Switches: "accessories",
                    Accessories: "accessories",
                    "DIY Kits": "mechanical",
                  };
                  const category = categoryMap[item] || "all";
                  handleCategoryChange(category);
                }}
                sx={{
                  backgroundColor: "#363636",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#4d4d4d",
                  },
                  "&.Mui-focusVisible": {
                    backgroundColor: "#3d98f4",
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Price Range */}
        <Box sx={{ mb: 3, maxWidth: 400 }}>
          <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
            Rango de Precios
          </Typography>
          <Box sx={{ px: 2 }}>
            <Slider
              value={priceRange}
              onChange={(event, newValue) => setPriceRange(newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={500}
              valueLabelFormat={(value) => `$${value}`}
              sx={{
                color: "#3d98f4",
                "& .MuiSlider-thumb": {
                  backgroundColor: "#3d98f4",
                },
                "& .MuiSlider-track": {
                  backgroundColor: "#3d98f4",
                },
                "& .MuiSlider-rail": {
                  backgroundColor: "#4d4d4d",
                },
              }}
            />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}
            >
              <Typography variant="body2" sx={{ color: "#9cabba" }}>
                ${priceRange[0]}
              </Typography>
              <Typography variant="body2" sx={{ color: "#9cabba" }}>
                ${priceRange[1]}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Layout Filters */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {filterChips[1].items.map((item) => (
              <Chip
                key={item}
                label={item}
                onClick={() => handleFilterToggle("layout", item)}
                sx={{
                  backgroundColor: selectedFilters.layout.includes(item)
                    ? "#3d98f4"
                    : "#363636",
                  color: "white",
                  "&:hover": {
                    backgroundColor: selectedFilters.layout.includes(item)
                      ? "#2984e6"
                      : "#4d4d4d",
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Switch Type Filters */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {filterChips[2].items.map((item) => (
              <Chip
                key={item}
                label={item}
                onClick={() => handleFilterToggle("switchType", item)}
                sx={{
                  backgroundColor: selectedFilters.switchType.includes(item)
                    ? "#3d98f4"
                    : "#363636",
                  color: "white",
                  "&:hover": {
                    backgroundColor: selectedFilters.switchType.includes(item)
                      ? "#2984e6"
                      : "#4d4d4d",
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Material Filters */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {filterChips[3].items.map((item) => (
              <Chip
                key={item}
                label={item}
                onClick={() => handleFilterToggle("material", item)}
                sx={{
                  backgroundColor: selectedFilters.material.includes(item)
                    ? "#3d98f4"
                    : "#363636",
                  color: "white",
                  "&:hover": {
                    backgroundColor: selectedFilters.material.includes(item)
                      ? "#2984e6"
                      : "#4d4d4d",
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>

      {/* Products Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontSize: "22px",
            fontWeight: 700,
            letterSpacing: "-0.015em",
          }}
        >
          Productos
        </Typography>

        <FormControl size="small" sx={{ minWidth: 200 }}>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            sx={{
              backgroundColor: "#363636",
              color: "white",
              borderRadius: "12px",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "& .MuiSelect-icon": {
                color: "white",
              },
            }}
          >
            <MenuItem value="name">Ordenar por nombre</MenuItem>
            <MenuItem value="price-low">Precio: Bajo a Alto</MenuItem>
            <MenuItem value="price-high">Precio: Alto a Bajo</MenuItem>
            <MenuItem value="rating">Mejor Calificado</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Results Info */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ color: "white" }}>
          {filteredProducts.length} producto
          {filteredProducts.length !== 1 ? "s" : ""} encontrado
          {filteredProducts.length !== 1 ? "s" : ""}
        </Typography>
        {searchTerm && (
          <Typography variant="body2" sx={{ color: "#9cabba" }}>
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
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#1a1a1a",
                    borderRadius: "12px",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                    sx={{ borderRadius: "12px 12px 0 0" }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h3"
                      sx={{
                        color: "white",
                        fontSize: "1rem",
                        fontWeight: 500,
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#9cabba",
                        mb: 2,
                        fontSize: "0.875rem",
                      }}
                    >
                      {product.description.length > 100
                        ? `${product.description.substring(0, 100)}...`
                        : product.description}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Star
                        sx={{ color: "#ffd700", mr: 0.5, fontSize: "1rem" }}
                      />
                      <Typography variant="body2" sx={{ color: "#9cabba" }}>
                        {product.rating} ({product.inStock} disponibles)
                      </Typography>
                    </Box>
                    <Chip
                      label={product.brand}
                      size="small"
                      sx={{
                        mb: 1,
                        backgroundColor: "#363636",
                        color: "white",
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#3d98f4",
                        fontWeight: 700,
                      }}
                    >
                      {formatPrice(product.price)}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      size="small"
                      onClick={() => navigate(`/product/${product.id}`)}
                      sx={{
                        color: "#9cabba",
                        textTransform: "none",
                      }}
                    >
                      Ver Detalles
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<ShoppingCart />}
                      onClick={() => addToCart(product)}
                      disabled={product.inStock === 0}
                      sx={{
                        ml: "auto",
                        backgroundColor: "#3d98f4",
                        "&:hover": {
                          backgroundColor: "#2984e6",
                        },
                        textTransform: "none",
                      }}
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
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(event, value) => setCurrentPage(value)}
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "white",
                  },
                  "& .Mui-selected": {
                    backgroundColor: "#3d98f4 !important",
                    color: "white",
                  },
                }}
              />
            </Box>
          )}
        </>
      ) : (
        <Alert
          severity="info"
          sx={{
            backgroundColor: "#363636",
            color: "white",
            "& .MuiAlert-icon": {
              color: "#3d98f4",
            },
          }}
        >
          No se encontraron productos que coincidan con su criterio.
          <Button
            onClick={() => navigate("/")}
            sx={{
              ml: 2,
              color: "#3d98f4",
            }}
          >
            Volver a la página de inicio
          </Button>
        </Alert>
      )}
    </Container>
  );
};

export default Search;
