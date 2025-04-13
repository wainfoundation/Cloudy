import mongoose, { Document, Schema } from 'mongoose';

export interface IStore extends Document {
  name: string;
  description: string;
  domain: string;
  ownerId: mongoose.Types.ObjectId;
  piWalletAddress: string;
  logo?: string;
  banner?: string;
  categories: string[];
  socialLinks: {
    website?: string;
    twitter?: string;
    instagram?: string;
    github?: string;
  };
  isActive: boolean;
  rating: number;
  totalSales: number;
  createdAt: Date;
  updatedAt: Date;
}

const storeSchema = new Schema<IStore>(
  {
    name: {
      type: String,
      required: [true, 'Store name is required'],
      trim: true,
      maxlength: [100, 'Store name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Store description is required'],
      trim: true,
      maxlength: [1000, 'Store description cannot exceed 1000 characters'],
    },
    domain: {
      type: String,
      required: [true, 'Store domain is required'],
      trim: true,
      unique: true,
      lowercase: true,
      match: [/^[a-z0-9-]+$/, 'Domain can only contain lowercase letters, numbers, and hyphens'],
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Store owner is required'],
    },
    piWalletAddress: {
      type: String,
      required: [true, 'Pi wallet address is required'],
      trim: true,
    },
    logo: {
      type: String,
      trim: true,
    },
    banner: {
      type: String,
      trim: true,
    },
    categories: [{
      type: String,
      required: [true, 'At least one category is required'],
    }],
    socialLinks: {
      website: {
        type: String,
        trim: true,
      },
      twitter: {
        type: String,
        trim: true,
      },
      instagram: {
        type: String,
        trim: true,
      },
      github: {
        type: String,
        trim: true,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalSales: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
storeSchema.index({ domain: 1 }, { unique: true });
storeSchema.index({ ownerId: 1 });
storeSchema.index({ categories: 1 });
storeSchema.index({ isActive: 1 });
storeSchema.index({ rating: -1 });
storeSchema.index({ totalSales: -1 });

// Pre-save middleware to ensure domain is lowercase
storeSchema.pre('save', function(next) {
  if (this.domain) {
    this.domain = this.domain.toLowerCase();
  }
  next();
});

export const Store = mongoose.model<IStore>('Store', storeSchema); 