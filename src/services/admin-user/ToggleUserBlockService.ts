import { userRepository } from '../../repositories/index.js';

class ToggleUserBlockService {
  async execute(id: string, isBlocked: boolean) {
    const user = await userRepository.findByIdAndUpdate(id, { isBlocked }, { new: true });
    if (!user) {
      throw new Error('User not found');
    }
    (user as any).password = undefined;
    return user;
  }
}

export default new ToggleUserBlockService();
