# t3_act8_eqXX

Mini sistema en React que simula un login con [DummyJSON](https://dummyjson.com/) y una tabla de datos con filtros, paginación y CRUD, consumiendo la API de productos de DummyJSON.

## Integrantes
- Nombre completo — usuario de GitHub
- Nombre completo — usuario de GitHub

## API elegida para la tabla de datos
DummyJSON Productos — https://dummyjson.com/products

## Proyecto desplegado
http://IP_DE_SU_VPS/t3_act8_eqXX

## Cómo correrlo en local
```bash
npm install
npm run dev
```
Usuario de prueba (ver más en https://dummyjson.com/users): `emilys` / `emilyspass`

## Build de producción y despliegue
1. Edita `vite.config.js` y cambia `base: '/t3_act8_eqXX/'` por tu número de equipo real.
2. Genera el build:
   ```bash
   npm run build
   ```
3. Sube el contenido de la carpeta `dist/` (vía SSH/SCP/SFTP) a la ruta que sirve Nginx en tu VPS, dentro de la carpeta `t3_act8_eqXX`.
4. Verifica que cargue en `http://IP_DE_SU_VPS/t3_act8_eqXX`.

## Estructura del proyecto
```
src/
  api/            llamadas a las APIs (auth.js, productos.js)
  components/     piezas reutilizables (Layout, Navbar, Sidebar,
                  TablaProductos, Paginacion, ModalProducto, ModalConfirmacion)
  hooks/          useProductos.js (carga de productos con filtros/paginación)
  pages/          pantallas (Login, Inicio, Productos, Reportes)
```

## Funcionalidad
- **Fase 1 — Login:** formulario con validación de campos vacíos, consumo real de `POST /auth/login` de DummyJSON, mensaje de error si las credenciales son incorrectas.
- **Fase 2 — Sidebar + Navbar:** al iniciar sesión se muestra el sistema protegido por rutas (si no hay usuario, cualquier ruta redirige a `/login`). El Navbar muestra foto, nombre y botón de cerrar sesión.
- **Fase 3 — Tabla de productos:** filtro por texto y por categoría, paginación con selector de cantidad (10/20/40/50) reflejada en la URL (`?q=&categoria=&page=&limit=`), estado de carga y de error, y acciones de agregar/editar/eliminar con petición real a la API y confirmación previa en editar/eliminar.
- **Fase 4 — Despliegue:** `base` configurable en `vite.config.js` para servir el proyecto en una subruta del VPS.
