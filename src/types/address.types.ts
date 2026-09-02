import mongoose from 'mongoose';

export interface IAddress extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  createdAt: Date;
  updatedAt: Date;
}
