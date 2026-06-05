import express from 'express';
const router = express.Router();
import getCategoriesController from '../../controllers/user/category/GetCategoriesController.js';
import getCategoryController from '../../controllers/user/category/GetCategoryController.js';

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category endpoints for users
 */

/**
 * @swagger
 * /categories/list:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: List of categories
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
 *                     $ref: '#/components/schemas/Category'
 */
router.get('/list', getCategoriesController.execute.bind(getCategoriesController));

/**
 * @swagger
 * /categories/get/{id}:
 *   get:
 *     summary: Get a single category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data:
 *                   $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 */
router.get('/get/:id', getCategoryController.execute.bind(getCategoryController));

export default router;
