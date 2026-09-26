require('dotenv').config();

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const { sequelize } = require('./src/models');
const swaggerSpec = require('./src/config/swagger');

const productRoutes = require('./src/routes/productRoutes');
const providerRoutes = require('./src/routes/providerRoutes');
const userRoutes = require('./src/routes/userRoutes');
const saleRoutes = require('./src/routes/saleRoutes');
const saleDetailRoutes = require('./src/routes/saleDetailRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/products', productRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/sale-details', saleDetailRoutes);

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
    .then(() => {
        console.log('Conexión exitosa a PostgreSQL');

        return sequelize.sync();
    })
    .then(() => {
        console.log('Tablas creadas/verificadas correctamente');

        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
            console.log(`Documentación Swagger en http://localhost:${PORT}/api-docs`);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
