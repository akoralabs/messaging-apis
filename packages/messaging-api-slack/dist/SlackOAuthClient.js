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
const querystring_1 = __importDefault(require("querystring"));
const axios_error_1 = __importDefault(require("axios-error"));
const axios_1 = __importDefault(require("axios"));
const ts_invariant_1 = __importDefault(require("ts-invariant"));
const warning_1 = __importDefault(require("warning"));
const messaging_api_common_1 = require("messaging-api-common");
const DEFAULT_PAYLOAD_FIELDS_TO_STRINGIFY = ['attachments', 'blocks'];
function stringifyPayloadFields(payload = {}, fields = DEFAULT_PAYLOAD_FIELDS_TO_STRINGIFY) {
    fields.forEach((field) => {
        if (payload[field] && typeof payload[field] !== 'string') {
            // eslint-disable-next-line no-param-reassign
            payload[field] = JSON.stringify((0, messaging_api_common_1.snakecaseKeysDeep)(payload[field]));
        }
    });
    return payload;
}
class SlackOAuthClient {
    constructor(config) {
        (0, ts_invariant_1.default)(typeof config !== 'string', `SlackOAuthClient: do not allow constructing client with ${config} string. Use object instead.`);
        this.accessToken = config.accessToken;
        this.onRequest = config.onRequest;
        // Web API
        // https://api.slack.com/web
        this.axios = axios_1.default.create({
            baseURL: `${config.origin || 'https://slack.com'}/api/`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        this.axios.interceptors.request.use((0, messaging_api_common_1.createRequestInterceptor)({ onRequest: this.onRequest }));
        this.chat = {
            postMessage: this._postMessage.bind(this),
            postEphemeral: this._postEphemeral.bind(this),
            update: this._updateMessage.bind(this),
            delete: this._deleteMessage.bind(this),
            meMessage: this._meMessage.bind(this),
            getPermalink: this._getPermalink.bind(this),
            scheduleMessage: this._scheduleMessage.bind(this),
            deleteScheduledMessage: this._deleteScheduledMessage.bind(this),
            unfurl: this._unfurl.bind(this),
            scheduledMessages: {
                list: this._getScheduledMessages.bind(this),
            },
        };
        this.views = {
            open: this._openView.bind(this),
            publish: this._publishView.bind(this),
            push: this._pushView.bind(this),
            update: this._updateView.bind(this),
        };
    }
    /**
     * @deprecated Use `new SlackOAuthClient(...)` instead.
     */
    static connect(config) {
        (0, warning_1.default)(false, '`SlackOAuthClient.connect(...)` is deprecated. Use `new SlackOAuthClient(...)` instead.');
        return new SlackOAuthClient(config);
    }
    callMethod(method, inputBody = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = Object.assign(Object.assign({}, inputBody), { token: this.accessToken });
                const response = yield this.axios.post(method, querystring_1.default.stringify((0, messaging_api_common_1.snakecaseKeysDeep)(body)));
                const data = (0, messaging_api_common_1.camelcaseKeysDeep)(response.data);
                if (!data.ok) {
                    const { config, request } = response;
                    throw new axios_error_1.default(`Slack API - ${data.error}`, {
                        config,
                        request,
                        response,
                    });
                }
                return data;
            }
            catch (err) {
                throw new axios_error_1.default(err.message, err);
            }
        });
    }
    /**
     * Gets information about a channel.
     *
     * @param channelId - Channel to get info on.
     * @param options - Other optional parameters.
     *
     * @see https://api.slack.com/methods/channels.info
     *
     * @example
     *
     * ```js
     * await client.getChannelInfo(channelId);
     * // {
     * //   id: 'C8763',
     * //   name: 'fun',
     * //   ...
     * // }
     * ```
     */
    getChannelInfo(channelId, options) {
        return this.callMethod('channels.info', Object.assign({ channel: channelId }, options)).then((data) => data.channel);
    }
    /**
     * Retrieve information about a conversation.
     *
     * @param channelId - Channel to get info on.
     * @param options - Other optional parameters.
     *
     * @see https://api.slack.com/methods/conversations.info
     *
     * @example
     *
     * ```js
     * await client.getConversationInfo(channelId);
     * // {
     * //   id: 'C8763',
     * //   name: 'fun',
     * //   ...
     * // }
     * ```
     */
    getConversationInfo(channelId, options) {
        return this.callMethod('conversations.info', Object.assign({ channel: channelId }, options)).then((data) => data.channel);
    }
    /**
     * Retrieve members of a conversation.
     *
     * @param channelId - Channel to get info on.
     * @param options - Optional arguments.
     *
     * @see https://api.slack.com/methods/conversations.members
     *
     * @example
     *
     * ```js
     * await client.getConversationMembers(channelId, { cursor: 'xxx' });
     * await client.getConversationMembers(channelId);
     * // {
     * //   members: ['U061F7AUR', 'U0C0NS9HN'],
     * //   next: 'cursor',
     * // }
     * ```
     */
    getConversationMembers(channelId, options) {
        return this.callMethod('conversations.members', Object.assign({ channel: channelId }, options)).then((data) => ({
            members: data.members,
            next: data.responseMetadata && data.responseMetadata.nextCursor,
        }));
    }
    /**
     * Recursively retrieve members of a conversation using cursor.
     *
     * @param channelId - Channel to get info on.
     * @param options - Optional arguments.
     *
     * @see https://api.slack.com/methods/conversations.members
     *
     * @example
     *
     * ```js
     * await client.getAllConversationMembers(channelId);
     * // ['U061F7AUR', 'U0C0NS9HN', ...]
     * ```
     */
    getAllConversationMembers(channelId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let allMembers = [];
            let continuationCursor;
            do {
                const { members, next, } = yield this.getConversationMembers(channelId, Object.assign({ cursor: continuationCursor }, options));
                allMembers = allMembers.concat(members);
                continuationCursor = next;
            } while (continuationCursor);
            return allMembers;
        });
    }
    /**
     * Lists all channels in a Slack team.
     *
     * @param options - Optional arguments.
     *
     * @see https://api.slack.com/methods/conversations.list
     *
     * @example
     *
     * ```js
     * await client.getConversationList({ cursor: 'xxx' });
     * await client.getConversationList();
     * // {
     * //   channels: [
     * //     {
     * //       id: 'C012AB3CD',
     * //       name: 'general',
     * //       ...
     * //     },
     * //     {
     * //       id: 'C012AB3C5',
     * //       name: 'random',
     * //       ...
     * //     },
     * //   ],
     * //   next: 'cursor',
     * // }
     * ```
     */
    getConversationList(options) {
        return this.callMethod('conversations.list', options).then((data) => ({
            channels: data.channels,
            next: data.responseMetadata && data.responseMetadata.nextCursor,
        }));
    }
    /**
     * Recursively lists all channels in a Slack team using cursor.
     *
     * @param options - Optional arguments.
     *
     * @see https://api.slack.com/methods/conversations.list
     *
     * @example
     *
     * ```js
     * await client.getAllConversationList();
     * // [
     * //   {
     * //     id: 'C012AB3CD',
     * //     name: 'general',
     * //     ...
     * //   },
     * //   {
     * //     id: 'C012AB3C5',
     * //     name: 'random',
     * //     ...
     * //   },
     * // ],
     * ```
     */
    getAllConversationList(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let allChannels = [];
            let continuationCursor;
            do {
                const nextOptions = continuationCursor
                    ? Object.assign({ cursor: continuationCursor }, options) : options;
                const { channels, next,
                // eslint-disable-next-line no-await-in-loop
                 } = yield this.getConversationList(nextOptions);
                allChannels = allChannels.concat(channels);
                continuationCursor = next;
            } while (continuationCursor);
            return allChannels;
        });
    }
    postMessage(channel, inputMessage, options = {}) {
        (0, warning_1.default)(false, '`postMessage` is deprecated. Use `chat.postMessage` instead.');
        const message = typeof inputMessage === 'string' ? { text: inputMessage } : inputMessage;
        return this._postMessage(Object.assign(Object.assign({ channel }, message), options));
    }
    /**
     * Sends a message to the channel.
     *
     * @param options -
     * @returns
     *
     * @see https://api.slack.com/methods/chat.postMessage
     *
     * @example
     *
     * ```js
     * await client.chat.postMessage({
     *   channel: 'C8763',
     *   text: 'Hello!',
     * });
     * await client.chat.postMessage({
     *   channel: 'C8763',
     *   attachments: someAttachments,
     * });
     * ```
     */
    _postMessage(options) {
        return this.callMethod('chat.postMessage', stringifyPayloadFields(options));
    }
    /**
     * Sends an ephemeral message to a user in a channel.
     *
     * @see https://api.slack.com/methods/chat.postEphemeral
     */
    postEphemeral(channel, user, inputMessage, options = {}) {
        (0, warning_1.default)(false, '`postEphemeral` is deprecated. Use `chat.postEphemeral` instead.');
        const message = typeof inputMessage === 'string' ? { text: inputMessage } : inputMessage;
        return this._postEphemeral(Object.assign(Object.assign({ channel,
            user }, message), options));
    }
    /**
     * Sends an ephemeral message to a user in the channel.
     *
     * @see https://api.slack.com/methods/chat.postEphemeral
     *
     */
    _postEphemeral(options) {
        return this.callMethod('chat.postEphemeral', stringifyPayloadFields(options));
    }
    /**
     * Updates a message.
     *
     * @see https://api.slack.com/methods/chat.update
     */
    _updateMessage(options) {
        return this.callMethod('chat.update', stringifyPayloadFields(options));
    }
    /**
     * Deletes a message.
     *
     * @see https://api.slack.com/methods/chat.delete
     */
    _deleteMessage(options) {
        return this.callMethod('chat.delete', options);
    }
    /**
     * Share a me message into a channel.
     *
     * @see https://api.slack.com/methods/chat.meMessage
     */
    _meMessage(options) {
        return this.callMethod('chat.meMessage', options);
    }
    /**
     * Retrieve a permalink URL for a specific extant message
     *
     * @see https://api.slack.com/methods/chat.getPermalink
     */
    _getPermalink(options) {
        return this.callMethod('chat.getPermalink', options);
    }
    /**
     * Schedules a message to be sent to a channel.
     *
     * @see https://api.slack.com/methods/chat.scheduleMessage
     */
    _scheduleMessage(options) {
        return this.callMethod('chat.scheduleMessage', stringifyPayloadFields(options));
    }
    /**
     * Deletes a pending scheduled message from the queue.
     *
     * @see https://api.slack.com/methods/chat.deleteScheduledMessage
     */
    _deleteScheduledMessage(options) {
        return this.callMethod('chat.deleteScheduledMessage', options);
    }
    /**
     * Returns a list of scheduled messages.
     *
     * @see https://api.slack.com/methods/chat.scheduledMessages.list
     */
    _getScheduledMessages(options = {}) {
        return this.callMethod('chat.scheduledMessages.list', options);
    }
    /**
     * Provide custom unfurl behavior for user-posted URLs
     *
     * @see https://api.slack.com/methods/chat.unfurl
     */
    _unfurl(options) {
        return this.callMethod('chat.unfurl', stringifyPayloadFields(options, ['view']));
    }
    /**
     * Open a view for a user.
     *
     * @see https://api.slack.com/methods/views.open
     */
    _openView(options) {
        return this.callMethod('views.open', stringifyPayloadFields(options, ['view']));
    }
    /**
     * Publish a static view for a User.
     *
     * @see https://api.slack.com/methods/views.publish
     */
    _publishView(options) {
        return this.callMethod('views.publish', stringifyPayloadFields(options, ['view']));
    }
    /**
     * Update an existing view.
     *
     * @see https://api.slack.com/methods/views.update
     */
    _updateView(options) {
        return this.callMethod('views.update', stringifyPayloadFields(options, ['view']));
    }
    /**
     * Push a view onto the stack of a root view.
     *
     * @see https://api.slack.com/methods/views.push
     */
    _pushView(options) {
        return this.callMethod('views.push', stringifyPayloadFields(options, ['view']));
    }
    /**
     * Gets information about a user.
     *
     * @param userId - User to get info on.
     * @param options - Other optional parameters.
     * @param options.includeLocale - Set this to true to receive the locale for this user. Defaults to false
     *
     * @see https://api.slack.com/methods/users.info
     *
     * @example
     *
     * ```js
     * await client.getUserInfo(userId);
     * // {
     * //   id: 'U123456',
     * //   name: 'bobby',
     * //   ...
     * // }
     * ```
     */
    getUserInfo(userId, options) {
        return this.callMethod('users.info', Object.assign({ user: userId }, options)).then((data) => data.user);
    }
    /**
     * Lists all users in a Slack team.
     *
     * @param options - Optional parameters.
     * @param options.cursor - Paginate through collections of data by setting the `cursor` parameter to a `nextCursor` attribute returned by a previous request's `responseMetadata`.
     *
     * @see https://api.slack.com/methods/users.list
     *
     * @example
     *
     * ```js
     * await client.getUserList({ cursor });
     * // {
     * //   members: [
     * //     { ... },
     * //     { ... },
     * //   ],
     * //   next: 'abcdefg',
     * // }
     * ```
     */
    getUserList(options) {
        return this.callMethod('users.list', options).then((data) => ({
            members: data.members,
            next: data.responseMetadata && data.responseMetadata.nextCursor,
        }));
    }
    /**
     * Recursively lists all users in a Slack team using cursor.
     *
     * @see https://api.slack.com/methods/users.list
     *
     * @example
     *
     * ```js
     * await client.getAllUserList();
     * // [
     * //   { ... },
     * //   { ... },
     * // ]
     * ```
     */
    getAllUserList(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let allUsers = [];
            let continuationCursor;
            do {
                const { members: users, next, } = yield this.getUserList(Object.assign({ cursor: continuationCursor }, options));
                allUsers = allUsers.concat(users);
                continuationCursor = next;
            } while (continuationCursor);
            return allUsers;
        });
    }
}
exports.default = SlackOAuthClient;
//# sourceMappingURL=SlackOAuthClient.js.map