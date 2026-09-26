const { SaleDetail, Product, Sale } = require('../models');

const detailIncludes = [
    { model: Product, as: 'product' },
    { model: Sale, as: 'sale' }
];

const getSaleDetails = async (req, res) => {
    try {
        const details = await SaleDetail.findAll({ include: detailIncludes });

        res.json(details);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al obtener los detalles de venta'
        });
    }
};

const getSaleDetailById = async (req, res) => {
    try {
        const { id } = req.params;

        const detail = await SaleDetail.findByPk(id, { include: detailIncludes });

        if (!detail) {
            return res.status(404).json({
                message: 'Detalle de venta no encontrado'
            });
        }

        res.json(detail);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al obtener el detalle de venta'
        });
    }
};

const createSaleDetail = async (req, res) => {
    try {
        const detail = await SaleDetail.create(req.body);

        res.status(201).json(detail);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: 'Error al crear el detalle de venta',
            error: error.message
        });
    }
};

const updateSaleDetail = async (req, res) => {
    try {
        const { id } = req.params;

        const detail = await SaleDetail.findByPk(id);

        if (!detail) {
            return res.status(404).json({
                message: 'Detalle de venta no encontrado'
            });
        }

        await detail.update(req.body);

        res.json(detail);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: 'Error al actualizar el detalle de venta',
            error: error.message
        });
    }
};

const deleteSaleDetail = async (req, res) => {
    try {
        const { id } = req.params;

        const detail = await SaleDetail.findByPk(id);

        if (!detail) {
            return res.status(404).json({
                message: 'Detalle de venta no encontrado'
            });
        }

        await detail.destroy();

        res.json({
            message: 'Detalle de venta eliminado correctamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al eliminar el detalle de venta'
        });
    }
};

module.exports = {
    getSaleDetails,
    getSaleDetailById,
    createSaleDetail,
    updateSaleDetail,
    deleteSaleDetail
};
