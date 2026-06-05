import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../../types/express.types.js';
import getMyInvoicesService from '../../../services/invoice/GetMyInvoicesService.js';

class GetMyInvoicesController {
  async execute(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const invoices = await getMyInvoicesService.execute(req.user!._id.toString());
      res.status(200).json({
        success: true,
        count: invoices.length,
        data: invoices,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new GetMyInvoicesController();
