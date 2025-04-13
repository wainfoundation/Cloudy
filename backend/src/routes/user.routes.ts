import express from 'express';
import { authenticate } from '../middleware/auth';
import {
  getProfile,
  updateProfile,
  getGameStats,
  getAchievements,
  getLeaderboard
} from '../controllers/user.controller';

const router = express.Router();

// Protected routes - require authentication
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.get('/stats', authenticate, getGameStats);
router.get('/achievements', authenticate, getAchievements);

// Public route - no authentication required
router.get('/leaderboard', getLeaderboard);

export default router; 