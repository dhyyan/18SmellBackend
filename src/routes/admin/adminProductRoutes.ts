import express from 'express';
const router = express.Router();
import createProductController from '../../controllers/admin/product/CreateProductController.js';
import updateProductController from '../../controllers/admin/product/UpdateProductController.js';
import deleteProductController from '../../controllers/admin/product/DeleteProductController.js';
import getProductsController from '../../controllers/admin/product/GetProductsController.js';
import { protect, adminOnly } from '../../middleware/authMiddleware.js';
import { upload } from '../../middleware/uploadMiddleware.js';

router.use(protect);
router.use(adminOnly);

/**
 * @swagger
 * tags:
 *   name: Admin - Products
 *   description: Admin product management endpoints
 * 
 * /admin/products/list:
 *   get:
 *     summary: Get all products
 *     tags: [Admin - Products]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - { in: query, name: page, schema: { type: number } }
 *       - { in: query, name: limit, schema: { type: number } }
 *       - { in: query, name: search, schema: { type: string }, description: "Search by name or description" }
 *       - { in: query, name: category, schema: { type: string }, description: "Filter by category ID" }
 *     responses: { 200: { description: Success } }
 */

router.get('/list', getProductsController.execute.bind(getProductsController));

/**
 * @swagger
 * /admin/products/create:
 *   post:
 *     summary: Create a new product
 *     tags: [Admin - Products]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content: { application/json: { schema: { type: object, required: [name, price, category], properties: { name: { type: string }, description: { type: string }, price: { type: number }, category: { type: string, description: "Category ID" }, volume: { type: number }, stock: { type: number }, notes: { type: string, description: "Comma separated strings" }, occasion: { type: string, description: "Comma separated strings" }, images: { type: array, items: { type: string } } } } } }
 *     responses: { 200: { description: Success } }
 */
router.post('/create', upload.array('images', 5), createProductController.execute.bind(createProductController));

/**
 * @swagger
 * /admin/products/update/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags: [Admin - Products]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *     requestBody:
 *       required: true
 *       content: { application/json: { schema: { type: object, properties: { name: { type: string }, description: { type: string }, price: { type: number }, category: { type: string }, volume: { type: number }, stock: { type: number }, notes: { type: string }, occasion: { type: string }, images: { type: array, items: { type: string } } } } } }
 *     responses: { 200: { description: Success } }
 * /admin/products/delete/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Admin - Products]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *     responses: { 200: { description: Success } }
 */
router.put('/update/:id', upload.array('images', 5), updateProductController.execute.bind(updateProductController));
router.delete('/delete/:id', deleteProductController.execute.bind(deleteProductController));

export default router;
