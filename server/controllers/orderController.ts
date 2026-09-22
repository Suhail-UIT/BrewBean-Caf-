import { Request, Response } from 'express';
import { db } from '../models/dbStorage';
import { AuthRequest } from '../middleware/auth';

export const createOrder = (req: AuthRequest, res: Response): void => {
  try {
    const { items, orderType, address, paymentMethod, customerDetails } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ message: 'Order must contain at least one item.' });
      return;
    }

    if (!orderType || !paymentMethod) {
      res.status(400).json({ message: 'Order type and payment method are required.' });
      return;
    }

    // Calculate subtotal
    const subtotal = items.reduce(
      (sum: number, item: { price: number; quantity: number }) => sum + item.price * (item.quantity || 1),
      0
    );

    // 5% GST tax for cafe
    const taxes = Math.round(subtotal * 0.05);

    // Delivery charge ₹30 only if orderType is Delivery
    const deliveryCharge = orderType === 'Delivery' ? 30 : 0;
    const totalAmount = subtotal + taxes + deliveryCharge;

    const user = req.user
      ? {
          userId: req.user._id,
          name: req.user.name,
          email: req.user.email,
          phone: req.user.phone,
        }
      : customerDetails || {
          name: 'Guest Customer',
          email: 'guest@brewbeancafe.in',
          phone: '+91 98765 00000',
        };

    const newOrder = db.createOrder({
      user,
      items,
      subtotal,
      taxes,
      deliveryCharge,
      totalAmount,
      orderType,
      address,
      paymentMethod,
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
      status: 'Pending',
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error processing order' });
  }
};

export const getOrders = (req: AuthRequest, res: Response): void => {
  try {
    const orders = db.getOrders();
    // If regular customer, filter by their ID/email if not admin
    if (req.user && req.user.role === 'customer') {
      const userOrders = orders.filter(
        (o) => o.user?.userId === req.user?._id || o.user?.email === req.user?.email
      );
      res.json(userOrders);
      return;
    }
    // Admin gets all orders
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

export const getOrderById = (req: Request, res: Response): void => {
  try {
    const order = db.getOrderById(req.params.id);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order' });
  }
};

export const updateOrderStatus = (req: Request, res: Response): void => {
  try {
    const { status } = req.body;
    if (!status) {
      res.status(400).json({ message: 'Status is required' });
      return;
    }

    const updated = db.updateOrderStatus(req.params.id, status);
    if (!updated) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status' });
  }
};
