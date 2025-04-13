import express from 'express';
import { authenticate } from '../middleware/auth';
import { verifyAdReward } from '../controllers/rewards.controller';

const router = express.Router();

// Verify ad reward
router.post('/verify-ad', authenticate, verifyAdReward);

export default router; 