import { userRepository } from '../../repositories/index.js';

class UpdateUserRoleService {
  async execute(id: string, role: string) {
    if (!['user', 'admin'].includes(role)) {
      throw new Error('Invalid role');
    }
    const user = await userRepository.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) {
      throw new Error('User not found');
    }
    (user as any).password = undefined; // Don't return password hash
    return user;
  }
}

export default new UpdateUserRoleService();
