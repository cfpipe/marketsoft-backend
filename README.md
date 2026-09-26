# MarketSoft Backend

Backend REST para la gestión básica de un supermercado: productos, proveedores, usuarios y ventas.

## Integrantes

- [Nombre completo] — [Responsabilidad]
- [Nombre completo] — [Responsabilidad]
- [Nombre completo] — [Responsabilidad]
- [Nombre completo] — [Responsabilidad]

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

- **Proveedor → Productos**: un proveedor puede tener muchos productos (`Product.providerId`).
- **Usuario → Ventas**: un usuario puede registrar muchas ventas (`Sale.userId`).
- **Venta → DetalleVenta**: una venta tiene muchos detalles (`SaleDetail.saleId`).
- **Producto → DetalleVenta**: un producto puede aparecer en muchos detalles de venta (`SaleDetail.productId`).

## Instrucciones de ejecución

### 1. Requisitos previos

- Node.js
- PostgreSQL corriendo localmente (o accesible por red)

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia `.env.example` a `.env` y ajusta los valores según tu base de datos local:

```bash
cp .env.example .env
```

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

### Ejemplos

**Crear un proveedor**

```http
POST /api/providers
Content-Type: application/json

{
  "name": "Distribuidora ABC",
  "phone": "3001234567",
  "email": "contacto@abc.com",
  "city": "Bogotá"
}
```

**Crear un producto** (`providerId` debe existir)

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

**Crear un usuario** (el email debe ser único)

```http
POST /api/users
Content-Type: application/json

{
  "name": "Camilo Giraldo",
  "email": "camilo@marketsoft.com",
  "role": "admin"
}
```

**Crear una venta** (el `total` se calcula automáticamente a partir de los productos y su cantidad)

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

## Validaciones implementadas

- **Productos**: `price` mayor a 0, `stock` no negativo.
- **Usuarios**: `email` único (respuesta `409` si ya existe).
- **Ventas**: `total` calculado automáticamente en el servidor a partir de los productos enviados; se valida stock suficiente antes de confirmar la venta.
