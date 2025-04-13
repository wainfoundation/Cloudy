import mongoose, { Document, Schema } from 'mongoose';

export interface IWithdrawal extends Document {
  userId: mongoose.Types.ObjectId;
  amount: number;
  piWalletAddress: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  transactionId?: string;
  notes?: string;
  processedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const WithdrawalSchema: Schema = new Schema(
  {
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
    piWalletAddress: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'pending'
    },
    transactionId: {
      type: String
    },
    notes: {
      type: String
    },
    processedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

// Create indexes for efficient queries
WithdrawalSchema.index({ userId: 1, createdAt: -1 });
WithdrawalSchema.index({ status: 1, createdAt: -1 });
WithdrawalSchema.index({ piWalletAddress: 1 });

export default mongoose.model<IWithdrawal>('Withdrawal', WithdrawalSchema); 