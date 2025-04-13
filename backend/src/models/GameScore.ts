import mongoose, { Document, Schema } from 'mongoose';

export interface IGameScore extends Document {
  userId: mongoose.Types.ObjectId;
  gameId: mongoose.Types.ObjectId;
  score: number;
  level: number;
  timeSpent: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const GameScoreSchema: Schema = new Schema(
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
    score: {
      type: Number,
      required: true
    },
    level: {
      type: Number,
      required: true
    },
    timeSpent: {
      type: Number,
      required: true,
      default: 0
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Create an index for efficient leaderboard queries
GameScoreSchema.index({ gameId: 1, score: -1 });

export default mongoose.model<IGameScore>('GameScore', GameScoreSchema); 