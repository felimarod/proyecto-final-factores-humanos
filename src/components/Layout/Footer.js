import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  Email,
  Phone,
  LocationOn,
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        mt: 'auto',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              KeyBoard Store
            </Typography>
            <Typography variant="body2">
              Tu tienda especializada en teclados mecánicos y accesorios de alta calidad.
              Encuentra el teclado perfecto para gaming, trabajo o uso diario.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Categorías
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link color="inherit" href="/search?category=mechanical" sx={{ mb: 1 }}>
                Teclados Mecánicos
              </Link>
              <Link color="inherit" href="/search?category=gaming" sx={{ mb: 1 }}>
                Teclados Gaming
              </Link>
              <Link color="inherit" href="/search?category=accessories" sx={{ mb: 1 }}>
                Accesorios
              </Link>
              <Link color="inherit" href="/search?category=keycaps" sx={{ mb: 1 }}>
                Keycaps
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Atención al Cliente
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link color="inherit" href="#" sx={{ mb: 1 }}>
                Preguntas Frecuentes
              </Link>
              <Link color="inherit" href="#" sx={{ mb: 1 }}>
                Política de Devoluciones
              </Link>
              <Link color="inherit" href="#" sx={{ mb: 1 }}>
                Envíos y Entregas
              </Link>
              <Link color="inherit" href="#" sx={{ mb: 1 }}>
                Garantías
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contacto
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Phone sx={{ mr: 1, fontSize: 'small' }} />
              <Typography variant="body2">+57 123 456 7890</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Email sx={{ mr: 1, fontSize: 'small' }} />
              <Typography variant="body2">info@keyboardstore.com</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationOn sx={{ mr: 1, fontSize: 'small' }} />
              <Typography variant="body2">Bogotá, Colombia</Typography>
            </Box>
            
            <Box>
              <IconButton color="inherit" href="#">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" href="#">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" href="#">
                <Instagram />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, bgcolor: 'rgba(255, 255, 255, 0.2)' }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2">
            © 2025 KeyBoard Store. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
