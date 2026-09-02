import { orderRepository, productRepository, cartRepository } from '../../repositories/index.js';
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

    let subtotal = 0;
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

      // Calculate price based on volume (50ml gets 20% discount)
      const displayPrice = item.volume === 50 ? Math.round(product.price * 0.8) : product.price;
      const itemPrice = displayPrice * item.quantity;
      subtotal += itemPrice;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: displayPrice,
        volume: item.volume || 100
      });

      // Deduct stock (basic implementation, ideally should be within a transaction)
      await productRepository.findByIdAndUpdate(product._id as string, {
        $inc: { stock: -item.quantity }
      });
    }

    // Calculate total amount with shipping fee (free shipping for subtotal >= 10000, else 150)
    const shippingFee = subtotal >= 10000 ? 0 : 150;
    const totalAmount = subtotal + shippingFee;

    // Create Order in DB
    const order = await orderRepository.create({
      user: userId,
      items: orderItems,
      shippingAddress,
      totalAmount,
      paymentStatus: 'pending',
      orderStatus: 'pending'
    });

    // Clear user's cart in DB
    try {
      const cart = await cartRepository.findOne({ user: userId });
      if (cart) {
        cart.items = [];
        await cartRepository.save(cart);
      }
    } catch (cartErr) {
      console.error('Error clearing cart on checkout:', cartErr);
    }

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
