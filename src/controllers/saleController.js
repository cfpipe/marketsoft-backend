const { sequelize, Sale, SaleDetail, Product, User } = require('../models');

const saleIncludes = [
    { model: User, as: 'user', attributes: ['id', 'name', 'email', 'role'] },
    {
        model: SaleDetail,
        as: 'details',
        include: [{ model: Product, as: 'product' }]
    }
];

const getSales = async (req, res) => {
    try {
        const sales = await Sale.findAll({ include: saleIncludes });

        res.json(sales);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al obtener las ventas'
        });
    }
};

const getSaleById = async (req, res) => {
    try {
        const { id } = req.params;

        const sale = await Sale.findByPk(id, { include: saleIncludes });

        if (!sale) {
            return res.status(404).json({
                message: 'Venta no encontrada'
            });
        }

        res.json(sale);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al obtener la venta'
        });
    }
};

const createSale = async (req, res) => {
    const { userId, products } = req.body;

    if (!userId || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({
            message: 'Se requiere userId y una lista de products (productId, quantity)'
        });
    }

    const transaction = await sequelize.transaction();

    try {
        const user = await User.findByPk(userId, { transaction });

        if (!user) {
            await transaction.rollback();
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        let total = 0;
        const detailsData = [];

        for (const item of products) {
            const product = await Product.findByPk(item.productId, { transaction });

            if (!product) {
                await transaction.rollback();
                return res.status(404).json({
                    message: `Producto con id ${item.productId} no encontrado`
                });
            }

            const quantity = Number(item.quantity);

            if (!quantity || quantity <= 0) {
                await transaction.rollback();
                return res.status(400).json({
                    message: `La cantidad para el producto ${item.productId} debe ser mayor a 0`
                });
            }

            if (product.stock < quantity) {
                await transaction.rollback();
                return res.status(400).json({
                    message: `Stock insuficiente para el producto ${product.name}`
                });
            }

            const price = Number(product.price);
            total += price * quantity;

            detailsData.push({ productId: product.id, quantity, price });

            product.stock -= quantity;
            await product.save({ transaction });
        }

        const sale = await Sale.create(
            { userId, date: new Date(), total },
            { transaction }
        );

        await SaleDetail.bulkCreate(
            detailsData.map((detail) => ({ ...detail, saleId: sale.id })),
            { transaction }
        );

        await transaction.commit();

        const createdSale = await Sale.findByPk(sale.id, { include: saleIncludes });

        res.status(201).json(createdSale);
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        res.status(400).json({
            message: 'Error al crear la venta',
            error: error.message
        });
    }
};

const updateSale = async (req, res) => {
    try {
        const { id } = req.params;

        const sale = await Sale.findByPk(id);

        if (!sale) {
            return res.status(404).json({
                message: 'Venta no encontrada'
            });
        }

        const { userId, date } = req.body;

        await sale.update({ userId, date });

        res.json(sale);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: 'Error al actualizar la venta',
            error: error.message
        });
    }
};

const deleteSale = async (req, res) => {
    try {
        const { id } = req.params;

        const sale = await Sale.findByPk(id);

        if (!sale) {
            return res.status(404).json({
                message: 'Venta no encontrada'
            });
        }

        await SaleDetail.destroy({ where: { saleId: sale.id } });
        await sale.destroy();

        res.json({
            message: 'Venta eliminada correctamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al eliminar la venta'
        });
    }
};

module.exports = {
    getSales,
    getSaleById,
    createSale,
    updateSale,
    deleteSale
};
