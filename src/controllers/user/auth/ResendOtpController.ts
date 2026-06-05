import { Request, Response, NextFunction } from 'express';
import resendOtpService from '../../../services/auth/ResendOtpService.js';

class ResendOtpController {
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      const result = await resendOtpService.execute(email);

      res.status(200).json({
        success: true,
        message: result.emailResult.simulated 
          ? 'New verification code generated (Simulated in terminal console).' 
          : 'A new verification code has been dispatched to your email.',
        ...(result.emailResult.simulated && { otp: result.otpCode }),
      });
    } catch (error: any) {
      if (['Please provide email', 'No active registration session'].some(msg => error.message.includes(msg))) {
        res.status(400).json({ success: false, message: error.message });
      } else {
        next(error);
      }
    }
  }
}

export default new ResendOtpController();
