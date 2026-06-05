import { orderRepository } from '../../repositories/index';
import mongoose from 'mongoose';

export interface AdminOrderQuery {
  search?: string;
  page?: string;
  limit?: string;
  orderStatus?: string;
  paymentStatus?: string;
}

class GetAllOrdersService {
  async execute(query: AdminOrderQuery = {}) {
    const filter: any = {};
    
    if (query.orderStatus) {
      filter.orderStatus = query.orderStatus;
    }
    if (query.paymentStatus) {
      filter.paymentStatus = query.paymentStatus;
    }

    if (query.search) {
      const orConditions: any[] = [
        { shippingAddress: { $regex: query.search, $options: 'i' } }
      ];
      if (mongoose.Types.ObjectId.isValid(query.search)) {
         orConditions.push({ _id: query.search });
      }
      filter.$or = orConditions;
    }

    const page = parseInt(query.page || '1', 10);
    const limit = parseInt(query.limit || '10', 10);
    const skip = (page - 1) * limit;

    const orders = await orderRepository.find(filter, 'user items.product', '', '-createdAt');
    const paginatedOrders = orders.slice(skip, skip + limit);

    return {
      orders: paginatedOrders,
      total: orders.length,
      page,
      pages: Math.ceil(orders.length / limit)
    };
  }
}

export default new GetAllOrdersService();
