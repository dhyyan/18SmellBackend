import { Request, Response, NextFunction } from 'express';
import createCategoryService from '../../../services/category/CreateCategoryService.js';

class CreateCategoryController {
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await createCategoryService.execute(req.body);
      res.status(201).json({
        success: true,
        data: category
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CreateCategoryController();
