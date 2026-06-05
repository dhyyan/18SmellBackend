import createBaseRepository from './BaseRepository.js';
import Product from '../models/Product.js';

const productRepository = createBaseRepository(Product);

export default productRepository;
