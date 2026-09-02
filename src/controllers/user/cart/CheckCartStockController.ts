import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../../types/express.types.js';
import checkCartStockService from '../../../services/cart/CheckCartStockService.js';

class CheckCartStockController {
  async execute(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?._id;
      if (!userId) {
        return res.status(401).json({ success: false, message: 'User not authenticated' });
      }

      const result = await checkCartStockService.execute(userId.toString());
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CheckCartStockController();
