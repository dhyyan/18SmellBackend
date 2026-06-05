import { orderRepository } from '../../repositories/index.js';

class UpdateOrderStatusService {
  async execute(id: string, status: string) {
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid order status');
    }
    const order = await orderRepository.findByIdAndUpdate(id, { orderStatus: status }, { new: true });
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  }
}

export default new UpdateOrderStatusService();
