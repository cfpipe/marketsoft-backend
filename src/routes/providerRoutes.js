const express = require('express');

const {
    getProviders,
    getProviderById,
    createProvider,
    updateProvider,
    deleteProvider
} = require('../controllers/providerController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Proveedores
 *   description: Gestión de proveedores
 */

/**
 * @swagger
 * /api/providers:
 *   get:
 *     summary: Obtener todos los proveedores
 *     tags: [Proveedores]
 *     responses:
 *       200:
 *         description: Lista de proveedores
 */
router.get('/', getProviders);

/**
 * @swagger
 * /api/providers/{id}:
 *   get:
 *     summary: Obtener un proveedor por id
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Proveedor encontrado
 *       404:
 *         description: Proveedor no encontrado
 */
router.get('/:id', getProviderById);

/**
 * @swagger
 * /api/providers:
 *   post:
 *     summary: Crear un proveedor
 *     tags: [Proveedores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               city:
 *                 type: string
 *     responses:
 *       201:
 *         description: Proveedor creado
 */
router.post('/', createProvider);

/**
 * @swagger
 * /api/providers/{id}:
 *   put:
 *     summary: Actualizar un proveedor
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               city:
 *                 type: string
 *     responses:
 *       200:
 *         description: Proveedor actualizado
 *       404:
 *         description: Proveedor no encontrado
 */
router.put('/:id', updateProvider);

/**
 * @swagger
 * /api/providers/{id}:
 *   delete:
 *     summary: Eliminar un proveedor
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Proveedor eliminado
 *       404:
 *         description: Proveedor no encontrado
 */
router.delete('/:id', deleteProvider);

module.exports = router;
