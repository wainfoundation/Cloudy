import express from 'express';
import { auth } from '../middleware/auth';
import {
  createPayment,
  getPaymentHistory,
  getPaymentById,
  verifyPayment,
  approvePayment,
  completePayment,
  cancelPayment
} from '../controllers/payment.controller';

const router = express.Router();

// Protected routes - require authentication
router.post('/', auth, createPayment);
router.get('/history', auth, getPaymentHistory);
router.get('/:id', auth, getPaymentById);
router.post('/verify', auth, verifyPayment);
router.post('/approve', auth, approvePayment);
router.post('/complete', auth, completePayment);
router.post('/cancel', auth, cancelPayment);

export default router; 