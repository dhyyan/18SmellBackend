import express from 'express';
const router = express.Router();
import createOrderController from '../../controllers/user/order/CreateOrderController.js';
import getMyOrdersController from '../../controllers/user/order/GetMyOrdersController.js';
import verifyPaymentController from '../../controllers/user/order/VerifyPaymentController.js';
import { protect } from '../../middleware/authMiddleware.js';

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: User order management and checkout
 */

router.use(protect);

/**
 * @swagger
 * /orders/create:
 *   post:
 *     summary: Create a new order (Checkout)
 *     tags: [Order]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content: { application/json: { schema: { type: object, required: [items, shippingAddress], properties: { items: { type: array, items: { type: object, properties: { product: { type: string }, quantity: { type: number } } } }, shippingAddress: { type: string } } } } }
 *     responses: { 200: { description: Success } }
 * /orders/list:
 *   get:
 *     summary: Get logged-in user's orders
 *     tags: [Order]
 *     security: [{ bearerAuth: [] }]
 *     responses: { 200: { description: Success } }
 */
router.post('/create', createOrderController.execute.bind(createOrderController));
router.get('/list', getMyOrdersController.execute.bind(getMyOrdersController));

/**
 * @swagger
 * /orders/verify-payment:
 *   post:
 *     summary: Verify Razorpay payment signature
 *     tags: [Order]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content: { application/json: { schema: { type: object, required: [razorpayOrderId, razorpayPaymentId, razorpaySignature], properties: { razorpayOrderId: { type: string }, razorpayPaymentId: { type: string }, razorpaySignature: { type: string } } } } }
 *     responses: { 200: { description: Success } }
 */
router.route('/verify-payment')
  .post(verifyPaymentController.execute.bind(verifyPaymentController));

export default router;
