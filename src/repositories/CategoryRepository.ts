import createBaseRepository from './BaseRepository.js';
import Category from '../models/Category.js';

const categoryRepository = createBaseRepository(Category);

export default categoryRepository;
