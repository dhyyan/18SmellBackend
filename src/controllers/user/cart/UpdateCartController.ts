import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../../types/express.types.js';
import updateCartService from '../../../services/cart/UpdateCartService.js';
import { formatProductImageUrls } from '../../../utils/imageHelper.js';

class UpdateCartController {
  async execute(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?._id;
      if (!userId) {
        return res.status(401).json({ success: false, message: 'User not authenticated' });
      }

      const { items } = req.body;
      if (!items || !Array.isArray(items)) {
        return res.status(400).json({ success: false, message: 'Items array is required' });
      }

      const cart = await updateCartService.execute(userId.toString(), items);
      
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

export default new UpdateCartController();
