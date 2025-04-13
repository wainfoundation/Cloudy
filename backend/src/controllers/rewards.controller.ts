import { Request, Response } from 'express';
import User from '../models/User';

interface AdReward {
  adId: string;
  userId: string;
  timestamp: Date;
}

// In-memory store for ad rewards (you might want to use Redis or a database in production)
const adRewards = new Map<string, AdReward>();

export const verifyAdReward = async (req: Request, res: Response) => {
  try {
    const { adId } = req.body;
    const userId = req.user.id;

    // Check if this ad reward has already been claimed
    if (adRewards.has(adId)) {
      return res.status(400).json({
        rewarded: false,
        message: 'This reward has already been claimed'
      });
    }

    // Verify the ad with Pi Network (you would implement this based on Pi Network's verification API)
    // For now, we'll assume all ads are valid
    const isValidAd = true;

    if (!isValidAd) {
      return res.status(400).json({
        rewarded: false,
        message: 'Invalid ad reward'
      });
    }

    // Store the reward claim
    adRewards.set(adId, {
      adId,
      userId,
      timestamp: new Date()
    });

    // Update user's reward count in database
    await User.findByIdAndUpdate(userId, {
      $inc: { rewardedAdsWatched: 1 }
    });

    res.status(200).json({
      rewarded: true,
      message: 'Reward granted successfully'
    });
  } catch (error) {
    console.error('Error verifying ad reward:', error);
    res.status(500).json({
      rewarded: false,
      message: 'Error processing reward'
    });
  }
}; 