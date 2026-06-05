import express from 'express';
const router = express.Router();
import { createOrder, getMyOrders, getOrderById } from '../../controllers/user/orderController.js';
import { protect } from '../../middleware/authMiddleware.js';
router.use(protect);
router.post('/', createOrder);
router.get('/', getMyOrders);
router.get('/:id', getOrderById);
export default router;
