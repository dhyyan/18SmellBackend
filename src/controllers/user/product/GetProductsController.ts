import { Request, Response, NextFunction } from 'express';
import getProductsService from '../../../services/product/GetProductsService.js';
import { formatProductImageUrls } from '../../../utils/imageHelper.js';

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
        data: formatProductImageUrls(req, result.products)
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new GetProductsController();
