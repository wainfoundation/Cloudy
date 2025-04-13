import axios from 'axios';
import { PiUser, PiAuthResult, PiPayment, PiPaymentData } from '../types/pi.types';
import { config } from '../config';

export class PiNetworkService {
    private static instance: PiNetworkService;
    private readonly apiUrl: string;
    private readonly apiKey: string;

    private constructor() {
        this.apiUrl = config.piNetwork.apiUrl;
        this.apiKey = config.piNetwork.apiKey;
    }

    public static getInstance(): PiNetworkService {
        if (!PiNetworkService.instance) {
            PiNetworkService.instance = new PiNetworkService();
        }
        return PiNetworkService.instance;
    }

    public async authenticateUser(accessToken: string): Promise<PiAuthResult> {
        try {
            const response = await axios.post(`${this.apiUrl}/me`, null, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            const user: PiUser = {
                uid: response.data.uid,
                username: response.data.username,
                walletAddress: response.data.wallet_address
            };

            return {
                accessToken,
                user
            };
        } catch (error) {
            console.error('Pi Network authentication error:', error);
            throw new Error('Failed to authenticate with Pi Network');
        }
    }

    public async createPayment(paymentData: PiPaymentData): Promise<PiPayment> {
        try {
            const response = await axios.post(`${this.apiUrl}/payments`, {
                amount: paymentData.amount,
                memo: paymentData.memo,
                metadata: paymentData.metadata
            }, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            return response.data;
        } catch (error) {
            console.error('Pi Network payment creation error:', error);
            throw new Error('Failed to create Pi Network payment');
        }
    }

    public async approvePayment(paymentId: string): Promise<void> {
        try {
            await axios.post(`${this.apiUrl}/payments/${paymentId}/approve`, null, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error('Pi Network payment approval error:', error);
            throw new Error('Failed to approve Pi Network payment');
        }
    }

    public async completePayment(paymentId: string, txid: string): Promise<void> {
        try {
            await axios.post(`${this.apiUrl}/payments/${paymentId}/complete`, {
                txid
            }, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error('Pi Network payment completion error:', error);
            throw new Error('Failed to complete Pi Network payment');
        }
    }

    public async getPayment(paymentId: string): Promise<PiPayment> {
        try {
            const response = await axios.get(`${this.apiUrl}/payments/${paymentId}`, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Pi Network payment retrieval error:', error);
            throw new Error('Failed to retrieve Pi Network payment');
        }
    }
} 