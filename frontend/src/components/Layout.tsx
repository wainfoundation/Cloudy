'use client';

import { ReactNode } from 'react';
import { usePiNetwork } from '@/hooks/usePiNetwork';
import PiAuth from './PiAuth';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { piNetwork, isLoading, error } = usePiNetwork();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold">CloudyPi</h1>
              </div>
            </div>
            <div className="flex items-center">
              {isLoading ? (
                <div>Loading...</div>
              ) : error ? (
                <div className="text-red-500">{error.message}</div>
              ) : (
                <PiAuth />
              )}
            </div>
          </div>
        </nav>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default Layout; 