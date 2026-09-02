import { Request, Response, NextFunction } from 'express';
import createProductService from '../../../services/product/CreateProductService.js';
import { uploadToCloudinary } from '../../../utils/cloudinary.js';

class CreateProductController {
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      let imageUrl = req.body.imageUrl || req.body.image || '';
      if (!imageUrl && req.body.images) {
        if (Array.isArray(req.body.images)) {
          imageUrl = req.body.images[0] || '';
        } else if (typeof req.body.images === 'string') {
          imageUrl = req.body.images;
        }
      }

      // Process images if uploaded
      if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        const file = req.files[0] as Express.Multer.File;
        imageUrl = await uploadToCloudinary(file.path);
      }

      // Explicitly convert numeric fields to handle empty string cases from frontend forms
      const productData = {
        ...req.body,
        price: req.body.price ? Number(req.body.price) : undefined,
        stock: req.body.stock ? Number(req.body.stock) : undefined,
        volume: req.body.volume ? Number(req.body.volume) : undefined,
        imageUrl,
        image: imageUrl
      };

      const product = await createProductService.execute(productData);
      res.status(201).json({
        success: true,
        data: product
      });
    } catch (error: any) {
      if (error.message === 'Invalid category ID') {
        res.status(400).json({ success: false, message: error.message });
      } else {
        next(error);
      }
    }
  }
}

export default new CreateProductController();
