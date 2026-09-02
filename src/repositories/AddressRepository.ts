import createBaseRepository from './BaseRepository.js';
import Address from '../models/Address.js';

const addressRepository = createBaseRepository(Address);

export default addressRepository;
