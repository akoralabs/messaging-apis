import { AxiosInstance } from 'axios';
import * as LineTypes from './LineTypes';
export default class LinePay {
    /**
     * @deprecated Use `new LinePay(...)` instead.
     */
    static connect(config: LineTypes.LinePayConfig): LinePay;
    /**
     * The underlying axios instance.
     */
    readonly axios: AxiosInstance;
    constructor({ channelId, channelSecret, sandbox, origin, }: LineTypes.LinePayConfig);
    getPayments({ transactionId, orderId, }?: {
        transactionId?: string;
        orderId?: string;
    }): Promise<any>;
    getAuthorizations({ transactionId, orderId, }?: {
        transactionId?: string;
        orderId?: string;
    }): Promise<any>;
    reserve({ productName, amount, currency, confirmUrl, orderId, ...options }: {
        productName: string;
        amount: number;
        currency: LineTypes.LinePayCurrency;
        confirmUrl: string;
        orderId: string;
        productImageUrl?: string;
        mid?: string;
        oneTimeKey?: string;
        confirmUrlType?: 'CLIENT' | 'SERVER';
        checkConfirmUrlBrowser?: boolean;
        cancelUrl?: string;
        packageName?: string;
        deliveryPlacePhone?: string;
        payType?: 'NORMAL' | 'PREAPPROVED';
        langCd?: 'ja' | 'ko' | 'en' | 'zh-Hans' | 'zh-Hant' | 'th';
        capture?: boolean;
        extras?: Record<string, any>;
    }): Promise<any>;
    confirm(transactionId: string, { amount, currency, }: {
        amount: number;
        currency: LineTypes.LinePayCurrency;
    }): Promise<any>;
    capture(transactionId: string, { amount, currency, }: {
        amount: number;
        currency: LineTypes.LinePayCurrency;
    }): Promise<any>;
    void(transactionId: string): Promise<any>;
    refund(transactionId: string, options?: {
        refundAmount?: number;
    }): Promise<any>;
}
//# sourceMappingURL=LinePay.d.ts.map