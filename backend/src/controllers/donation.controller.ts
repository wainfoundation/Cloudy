import { Request, Response } from 'express';
import Donation from '../models/Donation';
import User from '../models/User';

// Create a new donation
export const createDonation = async (req: Request, res: Response) => {
  try {
    const { amount, paymentId } = req.body;
    const userId = req.user.id;

    // Create new donation record
    const donation = new Donation({
      userId,
      amount,
      paymentId,
      status: 'pending'
    });

    await donation.save();

    // Update user's total donations
    await User.findByIdAndUpdate(userId, {
      $inc: { totalDonations: amount }
    });

    res.status(201).json({
      success: true,
      data: donation
    });
  } catch (error) {
    console.error('Error creating donation:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating donation'
    });
  }
};

// Get donation history for a user
export const getDonationHistory = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const donations = await Donation.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      data: donations
    });
  } catch (error) {
    console.error('Error fetching donation history:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching donation history'
    });
  }
};

// Get total donations for a user
export const getTotalDonations = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const total = await Donation.aggregate([
      { $match: { userId, status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        total: total[0]?.total || 0
      }
    });
  } catch (error) {
    console.error('Error fetching total donations:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching total donations'
    });
  }
};

// Get recent donations (public)
export const getRecentDonations = async (req: Request, res: Response) => {
  try {
    const donations = await Donation.find({ status: 'completed' })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('userId', 'username');

    res.status(200).json({
      success: true,
      data: donations
    });
  } catch (error) {
    console.error('Error fetching recent donations:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recent donations'
    });
  }
}; 