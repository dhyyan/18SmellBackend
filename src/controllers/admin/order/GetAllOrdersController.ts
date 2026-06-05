import { Request, Response, NextFunction } from 'express';
import getAllOrdersService from '../../../services/order/GetAllOrdersService.js';

class GetAllOrdersController {
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await getAllOrdersService.execute();
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

export default new GetAllOrdersController();
