import express from 'express';
import { authenticate } from '../middleware/auth';
import {
  getGames,
  getGameById,
  saveGameProgress,
  getGameProgress,
  submitGameScore,
  getGameLeaderboard
} from '../controllers/game.controller';

const router = express.Router();

// Public routes - no authentication required
router.get('/', getGames);
router.get('/:id', getGameById);
router.get('/:id/leaderboard', getGameLeaderboard);

// Protected routes - require authentication
router.post('/:id/progress', authenticate, saveGameProgress);
router.get('/:id/progress', authenticate, getGameProgress);
router.post('/:id/score', authenticate, submitGameScore);

export default router; 