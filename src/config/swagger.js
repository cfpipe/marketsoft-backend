const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'MarketSoft API',
            version: '1.0.0',
            description: 'API REST para la gestión de productos, proveedores, usuarios y ventas de un supermercado'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor local'
            }
        ],
        tags: [
            { name: 'Proveedores', description: 'Gestión de proveedores' },
            { name: 'Usuarios', description: 'Gestión de usuarios' },
            { name: 'Productos', description: 'Gestión de productos' },
            { name: 'Ventas', description: 'Gestión de ventas' },
            { name: 'DetalleVenta', description: 'Gestión de los detalles de venta' }
        ]
    },
    apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
