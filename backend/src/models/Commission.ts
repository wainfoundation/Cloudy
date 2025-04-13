import mongoose, { Document, Schema } from 'mongoose';

export interface ICommission extends Document {
  orderId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  creatorId: mongoose.Types.ObjectId;
  buyerId: mongoose.Types.ObjectId;
  orderAmount: number;
  commissionPercentage: number;
  commissionAmount: number;
  creatorAmount: number;
  status: 'pending' | 'paid';
  paidAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const CommissionSchema: Schema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
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
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    orderAmount: {
      type: Number,
      required: true,
      min: 0
    },
    commissionPercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    commissionAmount: {
      type: Number,
      required: true,
      min: 0
    },
    creatorAmount: {
      type: Number,
      required: true,
      min: 0
    },
    status: {
      type: String,
      enum: ['pending', 'paid'],
      default: 'pending'
    },
    paidAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

// Create indexes for efficient queries
CommissionSchema.index({ orderId: 1 });
CommissionSchema.index({ creatorId: 1, createdAt: -1 });
CommissionSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model<ICommission>('Commission', CommissionSchema); 