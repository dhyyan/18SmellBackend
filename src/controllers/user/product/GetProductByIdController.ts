import { Request, Response, NextFunction } from 'express';
import getProductByIdService from '../../../services/product/GetProductByIdService.js';

class GetProductByIdController {
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await getProductByIdService.execute(req.params.id as string);
      res.status(200).json({
        success: true,
        data: product
      });
    } catch (error: any) {
      if (error.message === 'Product not found') {
        res.status(404).json({ success: false, message: error.message });
      } else {
        next(error);
      }
    }
  }
}

export default new GetProductByIdController();
