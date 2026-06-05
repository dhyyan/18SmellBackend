import { Request, Response, NextFunction } from 'express';
import loginService from '../../../services/auth/LoginService.js';

class LoginController {
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const result = await loginService.execute(email, password);

      const cookieOptions = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict' as const,
      };

      res.cookie('token', result.token, cookieOptions);

      res.status(200).json({
        success: true,
        message: 'Welcome back! Login successful.',
        token: result.token,
        user: {
          id: result.user._id,
          name: result.user.name,
          email: result.user.email,
          role: result.user.role,
        },
      });
    } catch (error: any) {
      if (error.message.includes('Please provide both')) {
        res.status(400).json({ success: false, message: error.message });
      } else if (error.message === 'Invalid email address or password.') {
        res.status(401).json({ success: false, message: error.message });
      } else {
        next(error);
      }
    }
  }
}

export default new LoginController();
