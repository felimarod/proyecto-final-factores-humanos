import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: "480px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBZCZSx-3bRRh1UG3V--sKcZT_6sTKo6C4_YaIM1R62vl_XJV1B1THTlzUpSxMvpKWHASr2xaYzx2he2VIgPBg8OKpwxEpYJWSvTZFFou0wUQGUHDVpj4_7CFL1Np1dWJM3605t6NaVZBTv8j9b3fsVVIun6N2cYDO4rO34LH1nApk7D77iiVWPhu_6_jXNrpY-bUiQTCXmvQV_wJ_J64U0oIPQZXmdJbGocHc31lCMAEky_Lj7F9fZuOhm9j223gdVpCF718_fDA')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: { xs: 0, sm: "12px" },
          mx: { xs: 0, sm: 2 },
          mb: 4,
          color: "white",
          textAlign: "center",
          gap: 2,
          px: 4,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "2.5rem", sm: "3rem" },
            fontWeight: 900,
            letterSpacing: "-0.033em",
            maxWidth: "800px",
          }}
        >
          Crea tu teclado perfecto
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "0.875rem", sm: "1rem" },
            fontWeight: 400,
            maxWidth: "600px",
            opacity: 0.9,
          }}
        >
          Da rienda suelta a tu creatividad con nuestra selección premium de
          teclados mecánicos, interruptores, teclas y cables personalizados.
          Crea el teclado de tus sueños hoy mismo.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/search")}
          sx={{
            mt: 2,
            px: { xs: 3, sm: 5 },
            py: { xs: 1.5, sm: 2 },
            fontSize: { xs: "0.875rem", sm: "1rem" },
            fontWeight: 700,
            backgroundColor: "#3d98f4",
            "&:hover": {
              backgroundColor: "#2984e6",
            },
          }}
        >
          Comprar ahora
        </Button>
      </Box>

      <Container maxWidth="lg">
        {/* Featured Products Section */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "-0.015em",
              mb: 3,
              px: 2,
            }}
          >
            Productos destacados
          </Typography>

          {/* Horizontal Scroll Container */}
          <Box
            sx={{
              display: "flex",
              overflowX: "auto",
              gap: 3,
              p: 2,
              "&::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
            }}
          >
            {[
              {
                title: "Teclados Personalizados",
                description:
                  "Diseña tu teclado único con nuestra amplia gama de opciones personalizables.",
                image:
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuAoEvSkbGteKGOjbvRt3QhNmjTuJ6TiFYNu3jbLtzdkPhoNPCYiKgxNyiTlOANay-k4gXk-BDhIRBXbiGengH0sjL_YgYMztywXidK8YqMoNF93f0Jd_byCMoOLEG02_HDX6K7iW22pxoMuBGlA7SSOeuEnB77nSZetHm6UaCMibIk_dA87HPfTqsTUvcYmthlZa4B72kU89uzz4GM3mR2YHg4Nu5Tq4Ulw2na-k5mutLeyus0HSwmvPsIs9KZ7xT2S0IfJL4-ZAw",
              },
              {
                title: "Teclados RGB",
                description:
                  "Ilumina tu configuración con nuestros vibrantes teclados RGB.",
                image:
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuAY0VsC6Ei3MwrQa2D7I-N9iInNBU7WPOqcau5JtDV_d60zoh02ciXHdAVq6ctdu-19V5ZaK6ynMC5QooiMxFXFVIrgsY6hWV_n_3A2vAQbATLXPgxT7QEFZdASKZbhd9v03X4AD41w6RE2M77G00uYWQ_3QrnvsxrlVZ3VyFSxkJnc0xYVw2RGxIncG4FBO36KTyCuppcEeKkEOAzDN5cHlkxsWUX5mNy6mJDM9x1Ocu8sF97HERqgLfkkeQX0n_swKdvbGcXpEA",
              },
              {
                title: "Switches",
                description:
                  "Elige entre una variedad de interruptores de alta calidad para la sensación perfecta.",
                image:
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuCbM1FzztnRa-hjTMGXVSzJpRKL5CBiGs_bkifHboS4BQ22QJQBaO_PFFItwOgTtUX-Cpl4cFn-VnLKSuZlcViN2k1PU4RrZG2JxyYJ34pTScX1hIVaLn-uwoUOJxYE5XsatoSCk0QfrjhMm9udKmHSr1Omp5QbubRYp4gdB-0l0x6XEdMl5vIG73emxCZml1xriGkbedlS6PmDtNugdjxd3_1YyMoKPJjBKe5zIyZd9FF1wtLiYge-ccf-HZ8mEuWNfD1n4_Z3QQ",
              },
              {
                title: "Teclas",
                description:
                  "Personalice su teclado con nuestras teclas elegantes y duraderas.",
                image:
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuApHV8qs9uacgzYKrOwvuvgT6PdaYfd7Vo2aPja6h_BxN_ouaz5JbfXieNtFp3b4Gp9vMsVojEqJ2JL4wUeeugl7ENJMGWW2i8NVU2rK0nK1hqjp_ptlXwjAfmpZ4HoM8x_3_v1lhiqJXedSr2_aV_zvFGCD-TLDNXhD0OjTuCRk-sKPH0oIbjHen1eezDCzs-UFgkAq5EFkH_YR_4m1tETv8oPyvAyuTTjQVCyaES-3kor51U7KFcYlTiNUxBG0xQOJAVhxVkUKA",
              },
              {
                title: "Cables",
                description:
                  "Complete su configuración con nuestra selección premium de cables de teclado.",
                image:
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuCKVekvu0CmTv8hWJs5Med_MSyD-A39yj8KQ-jQhUcUQ6GbPBY8PirkfdAZ0ODLpi9xXEtWFnsL1eOWyAf5Y3NyY1o-_mvm3LjXhMzpdzZNtVCOzEmacVwFvHo56TzC0d8eT4_XiZpLbh7b6q-drcUG2RHvXCN7pQFKKB6199tq2_gg4-86fGeH17bEqe3YsxVWG_uLuq7bIYL9kfYPsRSKNdhagK9FiZwBpV9uCinY6Yr646pvVvKvGOLpiJoyKq73b867RgMkPg",
              },
            ].map((item, index) => (
              <Card
                key={index}
                sx={{
                  minWidth: 240,
                  backgroundColor: "#1a1a1a",
                  borderRadius: "12px",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    transition: "transform 0.2s ease-in-out",
                  },
                }}
                onClick={() => navigate("/search")}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={item.image}
                  alt={item.title}
                  sx={{ borderRadius: "12px 12px 0 0" }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "white",
                      fontWeight: 500,
                      mb: 1,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#9cabba",
                      fontSize: "0.875rem",
                    }}
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Collections Section */}
        <Box sx={{ mb: 6 }}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", sm: "2.5rem" },
                fontWeight: 700,
                letterSpacing: "-0.015em",
                mb: 2,
                maxWidth: "720px",
              }}
            >
              Explora nuestras colecciones
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#9cabba",
                maxWidth: "720px",
                fontSize: "1rem",
              }}
            >
              Descubra nuestras colecciones seleccionadas de componentes y
              accesorios de teclados mecánicos de primera calidad.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {[
              {
                title: "Teclados Personalizados",
                description:
                  "Diseña tu teclado único con nuestra amplia gama de opciones personalizables.",
                image:
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuBe4xKbsPBGIfpicdCogaTPlIac6LH3_JIZqbiqEOdWuE7SYyMZEpjX7uitiNmEZN94ssAi5z4N2FQhekukhzR5A3tURYyAxUId8TCsrk-fhGt6RjDplz9lq7qWSxhkY303fQ6n6eYhG4LVUS5h38XAXYlVkKOuCgq1W7jyc0OdwiUG0S2lvRS8GOwPQN3ndlp9pKqMYEISqwkjDoXWOy4MWriVrugJjx5HAGUTmNuS0smm3sTzVs9cW3PvQvha9ziDIMdigoOBzA",
              },
              {
                title: "Teclados RGB",
                description:
                  "Ilumina tu configuración con nuestros vibrantes teclados RGB.",
                image:
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuCvZHhjTts05xxtpA4-3-_H9hxfQE4cY4vYbg20l3nFY_hf3mLWRngaP065Fxe_CcyPAArW_VCCKMhfeZcfyTdyXO1BxKVMheCSTh4j3wlUwBODbzlPvMD__gDUxs4MTSS1KK3q2CDSQkR0s0rxfxyv6Uqj6yCoMsQqDEZIoXdrvBzZvDY24TSK6ws-CqbYVTB1TrLvrsaL21AGESzGDjU01IPtMzunvniTBc83erK_FJjTeCg93HVnb5NavyQJM76SAF2sdgpDHw",
              },
              {
                title: "Switches",
                description:
                  "Elige entre una variedad de interruptores de alta calidad para la sensación perfecta.",
                image:
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuCpGsP0wJfZhxr9ZbRKXncXmTtINKccDlhuv8ZWSOpWiMyGY4xuCnB64amyOKoDAoNuI5CxYvFghkSpDjtFUxQSguAaoXBc2bFlUjK6O3yZMsilMT4jFa6VHL18_Fx_pJn7XbMvcE7YNyIWF12ngfY-WEPENLeobcUdYJlqhWwdJvlgrTLSbuFJCpZofJER5hF_oOZExv8dzj3mrKh0m2hFspV6cppc6OFnE6gEjGAQQ_0q3Ws_Vhnu4AUKueBbgiuPlZ7bAdK1lw",
              },
              {
                title: "Teclas",
                description:
                  "Personaliza tu teclado con nuestras teclas elegantes y duraderas.",
                image:
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuBqpbKuxbSdhPJ4pEUISDUjiyji7LoxgCizPgxYiA1-3MoORnG6RSIBzaK78FEnymaNcDDcSYs4UAtBnjfeFkC9tz4NYBO31hY1cVSQJIHzydqNTf6V4_9m8NS6EJw3AuS0yXIzqyXDlSXlVuQnE94ft0Kt-d6HEO251Pqcg5z8h7T9jX12JPN_1KhmkGeBkvTDjGgEXG-NfR8crr-V7CUEpVYlfzWVdGxf5J44-iPb45vSW_AbUdBLs4M2CF_im6m3cd5L1jrJMw",
              },
              {
                title: "Cables",
                description:
                  "Completa tu configuración con nuestra selección premium de cables de teclado.",
                image:
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuB88e7ZDqoXxGccSGBBlbgPtJmOJcNJVL-O7eJCReAxnkIALEyUCbSODUDBQk-JoMf6rGgExSEiEx3RE2LwwbHHD1gnQnDVLdtC2Y2df-zbjdefUbvep8XoXVKeJ19_NbbyiC22xim6qWyPNW398X5oZTwPtE9hgz48HU34brVIy-q1WqNYRfT4kkIuIQIeQs5Kx_RgjJ6tGVPn35SZdIyuSCHTd58To6xfIYkIKE-aoVOwJDsfTAKd5XI3Sc2GwdGR3TIVdBhcZA",
              },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                <Card
                  sx={{
                    backgroundColor: "#1a1a1a",
                    borderRadius: "12px",
                    cursor: "pointer",
                    height: "100%",
                    "&:hover": {
                      transform: "scale(1.02)",
                      transition: "transform 0.2s ease-in-out",
                    },
                  }}
                  onClick={() => navigate("/search")}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.image}
                    alt={item.title}
                    sx={{
                      borderRadius: "12px 12px 0 0",
                      aspectRatio: "16/9",
                    }}
                  />
                  <CardContent sx={{ pb: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "white",
                        fontWeight: 500,
                        mb: 1,
                        fontSize: "1rem",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#9cabba",
                        fontSize: "0.875rem",
                        lineHeight: 1.4,
                      }}
                    >
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Featured Products with Prices */}
        {/* <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "-0.015em",
              mb: 3,
              px: 2,
            }}
          >
            Best Sellers
          </Typography>
          <Grid container spacing={3}>
            {featuredProducts.slice(0, 4).map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
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
                      {product.description.length > 80
                        ? `${product.description.substring(0, 80)}...`
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
                      Ver detalles
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<ShoppingCart />}
                      onClick={() => handleAddToCart(product)}
                      sx={{
                        ml: "auto",
                        backgroundColor: "#3d98f4",
                        "&:hover": {
                          backgroundColor: "#2984e6",
                        },
                        textTransform: "none",
                      }}
                    >
                      Add
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box> */}
      </Container>
    </>
  );
};

export default Home;
