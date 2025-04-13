import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  creatorId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  files: {
    url: string;
    name: string;
    size: number;
    type: string;
  }[];
  thumbnail: string;
  salesCount: number;
  rating: number;
  reviews: {
    userId: mongoose.Types.ObjectId;
    rating: number;
    comment: string;
    date: Date;
  }[];
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    category: {
      type: String,
      required: true,
      enum: ['Templates', 'Ebooks', 'Design Assets', 'Digital Art', 'Code', 'Other']
    },
    tags: [{
      type: String,
      trim: true
    }],
    files: [{
      url: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      size: {
        type: Number,
        required: true
      },
      type: {
        type: String,
        required: true
      }
    }],
    thumbnail: {
      type: String,
      required: true
    },
    salesCount: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    reviews: [{
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
      date: {
        type: Date,
        default: Date.now
      }
    }],
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft'
    }
  },
  {
    timestamps: true
  }
);

// Create indexes for efficient queries
ProductSchema.index({ creatorId: 1, status: 1 });
ProductSchema.index({ category: 1, status: 1 });
ProductSchema.index({ tags: 1 });
ProductSchema.index({ title: 'text', description: 'text' });

export default mongoose.model<IProduct>('Product', ProductSchema); 