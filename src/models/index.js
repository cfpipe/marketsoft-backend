const sequelize = require('../config/database');

const Product = require('./Product');
const Provider = require('./Provider');
const User = require('./User');
const Sale = require('./Sale');
const SaleDetail = require('./SaleDetail');

// Proveedor -> Productos
Provider.hasMany(Product, { foreignKey: 'providerId', as: 'products' });
Product.belongsTo(Provider, { foreignKey: 'providerId', as: 'provider' });

// Usuario -> Ventas
User.hasMany(Sale, { foreignKey: 'userId', as: 'sales' });
Sale.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Venta -> DetalleVenta
Sale.hasMany(SaleDetail, { foreignKey: 'saleId', as: 'details' });
SaleDetail.belongsTo(Sale, { foreignKey: 'saleId', as: 'sale' });

// Producto -> DetalleVenta
Product.hasMany(SaleDetail, { foreignKey: 'productId', as: 'saleDetails' });
SaleDetail.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

module.exports = {
    sequelize,
    Product,
    Provider,
    User,
    Sale,
    SaleDetail
};
