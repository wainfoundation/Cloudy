import mongoose, { Document, Schema } from 'mongoose';

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  items: {
    productId: mongoose.Types.ObjectId;
    quantity: number;
    addedAt: Date;
  }[];
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

const CartSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    items: [{
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1
      },
      addedAt: {
        type: Date,
        default: Date.now
      }
    }],
    totalAmount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Create indexes for efficient queries
CartSchema.index({ userId: 1 });
CartSchema.index({ 'items.productId': 1 });

export default mongoose.model<ICart>('Cart', CartSchema); 