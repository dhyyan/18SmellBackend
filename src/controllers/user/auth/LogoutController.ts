import { Request, Response, NextFunction } from 'express';

class LogoutController {
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
      });

      res.status(200).json({
        success: true,
        message: 'You have logged out successfully. Have a nice day!',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new LogoutController();
