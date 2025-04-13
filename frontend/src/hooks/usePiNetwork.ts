'use client';

import { useState, useEffect } from 'react';

interface PiNetworkUser {
  uid: string;
  username: string;
  accessToken: string;
}

interface PiNetworkError {
  message: string;
}

declare global {
  interface Window {
    Pi?: any;
  }
}

export function usePiNetwork() {
  const [piNetwork, setPiNetwork] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<PiNetworkError | null>(null);
  const [user, setUser] = useState<PiNetworkUser | null>(null);

  useEffect(() => {
    const initializePiNetwork = async () => {
      try {
        // Wait for the SDK to be available
        const waitForPi = () => {
          return new Promise((resolve, reject) => {
            if (typeof window !== 'undefined' && window.Pi) {
              resolve(window.Pi);
            } else {
              // Check every 100ms for up to 10 seconds
              let attempts = 0;
              const maxAttempts = 100;
              const interval = setInterval(() => {
                attempts++;
                if (typeof window !== 'undefined' && window.Pi) {
                  clearInterval(interval);
                  resolve(window.Pi);
                } else if (attempts >= maxAttempts) {
                  clearInterval(interval);
                  reject(new Error('Pi Network SDK not found after timeout'));
                }
              }, 100);
            }
          });
        };

        const pi = await waitForPi();
        setPiNetwork(pi);
        setIsLoading(false);
      } catch (err) {
        setError({ message: err instanceof Error ? err.message : 'Failed to initialize Pi Network' });
        setIsLoading(false);
      }
    };

    initializePiNetwork();
  }, []);

  const authenticate = async () => {
    if (!piNetwork) {
      throw new Error('Pi Network SDK not initialized');
    }

    try {
      const auth = await piNetwork.authenticate(['username'], (auth: PiNetworkUser) => {
        setUser(auth);
        return auth;
      });
      return auth;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Authentication failed');
      setError({ message: error.message });
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const createPayment = async (amount: number, memo: string) => {
    if (!piNetwork) throw new Error('Pi Network not initialized');
    return piNetwork.createPayment(amount, memo, {
      callbacks: {
        onReadyForServerApproval: (paymentId: string) => {
          console.log('Payment ready for server approval:', paymentId);
        },
        onCancel: (paymentId: string) => {
          console.log('Payment cancelled:', paymentId);
        },
        onError: (error: any, payment: any) => {
          console.error('Payment error:', error);
        },
      },
    });
  };

  const completePayment = async (paymentId: string) => {
    if (!piNetwork) throw new Error('Pi Network not initialized');
    return piNetwork.completePayment(paymentId);
  };

  return {
    piNetwork,
    isLoading,
    error,
    user,
    authenticate,
    logout,
    createPayment,
    completePayment,
  };
} 