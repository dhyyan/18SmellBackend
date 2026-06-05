import express from 'express';
const router = express.Router();
import { createCategory, deleteCategory } from '../../controllers/admin/categoryController.js';
import { protect, adminOnly } from '../../middleware/authMiddleware.js';
router.use(protect);
router.use(adminOnly);
router.post('/', createCategory);
router.delete('/:id', deleteCategory);
export default router;
