import mongoose from 'mongoose';

export interface IProduct extends mongoose.Document {
  name: string;
  brand: string;
  category: mongoose.Types.ObjectId;
  smellType: string;
  description?: string;
  price: number;
  stock: number;
  volume: number;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProduct>('Product', productSchema);
