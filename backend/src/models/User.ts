import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: 'user' | 'admin' | 'creator';
  piWalletAddress: string;
  profilePicture: string;
  bio: string;
  isCreator: boolean;
  storeId?: mongoose.Types.ObjectId;
  purchasedProducts: mongoose.Types.ObjectId[];
  createdProducts: mongoose.Types.ObjectId[];
  totalSpent: number;
  totalEarned: number;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'creator'],
    default: 'user'
  },
  piWalletAddress: {
    type: String,
    required: true,
    unique: true
  },
  profilePicture: {
    type: String,
    default: 'default-avatar.png'
  },
  bio: {
    type: String,
    default: ''
  },
  isCreator: {
    type: Boolean,
    default: false
  },
  storeId: {
    type: Schema.Types.ObjectId,
    ref: 'Store'
  },
  purchasedProducts: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  createdProducts: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  totalSpent: {
    type: Number,
    default: 0
  },
  totalEarned: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    return false;
  }
};

export default mongoose.model<IUser>('User', userSchema); 