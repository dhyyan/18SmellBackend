import { cartRepository } from '../../repositories/index.js';
import { IProduct } from '../../types/product.types.js';

class CheckCartStockService {
  async execute(userId: string) {
    const cart = await cartRepository.findOne({ user: userId }, 'items.product');

    if (!cart || !cart.items || cart.items.length === 0) {
      return {
        inStock: true,
        outOfStockItems: []
      };
    }

    const outOfStockItems = [];

    for (const item of cart.items) {
      const product = item.product as unknown as IProduct | null;
      if (!product) {
        throw new Error('Product not found in cart');
      }

      if (product.stock < item.quantity) {
        outOfStockItems.push({
          productId: product._id.toString(),
          name: product.name,
          requestedQuantity: item.quantity,
          availableStock: product.stock
        });
      }
    }

    return {
      inStock: outOfStockItems.length === 0,
      outOfStockItems
    };
  }
}

export default new CheckCartStockService();
