import { cartRepository } from '../../repositories/index.js';

class UpdateCartService {
  async execute(userId: string, items: any[]) {
    let cart = await cartRepository.findOne({ user: userId });
    
    if (!cart) {
      cart = await cartRepository.create({ user: userId, items });
    } else {
      cart.items = items;
      await cartRepository.save(cart);
    }
    
    return await cartRepository.findOne({ user: userId }, 'items.product');
  }
}

export default new UpdateCartService();
