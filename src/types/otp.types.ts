import mongoose from 'mongoose';

export interface IOtp extends mongoose.Document {
  email: string;
  otp: string;
  name?: string;
  password?: string;
  attempts: number;
  createdAt: Date;
}
