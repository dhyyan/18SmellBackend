import { categoryRepository, productRepository } from '../../repositories/index.js';

class DeleteCategoryService {
  async execute(id: string) {
    // Check if any products are using this category
    const productsUsingCategory = await productRepository.countDocuments({ category: id });
    if (productsUsingCategory > 0) {
      throw new Error(`Cannot delete category because ${productsUsingCategory} product(s) are associated with it.`);
    }

    const category = await categoryRepository.findByIdAndDelete(id);
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  }
}

export default new DeleteCategoryService();
