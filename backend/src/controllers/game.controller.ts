import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// Mock game data
const games = [
  {
    id: '1',
    title: 'Pi Puzzle',
    description: 'A challenging puzzle game where you need to arrange pieces to form the Pi symbol.',
    thumbnail: 'https://example.com/pi-puzzle.jpg',
    category: 'Puzzle',
    difficulty: 'Medium',
    playCount: 1250,
    rating: 4.5
  },
  {
    id: '2',
    title: 'Crypto Runner',
    description: 'Run and collect cryptocurrency tokens while avoiding obstacles.',
    thumbnail: 'https://example.com/crypto-runner.jpg',
    category: 'Action',
    difficulty: 'Easy',
    playCount: 2100,
    rating: 4.2
  },
  {
    id: '3',
    title: 'Blockchain Builder',
    description: 'Build your own blockchain and mine for tokens.',
    thumbnail: 'https://example.com/blockchain-builder.jpg',
    category: 'Strategy',
    difficulty: 'Hard',
    playCount: 850,
    rating: 4.7
  }
];

// Get all games
export const getGames = async (req: Request, res: Response) => {
  try {
    return res.status(StatusCodes.OK).json(games);
  } catch (error) {
    console.error('Error getting games:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
  }
};

// Get game by ID
export const getGameById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const game = games.find(g => g.id === id);
    if (!game) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Game not found' });
    }
    
    return res.status(StatusCodes.OK).json(game);
  } catch (error) {
    console.error('Error getting game by ID:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
  }
};

// Save game progress
export const saveGameProgress = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not authenticated' });
    }
    
    const { id } = req.params;
    const { level, score, progress } = req.body;
    
    // In a real application, you would save the game progress to a database
    // For now, we'll just return a success message
    return res.status(StatusCodes.OK).json({ 
      message: 'Game progress saved successfully',
      gameId: id,
      userId,
      level,
      score,
      progress
    });
  } catch (error) {
    console.error('Error saving game progress:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
  }
};

// Get game progress
export const getGameProgress = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not authenticated' });
    }
    
    const { id } = req.params;
    
    // In a real application, you would fetch the game progress from a database
    // For now, we'll return mock data
    const gameProgress = {
      gameId: id,
      userId,
      level: 5,
      score: 1250,
      progress: 60,
      lastPlayed: new Date().toISOString()
    };
    
    return res.status(StatusCodes.OK).json(gameProgress);
  } catch (error) {
    console.error('Error getting game progress:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
  }
};

// Submit game score
export const submitGameScore = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not authenticated' });
    }
    
    const { id } = req.params;
    const { score, level, timeSpent } = req.body;
    
    // In a real application, you would save the game score to a database
    // For now, we'll just return a success message
    return res.status(StatusCodes.OK).json({ 
      message: 'Game score submitted successfully',
      gameId: id,
      userId,
      score,
      level,
      timeSpent
    });
  } catch (error) {
    console.error('Error submitting game score:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
  }
};

// Get game leaderboard
export const getGameLeaderboard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // In a real application, you would fetch the game leaderboard from a database
    // For now, we'll return mock data
    const leaderboard = [
      { rank: 1, username: 'Player1', score: 5000, date: '2023-01-01' },
      { rank: 2, username: 'Player2', score: 4500, date: '2023-01-15' },
      { rank: 3, username: 'Player3', score: 4000, date: '2023-02-01' },
      { rank: 4, username: 'Player4', score: 3500, date: '2023-02-15' },
      { rank: 5, username: 'Player5', score: 3000, date: '2023-03-01' }
    ];
    
    return res.status(StatusCodes.OK).json(leaderboard);
  } catch (error) {
    console.error('Error getting game leaderboard:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
  }
}; 