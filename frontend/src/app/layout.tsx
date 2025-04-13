import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
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
        <Script 
          src="https://sdk.minepi.com/pi-sdk.js" 
          strategy="beforeInteractive"
          onLoad={() => {
            console.log('Pi Network SDK loaded');
          }}
          onError={(e) => {
            console.error('Failed to load Pi Network SDK:', e);
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
