import { productRepository, categoryRepository } from '../../repositories/index.js';

class CreateProductService {
  async execute(data: any) {
    // Validate category exists
    const categoryExists = await categoryRepository.findById(data.category);
    if (!categoryExists) {
      throw new Error('Invalid category ID');
    }

    const productData = {
      brand: '18Smell',
      smellType: 'Woody',
      ...data
    };

    return await productRepository.create(productData);
  }
}

export default new CreateProductService();
