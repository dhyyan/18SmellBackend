import { productRepository } from '../../repositories/index.js';

class GetProductByIdService {
  async execute(id: string) {
    const product = await productRepository.findById(id, 'category');
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }
}

export default new GetProductByIdService();
