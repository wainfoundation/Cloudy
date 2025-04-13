import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { gameManager } from '../utils/game-manager';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cloudypi';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('MongoDB disconnection error:', error);
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error closing MongoDB connection:', err);
    process.exit(1);
  }
}); 

private async showInterstitialAd(): Promise<void> {
  try {
    this.state.isAdPlaying = true;
    const { Pi } = await import('@pinetwork-js/sdk');
    await Pi.ads.showAd("interstitial");
  } finally {
    this.state.isAdPlaying = false;
  }
}

private shouldShowAd(): boolean {
  return (
    isAdNetworkSupported() &&
    (this.state.currentLevel % this.AD_FREQUENCY === 0)
  );
}

async completeLevel(): Promise<void> {
  await gameManager.completeLevel();
}

window.addEventListener('levelComplete', (event: CustomEvent) => {
  const { level, score } = event.detail;
  // Handle level completion
}); 