import { categoryRepository } from '../../repositories/index.js';
// Get all categories
export const getCategories = async (req, res, next) => {
    try {
        const categories = await categoryRepository.find({});
        res.status(200).json({
            success: true,
            count: categories.length,
            data: categories
        });
    }
    catch (error) {
        next(error);
    }
};
// Create a new category (Admin)
export const createCategory = async (req, res, next) => {
    try {
        const category = await categoryRepository.create(req.body);
        res.status(201).json({
            success: true,
            data: category
        });
    }
    catch (error) {
        next(error);
    }
};
// Delete a category (Admin)
export const deleteCategory = async (req, res, next) => {
    try {
        const category = await categoryRepository.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: `Category not found with id of ${req.params.id}`
            });
        }
        res.status(200).json({
            success: true,
            message: 'Category deleted successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
