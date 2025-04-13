import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import PiScript from '@/components/PiScript';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CloudyPi - Web3 Gaming Platform',
  description: 'CloudyPi - A Web3 Gaming Platform powered by Pi Network'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <PiScript />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
