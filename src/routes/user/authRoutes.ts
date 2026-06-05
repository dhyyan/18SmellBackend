import express from 'express';
const router = express.Router();
import registerController from '../../controllers/user/auth/RegisterController.js';
import verifyOtpController from '../../controllers/user/auth/VerifyOtpController.js';
import resendOtpController from '../../controllers/user/auth/ResendOtpController.js';
import loginController from '../../controllers/user/auth/LoginController.js';
import getMeController from '../../controllers/user/auth/GetMeController.js';
import logoutController from '../../controllers/user/auth/LogoutController.js';
import { protect } from '../../middleware/authMiddleware.js';

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and authorization
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content: { application/json: { schema: { type: object, required: [name, email, password], properties: { name: { type: string }, email: { type: string }, password: { type: string } } } } }
 *     responses: { 200: { description: Success } }
 */
router.post('/register', registerController.execute.bind(registerController));

/**
 * @swagger
 * /auth/verify-otp:
 *   post:
 *     summary: Verify OTP and complete registration
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content: { application/json: { schema: { type: object, required: [email, otp], properties: { email: { type: string }, otp: { type: string } } } } }
 *     responses: { 200: { description: Success } }
 */
router.post('/verify-otp', verifyOtpController.execute.bind(verifyOtpController));

/**
 * @swagger
 * /auth/resend-otp:
 *   post:
 *     summary: Resend verification OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content: { application/json: { schema: { type: object, required: [email], properties: { email: { type: string } } } } }
 *     responses: { 200: { description: Success } }
 */
router.post('/resend-otp', resendOtpController.execute.bind(resendOtpController));

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content: { application/json: { schema: { type: object, required: [email, password], properties: { email: { type: string }, password: { type: string } } } } }
 *     responses: { 200: { description: Success } }
 */
router.post('/login', loginController.execute.bind(loginController));

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current logged in user
 *     tags: [Auth]
 *     security: [{ bearerAuth: [] }]
 *     responses: { 200: { description: Success } }
 */
router.get('/me', protect, getMeController.execute.bind(getMeController));

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout user
 *     tags: [Auth]
 *     security: [{ bearerAuth: [] }]
 *     responses: { 200: { description: Success } }
 */
router.get('/logout', protect, logoutController.execute.bind(logoutController));

export default router;
