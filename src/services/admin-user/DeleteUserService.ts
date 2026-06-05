import { userRepository } from '../../repositories/index.js';

class DeleteUserService {
  async execute(id: string) {
    const user = await userRepository.findByIdAndDelete(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}

export default new DeleteUserService();
