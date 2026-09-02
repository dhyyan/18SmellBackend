import { wishlistRepository } from '../../repositories/index.js';

class GetWishlistService {
  async execute(userId: string) {
    let wishlist = await wishlistRepository.findOne({ user: userId }, 'products');
    
    if (!wishlist) {
      await wishlistRepository.create({ user: userId, products: [] });
      wishlist = await wishlistRepository.findOne({ user: userId }, 'products');
    }
    
    return wishlist;
  }
}

export default new GetWishlistService();
