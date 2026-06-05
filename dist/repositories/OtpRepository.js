import createBaseRepository from './BaseRepository.js';
import Otp from '../models/Otp.js';
const baseRepository = createBaseRepository(Otp);
const otpRepository = {
    ...baseRepository,
    /**
     * Find the latest OTP record for a given email
     * @param {String} email - Email address
     * @returns {Promise<Object|null>}
     */
    async findLatestByEmail(email) {
        return await Otp.findOne({ email }).sort({ createdAt: -1 });
    }
};
export default otpRepository;
