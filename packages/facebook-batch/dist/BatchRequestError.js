"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
class BatchRequestError extends Error {
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
    constructor({ request, response }) {
        const message = (0, utils_1.getErrorMessage)({ request, response });
        super(`Batch Request Error - ${message}`);
        this.request = request;
        this.response = response;
    }
    inspect() {
        return `
Error Message - Batch Request Error

Request -

${this.request.method.toUpperCase()} ${this.request.relativeUrl}
${JSON.stringify(this.request.body, null, 2) || ''}

Response -
${this.response.code}
${JSON.stringify(this.response.body, null, 2) || ''}
    `;
    }
}
exports.default = BatchRequestError;
//# sourceMappingURL=BatchRequestError.js.map