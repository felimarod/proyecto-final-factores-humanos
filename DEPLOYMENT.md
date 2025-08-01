# 🚀 Guía de Despliegue en GitHub Pages

Esta guía te ayudará a desplegar tu proyecto KeyBoard Store en GitHub Pages para que esté disponible públicamente.

## 📋 Requisitos Previos

- Cuenta de GitHub
- Git instalado en tu máquina
- Proyecto subido a un repositorio de GitHub

## 🔧 Configuración Realizada

Ya hemos configurado todo lo necesario para el despliegue:

1. ✅ **Dependencia instalada**: `gh-pages`
2. ✅ **Scripts agregados**: `predeploy` y `deploy`
3. ✅ **Homepage configurada**: URL de GitHub Pages
4. ✅ **Enrutamiento SPA**: Configurado para GitHub Pages
5. ✅ **GitIgnore actualizado**: Archivos innecesarios excluidos

## 🚀 Pasos para Desplegar

### 1. Verificar la configuración del repositorio
Asegúrate de que tu proyecto esté en un repositorio de GitHub:
```bash
git remote -v
```

### 2. Construir y desplegar
Ejecuta el siguiente comando para construir y desplegar automáticamente:
```bash
npm run deploy
```

Este comando:
- Ejecuta `npm run build` (construye la versión de producción)
- Sube los archivos construidos a la rama `gh-pages`
- Configura automáticamente GitHub Pages

### 3. Configurar GitHub Pages en el repositorio
1. Ve a tu repositorio en GitHub
2. Dirígete a **Settings** → **Pages**
3. En **Source**, selecciona **Deploy from a branch**
4. Selecciona la rama **gh-pages**
5. Guarda los cambios

### 4. Acceder a tu sitio
Tu sitio estará disponible en:
```
https://felimarod.github.io/proyecto-final-factores-humanos
```

⏱️ **Nota**: Puede tomar algunos minutos para que el sitio esté disponible después del primer despliegue.

## 🔄 Actualizaciones Futuras

Para actualizar tu sitio después de hacer cambios:

1. Haz commit de tus cambios:
```bash
git add .
git commit -m "Descripción de los cambios"
git push origin main
```

2. Despliega la nueva versión:
```bash
npm run deploy
```

## 🛠️ Scripts Disponibles

- `npm run build` - Construye la versión de producción
- `npm run deploy` - Construye y despliega en GitHub Pages
- `npm run predeploy` - Se ejecuta automáticamente antes del deploy

## 🐛 Resolución de Problemas

### Error: "Permission denied"
Si obtienes un error de permisos:
```bash
git remote set-url origin https://github.com/felimarod/proyecto-final-factores-humanos.git
```

### Error: "fatal: repository not found"
Verifica que el repositorio exista y que tengas acceso:
```bash
git remote -v
```

### Página no carga correctamente
1. Verifica que la rama `gh-pages` se haya creado
2. Revisa la configuración en Settings → Pages
3. Espera unos minutos para la propagación

### Rutas no funcionan (404 en navegación)
El proyecto ya está configurado con:
- Enrutamiento SPA para GitHub Pages
- Archivo `404.html` para redireccionamiento
- `basename` configurado en React Router

## 📱 Funciones del Sitio Desplegado

Una vez desplegado, tu sitio tendrá:
- ✅ Página principal con catálogo
- ✅ Búsqueda y filtros funcionales
- ✅ Carrito de compras persistente
- ✅ Proceso de checkout completo
- ✅ Navegación entre páginas
- ✅ Diseño responsive para móviles

## 🎯 URLs del Sitio

- **Home**: `/`
- **Búsqueda**: `/search`
- **Producto**: `/product/{id}`
- **Carrito**: `/cart`
- **Checkout**: `/checkout`

## 📞 Soporte

Si tienes problemas con el despliegue:
1. Revisa la documentación de GitHub Pages
2. Verifica los logs de GitHub Actions
3. Consulta la consola del navegador para errores

¡Tu tienda de teclados estará lista para el mundo! 🎉
