import { BatchRequest, BatchRequestErrorInfo, BatchResponse } from './types';
export default class BatchRequestError extends Error {
    /**
     * The request of the batch error.
     */
    readonly request: BatchRequest;
    /**
     * The response of the batch error.
     */
    readonly response: BatchResponse;
    /**
     * @example
     * ```js
     * new BatchRequestError({
     *   request: {
     *     method: 'POST',
     *     relativeUrl: 'me/messages',
     *     body: {
     *       messagingType: 'UPDATE',
     *       recipient: 'PSID',
     *       message: { text: 'Hello World' },
     *     },
     *   },
     *   response: {
     *     code: 403,
     *     body: {
     *       error: {
     *         type: 'OAuthException',
     *         message: 'Invalid parameter',
     *         code: 100,
     *       },
     *     }
     *   },
     * })
     * ```
     */
    constructor({ request, response }: BatchRequestErrorInfo);
    inspect(): string;
}
//# sourceMappingURL=BatchRequestError.d.ts.map