import { categoryRepository } from '../../repositories/index.js';
import { Request, Response, NextFunction } from 'express';

// Get all categories
export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await categoryRepository.find({});
    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

// Create a new category (Admin)
export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await categoryRepository.create(req.body);
    res.status(201).json({
      success: true,
      data: category
    });
  } catch (error) {
    next(error);
  }
};

// Delete a category (Admin)
export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
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
  } catch (error) {
    next(error);
  }
};

