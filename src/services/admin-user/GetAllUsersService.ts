import { userRepository } from '../../repositories/index.js';

class GetAllUsersService {
  async execute() {
    return await userRepository.find({}, '', '-password -__v', '-createdAt');
  }
}

export default new GetAllUsersService();
