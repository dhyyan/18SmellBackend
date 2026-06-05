import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../../types/express.types.js';
import getUserOrdersService from '../../../services/order/GetUserOrdersService.js';

class GetMyOrdersController {
  async execute(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const orders = await getUserOrdersService.execute(req.user!._id.toString());
      res.status(200).json({
        success: true,
        count: orders.length,
        data: orders,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new GetMyOrdersController();
