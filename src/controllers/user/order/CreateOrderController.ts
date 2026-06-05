import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../../types/express.types.js';
import createOrderService from '../../../services/order/CreateOrderService.js';

class CreateOrderController {
  async execute(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await createOrderService.execute(req.user!._id.toString(), req.body);
      res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: result,
      });
    } catch (error: any) {
      if (error.message.includes('No order items') || error.message.includes('Insufficient stock') || error.message.includes('Product not found')) {
        res.status(400).json({ success: false, message: error.message });
      } else {
        next(error);
      }
    }
  }
}

export default new CreateOrderController();
