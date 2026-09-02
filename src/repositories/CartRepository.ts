import createBaseRepository from './BaseRepository.js';
import Cart from '../models/Cart.js';

const cartRepository = createBaseRepository(Cart);

export default cartRepository;
