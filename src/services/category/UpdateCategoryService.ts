import { categoryRepository } from '../../repositories/index.js';

class UpdateCategoryService {
  async execute(id: string, data: any) {
    const category = await categoryRepository.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  }
}

export default new UpdateCategoryService();
