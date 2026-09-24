const sequelize = require('./src/config/database');

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión exitosa a PostgreSQL mediante Sequelize');
    } catch (error) {
        console.error('❌ Error de conexión:', error.message);
    } finally {
        await sequelize.close();
    }
}

testConnection();