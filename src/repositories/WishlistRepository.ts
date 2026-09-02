import createBaseRepository from './BaseRepository.js';
import Wishlist from '../models/Wishlist.js';

const wishlistRepository = createBaseRepository(Wishlist);

export default wishlistRepository;
