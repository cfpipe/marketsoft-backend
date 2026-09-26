const express = require('express');

const {
    getSaleDetails,
    getSaleDetailById,
    createSaleDetail,
    updateSaleDetail,
    deleteSaleDetail
} = require('../controllers/saleDetailController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: DetalleVenta
 *   description: Gestión de los detalles de venta
 */

/**
 * @swagger
 * /api/sale-details:
 *   get:
 *     summary: Obtener todos los detalles de venta
 *     tags: [DetalleVenta]
 *     responses:
 *       200:
 *         description: Lista de detalles de venta
 */
router.get('/', getSaleDetails);

/**
 * @swagger
 * /api/sale-details/{id}:
 *   get:
 *     summary: Obtener un detalle de venta por id
 *     tags: [DetalleVenta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle de venta encontrado
 *       404:
 *         description: Detalle de venta no encontrado
 */
router.get('/:id', getSaleDetailById);

/**
 * @swagger
 * /api/sale-details:
 *   post:
 *     summary: Crear un detalle de venta
 *     tags: [DetalleVenta]
 *     responses:
 *       201:
 *         description: Detalle de venta creado
 */
router.post('/', createSaleDetail);

/**
 * @swagger
 * /api/sale-details/{id}:
 *   put:
 *     summary: Actualizar un detalle de venta
 *     tags: [DetalleVenta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle de venta actualizado
 *       404:
 *         description: Detalle de venta no encontrado
 */
router.put('/:id', updateSaleDetail);

/**
 * @swagger
 * /api/sale-details/{id}:
 *   delete:
 *     summary: Eliminar un detalle de venta
 *     tags: [DetalleVenta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle de venta eliminado
 *       404:
 *         description: Detalle de venta no encontrado
 */
router.delete('/:id', deleteSaleDetail);

module.exports = router;
