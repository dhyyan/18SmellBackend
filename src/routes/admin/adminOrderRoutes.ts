import express from 'express';
const router = express.Router();
import getAllOrdersController from '../../controllers/admin/order/GetAllOrdersController.js';
import updateOrderStatusController from '../../controllers/admin/order/UpdateOrderStatusController.js';
import { protect, adminOnly } from '../../middleware/authMiddleware.js';

router.use(protect);
router.use(adminOnly);

/**
 * @swagger
 * tags:
 *   name: Admin - Orders
 *   description: Admin order management
 */

/**
 * @swagger
 * /admin/orders/list:
 *   get:
 *     summary: Get all orders in the system
 *     tags: [Admin - Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 count: { type: number }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 */
router.get('/list', getAllOrdersController.execute.bind(getAllOrdersController));

/**
 * @swagger
 * /admin/orders/update/{id}/status:
 *   put:
 *     summary: Update the status of an order
 *     tags: [Admin - Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderStatus
 *             properties:
 *               orderStatus:
 *                 type: string
 *                 enum: [processing, shipped, delivered, cancelled]
 *     responses:
 *       200:
 *         description: Order status updated
 *       404:
 *         description: Order not found
 */
router.put('/update/:id/status', updateOrderStatusController.execute.bind(updateOrderStatusController));

export default router;
