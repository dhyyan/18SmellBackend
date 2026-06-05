import express from 'express';
const router = express.Router();
import getUsersController from '../../controllers/admin/user/GetUsersController.js';
import getUserController from '../../controllers/admin/user/GetUserController.js';
import updateUserRoleController from '../../controllers/admin/user/UpdateUserRoleController.js';
import deleteUserController from '../../controllers/admin/user/DeleteUserController.js';
import { protect, adminOnly } from '../../middleware/authMiddleware.js';

router.use(protect);
router.use(adminOnly);

/**
 * @swagger
 * tags:
 *   name: Admin - Users
 *   description: Admin user management endpoints
 */

/**
 * @swagger
 * /admin/users/list:
 *   get:
 *     summary: Get all users
 *     tags: [Admin - Users]
 *     security: [{ bearerAuth: [] }]
 *     responses: { 200: { description: Success } }
 */
router.get('/list', getUsersController.execute.bind(getUsersController));

/**
 * @swagger
 * /admin/users/get/{id}:
 *   get:
 *     summary: Get a single user by ID
 *     tags: [Admin - Users]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *     responses: { 200: { description: Success } }
 * /admin/users/delete/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Admin - Users]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *     responses: { 200: { description: Success } }
 */
router.get('/get/:id', getUserController.execute.bind(getUserController));
router.delete('/delete/:id', deleteUserController.execute.bind(deleteUserController));

/**
 * @swagger
 * /admin/users/update/{id}/role:
 *   put:
 *     summary: Update a user's role
 *     tags: [Admin - Users]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *     requestBody:
 *       required: true
 *       content: { application/json: { schema: { type: object, required: [role], properties: { role: { type: string, enum: [user, admin] } } } } }
 *     responses: { 200: { description: Success } }
 */
router.put('/update/:id/role', updateUserRoleController.execute.bind(updateUserRoleController));

export default router;
