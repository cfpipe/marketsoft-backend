const express = require('express');
const sequelize = require('./src/config/database');
require('dotenv').config();

const Product = require('./src/models/Product');
const Provider = require('./src/models/Provider');
const SaleDetail = require('./src/models/SaleDetail');

const productRoutes = require('./src/routes/productRoutes');
const providerRoutes = require('./src/routes/providerRoutes');

const app = express();

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/providers', providerRoutes);

sequelize.authenticate()
    .then(() => {
        console.log('Conexión exitosa a PostgreSQL');

        return sequelize.sync();
    })
    .then(() => {
        console.log('Tablas creadas/verificadas correctamente');

        app.listen(3000, () => {
            console.log('Servidor ejecutándose en http://localhost:3000');
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });