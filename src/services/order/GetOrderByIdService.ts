import { orderRepository } from '../../repositories/index';

class GetOrderByIdService {
  async execute(id: string) {
    const order = await orderRepository.findById(id, 'user items.product');
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  }
}

export default new GetOrderByIdService();
