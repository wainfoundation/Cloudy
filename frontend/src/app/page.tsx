'use client';

import { useEffect, useState } from 'react';
import { usePiNetwork } from '@/hooks/usePiNetwork';
import PiAuth from '@/components/PiAuth';

export default function Home() {
  const { piNetwork, isLoading, error } = usePiNetwork();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (piNetwork && !isLoading && !error) {
      setIsInitialized(true);
    }
  }, [piNetwork, isLoading, error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to CloudyPi Game Platform
        </h1>
        
        {isLoading && (
          <div className="text-center">
            <p>Loading Pi Network SDK...</p>
          </div>
        )}

        {error && (
          <div className="text-center text-red-500">
            <p>Error: {error.message}</p>
          </div>
        )}

        {isInitialized && !error && (
          <div className="text-center">
            <PiAuth />
          </div>
        )}
      </div>
    </main>
  );
} 