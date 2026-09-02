import { Model, Document } from 'mongoose';


const createBaseRepository = <T extends Document>(model: Model<T>) => {
  return {
   
    
    async find(filter: any = {}, populate: any = '', select: any = '', sort: any = '') {
      let query: any = model.find(filter);
      if (populate) query = query.populate(populate);
      if (select) query = query.select(select);
      if (sort) query = query.sort(sort);
      return await query;
    },

    async findOne(filter: any = {}, populate: any = '', select: any = '', sort: any = '') {
      let query: any = model.findOne(filter);
      if (populate) query = query.populate(populate);
      if (select) query = query.select(select);
      if (sort) query = query.sort(sort);
      return await query;
    },

    
    async findById(id: string | any, populate: any = '', select: any = '') {
      let query: any = model.findById(id);
      if (populate) query = query.populate(populate);
      if (select) query = query.select(select);
      return await query;
    },

    
    async create(data: any) {
      return await model.create(data);
    },

    
    async findByIdAndUpdate(id: string | any, data: any, options: any = { new: true, runValidators: true }) {
      return await model.findByIdAndUpdate(id, data, options);
    },

    
    async findByIdAndDelete(id: string | any) {
      return await model.findByIdAndDelete(id);
    },

    
    async deleteMany(filter: any) {
      return await model.deleteMany(filter);
    },

    
    async countDocuments(filter: any = {}) {
      return await model.countDocuments(filter);
    },

    
    async save(document: T) {
      return await document.save();
    }
  };
};

export default createBaseRepository;
