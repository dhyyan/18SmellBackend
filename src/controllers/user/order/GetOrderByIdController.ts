import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../../types/express.types.js';
import getOrderByIdService from '../../../services/order/GetOrderByIdService.js';

class GetOrderByIdController {
  async execute(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const order = await getOrderByIdService.execute(req.params.id as string);
      
      // Check ownership or admin status
      const orderUserId = (order.user as any)._id ? (order.user as any)._id.toString() : order.user.toString();
      
      if (orderUserId !== req.user!._id.toString() && req.user!.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to view this order',
        });
      }

      res.status(200).json({
        success: true,
        data: order,
      });
    } catch (error: any) {
      if (error.message === 'Order not found') {
        res.status(404).json({ success: false, message: error.message });
      } else {
        next(error);
      }
    }
  }
}

export default new GetOrderByIdController();
