import mongoose, { Document, Schema } from 'mongoose';

export interface IGame extends Document {
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  difficulty: string;
  playCount: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

const GameSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    thumbnail: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      enum: ['Puzzle', 'Action', 'Strategy', 'Adventure', 'RPG']
    },
    difficulty: {
      type: String,
      required: true,
      enum: ['Easy', 'Medium', 'Hard']
    },
    playCount: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IGame>('Game', GameSchema); 