import { productRepository, categoryRepository } from '../../repositories/index.js';

class CreateProductService {
  async execute(data: any) {
    // Validate category exists
    const categoryExists = await categoryRepository.findById(data.category);
    if (!categoryExists) {
      throw new Error('Invalid category ID');
    }
    return await productRepository.create(data);
  }
}

export default new CreateProductService();
