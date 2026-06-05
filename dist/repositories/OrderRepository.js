import createBaseRepository from './BaseRepository.js';
import Order from '../models/Order.js';
const orderRepository = createBaseRepository(Order);
export default orderRepository;
