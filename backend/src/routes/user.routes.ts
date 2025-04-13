import express from 'express';
import { auth } from '../middleware/auth';
import {
  getProfile,
  updateProfile,
  getGameStats,
  getAchievements,
  getLeaderboard
} from '../controllers/user.controller';

const router = express.Router();

// Protected routes - require authentication
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.get('/stats', auth, getGameStats);
router.get('/achievements', auth, getAchievements);

// Public route - no authentication required
router.get('/leaderboard', getLeaderboard);

export default router; 