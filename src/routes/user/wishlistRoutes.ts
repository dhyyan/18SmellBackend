import express from 'express';
const router = express.Router();
import getWishlistController from '../../controllers/user/wishlist/GetWishlistController.js';
import updateWishlistController from '../../controllers/user/wishlist/UpdateWishlistController.js';
import { protect } from '../../middleware/authMiddleware.js';

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: User wishlist management
 */

router.use(protect);

/**
 * @swagger
 * /wishlist:
 *   get:
 *     summary: Fetch current user's wishlist
 *     tags: [Wishlist]
 *     security: [{ bearerAuth: [] }]
 *     responses: { 200: { description: Success } }
 *   post:
 *     summary: Update current user's wishlist products
 *     tags: [Wishlist]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content: { application/json: { schema: { type: object, required: [products], properties: { products: { type: array, items: { type: string } } } } } }
 *     responses: { 200: { description: Success } }
 */
router.get('/', getWishlistController.execute.bind(getWishlistController));
router.post('/', updateWishlistController.execute.bind(updateWishlistController));

export default router;
