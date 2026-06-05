import { Request, Response, NextFunction } from 'express';
import createProductService from '../../../services/product/CreateProductService.js';

class CreateProductController {
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      // Process images if uploaded
      const images: string[] = [];
      if (req.files && Array.isArray(req.files)) {
        req.files.forEach((file: Express.Multer.File) => {
          images.push(`/uploads/${file.filename}`);
        });
      }

      const productData = {
        ...req.body,
        images: images.length > 0 ? images : req.body.images
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
