import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  description: string;
  icon: string;
  parentId?: mongoose.Types.ObjectId;
  isActive: boolean;
  productCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    description: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    isActive: {
      type: Boolean,
      default: true
    },
    productCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Create indexes for efficient queries
CategorySchema.index({ slug: 1 });
CategorySchema.index({ parentId: 1 });
CategorySchema.index({ isActive: 1, productCount: -1 });

export default mongoose.model<ICategory>('Category', CategorySchema); 