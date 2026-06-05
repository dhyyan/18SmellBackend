import { Request, Response, NextFunction } from 'express';
import registerService from '../../../services/auth/RegisterService.js';

class RegisterController {
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      
      const result = await registerService.execute(name, email, password);

      res.status(200).json({
        success: true,
        message: result.emailResult.simulated 
          ? 'Verification code generated (Simulated in terminal console).' 
          : 'A verification code has been dispatched to your email address.',
        email: result.email,
        ...(result.emailResult.simulated && { otp: result.otpCode }),
      });
    } catch (error: any) {
      if (['Please provide your name', 'Please enter a valid email', 'Password is too weak', 'This email is already registered'].some(msg => error.message.includes(msg))) {
        res.status(400).json({ success: false, message: error.message });
      } else {
        next(error);
      }
    }
  }
}

export default new RegisterController();
