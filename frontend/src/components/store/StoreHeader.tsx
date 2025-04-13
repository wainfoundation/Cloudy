'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IStore } from '@/types/store';

interface StoreHeaderProps {
  store: IStore;
}

export default function StoreHeader({ store }: StoreHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {store.logo && (
              <div className="mr-4">
                <Image 
                  src={store.logo} 
                  alt={store.name} 
                  width={50} 
                  height={50} 
                  className="rounded-full"
                />
              </div>
            )}
            <Link href={`/site/${store.domain}`} className="text-2xl font-bold text-gray-800">
              {store.name}
            </Link>
          </div>

          <nav className="hidden md:flex space-x-6">
            <Link href={`/site/${store.domain}`} className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link href={`/site/${store.domain}/products`} className="text-gray-600 hover:text-gray-900">
              Products
            </Link>
            <Link href={`/site/${store.domain}/about`} className="text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href={`/site/${store.domain}/contact`} className="text-gray-600 hover:text-gray-900">
              Contact
            </Link>
          </nav>

          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link href={`/site/${store.domain}`} className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
              <Link href={`/site/${store.domain}/products`} className="text-gray-600 hover:text-gray-900">
                Products
              </Link>
              <Link href={`/site/${store.domain}/about`} className="text-gray-600 hover:text-gray-900">
                About
              </Link>
              <Link href={`/site/${store.domain}/contact`} className="text-gray-600 hover:text-gray-900">
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 