import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment extends Document {
  userId: mongoose.Types.ObjectId;
  paymentId: string;
  amount: number;
  type: 'subscription' | 'donation';
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
  metadata: Record<string, any>;
  txid?: string;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  paymentId: {
    type: String,
    required: true,
    unique: true
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['subscription', 'donation'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'completed', 'cancelled'],
    default: 'pending'
  },
  metadata: {
    type: Schema.Types.Mixed,
    default: {}
  },
  txid: {
    type: String
  }
}, {
  timestamps: true
});

export default mongoose.model<IPayment>('Payment', paymentSchema); 