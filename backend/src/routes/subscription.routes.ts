import express from 'express';
import { authenticate } from '../middleware/auth';
import {
  createSubscription,
  getSubscriptionHistory,
  getActiveSubscription,
  cancelSubscription,
  updateSubscription
} from '../controllers/subscription.controller';

const router = express.Router();

// Protected routes - require authentication
router.post('/', authenticate, createSubscription);
router.get('/history', authenticate, getSubscriptionHistory);
router.get('/active', authenticate, getActiveSubscription);
router.put('/cancel', authenticate, cancelSubscription);
router.put('/update', authenticate, updateSubscription);

export default router; 