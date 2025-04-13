import express from 'express';
import { authenticate } from '../middleware/auth';
import {
  createPayment,
  getPaymentHistory,
  getPaymentById,
  verifyPayment
} from '../controllers/payment.controller';

const router = express.Router();

// Protected routes - require authentication
router.post('/', authenticate, createPayment);
router.get('/history', authenticate, getPaymentHistory);
router.get('/:id', authenticate, getPaymentById);
router.post('/verify', authenticate, verifyPayment);

export default router; 