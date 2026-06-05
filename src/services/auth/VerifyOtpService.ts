import { userRepository, otpRepository } from '../../repositories/index.js';
import { signToken } from '../jwtService.js';

class VerifyOtpService {
  async execute(email: string, otp: string) {
    if (!email || !otp) {
      throw new Error('Please provide both the email and verification code.');
    }

    const otpRecord = await otpRepository.findLatestByEmail(email);

    if (!otpRecord) {
      throw new Error('Verification session not found or code has expired. Please register again.');
    }

    if (otpRecord.otp !== otp) {
      otpRecord.attempts += 1;

      if (otpRecord.attempts >= 3) {
        await otpRepository.deleteMany({ email });
        throw new Error('Maximum verification attempts exceeded. Please start the registration process again.');
      }

      await otpRepository.save(otpRecord);
      throw new Error(`Invalid verification code. You have ${3 - otpRecord.attempts} attempt(s) remaining before security lockout.`);
    }

    const user = await userRepository.create({
      name: otpRecord.name,
      email: otpRecord.email,
      password: otpRecord.password,
    });

    await otpRepository.deleteMany({ email });

    const token = signToken({ id: user._id });

    return {
      user,
      token
    };
  }
}

export default new VerifyOtpService();
