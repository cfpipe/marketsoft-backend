const { User } = require('../models');

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al obtener los usuarios'
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al obtener el usuario'
        });
    }
};

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.status(201).json(user);
    } catch (error) {
        console.error(error);

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                message: 'Ya existe un usuario con ese email'
            });
        }

        res.status(400).json({
            message: 'Error al crear el usuario',
            error: error.message
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }

        await user.update(req.body);

        res.json(user);
    } catch (error) {
        console.error(error);

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                message: 'Ya existe un usuario con ese email'
            });
        }

        res.status(400).json({
            message: 'Error al actualizar el usuario',
            error: error.message
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }

        await user.destroy();

        res.json({
            message: 'Usuario eliminado correctamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al eliminar el usuario'
        });
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
