import express from 'express';
const router = express.Router();
import getCartController from '../../controllers/user/cart/GetCartController.js';
import updateCartController from '../../controllers/user/cart/UpdateCartController.js';
import checkCartStockController from '../../controllers/user/cart/CheckCartStockController.js';
import { protect } from '../../middleware/authMiddleware.js';

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: User shopping cart management
 */

router.use(protect);

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Fetch current user's cart
 *     tags: [Cart]
 *     security: [{ bearerAuth: [] }]
 *     responses: { 200: { description: Success } }
 *   post:
 *     summary: Update current user's cart items
 *     tags: [Cart]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content: { application/json: { schema: { type: object, required: [items], properties: { items: { type: array, items: { type: object, properties: { product: { type: string }, quantity: { type: number }, volume: { type: number } } } } } } } }
 *     responses: { 200: { description: Success } }
 */
router.get('/check-stock', checkCartStockController.execute.bind(checkCartStockController));
router.get('/', getCartController.execute.bind(getCartController));
router.post('/', updateCartController.execute.bind(updateCartController));

export default router;
