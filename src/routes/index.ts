import express from 'express';
const router = express.Router();

import authRoutes from './user/authRoutes.js';
import productRoutes from './user/productRoutes.js';
import categoryRoutes from './user/categoryRoutes.js';
import orderRoutes from './user/orderRoutes.js';
import invoiceRoutes from './user/invoiceRoutes.js';
import adminProductRoutes from './admin/adminProductRoutes.js';
import adminOrderRoutes from './admin/adminOrderRoutes.js';
import adminCategoryRoutes from './admin/adminCategoryRoutes.js';
import adminUserRoutes from './admin/adminUserRoutes.js';

// Mount routes
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/orders', orderRoutes);
router.use('/invoices', invoiceRoutes);
router.use('/admin/products', adminProductRoutes);
router.use('/admin/orders', adminOrderRoutes);
router.use('/admin/categories', adminCategoryRoutes);
router.use('/admin/users', adminUserRoutes);

export default router;
