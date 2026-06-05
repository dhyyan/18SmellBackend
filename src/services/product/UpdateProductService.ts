import { productRepository, categoryRepository } from '../../repositories/index.js';

class UpdateProductService {
  async execute(id: string, data: any) {
    if (data.category) {
      const categoryExists = await categoryRepository.findById(data.category);
      if (!categoryExists) {
        throw new Error('Invalid category ID');
      }
    }
    
    const product = await productRepository.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }
}

export default new UpdateProductService();
