import { Request, Response, NextFunction } from 'express';
import updateUserRoleService from '../../../services/admin-user/UpdateUserRoleService.js';

class UpdateUserRoleController {
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await updateUserRoleService.execute(req.params.id as string, req.body.role);
      res.status(200).json({
        success: true,
        message: 'User role updated successfully',
        data: user,
      });
    } catch (error: any) {
      if (error.message === 'User not found') {
        res.status(404).json({ success: false, message: error.message });
      } else if (error.message === 'Invalid role') {
        res.status(400).json({ success: false, message: error.message });
      } else {
        next(error);
      }
    }
  }
}

export default new UpdateUserRoleController();
