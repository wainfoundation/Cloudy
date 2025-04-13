import mongoose, { Document, Schema } from 'mongoose';

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  message: string;
  type: 'order' | 'sale' | 'review' | 'system' | 'payment';
  isRead: boolean;
  data?: {
    orderId?: mongoose.Types.ObjectId;
    productId?: mongoose.Types.ObjectId;
    reviewId?: mongoose.Types.ObjectId;
    paymentId?: string;
    [key: string]: any;
  };
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['order', 'sale', 'review', 'system', 'payment'],
      required: true
    },
    isRead: {
      type: Boolean,
      default: false
    },
    data: {
      orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
      },
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      },
      reviewId: {
        type: Schema.Types.ObjectId,
        ref: 'Review'
      },
      paymentId: String
    }
  },
  {
    timestamps: true
  }
);

// Create indexes for efficient queries
NotificationSchema.index({ userId: 1, createdAt: -1 });
NotificationSchema.index({ userId: 1, isRead: 1 });
NotificationSchema.index({ type: 1, createdAt: -1 });

export default mongoose.model<INotification>('Notification', NotificationSchema); 