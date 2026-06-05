import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../../types/express.types.js';
import generateInvoicePdfService from '../../../services/invoice/GenerateInvoicePdfService.js';

class DownloadInvoiceController {
  async execute(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await generateInvoicePdfService.execute(
        req.params.id as string,
        req.user!._id.toString(),
        req.user!.role,
        res
      );
    } catch (error: any) {
      if (error.message === 'Invoice not found') {
        res.status(404).json({ success: false, message: error.message });
      } else if (error.message === 'Not authorized to view this invoice') {
        res.status(403).json({ success: false, message: error.message });
      } else if (error.message === 'Invoice not available for unpaid orders') {
        res.status(400).json({ success: false, message: error.message });
      } else {
        next(error);
      }
    }
  }
}

export default new DownloadInvoiceController();
