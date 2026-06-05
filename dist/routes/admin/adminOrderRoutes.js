import express from 'express';
const router = express.Router();
import { getAllOrders, updateOrderStatus } from '../../controllers/admin/orderController.js';
import { protect, adminOnly } from '../../middleware/authMiddleware.js';
router.use(protect);
router.use(adminOnly);
router.get('/', getAllOrders);
router.patch('/:id/status', updateOrderStatus);
export default router;
