import { wishlistRepository } from '../../repositories/index.js';

class UpdateWishlistService {
  async execute(userId: string, products: string[]) {
    let wishlist = await wishlistRepository.findOne({ user: userId });
    
    if (!wishlist) {
      wishlist = await wishlistRepository.create({ user: userId, products });
    } else {
      await wishlistRepository.findByIdAndUpdate(wishlist._id.toString(), { products });
    }
    
    return await wishlistRepository.findOne({ user: userId }, 'products');
  }
}

export default new UpdateWishlistService();
