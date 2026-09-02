import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../../types/express.types.js';
import getCartService from '../../../services/cart/GetCartService.js';
import { formatProductImageUrls } from '../../../utils/imageHelper.js';

class GetCartController {
  async execute(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?._id;
      if (!userId) {
        return res.status(401).json({ success: false, message: 'User not authenticated' });
      }

      const cart = await getCartService.execute(userId.toString());
      
      const cartObj = cart.toObject ? cart.toObject() : { ...cart };
      if (cartObj.items && Array.isArray(cartObj.items)) {
        cartObj.items = cartObj.items.map((item: any) => {
          if (item.product) {
            item.product = formatProductImageUrls(req, item.product);
          }
          return item;
        });
      }

      res.status(200).json({
        success: true,
        data: cartObj
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new GetCartController();
