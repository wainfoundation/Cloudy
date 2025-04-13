import mongoose, { Schema, Document } from 'mongoose';

export interface IDonation extends Document {
  userId: mongoose.Types.ObjectId;
  amount: number;
  paymentId: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

const DonationSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  paymentId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Index for faster queries
DonationSchema.index({ userId: 1, createdAt: -1 });
DonationSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model<IDonation>('Donation', DonationSchema); 