import { Request, Response } from 'express';
import User from '../models/User';
import { StatusCodes } from 'http-status-codes';

// Get user profile
export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not authenticated' });
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
    }

    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    console.error('Error getting user profile:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
  }
};

// Update user profile
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not authenticated' });
    }

    const { username, email, avatar } = req.body;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
    }

    // Update fields if provided
    if (username) user.username = username;
    if (email) user.email = email;
    if (avatar) user.avatar = avatar;

    await user.save();
    
    return res.status(StatusCodes.OK).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
  }
};

// Get user game stats
export const getGameStats = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not authenticated' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
    }

    // In a real application, you would fetch game stats from a separate collection
    // For now, we'll return mock data
    const gameStats = {
      totalGamesPlayed: 25,
      totalTimePlayed: 3600, // in seconds
      averageScore: 1250,
      highestScore: 2500,
      gamesWon: 10,
      achievementsUnlocked: 5
    };

    return res.status(StatusCodes.OK).json(gameStats);
  } catch (error) {
    console.error('Error getting user game stats:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
  }
};

// Get user achievements
export const getAchievements = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not authenticated' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
    }

    // In a real application, you would fetch achievements from a separate collection
    // For now, we'll return mock data
    const achievements = [
      { id: 1, name: 'First Game', description: 'Play your first game', unlocked: true, dateUnlocked: '2023-01-01' },
      { id: 2, name: 'High Scorer', description: 'Score over 2000 points in a game', unlocked: true, dateUnlocked: '2023-01-15' },
      { id: 3, name: 'Game Master', description: 'Play 20 games', unlocked: true, dateUnlocked: '2023-02-01' },
      { id: 4, name: 'Perfect Game', description: 'Complete a game without mistakes', unlocked: false },
      { id: 5, name: 'Social Butterfly', description: 'Invite 5 friends to play', unlocked: false }
    ];

    return res.status(StatusCodes.OK).json(achievements);
  } catch (error) {
    console.error('Error getting user achievements:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
  }
};

// Get leaderboard
export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    // In a real application, you would fetch the leaderboard from a separate collection
    // For now, we'll return mock data
    const leaderboard = [
      { rank: 1, username: 'Player1', score: 5000, gamesPlayed: 50 },
      { rank: 2, username: 'Player2', score: 4500, gamesPlayed: 45 },
      { rank: 3, username: 'Player3', score: 4000, gamesPlayed: 40 },
      { rank: 4, username: 'Player4', score: 3500, gamesPlayed: 35 },
      { rank: 5, username: 'Player5', score: 3000, gamesPlayed: 30 }
    ];

    return res.status(StatusCodes.OK).json(leaderboard);
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
  }
}; 