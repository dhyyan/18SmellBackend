import { userRepository } from '../../repositories/index.js';

class GetUserByIdService {
  async execute(id: string) {
    const user = await userRepository.findById(id, '', '-password -__v');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}

export default new GetUserByIdService();
