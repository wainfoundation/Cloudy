import mongoose, { Document, Schema } from 'mongoose';

export interface IStore extends Document {
  ownerId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  logo: string;
  banner: string;
  socialLinks: {
    website?: string;
    twitter?: string;
    instagram?: string;
    github?: string;
  };
  categories: string[];
  totalSales: number;
  totalProducts: number;
  rating: number;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
}

const StoreSchema: Schema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    logo: {
      type: String,
      required: true
    },
    banner: {
      type: String,
      required: true
    },
    socialLinks: {
      website: String,
      twitter: String,
      instagram: String,
      github: String
    },
    categories: [{
      type: String,
      trim: true
    }],
    totalSales: {
      type: Number,
      default: 0
    },
    totalProducts: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'suspended'],
      default: 'active'
    }
  },
  {
    timestamps: true
  }
);

// Create indexes for efficient queries
StoreSchema.index({ name: 'text', description: 'text' });
StoreSchema.index({ categories: 1 });
StoreSchema.index({ status: 1, totalSales: -1 });

export default mongoose.model<IStore>('Store', StoreSchema); 