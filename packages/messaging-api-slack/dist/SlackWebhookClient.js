"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const ts_invariant_1 = __importDefault(require("ts-invariant"));
const warning_1 = __importDefault(require("warning"));
const messaging_api_common_1 = require("messaging-api-common");
class SlackWebhookClient {
    constructor(config) {
        (0, ts_invariant_1.default)(typeof config !== 'string', `SlackWebhookClient: do not allow constructing client with ${config} string. Use object instead.`);
        this.onRequest = config.onRequest;
        // incoming webhooks
        // https://api.slack.com/incoming-webhooks
        this.axios = axios_1.default.create({
            baseURL: config.url,
            headers: { 'Content-Type': 'application/json' },
        });
        this.axios.interceptors.request.use((0, messaging_api_common_1.createRequestInterceptor)({ onRequest: this.onRequest }));
    }
    /**
     * @deprecated Use `new SlackWebhookClient(...)` instead.
     */
    static connect(config) {
        (0, warning_1.default)(false, '`SlackWebhookClient.connect(...)` is deprecated. Use `new SlackWebhookClient(...)` instead.');
        return new SlackWebhookClient(config);
    }
    /**
     * Send message by using raw body.
     *
     * @param body - Raw data to be sent.
     *
     * @see https://api.slack.com/docs/messages
     *
     * @example
     *
     * ```js
     * await client.sendRawBody({ text: 'Hello!' });
     * ```
     */
    sendRawBody(body) {
        return this.axios.post('', (0, messaging_api_common_1.snakecaseKeysDeep)(body)).then((res) => res.data);
    }
    /**
     * Send text message.
     *
     * @param text - Text of the message to be sent.
     *
     * @see https://api.slack.com/docs/messages
     *
     * @example
     *
     * ```js
     * await client.sendText('Hello!');
     * ```
     */
    sendText(text) {
        return this.sendRawBody({ text });
    }
    /**
     * Send multiple attachments which let you add more context to a message.
     *
     * @param attachments -  Messages are attachments, defined as an array. Each object contains the parameters to customize the appearance of a message attachment.
     *
     * @see https://api.slack.com/docs/message-attachments
     *
     * ```js
     * await client.sendAttachments([
     *   {
     *     fallback: 'some text',
     *     pretext: 'some pretext',
     *     color: 'good',
     *     fields: [
     *       {
     *         title: 'aaa',
     *         value: 'bbb',
     *         short: false,
     *       },
     *     ],
     *   },
     *   {
     *     fallback: 'some other text',
     *     pretext: 'some pther pretext',
     *     color: '#FF0000',
     *     fields: [
     *       {
     *         title: 'ccc',
     *         value: 'ddd',
     *         short: false,
     *       },
     *     ],
     *   },
     * ]);
     * ```
     */
    sendAttachments(attachments) {
        return this.sendRawBody({ attachments });
    }
    /**
     * Send only one attachment.
     *
     * @param attachment - Message is an attachment. The object contains the parameters to customize the appearance of a message attachment.
     *
     * @see https://api.slack.com/docs/message-attachments
     *
     * ```js
     * await client.sendAttachment({
     *   fallback: 'some text',
     *   pretext: 'some pretext',
     *   color: 'good',
     *   fields: [
     *     {
     *       title: 'aaa',
     *       value: 'bbb',
     *       short: false,
     *     },
     *   ],
     * });
     * ```
     */
    sendAttachment(attachment) {
        return this.sendAttachments([attachment]);
    }
}
exports.default = SlackWebhookClient;
//# sourceMappingURL=SlackWebhookClient.js.map