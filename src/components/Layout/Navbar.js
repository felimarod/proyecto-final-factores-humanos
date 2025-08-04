import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  InputBase,
  Box,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Search as SearchIcon,
  ShoppingCart,
  Menu as MenuIcon,
  Person,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '12px',
  backgroundColor: '#363636',
  '&:hover': {
    backgroundColor: '#4d4d4d',
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
    minWidth: '300px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#adadad',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    color: '#ffffff',
    '&::placeholder': {
      color: '#adadad',
    },
  },
}));

const KeyboardIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
    <path
      d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
      fill="currentColor"
    />
  </svg>
);

const Navbar = () => {
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (event) => {
    if (event.key === 'Enter' || event.type === 'click') {
      if (searchTerm.trim()) {
        navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
        setSearchTerm('');
      }
    }
  };

  const categories = [
    { name: 'Shop', path: '/search' },
    { name: 'Build', path: '/search?category=mechanical' },
    { name: 'Community', path: '#' },
    { name: 'Support', path: '#' },
  ];

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        backgroundColor: '#111418',
        borderBottom: '1px solid #283039',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 5 } }}>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1, 
            cursor: 'pointer',
            mr: { xs: 2, md: 4 }
          }}
          onClick={() => navigate('/')}
        >
          <KeyboardIcon />
          <Typography
            variant="h6"
            sx={{ 
              fontWeight: 700,
              letterSpacing: '-0.015em',
              fontSize: '18px',
            }}
          >
            KeyboardsCo
          </Typography>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4, mr: 'auto' }}>
          {categories.map((category) => (
            <Button
              key={category.name}
              sx={{ 
                color: 'white',
                textTransform: 'none',
                fontSize: '14px',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'transparent',
                  opacity: 0.8,
                }
              }}
              onClick={() => category.path !== '#' && navigate(category.path)}
            >
              {category.name}
            </Button>
          ))}
        </Box>

        <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 'auto' }}>
          <IconButton
            size="large"
            sx={{ color: 'white' }}
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                backgroundColor: '#1a1a1a',
                color: 'white',
              }
            }}
          >
            {categories.map((category) => (
              <MenuItem
                key={category.name}
                onClick={() => {
                  if (category.path !== '#') navigate(category.path);
                  handleMenuClose();
                }}
                sx={{ color: 'white' }}
              >
                {category.name}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for products"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleSearch}
            />
          </Search>

          <IconButton
            sx={{ 
              color: 'white',
              backgroundColor: '#363636',
              borderRadius: '12px',
              width: 40,
              height: 40,
              ml: 1,
              '&:hover': {
                backgroundColor: '#4d4d4d',
              }
            }}
          >
            <Person />
          </IconButton>

          <IconButton
            sx={{ 
              color: 'white',
              backgroundColor: '#363636',
              borderRadius: '12px',
              width: 40,
              height: 40,
              '&:hover': {
                backgroundColor: '#4d4d4d',
              }
            }}
            onClick={() => navigate('/cart')}
          >
            <Badge badgeContent={getTotalItems()} color="primary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
