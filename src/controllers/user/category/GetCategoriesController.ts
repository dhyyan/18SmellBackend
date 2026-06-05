import { Request, Response, NextFunction } from 'express';
import getAllCategoriesService from '../../../services/category/GetAllCategoriesService.js';

class GetCategoriesController {
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await getAllCategoriesService.execute();
      res.status(200).json({
        success: true,
        count: categories.length,
        data: categories
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new GetCategoriesController();
