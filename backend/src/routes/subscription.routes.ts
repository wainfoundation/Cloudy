import express from 'express';
import { auth } from '../middleware/auth';
import {
  createSubscription,
  getSubscriptionHistory,
  getActiveSubscription,
  cancelSubscription,
  updateSubscription
} from '../controllers/subscription.controller';

const router = express.Router();

// Protected routes - require authentication
router.post('/', auth, createSubscription);
router.get('/history', auth, getSubscriptionHistory);
router.get('/active', auth, getActiveSubscription);
router.put('/cancel', auth, cancelSubscription);
router.put('/update', auth, updateSubscription);

export default router; 