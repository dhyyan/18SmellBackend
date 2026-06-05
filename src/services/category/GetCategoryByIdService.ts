import { categoryRepository } from '../../repositories/index.js';

class GetCategoryByIdService {
  async execute(id: string) {
    const category = await categoryRepository.findById(id);
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  }
}

export default new GetCategoryByIdService();
