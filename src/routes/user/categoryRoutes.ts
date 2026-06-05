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
 *     responses: { 200: { description: Success } }
 */
router.get('/list', getCategoriesController.execute.bind(getCategoriesController));

/**
 * @swagger
 * /categories/get/{id}:
 *   get:
 *     summary: Get a single category by ID
 *     tags: [Category]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string }, description: "Category ID" }]
 *     responses: { 200: { description: Success } }
 */
router.get('/get/:id', getCategoryController.execute.bind(getCategoryController));

export default router;
