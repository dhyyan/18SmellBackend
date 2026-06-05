import { Model, Document, FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';

/**
 * Base Repository factory providing common MongoDB operations using Mongoose.
 * @param {import('mongoose').Model} model - The Mongoose model to perform queries on
 */
const createBaseRepository = <T extends Document>(model: Model<T>) => {
  return {
   
    
    async find(filter: FilterQuery<T> = {}, populate = '', select = '', sort = '') {
      let query = model.find(filter);
      if (populate) query = query.populate(populate);
      if (select) query = query.select(select);
      if (sort) query = query.sort(sort);
      return await query;
    },

    async findOne(filter: FilterQuery<T> = {}, populate = '', select = '', sort = '') {
      let query = model.findOne(filter);
      if (populate) query = query.populate(populate);
      if (select) query = query.select(select);
      if (sort) query = query.sort(sort);
      return await query;
    },

    
    async findById(id: string | any, populate = '', select = '') {
      let query = model.findById(id);
      if (populate) query = query.populate(populate);
      if (select) query = query.select(select);
      return await query;
    },

    
    async create(data: any) {
      return await model.create(data);
    },

    
    async findByIdAndUpdate(id: string | any, data: UpdateQuery<T>, options: QueryOptions = { new: true, runValidators: true }) {
      return await model.findByIdAndUpdate(id, data, options);
    },

    
    async findByIdAndDelete(id: string | any) {
      return await model.findByIdAndDelete(id);
    },

    
    async deleteMany(filter: FilterQuery<T>) {
      return await model.deleteMany(filter);
    },

    
    async countDocuments(filter: FilterQuery<T> = {}) {
      return await model.countDocuments(filter);
    },

    
    async save(document: T) {
      return await document.save();
    }
  };
};

export default createBaseRepository;
