import { userRepository, otpRepository } from '../../repositories/index.js';
import sendEmail from '../../utils/sendEmail.js';
import { buildLuxuryEmailTemplate } from '../../utils/emailTemplates.js';
import { generateOtpCode } from '../../utils/otpUtils.js';

class RegisterService {
  async execute(name: string, email: string, password: string) {
    if (!name || !email || !password) {
      throw new Error('Please provide your name, email, and password to initiate registration.');
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Please enter a valid email address.');
    }

    if (password.length < 6) {
      throw new Error('Password is too weak. For your protection, it must be at least 6 characters.');
    }

    const userExists = await userRepository.findByEmail(email);
    if (userExists) {
      throw new Error('This email is already registered. Please log in to your account.');
    }

    const otpCode = generateOtpCode();

    console.log(`\n=========================================\n🔑 [OTP GENERATOR] REGISTER\nEmail: ${email}\nOTP Code: ${otpCode}\nGenerated At: ${new Date().toISOString()} (${new Date().toLocaleTimeString()})\n=========================================\n`);

    await otpRepository.deleteMany({ email });

    await otpRepository.create({
      email,
      otp: otpCode,
      name,
      password,
      attempts: 0,
    });

    const emailOptions = {
      email,
      subject: '18Smell - Verify Your Account',
      message: `Welcome to 18Smell. Your verification code is ${otpCode}. It will expire in 10 minutes.`,
      html: buildLuxuryEmailTemplate(name, otpCode),
    };

    const emailResult = await sendEmail(emailOptions);

    return {
      emailResult,
      email,
      otpCode
    };
  }
}

export default new RegisterService();
