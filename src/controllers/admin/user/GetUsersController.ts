import { Request, Response, NextFunction } from 'express';
import getAllUsersService from '../../../services/admin-user/GetAllUsersService.js';

class GetUsersController {
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await getAllUsersService.execute();
      res.status(200).json({
        success: true,
        count: users.length,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new GetUsersController();
