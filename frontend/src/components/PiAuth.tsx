'use client';

import { useState } from 'react';
import { usePiNetwork } from '@/hooks/usePiNetwork';

export default function PiAuth() {
  const { piNetwork, isLoading, error, user, authenticate, logout } = usePiNetwork();
  const [authError, setAuthError] = useState<string | null>(null);

  const handleAuthenticate = async () => {
    try {
      setAuthError(null);
      await authenticate();
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Authentication failed');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        <span className="ml-2">Loading Pi Network SDK...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Pi Network Authentication</h2>
      {user ? (
        <div className="space-y-4">
          <div className="bg-purple-100 p-4 rounded-lg">
            <p className="text-purple-800">Welcome, {user.username}!</p>
            <p className="text-purple-600">You are now authenticated with Pi Network.</p>
          </div>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <button
            onClick={handleAuthenticate}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
          >
            <span>Authenticate with Pi</span>
          </button>
          {authError && (
            <p className="text-red-500 mt-2">{authError}</p>
          )}
        </div>
      )}
    </div>
  );
} 