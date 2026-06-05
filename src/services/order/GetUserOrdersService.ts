import { orderRepository } from '../../repositories/index.js';

class GetUserOrdersService {
  async execute(userId: string) {
    return await orderRepository.find({ user: userId }, 'items.product', '', '-createdAt');
  }
}

export default new GetUserOrdersService();
