import { orderRepository } from '../../repositories/index.js';
// @desc    Get all orders (admin only)
// @route   GET /api/v1/admin/orders
// @access  Private/Admin
export const getAllOrders = async (req, res, next) => {
    try {
        const orders = await orderRepository.find({}, [
            { path: 'user', select: 'name email' },
            { path: 'items.product', select: 'name brand price' }
        ]);
        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders,
        });
    }
    catch (error) {
        next(error);
    }
};
// @desc    Update order and/or payment status (admin only)
// @route   PATCH /api/v1/admin/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res, next) => {
    try {
        const { orderStatus, paymentStatus } = req.body;
        let order = await orderRepository.findById(req.params.id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: `Order not found with id: ${req.params.id}`,
            });
        }
        // Update orderStatus if provided
        if (orderStatus) {
            order.orderStatus = orderStatus;
        }
        // Update paymentStatus if provided
        if (paymentStatus) {
            order.paymentStatus = paymentStatus;
        }
        await orderRepository.save(order);
        res.status(200).json({
            success: true,
            message: 'Order status updated successfully',
            data: order,
        });
    }
    catch (error) {
        next(error);
    }
};
