import mongoose from 'mongoose';

export interface ICategory extends mongoose.Document {
  name: string;
  description?: string;
  status?: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}
