import dotenv from 'dotenv';

dotenv.config();

// Pi Network configuration
export const PI_NETWORK_CONFIG = {
  version: "2.0",
  apiKey: process.env.PI_NETWORK_API_KEY,
  adNetworkSupported: false
};

// Initialize Pi Network and check ad network support
export const initializePiNetwork = async (): Promise<void> => {
  try {
    // Import Pi SDK dynamically to avoid issues in Node.js environment
    const { Pi } = await import('@pinetwork-js/sdk');
    
    // Initialize Pi Network
    await Pi.init({ 
      version: PI_NETWORK_CONFIG.version,
      apiKey: PI_NETWORK_CONFIG.apiKey
    });
    
    // Check if ad network is supported
    const nativeFeaturesList = await Pi.nativeFeaturesList();
    PI_NETWORK_CONFIG.adNetworkSupported = nativeFeaturesList.includes("ad_network");
    
    console.log(`Pi Network initialized. Ad Network supported: ${PI_NETWORK_CONFIG.adNetworkSupported}`);
  } catch (error) {
    console.error('Error initializing Pi Network:', error);
    // Don't exit process, just log the error
  }
};

// Helper function to check if ad network is supported
export const isAdNetworkSupported = (): boolean => {
  return PI_NETWORK_CONFIG.adNetworkSupported;
}; 