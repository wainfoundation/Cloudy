import { useState } from 'react';
import { usePiNetwork } from '@/hooks/usePiNetwork';

export default function PiAuth() {
  const { piNetwork, isLoading, error, authenticate } = usePiNetwork();
  const [authError, setAuthError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const handleAuthenticate = async () => {
    try {
      setAuthError(null);
      const auth = await authenticate();
      setUser(auth.user);
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Authentication failed');
    }
  };

  if (isLoading) {
    return <div>Loading Pi Network SDK...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Pi Network Authentication</h2>
      {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
          <p>You are now authenticated with Pi Network.</p>
        </div>
      ) : (
        <div>
          <button
            onClick={handleAuthenticate}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Authenticate with Pi
          </button>
          {authError && (
            <p className="text-red-500 mt-2">{authError}</p>
          )}
        </div>
      )}
    </div>
  );
} 