import {
  Add,
  Delete,
  LocalShipping,
  NavigateNext,
  Remove,
  Security,
  ShoppingBag,
} from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, getTotalPrice } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price / 1000);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const getCartCount = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  const shipping = 15; // $15 shipping
  const tax = getTotalPrice() * 0.08; // 8% tax
  const total = getTotalPrice() + shipping * 1000 + tax;

  if (cart.items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          sx={{
            mb: 3,
            "& .MuiBreadcrumbs-ol": {
              color: "#9cabba",
            },
            "& .MuiBreadcrumbs-separator": {
              color: "#9cabba",
            },
          }}
        >
          <Link
            color="inherit"
            onClick={() => navigate("/")}
            sx={{
              cursor: "pointer",
              "&:hover": { color: "#3d98f4" },
            }}
          >
            Inicio
          </Link>
          <Typography sx={{ color: "white" }}>Carrito de Compras</Typography>
        </Breadcrumbs>

        <Box sx={{ textAlign: "center", py: 8 }}>
          <ShoppingBag sx={{ fontSize: 100, color: "#4d4d4d", mb: 2 }} />
          <Typography
            variant="h4"
            sx={{
              color: "white",
              fontWeight: 700,
              mb: 2,
            }}
          >
            Your cart is empty
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#9cabba",
              mb: 4,
            }}
          >
            Looks like you haven't added anything to your cart yet.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/search")}
            sx={{
              backgroundColor: "#3d98f4",
              "&:hover": {
                backgroundColor: "#2984e6",
              },
              textTransform: "none",
              fontWeight: 600,
              py: 1.5,
              px: 4,
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator={<NavigateNext fontSize="small" />}
        sx={{
          mb: 3,
          "& .MuiBreadcrumbs-ol": {
            color: "#9cabba",
          },
          "& .MuiBreadcrumbs-separator": {
            color: "#9cabba",
          },
        }}
      >
        <Link
          color="inherit"
          onClick={() => navigate("/")}
          sx={{
            cursor: "pointer",
            "&:hover": { color: "#3d98f4" },
          }}
        >
          Home
        </Link>
        <Typography sx={{ color: "white" }}>Carrito de Compras</Typography>
      </Breadcrumbs>

      <Typography
        variant="h4"
        component="h1"
        sx={{
          color: "white",
          fontWeight: 700,
          mb: 1,
        }}
      >
        Carrito de Compras
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#9cabba",
          mb: 4,
        }}
      >
        {getCartCount()} item{getCartCount() !== 1 ? "s" : ""} en tu carrito
      </Typography>

      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ backgroundColor: "#1a1a1a", borderRadius: "12px" }}>
            <CardContent sx={{ p: 0 }}>
              {cart.items.map((item, index) => (
                <Box key={`${item.id}-${index}`}>
                  <Box sx={{ p: 3 }}>
                    <Grid container spacing={2} alignItems="center">
                      {/* Product Image */}
                      <Grid item xs={12} sm={3}>
                        <Box
                          component="img"
                          src={item.image}
                          alt={item.name}
                          sx={{
                            width: "100%",
                            height: 120,
                            objectFit: "cover",
                            borderRadius: "8px",
                            backgroundColor: "#363636",
                          }}
                        />
                      </Grid>

                      {/* Product Info */}
                      <Grid item xs={12} sm={6}>
                        <Typography
                          variant="h6"
                          sx={{
                            color: "white",
                            fontWeight: 600,
                            mb: 1,
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#9cabba",
                            mb: 2,
                          }}
                        >
                          {item.brand}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            color: "#3d98f4",
                            fontWeight: 700,
                          }}
                        >
                          {formatPrice(item.price)}
                        </Typography>
                      </Grid>

                      {/* Quantity and Actions */}
                      <Grid item xs={12} sm={3}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            gap: 2,
                          }}
                        >
                          {/* Quantity Controls */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                              sx={{
                                backgroundColor: "#363636",
                                color: "white",
                                "&:hover": {
                                  backgroundColor: "#4d4d4d",
                                },
                                "&:disabled": {
                                  backgroundColor: "#2a2a2a",
                                  color: "#666",
                                },
                              }}
                            >
                              <Remove fontSize="small" />
                            </IconButton>
                            <Box
                              sx={{
                                backgroundColor: "#363636",
                                color: "white",
                                px: 2,
                                py: 1,
                                borderRadius: "4px",
                                minWidth: 40,
                                textAlign: "center",
                                fontSize: "0.875rem",
                                fontWeight: 600,
                              }}
                            >
                              {item.quantity}
                            </Box>
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                              disabled={item.quantity >= item.inStock}
                              sx={{
                                backgroundColor: "#363636",
                                color: "white",
                                "&:hover": {
                                  backgroundColor: "#4d4d4d",
                                },
                                "&:disabled": {
                                  backgroundColor: "#2a2a2a",
                                  color: "#666",
                                },
                              }}
                            >
                              <Add fontSize="small" />
                            </IconButton>
                          </Box>

                          {/* Remove Button */}
                          <IconButton
                            onClick={() => handleRemoveItem(item.id)}
                            sx={{
                              color: "#ff4444",
                              "&:hover": {
                                backgroundColor: "rgba(255, 68, 68, 0.1)",
                              },
                            }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  {index < cart.items.length - 1 && (
                    <Divider sx={{ backgroundColor: "#363636" }} />
                  )}
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} lg={4}>
          <Box sx={{ position: "sticky", top: 100 }}>
            {/* Promo Code */}
            {/* <Card sx={{ backgroundColor: '#1a1a1a', borderRadius: '12px', mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: 'white',
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  Promo Code
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    placeholder="Enter promo code"
                    size="small"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocalOffer sx={{ color: '#9cabba' }} />
                        </InputAdornment>
                      ),
                      sx: {
                        backgroundColor: '#363636',
                        color: 'white',
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          border: 'none',
                        },
                        '& .MuiInputBase-input::placeholder': {
                          color: '#9cabba',
                          opacity: 1,
                        },
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#3d98f4',
                      '&:hover': {
                        backgroundColor: '#2984e6',
                      },
                      textTransform: 'none',
                      px: 3,
                    }}
                  >
                    Apply
                  </Button>
                </Box>
              </CardContent>
            </Card> */}

            {/* Order Summary */}
            <Card sx={{ backgroundColor: "#1a1a1a", borderRadius: "12px" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "white",
                    fontWeight: 600,
                    mb: 3,
                  }}
                >
                  Resumen del Pedido
                </Typography>

                {/* Summary Items */}
                <Box sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Typography sx={{ color: "#9cabba" }}>
                      Subtotal ({getCartCount()} items)
                    </Typography>
                    <Typography sx={{ color: "white", fontWeight: 600 }}>
                      {formatPrice(getTotalPrice())}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Typography sx={{ color: "#9cabba" }}>Envio</Typography>
                    <Typography sx={{ color: "white", fontWeight: 600 }}>
                      ${shipping}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Typography sx={{ color: "#9cabba" }}>Impuestos</Typography>
                    <Typography sx={{ color: "white", fontWeight: 600 }}>
                      {formatPrice(tax)}
                    </Typography>
                  </Box>
                  <Divider sx={{ backgroundColor: "#363636", my: 2 }} />
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: "white",
                        fontWeight: 700,
                      }}
                    >
                      Total
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#3d98f4",
                        fontWeight: 700,
                      }}
                    >
                      {formatPrice(total)}
                    </Typography>
                  </Box>
                </Box>

                {/* Checkout Button */}
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={() => navigate("/checkout")}
                  sx={{
                    backgroundColor: "#3d98f4",
                    "&:hover": {
                      backgroundColor: "#2984e6",
                    },
                    textTransform: "none",
                    fontWeight: 600,
                    py: 1.5,
                    mb: 3,
                  }}
                >
                  Pagar
                </Button>

                {/* Security Features */}
                <Box sx={{ textAlign: "center" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                    }}
                  >
                    <Security
                      sx={{ color: "#4caf50", mr: 1, fontSize: "1.25rem" }}
                    />
                    <Typography sx={{ color: "#9cabba", fontSize: "0.875rem" }}>
                      Pago seguro
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <LocalShipping
                      sx={{ color: "#3d98f4", mr: 1, fontSize: "1.25rem" }}
                    />
                    <Typography sx={{ color: "#9cabba", fontSize: "0.875rem" }}>
                      Envio gratis en compras superiores a $100
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>

      {/* Continue Shopping */}
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Button
          variant="outlined"
          onClick={() => navigate("/search")}
          sx={{
            borderColor: "#4d4d4d",
            color: "white",
            "&:hover": {
              borderColor: "#3d98f4",
              backgroundColor: "rgba(61, 152, 244, 0.1)",
            },
            textTransform: "none",
            fontWeight: 600,
            py: 1.5,
            px: 4,
          }}
        >
          Seguir comprando
        </Button>
      </Box>
    </Container>
  );
};

export default Cart;
