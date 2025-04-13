import mongoose, { Document, Schema } from 'mongoose';

export interface IGameProgress extends Document {
  userId: mongoose.Types.ObjectId;
  gameId: mongoose.Types.ObjectId;
  level: number;
  score: number;
  progress: number;
  lastPlayed: Date;
  createdAt: Date;
  updatedAt: Date;
}

const GameProgressSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    gameId: {
      type: Schema.Types.ObjectId,
      ref: 'Game',
      required: true
    },
    level: {
      type: Number,
      required: true,
      default: 1
    },
    score: {
      type: Number,
      required: true,
      default: 0
    },
    progress: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 100
    },
    lastPlayed: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Create a compound index for userId and gameId to ensure uniqueness
GameProgressSchema.index({ userId: 1, gameId: 1 }, { unique: true });

export default mongoose.model<IGameProgress>('GameProgress', GameProgressSchema); 