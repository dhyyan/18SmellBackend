import { categoryRepository } from '../../repositories/index.js';

class CreateCategoryService {
  async execute(data: any) {
    return await categoryRepository.create(data);
  }
}

export default new CreateCategoryService();
