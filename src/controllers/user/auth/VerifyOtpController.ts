import { Request, Response, NextFunction } from 'express';
import verifyOtpService from '../../../services/auth/VerifyOtpService.js';

class VerifyOtpController {
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, otp } = req.body;

      const result = await verifyOtpService.execute(email, otp);

      const cookieOptions = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict' as const,
      };

      res.cookie('token', result.token, cookieOptions);

      res.status(201).json({
        success: true,
        message: 'Your account has been verified and created successfully!',
        token: result.token,
        user: {
          id: result.user._id,
          name: result.user.name,
          email: result.user.email,
          role: result.user.role,
        },
      });
    } catch (error: any) {
      if (['Please provide both', 'Verification session not found', 'Invalid verification code', 'Maximum verification attempts'].some(msg => error.message.includes(msg))) {
        res.status(400).json({ success: false, message: error.message });
      } else {
        next(error);
      }
    }
  }
}

export default new VerifyOtpController();
