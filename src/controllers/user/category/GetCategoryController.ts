import { Request, Response, NextFunction } from 'express';
import getCategoryByIdService from '../../../services/category/GetCategoryByIdService.js';

class GetCategoryController {
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await getCategoryByIdService.execute(req.params.id as string);
      res.status(200).json({
        success: true,
        data: category
      });
    } catch (error: any) {
      if (error.message === 'Category not found') {
        res.status(404).json({ success: false, message: error.message });
      } else {
        next(error);
      }
    }
  }
}

export default new GetCategoryController();
