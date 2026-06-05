import { orderRepository } from '../../repositories/index.js';

class GetMyInvoicesService {
  async execute(userId: string) {
    // Treat completed/paid orders as invoices
    return await orderRepository.find(
      { user: userId, paymentStatus: 'paid' },
      'items.product',
      '',
      '-createdAt'
    );
  }
}

export default new GetMyInvoicesService();
