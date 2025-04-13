import express from 'express';
import { auth } from '../middleware/auth';
import {
  createPayment,
  getPaymentHistory,
  getPaymentById,
  verifyPayment
} from '../controllers/payment.controller';

const router = express.Router();

// Protected routes - require authentication
router.post('/', auth, createPayment);
router.get('/history', auth, getPaymentHistory);
router.get('/:id', auth, getPaymentById);
router.post('/verify', auth, verifyPayment);

export default router; 