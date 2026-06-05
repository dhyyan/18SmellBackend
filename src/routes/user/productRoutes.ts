import express from 'express';
const router = express.Router();
import getProductsController from '../../controllers/user/product/GetProductsController.js';
import getProductByIdController from '../../controllers/user/product/GetProductByIdController.js';

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product viewing and filtering for users
 */

/**
 * @swagger
 * /products/list:
 *   get:
 *     summary: Get all products with optional filters
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category ID
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name or description
 *       - in: query
 *         name: occasion
 *         schema:
 *           type: string
 *         description: Filter by occasion
 *       - in: query
 *         name: notes
 *         schema:
 *           type: string
 *         description: Filter by notes
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: List of filtered products
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
 *                     $ref: '#/components/schemas/Product'
 */
router.get('/list', getProductsController.execute.bind(getProductsController));

/**
 * @swagger
 * /products/get/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
router.get('/get/:id', getProductByIdController.execute.bind(getProductByIdController));

export default router;
