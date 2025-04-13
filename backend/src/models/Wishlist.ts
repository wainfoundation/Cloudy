import mongoose, { Document, Schema } from 'mongoose';

export interface IWishlist extends Document {
  userId: mongoose.Types.ObjectId;
  products: {
    productId: mongoose.Types.ObjectId;
    addedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const WishlistSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    products: [{
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      addedAt: {
        type: Date,
        default: Date.now
      }
    }]
  },
  {
    timestamps: true
  }
);

// Create indexes for efficient queries
WishlistSchema.index({ userId: 1 });
WishlistSchema.index({ 'products.productId': 1 });

export default mongoose.model<IWishlist>('Wishlist', WishlistSchema); 