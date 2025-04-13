import { Request, Response } from 'express';
import Payment from '../models/Payment';
import Subscription from '../models/Subscription';
import Donation from '../models/Donation';
import { AuthRequest } from '../middleware/auth';

// Approve a payment
export const approvePayment = async (req: AuthRequest, res: Response) => {
  try {
    const { paymentId, metadata } = req.body;
    
    // Find the payment
    const payment = await Payment.findOne({ paymentId });
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    
    // Update payment status
    payment.status = 'approved';
    await payment.save();
    
    res.json({ message: 'Payment approved successfully', payment });
  } catch (error) {
    console.error('Error approving payment:', error);
    res.status(500).json({ message: 'Error approving payment' });
  }
};

// Complete a payment
export const completePayment = async (req: AuthRequest, res: Response) => {
  try {
    const { paymentId, txid, metadata } = req.body;
    
    // Find the payment
    const payment = await Payment.findOne({ paymentId });
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    
    // Update payment status and transaction ID
    payment.status = 'completed';
    payment.txid = txid;
    await payment.save();
    
    // Handle based on payment type
    if (payment.type === 'subscription') {
      // Create or update subscription
      const subscriptionData = {
        userId: payment.userId,
        planId: metadata.planId,
        status: 'active',
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        paymentId: payment.paymentId,
        amount: payment.amount
      };
      
      await Subscription.findOneAndUpdate(
        { userId: payment.userId },
        subscriptionData,
        { upsert: true, new: true }
      );
    } else if (payment.type === 'donation') {
      // Create or update donation
      const donationData = {
        userId: payment.userId,
        amount: payment.amount,
        paymentId: payment.paymentId,
        status: 'completed'
      };
      
      await Donation.findOneAndUpdate(
        { paymentId: payment.paymentId },
        donationData,
        { upsert: true, new: true }
      );
    }
    
    res.json({ message: 'Payment completed successfully', payment });
  } catch (error) {
    console.error('Error completing payment:', error);
    res.status(500).json({ message: 'Error completing payment' });
  }
};

// Cancel a payment
export const cancelPayment = async (req: AuthRequest, res: Response) => {
  try {
    const { paymentId, reason } = req.body;
    
    // Find the payment
    const payment = await Payment.findOne({ paymentId });
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    
    // Update payment status
    payment.status = 'cancelled';
    await payment.save();
    
    res.json({ message: 'Payment cancelled successfully', payment });
  } catch (error) {
    console.error('Error cancelling payment:', error);
    res.status(500).json({ message: 'Error cancelling payment' });
  }
};

// Get user's payment history
export const getPaymentHistory = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    
    const payments = await Payment.find({ userId })
      .sort({ createdAt: -1 })
      .limit(20);
    
    res.json({ payments });
  } catch (error) {
    console.error('Error fetching payment history:', error);
    res.status(500).json({ message: 'Error fetching payment history' });
  }
}; 