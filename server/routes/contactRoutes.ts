import { Router } from 'express';
import { createContact, getContacts } from '../controllers/contactController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

router.post('/', createContact);
router.get('/', authenticateToken, requireAdmin, getContacts);

export default router;
