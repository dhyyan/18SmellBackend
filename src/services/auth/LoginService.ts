import { userRepository } from '../../repositories/index.js';
import { signToken } from '../jwtService.js';

class LoginService {
  async execute(email: string, password: string) {
    if (!email || !password) {
      throw new Error('Please provide both email and password to log in.');
    }

    const user = await userRepository.findByEmail(email, true);

    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid email address or password.');
    }

    const token = signToken({ id: user._id });

    return {
      user,
      token
    };
  }
}

export default new LoginService();
