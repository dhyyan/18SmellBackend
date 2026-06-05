import express from 'express';
const router = express.Router();
import getCategoriesController from '../../controllers/user/category/GetCategoriesController.js';
import getCategoryController from '../../controllers/user/category/GetCategoryController.js';
import createCategoryController from '../../controllers/admin/category/CreateCategoryController.js';
import updateCategoryController from '../../controllers/admin/category/UpdateCategoryController.js';
import deleteCategoryController from '../../controllers/admin/category/DeleteCategoryController.js';
import { protect, adminOnly } from '../../middleware/authMiddleware.js';

router.use(protect);
router.use(adminOnly);

/**
 * @swagger
 * tags:
 *   name: Admin - Categories
 *   description: Admin category management endpoints
 */

/**
 * @swagger
 * /admin/categories/create:
 *   post:
 *     summary: Create a new category
 *     tags: [Admin - Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *               image: { type: string }
 *               isActive: { type: boolean }
 *     responses:
 *       201:
 *         description: Category created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data: { $ref: '#/components/schemas/Category' }
 */
router.post('/create', createCategoryController.execute.bind(createCategoryController));

/**
 * @swagger
 * /admin/categories/update/{id}:
 *   put:
 *     summary: Update an existing category
 *     tags: [Admin - Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *               image: { type: string }
 *               isActive: { type: boolean }
 *     responses:
 *       200:
 *         description: Category updated
 * /admin/categories/delete/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Admin - Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted
 *       400:
 *         description: Cannot delete category (has associated products)
 */
router.put('/update/:id', updateCategoryController.execute.bind(updateCategoryController));
router.delete('/delete/:id', deleteCategoryController.execute.bind(deleteCategoryController));

export default router;
