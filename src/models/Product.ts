import mongoose from 'mongoose';

import { IProduct } from '../types/product.types.js';

const productSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'Please provide a brand name'],
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Please specify a category for this product'],
    },
    smellType: {
      type: String,
      required: [true, 'Please provide a smell type'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: [0, 'Price cannot be negative'],
    },
    stock: {
      type: Number,
      required: [true, 'Please provide stock count'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    volume: {
      type: Number,
      required: [true, 'Please specify the volume in ml'],
      min: [0, 'Volume cannot be negative'],
    },
    imageUrl: {
      type: String,
      default: '',
    },
    notes: {
      type: [String],
      default: [],
    },
    occasion: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProduct>('Product', productSchema);
