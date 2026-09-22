import { Request, Response } from 'express';
import { db } from '../models/dbStorage';

export const getDashboardStats = (req: Request, res: Response): void => {
  try {
    const orders = db.getOrders();
    const reservations = db.getReservations();
    const users = db.getUsers().filter((u) => u.role === 'customer');
    const products = db.getProducts();

    const totalOrders = orders.length;

    // Today's date string YYYY-MM-DD
    const todayStr = new Date().toISOString().split('T')[0];
    const todayOrders = orders.filter((o) => o.createdAt.startsWith(todayStr)).length;

    // Total revenue from all non-cancelled orders
    const totalRevenue = orders
      .filter((o) => o.status !== 'Cancelled')
      .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    const totalReservations = reservations.length;
    const totalCustomers = users.length;

    res.json({
      stats: {
        totalOrders,
        todayOrders,
        totalRevenue,
        totalReservations,
        totalCustomers,
        totalProducts: products.length,
      },
      recentOrders: orders.slice(0, 5),
      recentReservations: reservations.slice(0, 5),
    });
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    res.status(500).json({ message: 'Error retrieving dashboard statistics' });
  }
};
