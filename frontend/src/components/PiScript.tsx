'use client';

import Script from 'next/script';

export default function PiScript() {
  return (
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
  );
} 