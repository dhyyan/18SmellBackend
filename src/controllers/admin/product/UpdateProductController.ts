import { Request, Response, NextFunction } from 'express';
import updateProductService from '../../../services/product/UpdateProductService.js';

class UpdateProductController {
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const images: string[] = [];
      if (req.files && Array.isArray(req.files)) {
        req.files.forEach((file: Express.Multer.File) => {
          images.push(`/uploads/${file.filename}`);
        });
      }

      const productData = { ...req.body };
      if (images.length > 0) {
        productData.images = images;
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
