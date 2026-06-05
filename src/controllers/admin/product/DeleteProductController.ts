import { Request, Response, NextFunction } from 'express';
import deleteProductService from '../../../services/product/DeleteProductService.js';

class DeleteProductController {
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      await deleteProductService.execute(req.params.id as string);
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
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

export default new DeleteProductController();
