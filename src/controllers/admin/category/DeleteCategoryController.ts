import { Request, Response, NextFunction } from 'express';
import deleteCategoryService from '../../../services/category/DeleteCategoryService.js';

class DeleteCategoryController {
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      await deleteCategoryService.execute(req.params.id as string);
      res.status(200).json({
        success: true,
        message: 'Category deleted successfully'
      });
    } catch (error: any) {
      if (error.message.includes('Cannot delete category')) {
        res.status(400).json({ success: false, message: error.message });
      } else if (error.message === 'Category not found') {
        res.status(404).json({ success: false, message: error.message });
      } else {
        next(error);
      }
    }
  }
}

export default new DeleteCategoryController();
