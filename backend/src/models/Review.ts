import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  userId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  images?: string[];
  likes: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: true
    },
    images: [{
      type: String
    }],
    likes: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    }
  },
  {
    timestamps: true
  }
);

// Create a compound index to ensure one review per user per product
ReviewSchema.index({ userId: 1, productId: 1 }, { unique: true });

// Create indexes for efficient queries
ReviewSchema.index({ productId: 1, status: 1 });
ReviewSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model<IReview>('Review', ReviewSchema); 