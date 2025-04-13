import { useEffect, useState } from 'react';
import { initializePiSDK } from '@/lib/pi-sdk';

export const usePiNetwork = () => {
  const [piNetwork, setPiNetwork] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initPiNetwork = async () => {
      try {
        const pi = await initializePiSDK();
        setPiNetwork(pi);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to initialize Pi Network'));
      } finally {
        setIsLoading(false);
      }
    };

    initPiNetwork();
  }, []);

  const authenticate = async () => {
    if (!piNetwork) throw new Error('Pi Network not initialized');
    return piNetwork.authenticate(['username'], (auth: any) => {
      console.log(`Hi ${auth.user.username}!`);
    });
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
    authenticate,
    createPayment,
    completePayment,
  };
}; 