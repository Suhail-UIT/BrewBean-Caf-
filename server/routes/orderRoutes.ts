import { Router } from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} from '../controllers/orderController';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import jwt from 'jsonwebtoken';
import { db } from '../models/dbStorage';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'brewbean-super-secret-jwt-key-2025';

// Optional auth for creating order so guests can checkout, but if user has token, attach it
const optionalAuth = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
      const user = db.findUserById(decoded.id);
      if (user) req.user = user;
    } catch (e) {
      // ignore
    }
  }
  next();
};

router.post('/', optionalAuth, createOrder);
router.get('/', authenticateToken, getOrders);
router.get('/:id', getOrderById);
router.put('/:id', authenticateToken, requireAdmin, updateOrderStatus);

export default router;
