import { JsonValue } from 'type-fest';
import { MessengerTypes } from 'messaging-api-messenger';
import { BatchConfig, BatchRequest, QueueItem } from './types';
export default class FacebookBatchQueue {
    /**
     * The queue to store facebook requests.
     */
    readonly queue: QueueItem[];
    private client;
    private delay;
    private shouldRetry;
    private retryTimes;
    private includeHeaders;
    private timeout;
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
    constructor(clientConfig: MessengerTypes.ClientConfig, options?: BatchConfig);
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
    push<T extends JsonValue = any>(request: BatchRequest): Promise<T>;
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
    flush(): Promise<void>;
    /**
     * Stops the internal timer.
     *
     * @example
     *
     * ```js
     * bq.stop();
     * ```
     */
    stop(): void;
}
//# sourceMappingURL=FacebookBatchQueue.d.ts.map