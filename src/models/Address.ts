import mongoose from 'mongoose';
import { IAddress } from '../types/address.types.js';

const addressSchema = new mongoose.Schema<IAddress>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user reference'],
    },
    streetAddress: {
      type: String,
      required: [true, 'Please provide street address'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'Please provide city'],
      trim: true,
    },
    state: {
      type: String,
      required: [true, 'Please provide state'],
      trim: true,
    },
    postalCode: {
      type: String,
      required: [true, 'Please provide postal code'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IAddress>('Address', addressSchema);
