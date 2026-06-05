import { Request, Response, NextFunction } from 'express';
import updateOrderStatusService from '../../../services/order/UpdateOrderStatusService.js';

class UpdateOrderStatusController {
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderStatus } = req.body;
      
      const order = await updateOrderStatusService.execute(req.params.id as string, orderStatus);

      res.status(200).json({
        success: true,
        message: 'Order status updated successfully',
        data: order,
      });
    } catch (error: any) {
      if (error.message === 'Order not found') {
        res.status(404).json({ success: false, message: error.message });
      } else if (error.message === 'Invalid order status') {
        res.status(400).json({ success: false, message: error.message });
      } else {
        next(error);
      }
    }
  }
}

export default new UpdateOrderStatusController();
