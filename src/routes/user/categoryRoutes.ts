import express from 'express';
const router = express.Router();
import { getCategories } from '../../controllers/admin/categoryController.js';

router.get('/', getCategories);

export default router;
