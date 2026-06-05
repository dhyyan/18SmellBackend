import { Request, Response, NextFunction } from 'express';
import getProductsService from '../../../services/product/GetProductsService';

class GetProductsController {
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getProductsService.execute(req.query);
      res.status(200).json({
        success: true,
        count: result.products.length,
        total: result.total,
        page: result.page,
        pages: result.pages,
        data: result.products,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new GetProductsController();
