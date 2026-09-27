# MarketSoft Backend

Backend REST para la gestión básica de un supermercado: productos, proveedores, usuarios y ventas.

## Integrantes

- Cristian Felipe Barreto - Configuracion inicial y modulos de productos y proveedores — 
- Juan Camilo Giraldo     - Modulos de usuario y ventas, relaciones entre modelos e integracion

## Tecnologías

- Node.js + Express.js
- PostgreSQL + Sequelize (ORM)
- Swagger (swagger-jsdoc + swagger-ui-express) para la documentación de la API
- Arquitectura MVC

## Estructura del proyecto

```
src/
  config/
    database.js       # Conexión Sequelize a PostgreSQL
    swagger.js         # Configuración de Swagger
  models/
    Product.js
    Provider.js
    User.js
    Sale.js
    SaleDetail.js
    index.js           # Centraliza los modelos y define las relaciones entre ellos
  controllers/
    productController.js
    providerController.js
    userController.js
    saleController.js
    saleDetailController.js
  routes/
    productRoutes.js
    providerRoutes.js
    userRoutes.js
    saleRoutes.js
    saleDetailRoutes.js
app.js                  # Punto de entrada: servidor, conexión a BD y rutas
```

## Modelo de datos y relaciones

- **Proveedor → Productos**: un proveedor puede tener muchos productos.
- **Usuario → Ventas**: un usuario puede registrar muchas ventas.
- **Venta → DetalleVenta**: una venta tiene muchos detalles.
- **Producto → DetalleVenta**: un producto puede aparecer en muchos detalles de venta .

## Instrucciones de ejecución

### 1. Requisitos previos

- Node.js
- PostgreSQL corriendo localmente (o accesible por red)

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

crear `.env` y ajusta los valores según la base de datos local:


```
DB_NAME=marketsoft
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
NODE_ENV=development
PORT=3000
```

### 4. Crear la base de datos

Crea en PostgreSQL una base de datos con el nombre indicado en `DB_NAME` (por ejemplo `marketsoft`). Las tablas se crean automáticamente al iniciar el servidor (`sequelize.sync()`).

### 5. Ejecutar el servidor

```bash
# Modo desarrollo (con recarga automática)
npm run dev

# Modo producción
npm start
```

El servidor queda disponible en `http://localhost:3000`.

### 6. Documentación interactiva (Swagger)

```
http://localhost:3000/api-docs
```

## Endpoints disponibles

Todas las entidades exponen operaciones CRUD bajo `/api/<entidad>`:

| Entidad       | Base URL              |
|---------------|------------------------|
| Productos     | `/api/products`        |
| Proveedores   | `/api/providers`       |
| Usuarios      | `/api/users`            |
| Ventas        | `/api/sales`             |
| Detalle Venta | `/api/sale-details`     |

Cada entidad soporta:

- `GET /api/<entidad>` — listar todos
- `GET /api/<entidad>/:id` — obtener uno por id
- `POST /api/<entidad>` — crear
- `PUT /api/<entidad>/:id` — actualizar
- `DELETE /api/<entidad>/:id` — eliminar

### Ejemplo

Como `Producto` depende de `Proveedor` y `Venta` depende de `Usuario` y `Producto`, se plantea el siguinete ejemplo en el siguinete orden para no tener errores de referecia:

**1. Proveedores** — `POST /api/providers`

```http
POST /api/providers
Content-Type: application/json

{
  "name": "Distribuidora Umanizales",
  "phone": "3001234567",
  "email": "contacto@umanizales.com",
  "city": "Manizales"
}
```

**2. Usuarios** — `POST /api/users` (el email debe ser único)

```http
POST /api/users
Content-Type: application/json

{
  "name": "Camilo Giraldo",
  "email": "camilo@marketsoft.com",
  "role": "admin"
}
```

**3. Productos** — `POST /api/products` (`providerId` debe ser el `id` de un proveedor creado en el paso 1)

```http
POST /api/products
Content-Type: application/json

{
  "name": "Arroz 500g",
  "description": "Arroz blanco",
  "price": 3500,
  "stock": 100,
  "providerId": 1
}
```

**4. Ventas** — `POST /api/sales` (`userId` del paso 2, `productId` del paso 3; el `total` se calcula automáticamente)

```http
POST /api/sales
Content-Type: application/json

{
  "userId": 1,
  "products": [
    { "productId": 1, "quantity": 3 },
    { "productId": 2, "quantity": 1 }
  ]
}
```

La venta descuenta el stock de cada producto y crea sus registros de `SaleDetail` en una sola transacción.

**5. Detalle de Venta** — `POST /api/sale-details` (opcional; normalmente no hace falta crearlo a mano porque el paso 4 ya lo genera). usarlo solo si necesita agregar un detalle suelto, usando un `saleId` del paso 4 y un `productId` del paso 3.

```http
POST /api/sale-details
Content-Type: application/json

{
  "saleId": 1,
  "productId": 1,
  "quantity": 2,
  "price": 3500
}
```

## Validaciones implementadas

- **Productos**: `price` mayor a 0, `stock` no negativo.
- **Usuarios**: `email` único (respuesta `409` si ya existe).
- **Ventas**: `total` calculado automáticamente en el servidor a partir de los productos enviados; se valida stock suficiente antes de confirmar la venta.
