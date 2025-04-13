const API_URL = 'http://localhost:5001/api';

// Pi SDK initialization
const Pi = window.Pi ? window.Pi : null;
if (Pi) {
    Pi.init({ 
        version: "2.0", 
        sandbox: true,
        apiKey: "oosvdfsis9dh2clk6cmka8bfg8jg3gfmwncl9xcukoek7ky2mh7z8xymohvbfiff"
    });
}

/**
 * @typedef {"user_to_app" | "app_to_user"} Direction
 */

/**
 * @typedef {'Pi Network Testnet' | 'Pi Network Mainnet'} AppNetwork
 */

/**
 * @typedef {Object} PaymentTransaction
 * @property {string} txid - id of the blockchain transaction
 * @property {boolean} verified - true if the transaction matches the payment
 * @property {string} _link - link to the operation on the Blockchain API
 */

/**
 * @typedef {Object} PaymentStatus
 * @property {boolean} developer_approved - Server-Side Approval
 * @property {boolean} transaction_verified - blockchain transaction verified
 * @property {boolean} developer_completed - server-Side Completion
 * @property {boolean} cancelled - cancelled by the developer or by Pi Network
 * @property {boolean} user_cancelled - cancelled by the user
 */

/**
 * @typedef {Object} PaymentDTO
 * @property {string} identifier - payment identifier
 * @property {string} user_uid - user's app-specific ID
 * @property {number} amount - payment amount
 * @property {string} memo - a string provided by the developer, shown to the user
 * @property {Object} metadata - an object provided by the developer
 * @property {string} from_address - sender address of the blockchain transaction
 * @property {string} to_address - recipient address of the blockchain transaction
 * @property {Direction} direction - direction of the payment
 * @property {string} created_at - payment's creation timestamp
 * @property {AppNetwork} network - network of the payment
 * @property {PaymentStatus} status - Status flags for the payment
 * @property {PaymentTransaction|null} transaction - Blockchain transaction data
 */

/**
 * @typedef {Object} AuthResult
 * @property {string} accessToken
 * @property {Object} user
 * @property {string} user.uid
 * @property {string} user.username
 */

/**
 * @typedef {Object} PaymentData
 * @property {number} amount
 * @property {string} memo
 * @property {Object} metadata
 */

/**
 * @typedef {Object} PaymentCallbacks
 * @property {function(string): void} onReadyForServerApproval
 * @property {function(string, string): void} onReadyForServerCompletion
 * @property {function(string): void} onCancel
 * @property {function(Error, PaymentDTO=): void} onError
 */

// Utility function to handle API calls
async function apiCall(endpoint, method = 'GET', data = null, token = null) {
    const headers = {
        'Content-Type': 'application/json'
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        method,
        headers,
        credentials: 'include'
    };

    if (data && (method === 'POST' || method === 'PUT')) {
        config.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Something went wrong');
        }

        return result;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Auth functions
async function login(email, password) {
    return apiCall('/auth/login', 'POST', { email, password });
}

async function register(name, email, password) {
    return apiCall('/auth/register', 'POST', { name, email, password });
}

// User functions
async function getCurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    return apiCall('/auth/me', 'GET', null, token);
}

async function updateProfile(userData) {
    const token = localStorage.getItem('token');
    return apiCall('/auth/profile', 'PUT', userData, token);
}

// Token management
function setToken(token) {
    localStorage.setItem('token', token);
}

function getToken() {
    return localStorage.getItem('token');
}

function removeToken() {
    localStorage.removeItem('token');
}

// Pi SDK functions
/**
 * Authenticate with Pi Network
 * @returns {Promise<AuthResult>}
 */
async function loginWithPi() {
    try {
        if (!Pi) {
            throw new Error('Pi SDK not loaded');
        }

        /** @type {AuthResult} */
        const auth = await Pi.authenticate(['payments', 'username', 'wallet_address'], onIncompletePaymentFound);
        
        // Send the Pi authentication data to your backend
        const response = await apiCall('/auth/pi-login', 'POST', {
            accessToken: auth.accessToken,
            uid: auth.user.uid,
            username: auth.user.username,
            walletAddress: auth.user.walletAddress
        });

        if (response.token) {
            setToken(response.token);
            localStorage.setItem('user_data', JSON.stringify(auth.user));
        }

        return response;
    } catch (error) {
        console.error('Pi authentication error:', error);
        throw error;
    }
}

/**
 * Handle incomplete payments
 * @param {PaymentDTO} payment
 */
function onIncompletePaymentFound(payment) {
    console.log('Incomplete payment found:', payment);
    
    // Check payment status
    if (payment.status.developer_approved && !payment.status.transaction_verified) {
        console.log('Payment approved but transaction not verified');
        // Wait for transaction verification
        return;
    }

    if (payment.status.transaction_verified && !payment.status.developer_completed) {
        console.log('Transaction verified but completion needed');
        // Complete the payment if transaction is verified
        if (payment.transaction?.txid) {
            apiCall('/payments/complete', 'POST', {
                paymentId: payment.identifier,
                txid: payment.transaction.txid
            }).catch(console.error);
        }
        return;
    }

    if (payment.status.user_cancelled) {
        console.log('Payment was cancelled by user');
        apiCall('/payments/cancel', 'POST', {
            paymentId: payment.identifier,
            reason: 'user_cancelled'
        }).catch(console.error);
        return;
    }

    if (payment.status.cancelled) {
        console.log('Payment was cancelled by system or developer');
        return;
    }
}

/**
 * Create a new Pi payment
 * @param {PaymentData} paymentData 
 * @returns {Promise<void>}
 */
async function createPiPayment(paymentData) {
    try {
        if (!Pi) {
            throw new Error('Pi SDK not loaded');
        }

        /** @type {PaymentCallbacks} */
        const callbacks = {
            onReadyForServerApproval: async (paymentId) => {
                try {
                    // Notify backend to approve the payment
                    await apiCall('/payments/approve', 'POST', {
                        paymentId,
                        metadata: paymentData.metadata
                    });
                } catch (error) {
                    console.error('Error during server approval:', error);
                    throw error;
                }
            },
            onReadyForServerCompletion: async (paymentId, txid) => {
                try {
                    // Notify backend to complete the payment
                    await apiCall('/payments/complete', 'POST', {
                        paymentId,
                        txid,
                        metadata: paymentData.metadata
                    });
                } catch (error) {
                    console.error('Error during server completion:', error);
                    throw error;
                }
            },
            onCancel: (paymentId) => {
                console.log('Payment cancelled:', paymentId);
                // Notify backend about cancelled payment
                apiCall('/payments/cancel', 'POST', {
                    paymentId,
                    reason: 'user_cancelled'
                }).catch(console.error);
            },
            onError: (error, payment) => {
                console.error('Payment error:', error);
                if (payment) {
                    console.error('Payment details:', payment);
                }
                // Notify backend about payment error
                apiCall('/payments/error', 'POST', { 
                    error: error.message,
                    paymentId: payment?.identifier,
                    status: payment?.status,
                    transaction: payment?.transaction
                }).catch(console.error);
            }
        };

        await Pi.createPayment(paymentData, callbacks);
    } catch (error) {
        console.error('Error creating payment:', error);
        throw error;
    }
}

// Export functions
window.api = {
    login,
    register,
    getCurrentUser,
    updateProfile,
    setToken,
    getToken,
    removeToken,
    loginWithPi,
    createPiPayment
}; 