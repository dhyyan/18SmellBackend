import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../../../types/express.types.js';

class GetMeController {
  async execute(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      res.status(200).json({
        success: true,
        data: req.user || null,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new GetMeController();
