import express from 'express';
import { auth } from '../middleware/auth';
import {
  getCurrentSubscription,
  getSubscriptionHistory,
  updateSubscription,
  cancelSubscription
} from '../controllers/subscription.controller';

const router = express.Router();

// Protected routes - require authentication
router.get('/current', auth, getCurrentSubscription);
router.get('/history', auth, getSubscriptionHistory);
router.put('/update', auth, updateSubscription);
router.put('/cancel', auth, cancelSubscription);

export default router; 