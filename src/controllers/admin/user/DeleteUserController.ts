import { Request, Response, NextFunction } from 'express';
import deleteUserService from '../../../services/admin-user/DeleteUserService.js';

class DeleteUserController {
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      await deleteUserService.execute(req.params.id as string);
      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
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

export default new DeleteUserController();
