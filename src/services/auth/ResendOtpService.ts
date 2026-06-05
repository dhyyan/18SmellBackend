import { otpRepository } from '../../repositories/index.js';
import sendEmail from '../../utils/sendEmail.js';
import { buildLuxuryEmailTemplate } from '../../utils/emailTemplates.js';
import { generateOtpCode } from '../../utils/otpUtils.js';

class ResendOtpService {
  async execute(email: string) {
    if (!email) {
      throw new Error('Please provide email address.');
    }

    const otpRecord = await otpRepository.findOne({ email });

    if (!otpRecord) {
      throw new Error('No active registration session found. Please register again.');
    }

    const otpCode = generateOtpCode();

    console.log(`\n=========================================\n🔑 [OTP GENERATOR] RESEND\nEmail: ${email}\nOTP Code: ${otpCode}\nGenerated At: ${new Date().toISOString()} (${new Date().toLocaleTimeString()})\n=========================================\n`);
    
    otpRecord.otp = otpCode;
    otpRecord.attempts = 0;
    otpRecord.createdAt = Date.now();
    await otpRepository.save(otpRecord);

    const emailOptions = {
      email,
      subject: '18Smell - Verify Your Account (New Code)',
      message: `Welcome to 18Smell. Your new verification code is ${otpCode}. It will expire in 10 minutes.`,
      html: buildLuxuryEmailTemplate(otpRecord.name, otpCode),
    };

    const emailResult = await sendEmail(emailOptions);

    return {
      emailResult,
      otpCode
    };
  }
}

export default new ResendOtpService();
