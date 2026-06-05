import { productRepository } from '../../repositories/index.js';
import { Request, Response, NextFunction } from 'express';

// Create a new product (Admin)
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productRepository.create(req.body);
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// Update an existing product (Admin)
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productRepository.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product not found with id of ${req.params.id}`
      });
    }
    
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// Delete a product (Admin)
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productRepository.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product not found with id of ${req.params.id}`
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

