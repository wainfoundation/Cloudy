'use client';

import { useState, useEffect } from 'react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { usePiNetwork } from '@/hooks/usePiNetwork';
import PiAuth from './PiAuth';
import SplashScreen from './SplashScreen';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { piNetwork, isLoading, error } = usePiNetwork();
  const [isLoadingState, setIsLoadingState] = useState(true);

  useEffect(() => {
    // Simulate initial loading time (you can replace this with real loading logic)
    const timer = setTimeout(() => {
      setIsLoadingState(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SplashScreen isLoading={isLoadingState} />
      <div style={{ visibility: isLoadingState ? 'hidden' : 'visible' }}>
        <div className="min-h-screen bg-gray-100">
          <header className="bg-white shadow">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <Link to="/" className="text-xl font-bold">CloudyPi</Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <Link
                      to="/templates"
                      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                    >
                      Templates
                    </Link>
                    <Link
                      to="/storage"
                      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                    >
                      Cloud Storage
                    </Link>
                    <Link
                      to="/about"
                      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                    >
                      About
                    </Link>
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
      </div>
    </>
  );
};

export default Layout; 