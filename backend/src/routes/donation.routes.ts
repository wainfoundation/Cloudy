import express from 'express';
import { auth } from '../middleware/auth';
import {
  createDonation,
  getDonationHistory,
  getTotalDonations,
  getRecentDonations
} from '../controllers/donation.controller';

const router = express.Router();

// Protected routes - require authentication
router.post('/', auth, createDonation);
router.get('/history', auth, getDonationHistory);
router.get('/total', auth, getTotalDonations);

// Public route - no authentication required
router.get('/recent', getRecentDonations);

export default router; 