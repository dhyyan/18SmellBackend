import { orderRepository, productRepository } from '../../repositories/index.js';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'mock_key_id',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'mock_key_secret',
});

class CreateOrderService {
  async execute(userId: string, data: any) {
    const { items, shippingAddress } = data;
    
    if (!items || items.length === 0) {
      throw new Error('No order items provided');
    }

    let totalAmount = 0;
    const orderItems = [];

    // Verify stock and calculate price
    for (const item of items) {
      const product = await productRepository.findById(item.product);
      if (!product) {
        throw new Error(`Product not found: ${item.product}`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product: ${product.name}`);
      }

      const itemPrice = product.price * item.quantity;
      totalAmount += itemPrice;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price
      });

      // Deduct stock (basic implementation, ideally should be within a transaction)
      await productRepository.findByIdAndUpdate(product._id as string, {
        $inc: { stock: -item.quantity }
      });
    }

    // Create Order in DB
    const order = await orderRepository.create({
      user: userId,
      items: orderItems,
      shippingAddress,
      totalAmount,
      paymentStatus: 'pending',
      orderStatus: 'pending'
    });

    // Create Razorpay Order
    let paymentGatewayOrder;
    try {
      paymentGatewayOrder = await razorpay.orders.create({
        amount: totalAmount * 100, // amount in the smallest currency unit (paise)
        currency: 'INR',
        receipt: order._id.toString(),
      });
    } catch (err) {
      console.error('Razorpay Error:', err);
      // Fallback or handle error. For now, continue without paymentGatewayOrder for mock purposes if it fails
    }

    return {
      order,
      paymentGatewayOrder
    };
  }
}

export default new CreateOrderService();
