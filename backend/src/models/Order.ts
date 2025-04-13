import mongoose, { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
  buyerId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  creatorId: mongoose.Types.ObjectId;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentId: string;
  downloadCount: number;
  lastDownloadDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema(
  {
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    paymentId: {
      type: String,
      required: true
    },
    downloadCount: {
      type: Number,
      default: 0
    },
    lastDownloadDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

// Create indexes for efficient queries
OrderSchema.index({ buyerId: 1, createdAt: -1 });
OrderSchema.index({ creatorId: 1, createdAt: -1 });
OrderSchema.index({ productId: 1, createdAt: -1 });
OrderSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model<IOrder>('Order', OrderSchema); 