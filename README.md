# KeyBoard Store 🎮

Una tienda online especializada en teclados mecánicos y accesorios, desarrollada con React y Material-UI.

## 🚀 Características

- **Interface moderna**: Diseño responsive con Material-UI
- **Navegación intuitiva**: Navbar con búsqueda y categorías
- **Carrito de compras**: Gestión completa del carrito con Context API
- **Pasarela de pago**: Proceso de checkout paso a paso
- **Búsqueda avanzada**: Filtros por categoría, precio y valoración
- **Catálogo completo**: Vista detallada de productos

## 📱 Páginas y Funcionalidades

### 🏠 Página Principal (Home)
- Hero section llamativo
- Categorías populares
- Productos destacados
- Navegación rápida a diferentes secciones

### 🔍 Búsqueda (Search)
- Búsqueda por texto
- Filtros por categoría
- Ordenamiento por precio, nombre y valoración
- Paginación de resultados

### 📦 Detalles del Producto
- Imágenes de alta calidad
- Descripción detallada
- Características técnicas
- Sistema de valoraciones
- Gestión de stock

### 🛒 Carrito de Compras
- Agregar/quitar productos
- Modificar cantidades
- Cálculo automático de totales
- Resumen del pedido

### 💳 Checkout/Pasarela de Pago
- Proceso paso a paso
- Información de envío
- Métodos de pago (tarjeta/contraentrega)
- Confirmación del pedido

## 🛠️ Tecnologías Utilizadas

- **React 18** - Framework principal
- **Material-UI (MUI)** - Biblioteca de componentes
- **React Router DOM** - Navegación
- **Context API** - Gestión de estado del carrito
- **React Hooks** - useState, useEffect, useContext, useReducer

## 📂 Estructura del Proyecto

```
src/
├── components/
│   └── Layout/
│       ├── Layout.js      # Componente principal de layout
│       ├── Navbar.js      # Barra de navegación
│       └── Footer.js      # Pie de página
├── context/
│   └── CartContext.js     # Context para el carrito de compras
├── data/
│   └── products.js        # Datos de productos y funciones de búsqueda
├── pages/
│   ├── Home.js           # Página principal
│   ├── Search.js         # Página de búsqueda
│   ├── ProductDetail.js  # Detalles del producto
│   ├── Cart.js           # Carrito de compras
│   └── Checkout.js       # Proceso de pago
├── App.js                # Componente principal
├── index.js              # Punto de entrada
└── index.css             # Estilos globales
```

## 🚀 Instalación y Uso

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/felimarod/proyecto-final-factores-humanos.git
   cd proyecto-final-factores-humanos
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm start
   ```

4. **Construir para producción**
   ```bash
   npm run build
   ```

5. **Desplegar en GitHub Pages**
   ```bash
   npm run deploy
   ```

## 🌐 Demo en Vivo

El proyecto está desplegado y disponible en:
**[https://felimarod.github.io/proyecto-final-factores-humanos](https://felimarod.github.io/proyecto-final-factores-humanos)**

Para más detalles sobre el despliegue, consulta [DEPLOYMENT.md](DEPLOYMENT.md).

## 🎨 Características de Diseño

- **Tema personalizado** con paleta de colores corporativa
- **Responsive design** que funciona en todos los dispositivos
- **Componentes reutilizables** siguiendo las mejores prácticas
- **Iconografía consistente** usando Material Icons
- **Animaciones suaves** y transiciones

## 🛍️ Catálogo de Productos

El proyecto incluye un catálogo con:
- **Teclados Mecánicos**: Premium con switches Cherry MX
- **Teclados Gaming**: Optimizados para gaming con RGB
- **Accesorios**: Mouse pads, switch testers, combos
- **Keycaps**: Sets artesanales y retroiluminados

## 📱 Funcionalidades del Carrito

- Agregar productos desde cualquier página
- Contador visual en el navbar
- Modificar cantidades directamente
- Eliminar productos individuales
- Vaciar carrito completo
- Cálculo automático de totales

## 🔧 Configuración Adicional

### Variables de Entorno (opcional)
```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_PAYMENT_KEY=tu_clave_de_pago
```

### Scripts Disponibles
- `npm start` - Servidor de desarrollo
- `npm test` - Ejecutar tests
- `npm run build` - Construcción para producción
- `npm run eject` - Exponer configuración de Webpack

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE.md](LICENSE.md) para detalles.

## 👥 Autor

**Felipe** - *Proyecto para Factores Humanos*

## 🚀 Próximas Mejoras

- [ ] Integración con API real
- [ ] Sistema de autenticación
- [ ] Wishlist/Lista de deseos
- [ ] Comparador de productos
- [ ] Sistema de reseñas
- [ ] Integración con pasarelas de pago reales
- [ ] Panel de administración
- [ ] Notificaciones push
