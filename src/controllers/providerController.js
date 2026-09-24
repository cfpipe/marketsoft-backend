const Provider = require('../models/Provider');

const getProviders = async (req, res) => {
    try {
        const providers = await Provider.findAll();

        res.json(providers);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al obtener los proveedores'
        });
    }
};

const getProviderById = async (req, res) => {
    try {
        const { id } = req.params;

        const provider = await Provider.findByPk(id);

        if (!provider) {
            return res.status(404).json({
                message: 'Proveedor no encontrado'
            });
        }

        res.json(provider);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al obtener el proveedor'
        });
    }
};

const createProvider = async (req, res) => {
    try {
        const provider = await Provider.create(req.body);

        res.status(201).json(provider);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: 'Error al crear el proveedor',
            error: error.message
        });
    }
};

const updateProvider = async (req, res) => {
    try {
        const { id } = req.params;

        const provider = await Provider.findByPk(id);

        if (!provider) {
            return res.status(404).json({
                message: 'Proveedor no encontrado'
            });
        }

        await provider.update(req.body);

        res.json(provider);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: 'Error al actualizar el proveedor',
            error: error.message
        });
    }
};

const deleteProvider = async (req, res) => {
    try {
        const { id } = req.params;

        const provider = await Provider.findByPk(id);

        if (!provider) {
            return res.status(404).json({
                message: 'Proveedor no encontrado'
            });
        }

        await provider.destroy();

        res.json({
            message: 'Proveedor eliminado correctamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al eliminar el proveedor'
        });
    }
};

module.exports = {
    getProviders,
    getProviderById,
    createProvider,
    updateProvider,
    deleteProvider
};