import mongoose, { Document, Schema } from 'mongoose';

export interface IReport extends Document {
  reporterId: mongoose.Types.ObjectId;
  reportedUserId?: mongoose.Types.ObjectId;
  reportedProductId?: mongoose.Types.ObjectId;
  reportedReviewId?: mongoose.Types.ObjectId;
  type: 'user' | 'product' | 'review' | 'payment' | 'other';
  reason: string;
  description: string;
  evidence?: string[];
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
  resolution?: string;
  resolvedBy?: mongoose.Types.ObjectId;
  resolvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ReportSchema: Schema = new Schema(
  {
    reporterId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    reportedUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    reportedProductId: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    reportedReviewId: {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    },
    type: {
      type: String,
      enum: ['user', 'product', 'review', 'payment', 'other'],
      required: true
    },
    reason: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    evidence: [{
      type: String
    }],
    status: {
      type: String,
      enum: ['pending', 'investigating', 'resolved', 'dismissed'],
      default: 'pending'
    },
    resolution: {
      type: String
    },
    resolvedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    resolvedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

// Create indexes for efficient queries
ReportSchema.index({ reporterId: 1, createdAt: -1 });
ReportSchema.index({ reportedUserId: 1 });
ReportSchema.index({ reportedProductId: 1 });
ReportSchema.index({ reportedReviewId: 1 });
ReportSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model<IReport>('Report', ReportSchema); 