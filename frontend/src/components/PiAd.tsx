import React, { useEffect, useState } from 'react';
import { isAdNetworkSupported, loadAds, showAds } from '../utils/pi-network';

interface PiAdProps {
  adType?: 'banner' | 'interstitial';
  className?: string;
}

const PiAd: React.FC<PiAdProps> = ({ adType = 'banner', className = '' }) => {
  const [adSupported, setAdSupported] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAdSupport = async () => {
      try {
        const supported = isAdNetworkSupported();
        setAdSupported(supported);
        
        if (supported) {
          setLoading(true);
          await loadAds();
          setLoading(false);
        }
      } catch (err) {
        setError('Failed to load ads');
        setLoading(false);
        console.error('Error checking ad support:', err);
      }
    };

    checkAdSupport();
  }, []);

  const handleShowAd = async () => {
    if (!adSupported) return;
    
    try {
      setLoading(true);
      await showAds();
      setLoading(false);
    } catch (err) {
      setError('Failed to show ad');
      setLoading(false);
      console.error('Error showing ad:', err);
    }
  };

  if (!adSupported) {
    return null; // Don't render anything if ads are not supported
  }

  if (loading) {
    return <div className={`pi-ad-loading ${className}`}>Loading ad...</div>;
  }

  if (error) {
    return <div className={`pi-ad-error ${className}`}>{error}</div>;
  }

  if (adType === 'interstitial') {
    return (
      <button 
        className={`pi-ad-button ${className}`}
        onClick={handleShowAd}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Watch Ad'}
      </button>
    );
  }

  // For banner ads, we'll use a container that the Pi SDK will populate
  return <div className={`pi-ad-container ${className}`} id="pi-ad-banner" />;
};

export default PiAd; 