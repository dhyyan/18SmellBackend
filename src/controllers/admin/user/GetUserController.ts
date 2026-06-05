import { Request, Response, NextFunction } from 'express';
import getUserByIdService from '../../../services/admin-user/GetUserByIdService.js';

class GetUserController {
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await getUserByIdService.execute(req.params.id as string);
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      if (error.message === 'User not found') {
        res.status(404).json({ success: false, message: error.message });
      } else {
        next(error);
      }
    }
  }
}

export default new GetUserController();
