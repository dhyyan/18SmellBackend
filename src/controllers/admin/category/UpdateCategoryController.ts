import { Request, Response, NextFunction } from 'express';
import updateCategoryService from '../../../services/category/UpdateCategoryService.js';

class UpdateCategoryController {
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await updateCategoryService.execute(req.params.id as string, req.body);
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

export default new UpdateCategoryController();
