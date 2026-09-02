import { Request, Response, NextFunction } from 'express';
import updateProductService from '../../../services/product/UpdateProductService.js';
import { uploadToCloudinary } from '../../../utils/cloudinary.js';

class UpdateProductController {
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      let imageUrl = req.body.imageUrl || req.body.image;
      if (!imageUrl && req.body.images) {
        if (Array.isArray(req.body.images)) {
          imageUrl = req.body.images[0];
        } else if (typeof req.body.images === 'string') {
          imageUrl = req.body.images;
        }
      }

      // Process images if uploaded
      if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        const file = req.files[0] as Express.Multer.File;
        imageUrl = await uploadToCloudinary(file.path);
      }

      const productData = { ...req.body };
      
      // Explicitly convert numeric fields to handle empty string cases from frontend forms
      if (productData.price !== undefined) {
        productData.price = productData.price ? Number(productData.price) : undefined;
      }
      if (productData.stock !== undefined) {
        productData.stock = productData.stock ? Number(productData.stock) : undefined;
      }
      if (productData.volume !== undefined) {
        productData.volume = productData.volume ? Number(productData.volume) : undefined;
      }

      if (imageUrl) {
        productData.imageUrl = imageUrl;
        productData.image = imageUrl;
      }

      const product = await updateProductService.execute(req.params.id as string, productData);
      res.status(200).json({
        success: true,
        data: product
      });
    } catch (error: any) {
      if (error.message === 'Invalid category ID') {
        res.status(400).json({ success: false, message: error.message });
      } else if (error.message === 'Product not found') {
        res.status(404).json({ success: false, message: error.message });
      } else {
        next(error);
      }
    }
  }
}

export default new UpdateProductController();
