/**
 * Base Repository factory providing common MongoDB operations using Mongoose.
 * @param {import('mongoose').Model} model - The Mongoose model to perform queries on
 */
const createBaseRepository = (model) => {
    return {
        async find(filter = {}, populate = '', select = '', sort = '') {
            let query = model.find(filter);
            if (populate)
                query = query.populate(populate);
            if (select)
                query = query.select(select);
            if (sort)
                query = query.sort(sort);
            return await query;
        },
        async findOne(filter = {}, populate = '', select = '', sort = '') {
            let query = model.findOne(filter);
            if (populate)
                query = query.populate(populate);
            if (select)
                query = query.select(select);
            if (sort)
                query = query.sort(sort);
            return await query;
        },
        async findById(id, populate = '', select = '') {
            let query = model.findById(id);
            if (populate)
                query = query.populate(populate);
            if (select)
                query = query.select(select);
            return await query;
        },
        async create(data) {
            return await model.create(data);
        },
        async findByIdAndUpdate(id, data, options = { new: true, runValidators: true }) {
            return await model.findByIdAndUpdate(id, data, options);
        },
        async findByIdAndDelete(id) {
            return await model.findByIdAndDelete(id);
        },
        async deleteMany(filter) {
            return await model.deleteMany(filter);
        },
        async countDocuments(filter = {}) {
            return await model.countDocuments(filter);
        },
        async save(document) {
            return await document.save();
        }
    };
};
export default createBaseRepository;
