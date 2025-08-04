import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Search from './pages/Search';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3d98f4',
    },
    secondary: {
      main: '#363636',
    },
    background: {
      default: '#111418',
      paper: '#1a1a1a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#9cabba',
    },
  },
  typography: {
    fontFamily: '"Space Grotesk", "Noto Sans", "Roboto", Arial, sans-serif',
    h1: {
      fontWeight: 900,
      letterSpacing: '-0.033em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.015em',
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.015em',
    },
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.015em',
    },
    h5: {
      fontWeight: 700,
      letterSpacing: '-0.015em',
    },
    h6: {
      fontWeight: 700,
      letterSpacing: '-0.015em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 700,
          letterSpacing: '0.015em',
        },
        contained: {
          backgroundColor: '#3d98f4',
          '&:hover': {
            backgroundColor: '#2984e6',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a1a',
          borderRadius: '12px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#363636',
            borderRadius: '12px',
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: '#3d98f4',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3d98f4',
            },
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <Router basename="/proyecto-final-factores-humanos">
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/search" element={<Search />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
