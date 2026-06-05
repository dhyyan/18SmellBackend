import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../../types/express.types.js';
import verifyPaymentService from '../../../services/order/VerifyPaymentService.js';

class VerifyPaymentController {
  async execute(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const order = await verifyPaymentService.execute(req.params.id as string, req.body);
      res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
        data: order,
      });
    } catch (error: any) {
      if (error.message === 'Invalid payment signature') {
        res.status(400).json({ success: false, message: error.message });
      } else {
        next(error);
      }
    }
  }
}

export default new VerifyPaymentController();
