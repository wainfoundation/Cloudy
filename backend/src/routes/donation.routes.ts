import express from 'express';
import { authenticate } from '../middleware/auth';
import {
  createDonation,
  getDonationHistory,
  getTotalDonations,
  getRecentDonations
} from '../controllers/donation.controller';

const router = express.Router();

// Protected routes - require authentication
router.post('/', authenticate, createDonation);
router.get('/history', authenticate, getDonationHistory);
router.get('/total', authenticate, getTotalDonations);

// Public route - no authentication required
router.get('/recent', getRecentDonations);

export default router; 