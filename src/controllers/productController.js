const Product = require('../models/Product');

const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al obtener los productos'
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                message: 'Producto no encontrado'
            });
        }

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al obtener el producto'
        });
    }
};

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: 'Error al crear el producto',
            error: error.message
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                message: 'Producto no encontrado'
            });
        }

        await product.update(req.body);

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: 'Error al actualizar el producto',
            error: error.message
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                message: 'Producto no encontrado'
            });
        }

        await product.destroy();

        res.json({
            message: 'Producto eliminado correctamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al eliminar el producto'
        });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};