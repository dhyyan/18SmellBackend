import express from 'express';
const router = express.Router();
import getMyInvoicesController from '../../controllers/user/invoice/GetMyInvoicesController.js';
import downloadInvoiceController from '../../controllers/user/invoice/DownloadInvoiceController.js';
import { protect } from '../../middleware/authMiddleware.js';

/**
 * @swagger
 * tags:
 *   name: Invoice
 *   description: Invoice generation and fetching for completed orders
 */

router.use(protect);

/**
 * @swagger
 * /invoices/list:
 *   get:
 *     summary: Get all invoices for the logged-in user
 *     tags: [Invoice]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of invoices
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
 *                     $ref: '#/components/schemas/Order'
 */
router.get('/list', getMyInvoicesController.execute.bind(getMyInvoicesController));

/**
 * @swagger
 * /invoices/download/{id}:
 *   get:
 *     summary: Download or print an invoice as PDF
 *     tags: [Invoice]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order (Invoice) ID
 *     responses:
 *       200:
 *         description: PDF file stream
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Invoice not found
 */
router.get('/download/:id', downloadInvoiceController.execute.bind(downloadInvoiceController));

export default router;
