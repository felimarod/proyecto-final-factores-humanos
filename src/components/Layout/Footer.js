import {
  Email,
  Facebook,
  Instagram,
  LocationOn,
  Phone,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#111418",
        color: "white",
        py: 6,
        mt: 8,
        borderTop: "1px solid #363636",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                letterSpacing: "-0.025em",
                mb: 2,
                color: "white",
              }}
            >
              KeyboardsCo
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#9cabba",
                mb: 3,
                lineHeight: 1.6,
              }}
            >
              Tu mejor opción para teclados mecánicos y accesorios. Ofrecemos
              productos de alta calidad tanto para entusiastas como para
              profesionales.
            </Typography>

            {/* Social Media */}
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                sx={{
                  color: "#9cabba",
                  "&:hover": {
                    color: "#3d98f4",
                    backgroundColor: "rgba(61, 152, 244, 0.1)",
                  },
                }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                sx={{
                  color: "#9cabba",
                  "&:hover": {
                    color: "#3d98f4",
                    backgroundColor: "rgba(61, 152, 244, 0.1)",
                  },
                }}
              >
                <Twitter />
              </IconButton>
              <IconButton
                sx={{
                  color: "#9cabba",
                  "&:hover": {
                    color: "#3d98f4",
                    backgroundColor: "rgba(61, 152, 244, 0.1)",
                  },
                }}
              >
                <Instagram />
              </IconButton>
              <IconButton
                sx={{
                  color: "#9cabba",
                  "&:hover": {
                    color: "#3d98f4",
                    backgroundColor: "rgba(61, 152, 244, 0.1)",
                  },
                }}
              >
                <YouTube />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: "white",
              }}
            >
              Tienda
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link
                href="/search?category=mechanical"
                sx={{
                  color: "#9cabba",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  "&:hover": {
                    color: "#3d98f4",
                  },
                }}
              >
                Teclados
              </Link>
              <Link
                href="/search?category=keycaps"
                sx={{
                  color: "#9cabba",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  "&:hover": {
                    color: "#3d98f4",
                  },
                }}
              >
                Teclas
              </Link>
              <Link
                href="/search?category=accessories"
                sx={{
                  color: "#9cabba",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  "&:hover": {
                    color: "#3d98f4",
                  },
                }}
              >
                Switches
              </Link>
              <Link
                href="/search?category=accessories"
                sx={{
                  color: "#9cabba",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  "&:hover": {
                    color: "#3d98f4",
                  },
                }}
              >
                Accesorios
              </Link>
            </Box>
          </Grid>

          {/* Support */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: "white",
              }}
            >
              Soporte
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link
                href="#"
                sx={{
                  color: "#9cabba",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  "&:hover": {
                    color: "#3d98f4",
                  },
                }}
              >
                Centro de Ayuda
              </Link>
              <Link
                href="#"
                sx={{
                  color: "#9cabba",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  "&:hover": {
                    color: "#3d98f4",
                  },
                }}
              >
                Información de Envío
              </Link>
              <Link
                href="#"
                sx={{
                  color: "#9cabba",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  "&:hover": {
                    color: "#3d98f4",
                  },
                }}
              >
                Devoluciones
              </Link>
              <Link
                href="#"
                sx={{
                  color: "#9cabba",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  "&:hover": {
                    color: "#3d98f4",
                  },
                }}
              >
                Contáctanos
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: "white",
              }}
            >
              Contacto
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Email sx={{ color: "#3d98f4", mr: 2, fontSize: "1.25rem" }} />
                <Typography sx={{ color: "#9cabba", fontSize: "0.875rem" }}>
                  support@keyboardsco.com
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Phone sx={{ color: "#3d98f4", mr: 2, fontSize: "1.25rem" }} />
                <Typography sx={{ color: "#9cabba", fontSize: "0.875rem" }}>
                  +1 (555) 123-4567
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocationOn
                  sx={{ color: "#3d98f4", mr: 2, fontSize: "1.25rem" }}
                />
                <Typography sx={{ color: "#9cabba", fontSize: "0.875rem" }}>
                  Carrera 7 #40-20, Bogotá, Colombia
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Box
          sx={{
            borderTop: "1px solid #363636",
            mt: 4,
            pt: 3,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#9cabba",
              fontSize: "0.875rem",
            }}
          >
            © 2025 KeyboardsCo. Todos los derechos reservados.
          </Typography>

          <Box sx={{ display: "flex", gap: 3 }}>
            <Link
              href="#"
              sx={{
                color: "#9cabba",
                textDecoration: "none",
                fontSize: "0.875rem",
                "&:hover": {
                  color: "#3d98f4",
                },
              }}
            >
              Política de Privacidad
            </Link>
            <Link
              href="#"
              sx={{
                color: "#9cabba",
                textDecoration: "none",
                fontSize: "0.875rem",
                "&:hover": {
                  color: "#3d98f4",
                },
              }}
            >
              Términos de Servicio
            </Link>
            <Link
              href="#"
              sx={{
                color: "#9cabba",
                textDecoration: "none",
                fontSize: "0.875rem",
                "&:hover": {
                  color: "#3d98f4",
                },
              }}
            >
              Política de Cookies
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
