// Pi Network Authentication SDK Integration
const PI = window.Pi;
const apiUrl = 'http://localhost:5000/api'; // Your backend API URL

class PiAuth {
    constructor() {
        this.scopes = ['payments', 'username'];
        this.initialized = false;
    }

    async init() {
        if (this.initialized) return;
        
        try {
            await PI.init({ version: "2.0", sandbox: true });
            this.initialized = true;
            console.log("Pi SDK initialized successfully");
        } catch (error) {
            console.error("Error initializing Pi SDK:", error);
            throw error;
        }
    }

    async authenticate() {
        try {
            await this.init();
            const auth = await PI.authenticate(this.scopes, this.onIncompletePaymentFound);
            
            // Send authentication data to your backend
            const response = await fetch(`${apiUrl}/auth/pi-login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    accessToken: auth.accessToken,
                    uid: auth.user.uid,
                    username: auth.user.username
                })
            });

            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem('jwt_token', data.token);
                localStorage.setItem('user_data', JSON.stringify(data.user));
                return data;
            } else {
                throw new Error(data.message || 'Authentication failed');
            }
        } catch (error) {
            console.error("Pi authentication error:", error);
            throw error;
        }
    }

    onIncompletePaymentFound(payment) {
        console.log("Incomplete payment found:", payment);
        // Handle incomplete payment here
    }

    isSignedIn() {
        return !!localStorage.getItem('jwt_token');
    }

    getUser() {
        const userData = localStorage.getItem('user_data');
        return userData ? JSON.parse(userData) : null;
    }

    signOut() {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user_data');
        window.location.href = '/login.html';
    }
}

// Create a global instance
window.piAuth = new PiAuth(); 