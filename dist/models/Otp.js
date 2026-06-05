import mongoose from 'mongoose';
const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
    },
    otp: {
        type: String,
        required: [true, 'OTP is required'],
    },
    name: {
        type: String,
    },
    password: {
        type: String,
    },
    attempts: {
        type: Number,
        default: 0,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600, // Automatically delete after 10 minutes (600 seconds)
    },
});
export default mongoose.model('Otp', otpSchema);
