"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const querystring_1 = __importDefault(require("querystring"));
const axios_error_1 = __importDefault(require("axios-error"));
const axios_1 = __importDefault(require("axios"));
const ts_invariant_1 = __importDefault(require("ts-invariant"));
const warning_1 = __importDefault(require("warning"));
function handleError(err) {
    if (err.response && err.response.data) {
        const { returnCode, returnMessage } = err.response.data;
        const msg = `LINE PAY API - ${returnCode} ${returnMessage}`;
        throw new axios_error_1.default(msg, err);
    }
    throw new axios_error_1.default(err.message, err);
}
function throwWhenNotSuccess(res) {
    if (res.data.returnCode !== '0000') {
        const { returnCode, returnMessage } = res.data;
        const msg = `LINE PAY API - ${returnCode} ${returnMessage}`;
        throw new axios_error_1.default(msg, {
            response: res,
            config: res.config,
            request: res.request,
        });
    }
    return res.data.info;
}
class LinePay {
    constructor({ channelId, channelSecret, sandbox = false, origin, }) {
        const linePayOrigin = sandbox
            ? 'https://sandbox-api-pay.line.me'
            : 'https://api-pay.line.me';
        this.axios = axios_1.default.create({
            baseURL: `${origin || linePayOrigin}/v2/`,
            headers: {
                'Content-Type': 'application/json',
                'X-LINE-ChannelId': channelId,
                'X-LINE-ChannelSecret': channelSecret,
            },
        });
    }
    /**
     * @deprecated Use `new LinePay(...)` instead.
     */
    static connect(config) {
        (0, warning_1.default)(false, '`LineNotify.connect(...)` is deprecated. Use `new LineNotify(...)` instead.');
        return new LinePay(config);
    }
    getPayments({ transactionId, orderId, } = {}) {
        (0, ts_invariant_1.default)(transactionId || orderId, 'getPayments: One of `transactionId` or `orderId` must be provided');
        const query = {};
        if (transactionId) {
            query.transactionId = transactionId;
        }
        if (orderId) {
            query.orderId = orderId;
        }
        return this.axios
            .get(`/payments?${querystring_1.default.stringify(query)}`)
            .then(throwWhenNotSuccess, handleError);
    }
    getAuthorizations({ transactionId, orderId, } = {}) {
        (0, ts_invariant_1.default)(transactionId || orderId, 'getAuthorizations: One of `transactionId` or `orderId` must be provided');
        const query = {};
        if (transactionId) {
            query.transactionId = transactionId;
        }
        if (orderId) {
            query.orderId = orderId;
        }
        return this.axios
            .get(`/payments/authorizations?${querystring_1.default.stringify(query)}`)
            .then(throwWhenNotSuccess, handleError);
    }
    reserve(_a) {
        var { productName, amount, currency, confirmUrl, orderId } = _a, options = __rest(_a, ["productName", "amount", "currency", "confirmUrl", "orderId"]);
        return this.axios
            .post('/payments/request', Object.assign({ productName,
            amount,
            currency,
            confirmUrl,
            orderId }, options))
            .then(throwWhenNotSuccess, handleError);
    }
    confirm(transactionId, { amount, currency, }) {
        return this.axios
            .post(`/payments/${transactionId}/confirm`, {
            amount,
            currency,
        })
            .then(throwWhenNotSuccess, handleError);
    }
    capture(transactionId, { amount, currency, }) {
        return this.axios
            .post(`/payments/authorizations/${transactionId}/capture`, {
            amount,
            currency,
        })
            .then(throwWhenNotSuccess, handleError);
    }
    void(transactionId) {
        return this.axios
            .post(`/payments/authorizations/${transactionId}/void`)
            .then(throwWhenNotSuccess, handleError);
    }
    refund(transactionId, options = {}) {
        return this.axios
            .post(`/payments/${transactionId}/refund`, options)
            .then(throwWhenNotSuccess, handleError);
    }
}
exports.default = LinePay;
//# sourceMappingURL=LinePay.js.map