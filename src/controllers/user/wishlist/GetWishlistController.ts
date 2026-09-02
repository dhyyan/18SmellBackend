import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../../types/express.types.js';
import getWishlistService from '../../../services/wishlist/GetWishlistService.js';
import { formatProductImageUrls } from '../../../utils/imageHelper.js';

class GetWishlistController {
  async execute(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?._id;
      if (!userId) {
        return res.status(401).json({ success: false, message: 'User not authenticated' });
      }

      const wishlist = await getWishlistService.execute(userId.toString());
      
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

export default new GetWishlistController();
