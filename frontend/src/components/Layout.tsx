import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'CloudyPi' }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold text-gray-800">
              CloudyPi
            </Link>
            <div className="space-x-4">
              <Link href="/games" className="text-gray-600 hover:text-gray-900">
                Games
              </Link>
              <Link href="/marketplace" className="text-gray-600 hover:text-gray-900">
                Marketplace
              </Link>
              <Link href="/profile" className="text-gray-600 hover:text-gray-900">
                Profile
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-white shadow-lg mt-8">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-600">
            © {new Date().getFullYear()} CloudyPi. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 