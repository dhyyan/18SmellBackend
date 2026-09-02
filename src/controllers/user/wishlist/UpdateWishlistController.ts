import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../../types/express.types.js';
import updateWishlistService from '../../../services/wishlist/UpdateWishlistService.js';
import { formatProductImageUrls } from '../../../utils/imageHelper.js';

class UpdateWishlistController {
  async execute(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?._id;
      if (!userId) {
        return res.status(401).json({ success: false, message: 'User not authenticated' });
      }

      const { products } = req.body;
      if (!products || !Array.isArray(products)) {
        return res.status(400).json({ success: false, message: 'Products array is required' });
      }

      const wishlist = await updateWishlistService.execute(userId.toString(), products);
      
      const wishlistObj = wishlist.toObject ? wishlist.toObject() : { ...wishlist };
      if (wishlistObj.products && Array.isArray(wishlistObj.products)) {
        wishlistObj.products = wishlistObj.products.map((product: any) => {
          if (product) {
            return formatProductImageUrls(req, product);
          }
          return product;
        });
      }

      res.status(200).json({
        success: true,
        data: wishlistObj
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UpdateWishlistController();
