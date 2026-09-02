import { cartRepository } from '../../repositories/index.js';

class GetCartService {
  async execute(userId: string) {
    let cart = await cartRepository.findOne({ user: userId }, 'items.product');
    
    if (!cart) {
      await cartRepository.create({ user: userId, items: [] });
      cart = await cartRepository.findOne({ user: userId }, 'items.product');
    }
    
    return cart;
  }
}

export default new GetCartService();
