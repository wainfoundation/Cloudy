declare global {
  interface Window {
    Pi?: {
      init: (config: { version: string; sandbox?: boolean }) => void;
      authenticate: (scopes: string[], onIncompletePaymentFound?: any) => Promise<any>;
      createPayment: (amount: number, memo: string, options?: any) => Promise<any>;
      completePayment: (paymentId: string) => Promise<any>;
    };
  }
}

export const initializePiSDK = async () => {
  if (typeof window === 'undefined') return null;

  // Wait for the SDK to be loaded
  const waitForPi = () => {
    return new Promise((resolve, reject) => {
      if (window.Pi) {
        resolve(window.Pi);
      } else {
        const checkPi = setInterval(() => {
          if (window.Pi) {
            clearInterval(checkPi);
            resolve(window.Pi);
          }
        }, 100);

        // Timeout after 10 seconds
        setTimeout(() => {
          clearInterval(checkPi);
          reject(new Error('Pi SDK failed to load'));
        }, 10000);
      }
    });
  };

  try {
    const pi = await waitForPi();
    window.Pi?.init({ 
      version: "2.0",
      sandbox: process.env.NEXT_PUBLIC_PI_NETWORK_SANDBOX === 'true'
    });
    console.log('Pi Network SDK initialized successfully');
    return window.Pi;
  } catch (error) {
    console.error('Failed to initialize Pi Network SDK:', error);
    throw error;
  }
};

export const getPiNetwork = () => {
  if (typeof window === 'undefined') return null;
  return window.Pi;
};

export default {
  initializePiSDK,
  getPiNetwork,
}; 