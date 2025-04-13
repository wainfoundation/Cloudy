import { Response } from 'express';
import Subscription from '../models/Subscription';
import Payment from '../models/Payment';
import { AuthRequest } from '../middleware/auth';

// Get user's current subscription
export const getCurrentSubscription = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    
    const subscription = await Subscription.findOne({ 
      userId, 
      status: 'active',
      endDate: { $gt: new Date() }
    });
    
    if (!subscription) {
      return res.status(404).json({ message: 'No active subscription found' });
    }
    
    res.json({ subscription });
  } catch (error) {
    console.error('Error fetching subscription:', error);
    res.status(500).json({ message: 'Error fetching subscription' });
  }
};

// Update subscription
export const updateSubscription = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const { planId, paymentId } = req.body;
    
    // Validate payment
    const payment = await Payment.findOne({ 
      paymentId,
      userId,
      status: 'completed',
      type: 'subscription'
    });
    
    if (!payment) {
      return res.status(404).json({ message: 'Valid payment not found' });
    }
    
    // Create or update subscription
    const subscriptionData = {
      userId,
      planId,
      status: 'active',
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      paymentId,
      amount: payment.amount
    };
    
    const subscription = await Subscription.findOneAndUpdate(
      { userId },
      subscriptionData,
      { upsert: true, new: true }
    );
    
    res.json({ 
      message: 'Subscription updated successfully', 
      subscription 
    });
  } catch (error) {
    console.error('Error updating subscription:', error);
    res.status(500).json({ message: 'Error updating subscription' });
  }
};

// Cancel subscription
export const cancelSubscription = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    
    const subscription = await Subscription.findOne({ 
      userId, 
      status: 'active' 
    });
    
    if (!subscription) {
      return res.status(404).json({ message: 'No active subscription found' });
    }
    
    // Update subscription status
    subscription.status = 'cancelled';
    await subscription.save();
    
    res.json({ 
      message: 'Subscription cancelled successfully', 
      subscription 
    });
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    res.status(500).json({ message: 'Error cancelling subscription' });
  }
};

// Get subscription history
export const getSubscriptionHistory = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    
    const subscriptions = await Subscription.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10);
    
    res.json({ subscriptions });
  } catch (error) {
    console.error('Error fetching subscription history:', error);
    res.status(500).json({ message: 'Error fetching subscription history' });
  }
}; 