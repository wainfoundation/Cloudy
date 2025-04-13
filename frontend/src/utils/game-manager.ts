import { PI_NETWORK_CONFIG, isAdNetworkSupported } from './pi-network';

interface GameState {
  currentLevel: number;
  score: number;
  lives: number;
  isAdPlaying: boolean;
}

interface AdRewardResponse {
  rewarded: boolean;
  message?: string;
}

interface AdResponse {
  result: string;
  adId?: string;
}

interface AdReadyResponse {
  ready: boolean;
}

class GameManager {
  private state: GameState;
  private readonly AD_FREQUENCY = 3; // Show ad every 3 levels
  private readonly MAX_LIVES = 5;

  constructor() {
    this.state = {
      currentLevel: 1,
      score: 0,
      lives: 3,
      isAdPlaying: false
    };
  }

  async completeLevel(): Promise<void> {
    try {
      // Update game state
      this.state.score += this.calculateLevelScore();
      this.state.currentLevel += 1;

      // Save progress
      this.saveGameState();

      // Check if we should show an ad
      if (this.shouldShowAd()) {
        await this.showInterstitialAd();
      }

      // Emit level completion event
      this.emitLevelComplete();
    } catch (error) {
      console.error('Error completing level:', error);
      // Continue game even if ad fails
      this.startNewLevel();
    }
  }

  private shouldShowAd(): boolean {
    return (
      isAdNetworkSupported() &&
      (this.state.currentLevel % this.AD_FREQUENCY === 0)
    );
  }

  private async showInterstitialAd(): Promise<void> {
    if (!isAdNetworkSupported()) {
      console.log('Ad network is not supported');
      return;
    }

    try {
      this.state.isAdPlaying = true;
      
      // Import Pi SDK dynamically
      const { Pi } = await import('@pinetwork-js/sdk');
      
      // Check if ad is ready
      const isAdReadyResponse = await Pi.ads.isAdReady("interstitial");
      
      if (isAdReadyResponse.ready === true) {
        // Ad is ready, show it
        const showAdResponse = await Pi.ads.showAd("interstitial");
        
        if (showAdResponse.result !== "AD_CLOSED") {
          console.warn('Ad was not closed properly:', showAdResponse.result);
        }
        
        return;
      }
      
      // Ad is not ready, request it
      console.log('Ad not ready, requesting...');
      const requestAdResponse = await Pi.ads.requestAd("interstitial");
      
      if (requestAdResponse.result !== "AD_LOADED") {
        console.warn('Ad could not be loaded:', requestAdResponse.result);
        return;
      }
      
      // Ad loaded successfully, show it
      const showAdResponse = await Pi.ads.showAd("interstitial");
      
      if (showAdResponse.result !== "AD_CLOSED") {
        console.warn('Ad was not closed properly:', showAdResponse.result);
      }
      
    } catch (error) {
      console.error('Error showing interstitial ad:', error);
    } finally {
      this.state.isAdPlaying = false;
    }
  }

  startNewLevel(): void {
    if (this.state.isAdPlaying) {
      console.log('Waiting for ad to complete...');
      return;
    }

    // Reset level-specific state
    this.resetLevelState();

    // Emit new level event
    this.emitNewLevel();
  }

  private calculateLevelScore(): number {
    // Implement your scoring logic here
    return 100 * this.state.currentLevel;
  }

  private resetLevelState(): void {
    // Reset any level-specific variables
    // Add your level reset logic here
  }

  private saveGameState(): void {
    try {
      localStorage.setItem('gameState', JSON.stringify(this.state));
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  }

  private emitLevelComplete(): void {
    const event = new CustomEvent('levelComplete', {
      detail: {
        level: this.state.currentLevel - 1,
        score: this.state.score
      }
    });
    window.dispatchEvent(event);
  }

  private emitNewLevel(): void {
    const event = new CustomEvent('newLevel', {
      detail: {
        level: this.state.currentLevel,
        score: this.state.score
      }
    });
    window.dispatchEvent(event);
  }

  async watchRewardedAd(): Promise<boolean> {
    if (!isAdNetworkSupported()) {
      console.log('Ad network is not supported');
      return false;
    }

    try {
      this.state.isAdPlaying = true;
      
      // Import Pi SDK dynamically
      const { Pi } = await import('@pinetwork-js/sdk');
      
      // Check if ad is ready
      const isAdReadyResponse = await Pi.ads.isAdReady("rewarded");
      
      if (isAdReadyResponse.ready === true) {
        // Ad is ready, show it
        const showAdResponse = await Pi.ads.showAd("rewarded");
        
        if (showAdResponse.result === "AD_REWARDED") {
          // Send reward verification to backend
          const rewardResponse = await this.verifyAndRewardUser(showAdResponse.adId);
          
          if (rewardResponse.rewarded) {
            this.grantExtraLife();
            return true;
          }
        }
        
        return false;
      }
      
      // Ad is not ready, request it
      console.log('Rewarded ad not ready, requesting...');
      const requestAdResponse = await Pi.ads.requestAd("rewarded");
      
      if (requestAdResponse.result !== "AD_LOADED") {
        console.warn('Rewarded ad could not be loaded:', requestAdResponse.result);
        return false;
      }
      
      // Ad loaded successfully, show it
      const showAdResponse = await Pi.ads.showAd("rewarded");
      
      if (showAdResponse.result === "AD_REWARDED") {
        // Send reward verification to backend
        const rewardResponse = await this.verifyAndRewardUser(showAdResponse.adId);
        
        if (rewardResponse.rewarded) {
          this.grantExtraLife();
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Error showing rewarded ad:', error);
      return false;
    } finally {
      this.state.isAdPlaying = false;
    }
  }

  private async verifyAndRewardUser(adId: string): Promise<AdRewardResponse> {
    try {
      const response = await fetch('/api/rewards/verify-ad', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ adId }),
      });

      if (!response.ok) {
        throw new Error('Failed to verify reward');
      }

      return await response.json();
    } catch (error) {
      console.error('Error verifying reward:', error);
      return { rewarded: false, message: 'Failed to verify reward' };
    }
  }

  private grantExtraLife(): void {
    if (this.state.lives < this.MAX_LIVES) {
      this.state.lives += 1;
      this.saveGameState();
      this.emitStateUpdate();
    }
  }

  private emitStateUpdate(): void {
    const event = new CustomEvent('gameStateUpdate', {
      detail: {
        level: this.state.currentLevel,
        score: this.state.score,
        lives: this.state.lives
      }
    });
    window.dispatchEvent(event);
  }

  // Getters for game state
  getCurrentLevel(): number {
    return this.state.currentLevel;
  }

  getScore(): number {
    return this.state.score;
  }

  getLives(): number {
    return this.state.lives;
  }

  // Load saved game state
  loadGameState(): void {
    try {
      const savedState = localStorage.getItem('gameState');
      if (savedState) {
        this.state = { ...this.state, ...JSON.parse(savedState) };
      }
    } catch (error) {
      console.error('Error loading game state:', error);
    }
  }
}

// Create and export a singleton instance
export const gameManager = new GameManager();

// Example usage:
/*
// In your game component:
import { gameManager } from './utils/game-manager';

// When level is completed
async function onLevelComplete() {
  await gameManager.completeLevel();
}

// Listen for level events
window.addEventListener('levelComplete', (event: CustomEvent) => {
  const { level, score } = event.detail;
  // Update UI or perform other actions
});

window.addEventListener('newLevel', (event: CustomEvent) => {
  const { level, score } = event.detail;
  // Initialize new level
});
*/ 