import createBaseRepository from './BaseRepository.js';
import User from '../models/User.js';

const baseRepository = createBaseRepository(User);

const userRepository = {
  ...baseRepository,

  async findByEmail(email: string, selectPassword = false) {
    let query = User.findOne({ email });
    if (selectPassword) {
      query = query.select('+password');
    }
    return await query;
  }
};

export default userRepository;
