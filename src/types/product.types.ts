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
