import { categoryRepository } from '../../repositories/index.js';

class GetAllCategoriesService {
  async execute() {
    return await categoryRepository.find({});
  }
}

export default new GetAllCategoriesService();
