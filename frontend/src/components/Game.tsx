import React, { useEffect, useState } from 'react';
import { gameManager } from '../utils/game-manager';

interface GameStats {
  level: number;
  score: number;
  lives: number;
}

interface AdStatus {
  isWatchingAd: boolean;
  adStatus: 'idle' | 'loading' | 'ready' | 'showing' | 'error';
  errorMessage?: string;
}

const Game: React.FC = () => {
  const [gameStats, setGameStats] = useState<GameStats>({
    level: 1,
    score: 0,
    lives: 3
  });
  const [adStatus, setAdStatus] = useState<AdStatus>({
    isWatchingAd: false,
    adStatus: 'idle'
  });

  useEffect(() => {
    // Load saved game state when component mounts
    gameManager.loadGameState();
    updateGameStats();

    // Set up event listeners
    const handleLevelComplete = (event: CustomEvent) => {
      const { level, score } = event.detail;
      console.log(`Level ${level} completed! Score: ${score}`);
      updateGameStats();
    };

    const handleNewLevel = (event: CustomEvent) => {
      const { level, score } = event.detail;
      console.log(`Starting level ${level}! Current score: ${score}`);
      updateGameStats();
    };

    const handleGameStateUpdate = (event: CustomEvent) => {
      const { level, score, lives } = event.detail;
      setGameStats({ level, score, lives });
    };

    window.addEventListener('levelComplete', handleLevelComplete as EventListener);
    window.addEventListener('newLevel', handleNewLevel as EventListener);
    window.addEventListener('gameStateUpdate', handleGameStateUpdate as EventListener);

    return () => {
      window.removeEventListener('levelComplete', handleLevelComplete as EventListener);
      window.removeEventListener('newLevel', handleNewLevel as EventListener);
      window.removeEventListener('gameStateUpdate', handleGameStateUpdate as EventListener);
    };
  }, []);

  const updateGameStats = () => {
    setGameStats({
      level: gameManager.getCurrentLevel(),
      score: gameManager.getScore(),
      lives: gameManager.getLives()
    });
  };

  const handleCompleteLevel = async () => {
    await gameManager.completeLevel();
  };

  const handleWatchAd = async () => {
    if (adStatus.isWatchingAd) return;

    setAdStatus({
      isWatchingAd: true,
      adStatus: 'loading'
    });

    try {
      const { Pi } = await import('@pinetwork-js/sdk');
      const isAdReadyResponse = await Pi.ads.isAdReady("rewarded");

      if (isAdReadyResponse.ready === false) {
        const requestAdResponse = await Pi.ads.requestAd("rewarded");

        if (requestAdResponse.result === "ADS_NOT_SUPPORTED") {
          setAdStatus({
            isWatchingAd: false,
            adStatus: 'error',
            errorMessage: 'Please update your Pi Browser to watch ads.'
          });
          return;
        }

        if (requestAdResponse.result !== "AD_LOADED") {
          setAdStatus({
            isWatchingAd: false,
            adStatus: 'error',
            errorMessage: 'Ads are temporarily unavailable. Please try again later.'
          });
          return;
        }
      }

      setAdStatus({
        isWatchingAd: true,
        adStatus: 'showing'
      });

      const showAdResponse = await Pi.ads.showAd("rewarded");

      if (showAdResponse.result === "AD_REWARDED") {
        const rewarded = await gameManager.watchRewardedAd();
        if (rewarded) {
          setAdStatus({
            isWatchingAd: false,
            adStatus: 'idle'
          });
          // Show success message
          alert('Congratulations! You earned an extra life!');
        } else {
          setAdStatus({
            isWatchingAd: false,
            adStatus: 'error',
            errorMessage: 'Failed to verify ad reward. Please try again.'
          });
        }
      } else {
        setAdStatus({
          isWatchingAd: false,
          adStatus: 'error',
          errorMessage: 'Failed to show ad. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error with ad:', error);
      setAdStatus({
        isWatchingAd: false,
        adStatus: 'error',
        errorMessage: 'An unexpected error occurred. Please try again later.'
      });
    }
  };

  const getAdButtonText = () => {
    switch (adStatus.adStatus) {
      case 'loading':
        return 'Loading Ad...';
      case 'ready':
        return 'Watch Ad for Extra Life';
      case 'showing':
        return 'Watching Ad...';
      case 'error':
        return 'Try Again';
      default:
        return 'Watch Ad for Extra Life';
    }
  };

  return (
    <div className="game-container">
      <div className="game-stats">
        <div>Level: {gameStats.level}</div>
        <div>Score: {gameStats.score}</div>
        <div>Lives: {gameStats.lives}</div>
      </div>

      <div className="game-actions">
        <button 
          className="complete-level-btn"
          onClick={handleCompleteLevel}
        >
          Complete Level
        </button>

        {gameStats.lives < 5 && (
          <button 
            className={`watch-ad-btn ${adStatus.adStatus === 'error' ? 'error' : ''}`}
            onClick={handleWatchAd}
            disabled={adStatus.isWatchingAd}
          >
            {getAdButtonText()}
          </button>
        )}
      </div>

      {adStatus.adStatus === 'error' && (
        <div className="ad-error-message">
          {adStatus.errorMessage}
        </div>
      )}

      <div className="game-area">
        {/* Add your actual game content here */}
      </div>

      <style jsx>{`
        .game-container {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }

        .game-stats {
          display: flex;
          justify-content: space-around;
          padding: 10px;
          background-color: #f5f5f5;
          border-radius: 4px;
          margin-bottom: 20px;
        }

        .game-actions {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin: 20px 0;
        }

        .game-area {
          border: 2px solid #ccc;
          border-radius: 4px;
          min-height: 400px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .complete-level-btn,
        .watch-ad-btn {
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s;
        }

        .complete-level-btn {
          background-color: #4caf50;
          color: white;
        }

        .complete-level-btn:hover {
          background-color: #388e3c;
        }

        .watch-ad-btn {
          background-color: #2196f3;
          color: white;
        }

        .watch-ad-btn:hover {
          background-color: #1976d2;
        }

        .watch-ad-btn:disabled {
          background-color: #9e9e9e;
          cursor: not-allowed;
        }

        .watch-ad-btn.error {
          background-color: #f44336;
        }

        .watch-ad-btn.error:hover {
          background-color: #d32f2f;
        }

        .ad-error-message {
          color: #d32f2f;
          text-align: center;
          margin: 10px 0;
          padding: 10px;
          background-color: #ffebee;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default Game; 