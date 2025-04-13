import express from 'express';
import { auth } from '../middleware/auth';
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
router.post('/:id/progress', auth, saveGameProgress);
router.get('/:id/progress', auth, getGameProgress);
router.post('/:id/score', auth, submitGameScore);

export default router; 