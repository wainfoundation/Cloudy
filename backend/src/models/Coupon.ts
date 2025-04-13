import mongoose, { Document, Schema } from 'mongoose';

export interface ICoupon extends Document {
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountAmount: number;
  minPurchaseAmount?: number;
  maxDiscountAmount?: number;
  startDate: Date;
  endDate: Date;
  usageLimit?: number;
  usageCount: number;
  isActive: boolean;
  applicableProducts?: mongoose.Types.ObjectId[];
  applicableCategories?: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const CouponSchema: Schema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true
    },
    description: {
      type: String,
      required: true
    },
    discountType: {
      type: String,
      enum: ['percentage', 'fixed'],
      required: true
    },
    discountAmount: {
      type: Number,
      required: true,
      min: 0
    },
    minPurchaseAmount: {
      type: Number,
      min: 0
    },
    maxDiscountAmount: {
      type: Number,
      min: 0
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    usageLimit: {
      type: Number,
      min: 0
    },
    usageCount: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    },
    applicableProducts: [{
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }],
    applicableCategories: [{
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }]
  },
  {
    timestamps: true
  }
);

// Create indexes for efficient queries
CouponSchema.index({ code: 1 });
CouponSchema.index({ isActive: 1, startDate: 1, endDate: 1 });
CouponSchema.index({ applicableProducts: 1 });
CouponSchema.index({ applicableCategories: 1 });

export default mongoose.model<ICoupon>('Coupon', CouponSchema); 