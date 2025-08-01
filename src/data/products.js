export const products = [
  {
    id: 1,
    name: "Teclado Mecánico RGB Pro",
    price: 299900,
    category: "mechanical",
    brand: "KeyMaster",
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400",
    description: "Teclado mecánico premium con switches Cherry MX Blue, iluminación RGB personalizable y construcción de aluminio.",
    features: [
      "Switches Cherry MX Blue",
      "Iluminación RGB por tecla",
      "Construcción de aluminio",
      "Keycaps PBT",
      "Cable USB-C desmontable"
    ],
    inStock: 15,
    rating: 4.8
  },
  {
    id: 2,
    name: "Gaming Keyboard X1",
    price: 199900,
    category: "gaming",
    brand: "GameForce",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
    description: "Teclado gaming con switches mecánicos, anti-ghosting y teclas macro programables.",
    features: [
      "Switches mecánicos gaming",
      "Anti-ghosting completo",
      "Teclas macro programables",
      "Iluminación RGB",
      "Software de personalización"
    ],
    inStock: 8,
    rating: 4.6
  },
  {
    id: 3,
    name: "Keycaps Artisan Set",
    price: 89900,
    category: "keycaps",
    brand: "ArtKey",
    image: "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=400",
    description: "Set de keycaps artesanales con diseño único y alta calidad.",
    features: [
      "Material PBT de alta calidad",
      "Diseño artesanal único",
      "Compatible con Cherry MX",
      "Resistente al desgaste",
      "Perfil OEM"
    ],
    inStock: 25,
    rating: 4.9
  },
  {
    id: 4,
    name: "Wireless Mechanical Pro",
    price: 349900,
    category: "mechanical",
    brand: "WirelessTech",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
    description: "Teclado mecánico inalámbrico con conectividad dual y batería de larga duración.",
    features: [
      "Conectividad Bluetooth y 2.4GHz",
      "Batería de 2000mAh",
      "Switches hot-swappable",
      "Iluminación RGB",
      "Hasta 100 horas de uso"
    ],
    inStock: 12,
    rating: 4.7
  },
  {
    id: 5,
    name: "Mouse Pad Premium XXL",
    price: 49900,
    category: "accessories",
    brand: "SurfacePro",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
    description: "Mouse pad de tamaño XXL con superficie optimizada para gaming y trabajo.",
    features: [
      "Tamaño XXL (900x400mm)",
      "Superficie micro-texturizada",
      "Base antideslizante",
      "Bordes cosidos",
      "Fácil limpieza"
    ],
    inStock: 30,
    rating: 4.5
  },
  {
    id: 6,
    name: "Switch Tester Kit",
    price: 39900,
    category: "accessories",
    brand: "SwitchLab",
    image: "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=400",
    description: "Kit de prueba con 12 tipos diferentes de switches mecánicos.",
    features: [
      "12 switches diferentes",
      "Incluye Cherry MX, Gateron y Kailh",
      "Base acrílica premium",
      "Guía de características",
      "Perfecto para principiantes"
    ],
    inStock: 20,
    rating: 4.8
  },
  {
    id: 7,
    name: "Gaming Combo RGB",
    price: 159900,
    category: "gaming",
    brand: "GameForce",
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400",
    description: "Combo gaming con teclado mecánico y mouse RGB sincronizados.",
    features: [
      "Teclado mecánico compacto",
      "Mouse gaming 12000 DPI",
      "RGB sincronizado",
      "Software unificado",
      "Diseño ergonómico"
    ],
    inStock: 18,
    rating: 4.4
  },
  {
    id: 8,
    name: "Keycaps Retroiluminados",
    price: 69900,
    category: "keycaps",
    brand: "LightKeys",
    image: "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=400",
    description: "Set completo de keycaps con leyendas retroiluminadas.",
    features: [
      "Leyendas retroiluminadas",
      "Material ABS de calidad",
      "104 teclas completas",
      "Compatible RGB",
      "Instalación fácil"
    ],
    inStock: 22,
    rating: 4.6
  }
];

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

export const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category);
};

export const searchProducts = (query) => {
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.brand.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  );
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.rating >= 4.7);
};
