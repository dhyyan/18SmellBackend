import { orderRepository } from '../../repositories/index.js';

class GetAllOrdersService {
  async execute() {
    return await orderRepository.find({}, 'user items.product', '', '-createdAt');
  }
}

export default new GetAllOrdersService();
