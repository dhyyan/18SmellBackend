import { orderRepository, productRepository } from '../../repositories/index.js';
import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../../types/express.types.js';

// @desc    Create new order
// @route   POST /api/v1/orders
// @access  Private
export const createOrder = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { items, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No items in order',
      });
    }

    if (!shippingAddress) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a shipping address',
      });
    }

    const processedItems = [];
    let totalAmount = 0;

    // Validate products and stock
    for (const item of items) {
      const product = await productRepository.findById(item.product);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found with id: ${item.product}`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`,
        });
      }

      // Decrement stock
      product.stock -= item.quantity;
      await productRepository.save(product);

      // Add to processed items
      processedItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });

      totalAmount += product.price * item.quantity;
    }

    // Create order
    const order = await orderRepository.create({
      user: req.user!._id,
      items: processedItems,
      totalAmount,
      shippingAddress,
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user's orders
// @route   GET /api/v1/orders
// @access  Private
export const getMyOrders = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const orders = await orderRepository.find(
      { user: req.user!._id },
      { path: 'items.product', select: 'name brand price imageUrl' }
    );

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single order by ID
// @route   GET /api/v1/orders/:id
// @access  Private
export const getOrderById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const order = await orderRepository.findById(req.params.id, [
      { path: 'user', select: 'name email' },
      { path: 'items.product', select: 'name brand price' }
    ]);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Order not found with id: ${req.params.id}`,
      });
    }

    // Check ownership or admin status
    if (order.user._id.toString() !== req.user!._id.toString() && req.user!.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this order',
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};
