import { Router } from 'express';
import {
  createReservation,
  getReservations,
  deleteReservation,
} from '../controllers/reservationController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

router.post('/', createReservation);
router.get('/', authenticateToken, requireAdmin, getReservations);
router.delete('/:id', authenticateToken, requireAdmin, deleteReservation);

export default router;
