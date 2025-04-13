// Pi Network Authentication Types
export type PiScope = "username" | "payments" | "wallet_address";

export interface PiUser {
    uid: string;
    username: string;
    walletAddress: string;
}

export interface PiAuthResult {
    accessToken: string;
    user: PiUser;
}

export interface PiPaymentData {
    amount: number;
    memo: string;
    metadata: {
        orderId?: string;
        productId?: string;
        userId?: string;
        [key: string]: any;
    };
}

export interface PiPaymentCallbacks {
    onReadyForServerApproval: (paymentId: string) => Promise<void>;
    onReadyForServerCompletion: (paymentId: string, txid: string) => Promise<void>;
    onCancel: (paymentId: string) => void;
    onError: (error: Error, payment?: PiPayment) => void;
}

export interface PiPayment {
    identifier: string;
    user_uid: string;
    amount: number;
    memo: string;
    metadata: Record<string, any>;
    status: {
        developer_approved: boolean;
        transaction_verified: boolean;
        developer_completed: boolean;
        cancelled: boolean;
        user_cancelled: boolean;
    };
    transaction: {
        txid: string;
        verified: boolean;
        _link: string;
    };
}

export interface PiPaymentResponse {
    identifier: string;
    user_uid: string;
    amount: number;
    memo: string;
    metadata: Record<string, any>;
    status: {
        developer_approved: boolean;
        transaction_verified: boolean;
        developer_completed: boolean;
        cancelled: boolean;
        user_cancelled: boolean;
    };
    transaction: {
        txid: string;
        verified: boolean;
        _link: string;
    };
}

export type NativeFeature = "inline_media" | "request_permission" | "ad_network";

export type AdType = "interstitial" | "rewarded";

export type ShowAdResponse =
  | {
      type: "interstitial";
      result: "AD_CLOSED" | "AD_DISPLAY_ERROR" | "AD_NETWORK_ERROR" | "AD_NOT_AVAILABLE";
    }
  | {
      type: "rewarded";
      result: "AD_REWARDED" | "AD_CLOSED" | "AD_DISPLAY_ERROR" | "AD_NETWORK_ERROR" | "AD_NOT_AVAILABLE" | "ADS_NOT_SUPPORTED" | "USER_UNAUTHENTICATED";
      adId?: string;
    };

export type IsAdReadyResponse = {
  type: "interstitial" | "rewarded";
  ready: boolean;
};

export type RequestAdResponse = {
  type: "interstitial" | "rewarded";
  result: "AD_LOADED" | "AD_FAILED_TO_LOAD" | "AD_NOT_AVAILABLE";
};

export interface Pi {
    nativeFeaturesList(): Promise<Array<NativeFeature>>;
    openShareDialog(title: string, message: string): void;
    Ads: {
        showAd(adType: AdType): Promise<ShowAdResponse>;
        isAdReady(adType: AdType): Promise<IsAdReadyResponse>;
        requestAd(adType: AdType): Promise<RequestAdResponse>;
    };
} 