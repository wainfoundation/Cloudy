import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Subscription {
  planId: string;
  status: 'active' | 'expired' | 'cancelled';
  expiresAt: string;
  cloudyCoins: number;
}

interface UseSubscriptionReturn {
  subscription: Subscription | null;
  cloudyCoins: number;
  isLoading: boolean;
  error: string | null;
  checkSubscriptionStatus: () => Promise<void>;
  deductCloudyCoins: (amount: number) => Promise<boolean>;
}

export const useSubscription = (): UseSubscriptionReturn => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [cloudyCoins, setCloudyCoins] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const checkSubscriptionStatus = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/subscription/status', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch subscription status');
      }

      const data = await response.json();
      setSubscription(data.subscription);
      setCloudyCoins(data.cloudyCoins);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deductCloudyCoins = async (amount: number): Promise<boolean> => {
    try {
      const response = await fetch('/api/cloudy-coins/deduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ amount })
      });

      if (!response.ok) {
        throw new Error('Insufficient Cloudy Coins');
      }

      const { remainingCoins } = await response.json();
      setCloudyCoins(remainingCoins);

      // If user runs out of coins, redirect to subscription page
      if (remainingCoins <= 0 && (!subscription || subscription.status !== 'active')) {
        navigate('/subscription', { 
          state: { message: 'You need to subscribe to continue using Cloudy' }
        });
        return false;
      }

      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  useEffect(() => {
    checkSubscriptionStatus();
  }, []);

  return {
    subscription,
    cloudyCoins,
    isLoading,
    error,
    checkSubscriptionStatus,
    deductCloudyCoins
  };
}; 