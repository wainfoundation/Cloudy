// Pi Network configuration
export const PI_NETWORK_CONFIG = {
  version: "2.0",
  adNetworkSupported: false
};

// Initialize Pi Network and check ad network support
export const initializePiNetwork = async (): Promise<boolean> => {
  try {
    // Initialize Pi Network
    await Pi.init({ version: PI_NETWORK_CONFIG.version });
    
    // Check if ad network is supported
    const nativeFeaturesList = await Pi.nativeFeaturesList();
    PI_NETWORK_CONFIG.adNetworkSupported = nativeFeaturesList.includes("ad_network");
    
    console.log(`Pi Network initialized. Ad Network supported: ${PI_NETWORK_CONFIG.adNetworkSupported}`);
    return PI_NETWORK_CONFIG.adNetworkSupported;
  } catch (error) {
    console.error('Error initializing Pi Network:', error);
    return false;
  }
};

// Helper function to check if ad network is supported
export const isAdNetworkSupported = (): boolean => {
  return PI_NETWORK_CONFIG.adNetworkSupported;
};

// Function to load ads if supported
export const loadAds = async (): Promise<void> => {
  if (!PI_NETWORK_CONFIG.adNetworkSupported) {
    console.log('Ad network is not supported');
    return;
  }
  
  try {
    // Load ads using Pi Network SDK
    await Pi.ads.load();
    console.log('Ads loaded successfully');
  } catch (error) {
    console.error('Error loading ads:', error);
  }
};

// Function to show ads if supported
export const showAds = async (): Promise<void> => {
  if (!PI_NETWORK_CONFIG.adNetworkSupported) {
    console.log('Ad network is not supported');
    return;
  }
  
  try {
    // Show ads using Pi Network SDK
    await Pi.ads.show();
    console.log('Ads shown successfully');
  } catch (error) {
    console.error('Error showing ads:', error);
  }
}; 