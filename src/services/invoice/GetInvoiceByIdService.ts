import { orderRepository } from '../../repositories/index.js';

class GetInvoiceByIdService {
  async execute(orderId: string, userId: string, userRole: string) {
    const order = await orderRepository.findById(orderId, [
      { path: 'user', select: 'name email' },
      { path: 'items.product', select: 'name brand price' }
    ]);

    if (!order) {
      throw new Error('Invoice not found');
    }

    // Check ownership or admin status
    const orderUserId = (order.user as any)._id ? (order.user as any)._id.toString() : order.user.toString();
    if (orderUserId !== userId && userRole !== 'admin') {
      throw new Error('Not authorized to view this invoice');
    }

    if (order.paymentStatus !== 'paid') {
      throw new Error('Invoice not available for unpaid orders');
    }

    return order;
  }
}

export default new GetInvoiceByIdService();
