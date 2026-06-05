import { productRepository } from '../../repositories/index.js';

class DeleteProductService {
  async execute(id: string) {
    const product = await productRepository.findByIdAndDelete(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }
}

export default new DeleteProductService();
