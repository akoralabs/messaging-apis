"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messaging_api_messenger_1 = require("messaging-api-messenger");
const BatchRequestError_1 = __importDefault(require("./BatchRequestError"));
const MAX_BATCH_SIZE = 50;
const alwaysTrue = () => true;
class FacebookBatchQueue {
    /**
     *
     * @param client - A MessengerClient or FacebookClient instance.
     * @param options - Optional batch config.
     *
     * @example
     *
     * ```js
     * const client = new MessengerClient();
     * new FacebookBatchQueue(client);
     *
     * new FacebookBatchQueue(client, {
     *   delay: 3000,
     *   shouldRetry: () => true,
     *   retryTimes: 3,
     * });
     * ```
     */
    constructor(clientConfig, options = {}) {
        var _a, _b, _c, _d;
        this.queue = [];
        // TODO: we use messenger client here for now, but maybe we will replace it with some facebook base client
        this.client = new messaging_api_messenger_1.MessengerClient(clientConfig);
        this.delay = (_a = options.delay) !== null && _a !== void 0 ? _a : 1000;
        this.shouldRetry = (_b = options.shouldRetry) !== null && _b !== void 0 ? _b : alwaysTrue;
        this.retryTimes = (_c = options.retryTimes) !== null && _c !== void 0 ? _c : 0;
        this.includeHeaders = (_d = options.includeHeaders) !== null && _d !== void 0 ? _d : true;
        this.timeout = setTimeout(() => this.flush(), this.delay);
    }
    /**
     * Pushes a facebook request into the queue.
     *
     * @param request - The request to be queued.
     * @returns A promise resolves the response of the request.
     *
     * @example
     *
     * ```js
     * await bq.push({
     *   method: 'POST',
     *   relativeUrl: 'me/messages',
     *   body: {
     *     messagingType: 'UPDATE',
     *     recipient: 'PSID',
     *     message: { text: 'Hello World' },
     *   },
     * });
     * //=> {
     * //  recipientId: '...',
     * //  messageId: '...',
     * // }
     * ```
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    push(request) {
        const promise = new Promise((resolve, reject) => {
            this.queue.push({ request, resolve, reject });
        });
        if (this.queue.length >= MAX_BATCH_SIZE) {
            this.flush();
        }
        return promise;
    }
    /**
     * Flushes the queue proactively.
     *
     * This queue has a timer to flush items at a time interval, so normally you don't need to call this method.
     *
     * @example
     *
     * ```js
     * await bq.flush();
     * ```
     */
    flush() {
        return __awaiter(this, void 0, void 0, function* () {
            const items = this.queue.splice(0, MAX_BATCH_SIZE);
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => this.flush(), this.delay);
            if (items.length < 1)
                return;
            try {
                const responses = yield this.client.sendBatch(items.map((item) => item.request), {
                    includeHeaders: this.includeHeaders,
                });
                items.forEach(({ request, resolve, reject, retry = 0 }, i) => {
                    const response = responses[i];
                    if (response.code === 200) {
                        resolve(response.body);
                        return;
                    }
                    const err = {
                        response: response,
                        request,
                    };
                    if (retry < this.retryTimes && this.shouldRetry(err)) {
                        this.queue.push({ request, resolve, reject, retry: retry + 1 });
                    }
                    else {
                        reject(new BatchRequestError_1.default(err));
                    }
                });
            }
            catch (err) {
                items.forEach(({ request, resolve, reject, retry = 0 }) => {
                    if (retry < this.retryTimes && this.shouldRetry(err)) {
                        this.queue.push({ request, resolve, reject, retry: retry + 1 });
                    }
                    else {
                        reject(err);
                    }
                });
            }
        });
    }
    /**
     * Stops the internal timer.
     *
     * @example
     *
     * ```js
     * bq.stop();
     * ```
     */
    stop() {
        clearTimeout(this.timeout);
    }
}
exports.default = FacebookBatchQueue;
//# sourceMappingURL=FacebookBatchQueue.js.map