const express = require('express');

const {
    getSales,
    getSaleById,
    createSale,
    updateSale,
    deleteSale
} = require('../controllers/saleController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Ventas
 *   description: Gestión de ventas
 */

/**
 * @swagger
 * /api/sales:
 *   get:
 *     summary: Obtener todas las ventas
 *     tags: [Ventas]
 *     responses:
 *       200:
 *         description: Lista de ventas
 */
router.get('/', getSales);

/**
 * @swagger
 * /api/sales/{id}:
 *   get:
 *     summary: Obtener una venta por id
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Venta encontrada
 *       404:
 *         description: Venta no encontrada
 */
router.get('/:id', getSaleById);

/**
 * @swagger
 * /api/sales:
 *   post:
 *     summary: Crear una venta (el total se calcula automáticamente)
 *     tags: [Ventas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Venta creada
 *       400:
 *         description: Datos inválidos o stock insuficiente
 *       404:
 *         description: Usuario o producto no encontrado
 */
router.post('/', createSale);

/**
 * @swagger
 * /api/sales/{id}:
 *   put:
 *     summary: Actualizar una venta (solo userId y date; el total no se recalcula aquí)
 *     tags: [Ventas]
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
 *               userId:
 *                 type: integer
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Venta actualizada
 *       404:
 *         description: Venta no encontrada
 */
router.put('/:id', updateSale);

/**
 * @swagger
 * /api/sales/{id}:
 *   delete:
 *     summary: Eliminar una venta
 *     tags: [Ventas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Venta eliminada
 *       404:
 *         description: Venta no encontrada
 */
router.delete('/:id', deleteSale);

module.exports = router;
