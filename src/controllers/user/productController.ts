import { productRepository } from '../../repositories/index.js';
import { Request, Response, NextFunction } from 'express';

// Retrieve all products from database (populating category)
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productRepository.find({}, 'category');
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// Retrieve a single product by MongoDB ID
export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productRepository.findById(req.params.id, 'category');
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

