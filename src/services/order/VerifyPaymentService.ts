import { orderRepository } from '../../repositories/index.js';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

class VerifyPaymentService {
  async execute(orderId: string, paymentDetails: any) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentDetails;
    
    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'mock_key_secret')
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      // Payment is successful
      return await orderRepository.findByIdAndUpdate(orderId, {
        paymentStatus: 'paid'
      });
    } else {
      await orderRepository.findByIdAndUpdate(orderId, {
        paymentStatus: 'failed'
      });
      throw new Error('Invalid payment signature');
    }
  }
}

export default new VerifyPaymentService();
