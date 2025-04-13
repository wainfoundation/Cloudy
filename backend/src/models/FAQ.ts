import mongoose, { Document, Schema } from 'mongoose';

export interface IFAQ extends Document {
  question: string;
  answer: string;
  category: string;
  tags: string[];
  helpfulCount: number;
  notHelpfulCount: number;
  isPublished: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const FAQSchema: Schema = new Schema(
  {
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      enum: ['General', 'Account', 'Products', 'Orders', 'Payments', 'Creators', 'Technical', 'Other']
    },
    tags: [{
      type: String,
      trim: true
    }],
    helpfulCount: {
      type: Number,
      default: 0
    },
    notHelpfulCount: {
      type: Number,
      default: 0
    },
    isPublished: {
      type: Boolean,
      default: true
    },
    order: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Create indexes for efficient queries
FAQSchema.index({ category: 1, order: 1 });
FAQSchema.index({ tags: 1 });
FAQSchema.index({ isPublished: 1, category: 1, order: 1 });
FAQSchema.index({ question: 'text', answer: 'text' });

export default mongoose.model<IFAQ>('FAQ', FAQSchema); 