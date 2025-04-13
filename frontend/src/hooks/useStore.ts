'use client';

import { useState, useEffect } from 'react';
import { IStore } from '@/types/store';

export function useStore(domain: string) {
  const [store, setStore] = useState<IStore | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStore = async () => {
      if (!domain) {
        setError('Domain is required');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(`/api/stores/domain/${domain}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Store not found');
          }
          throw new Error('Failed to fetch store');
        }
        
        const data = await response.json();
        setStore(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStore();
  }, [domain]);

  return { store, isLoading, error };
} 