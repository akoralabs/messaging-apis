import { AxiosInstance } from 'axios';
import * as SlackTypes from './SlackTypes';
export default class SlackOAuthClient {
    /**
     * @deprecated Use `new SlackOAuthClient(...)` instead.
     */
    static connect(config: SlackTypes.ClientConfig): SlackOAuthClient;
    /**
     * The underlying axios instance.
     */
    readonly axios: AxiosInstance;
    /**
     * The access token used by the client.
     */
    readonly accessToken: string;
    /**
     * chat.* APIs.
     */
    readonly chat: {
        /**
         * Sends a message to a channel.
         *
         * @returns Typical success response
         *
         * ```js
         * {
         *   "ok": true,
         *   "channel": "C1H9RESGL",
         *   "ts": "1503435956.000247",
         *   "message": {
         *      "text": "Here's a message for you",
         *      "username": "ecto1",
         *      "botId": "B19LU7CSY",
         *      "attachments": [
         *         {
         *           "text": "This is an attachment",
         *           "id": 1,
         *           "fallback": "This is an attachment's fallback"
         *         }
         *       ],
         *       "type": "message",
         *       "subtype": "bot_message",
         *       "ts": "1503435956.000247"
         *     }
         *   }
         * }
         * ```
         *
         * @see https://api.slack.com/methods/chat.postMessage
         *
         * @example
         *
         * ```js
         * await client.chat.postMessage({
         *   channel: 'C1234567890',
         *   text: 'Hello world',
         * });
         * ```
         */
        postMessage: (options: SlackTypes.PostMessageOptions) => Promise<SlackTypes.OAuthAPIResponse>;
        /**
         * Sends an ephemeral message to a user in a channel.
         *
         * @returns Typical success response
         *
         * ```js
         * {
         *   "ok": true,
         *   "messageTs": "1502210682.580145"
         * }
         * ```
         *
         * @see https://api.slack.com/methods/chat.postEphemeral
         *
         * @example
         *
         * ```js
         * await client.chat.postEphemeral({
         *   channel: 'C1234567890',
         *   text: 'Hello world',
         *   user: 'U0BPQUNTA',
         *   attachments: '[{"pretext": "pre-hello", "text": "text-world"}]',
         * });
         * ```
         */
        postEphemeral: (options: SlackTypes.PostEphemeralOptions) => Promise<SlackTypes.OAuthAPIResponse>;
        /**
         * Updates a message.
         *
         * @returns Typical success response
         *
         * ```js
         * {
         *   "ok": true,
         *   "channel": "C024BE91L",
         *   "ts": "1401383885.000061",
         *   "text": "Updated text you carefully authored",
         *   "message": {
         *     "text": "Updated text you carefully authored",
         *     "user": "U34567890"
         *   }
         * }
         * ```
         *
         * @see https://api.slack.com/methods/chat.update
         *
         * @example
         *
         * ```js
         * await client.chat.update({
         *   channel: 'C1234567890',
         *   ts: '1405894322.002768',
         *   text: 'Hello world',
         * });
         * ```
         */
        update: (options: SlackTypes.UpdateMessageOptions) => Promise<SlackTypes.OAuthAPIResponse>;
        /**
         * Deletes a message.
         *
         * @returns Typical success response
         *
         * ```js
         * {
         *   "ok": true,
         *   "channel": "C024BE91L",
         *   "ts": "1401383885.000061"
         * }
         * ```
         *
         * @see https://api.slack.com/methods/chat.delete
         *
         * @example
         *
         * ```js
         * await client.chat.delete({
         *   channel: 'C1234567890',
         *   ts: 'Timestamp of the message to be deleted.',
         * });
         * ```
         */
        delete: (options: SlackTypes.DeleteMessageOptions) => Promise<SlackTypes.OAuthAPIResponse>;
        /**
         * Share a me message into a channel.
         *
         * @returns Typical success response
         *
         * ```js
         * {
         *   "ok": true,
         *   "channel": "C024BE7LR",
         *   "ts": "1417671948.000006"
         * }
         * ```
         *
         * @see https://api.slack.com/methods/chat.meMessage
         *
         * @example
         *
         * ```js
         * await client.chat.meMessage({
         *   channel: 'C1234567890',
         *   text: 'Hello world',
         * });
         * ```
         */
        meMessage: (options: SlackTypes.MeMessageOptions) => Promise<SlackTypes.OAuthAPIResponse>;
        /**
         * Retrieve a permalink URL for a specific extant message.
         *
         * @returns Standard success response
         *
         * ```js
         * {
         *   "ok": true,
         *   "channel": "C1H9RESGA",
         *   "permalink": "https://ghostbusters.slack.com/archives/C1H9RESGA/p135854651500008"
         * }
         * ```
         *
         * @see https://api.slack.com/methods/chat.getPermalink
         *
         * @example
         *
         * ```js
         * await client.chat.getPermalink({
         *   channel: 'C1H9RESGA',
         *   messageTs: '1234567890.123456',
         * });
         * ```
         */
        getPermalink: (options: SlackTypes.GetPermalinkOptions) => Promise<SlackTypes.OAuthAPIResponse>;
        /**
         * Schedules a message to be sent to a channel.
         *
         * @returns Typical success response
         *
         * ```js
         * {
         *   "ok": true,
         *   "channel": "C1H9RESGL",
         *   "scheduledMessageId": "Q1298393284",
         *   "postAt": "1562180400",
         *   "message": {
         *     "text": "Here's a message for you in the future",
         *     "username": "ecto1",
         *     "botId": "B19LU7CSY",
         *     "attachments": [
         *       {
         *         "text": "This is an attachment",
         *         "id": 1,
         *         "fallback": "This is an attachment's fallback"
         *       }
         *     ],
         *     "type": "delayed_message",
         *     "subtype": "bot_message"
         *   }
         * }
         * ```
         *
         * @see https://api.slack.com/methods/chat.scheduleMessage
         *
         * @example
         *
         * ```js
         * await client.chat.scheduleMessage({
         *   channel: 'C1234567890',
         *   postAt: '299876400',
         *   text: 'Hello world',
         * });
         * ```
         */
        scheduleMessage: (options: SlackTypes.ScheduleMessageOptions) => Promise<SlackTypes.OAuthAPIResponse>;
        /**
         * Deletes a pending scheduled message from the queue.
         *
         * @returns Typical success response
         *
         * ```js
         * {
         *   "ok": true
         * }
         * ```
         *
         * @see https://api.slack.com/methods/chat.deleteScheduledMessage
         *
         * @example
         *
         * ```js
         * await client.chat.deleteScheduledMessage({
         *   channel: 'C123456789',
         *   scheduledMessageId: 'Q1234ABCD',
         * });
         * ```
         */
        deleteScheduledMessage: (options: SlackTypes.DeleteScheduledMessageOptions) => Promise<SlackTypes.OAuthAPIResponse>;
        /**
         * Provide custom unfurl behavior for user-posted URLs.
         *
         * @returns Typical, minimal success response
         *
         * ```js
         * {
         *   "ok": true
         * }
         * ```
         *
         * @see https://api.slack.com/methods/chat.unfurl
         *
         * @example
         *
         * ```js
         * await client.chat.unfurl({
         *   channel: 'C123456789',
         *   ts: '1502210682.580145',
         *   unfurls: {
         *     'https://example.com/': {
         *       text: 'Every day is the test.',
         *     },
         *   },
         * });
         * ```
         */
        unfurl: (options: SlackTypes.UnfurlOptions) => Promise<SlackTypes.OAuthAPIResponse>;
        scheduledMessages: {
            /**
             * Returns a list of scheduled messages.
             *
             * @returns Typical success response
             *
             * ```js
             * {
             *   "ok": true,
             *   "scheduledMessages": [
             *     {
             *       "id": 1298393284,
             *       "channelId": "C1H9RESGL",
             *       "postAt": 1551991428,
             *       "dateCreated": 1551891734,
             *       "text": "Here's a message for you in the future"
             *     }
             *   ],
             *   "responseMetadata": {
             *     "nextCursor": ""
             *   }
             * }
             * ```
             *
             * @see https://api.slack.com/methods/chat.scheduledMessages.list
             *
             * @example
             *
             * ```js
             * await client.chat.scheduledMessages.list({
             *   channel: 'C123456789',
             * });
             * ```
             */
            list: (options: SlackTypes.GetScheduledMessagesOptions) => Promise<SlackTypes.OAuthAPIResponse>;
        };
    };
    /**
     * views.* APIs.
     */
    readonly views: {
        /**
         * Open a view for a user.
         *
         * @returns Typical success response includes the opened view payload.
         *
         * @see https://api.slack.com/methods/views.open
         *
         * @example
         *
         * ```js
         * await client.views.open({
         *   triggerId: '12345.98765.abcd2358fdea',
         *   view: {
         *     id: 'VMHU10V25',
         *     teamId: 'T8N4K1JN',
         *     type: 'modal',
         *     title: {
         *       type: 'plain_text',
         *       text: 'Quite a plain modal',
         *     },
         *     submit: {
         *       type: 'plain_text',
         *       text: 'Create',
         *     },
         *     blocks: [
         *       {
         *         type: 'input',
         *         blockId: 'a_block_id',
         *         label: {
         *           type: 'plain_text',
         *           text: 'A simple label',
         *           emoji: true,
         *         },
         *         optional: false,
         *         element: {
         *           type: 'plain_text_input',
         *           actionId: 'an_action_id',
         *         },
         *       },
         *     ],
         *     privateMetadata: 'Shh it is a secret',
         *     callbackId: 'identify_your_modals',
         *     externalId: '',
         *     state: {
         *       values: [],
         *     },
         *     hash: '156772938.1827394',
         *     clearOnClose: false,
         *     notifyOnClose: false,
         *   },
         * });
         * ```
         */
        open: (options: SlackTypes.OpenViewOptions) => Promise<SlackTypes.OAuthAPIResponse>;
        /**
         * Publish a static view for a User.
         *
         * @returns Typical success response includes the published view payload.
         *
         * @see https://api.slack.com/methods/views.publish
         *
         * @example
         *
         * ```js
         * await client.views.publish({
         *   userId: 'U0BPQUNTA',
         *   view: {
         *     id: 'VMHU10V25',
         *     teamId: 'T8N4K1JN',
         *     type: 'modal',
         *     title: {
         *       type: 'plain_text',
         *       text: 'Quite a plain modal',
         *     },
         *     submit: {
         *       type: 'plain_text',
         *       text: 'Create',
         *     },
         *     blocks: [
         *       {
         *         type: 'input',
         *         blockId: 'a_block_id',
         *         label: {
         *           type: 'plain_text',
         *           text: 'A simple label',
         *           emoji: true,
         *         },
         *         optional: false,
         *         element: {
         *           type: 'plain_text_input',
         *           actionId: 'an_action_id',
         *         },
         *       },
         *     ],
         *     privateMetadata: 'Shh it is a secret',
         *     callbackId: 'identify_your_modals',
         *     externalId: '',
         *     state: {
         *       values: [],
         *     },
         *     hash: '156772938.1827394',
         *     clearOnClose: false,
         *     notifyOnClose: false,
         *   },
         *   hash: '156772938.1827394,
         * });
         * ```
         */
        publish: (options: SlackTypes.PublishViewOptions) => Promise<SlackTypes.OAuthAPIResponse>;
        /**
         * Push a view onto the stack of a root view.
         *
         * @returns Typical success response includes the pushed view payload.
         *
         * @see https://api.slack.com/methods/views.push
         *
         * @example
         *
         * ```js
         * await client.views.push({
         *   triggerId: '12345.98765.abcd2358fdea',
         *   view: {
         *     id: 'VMHU10V25',
         *     teamId: 'T8N4K1JN',
         *     type: 'modal',
         *     title: {
         *       type: 'plain_text',
         *       text: 'Quite a plain modal',
         *     },
         *     submit: {
         *       type: 'plain_text',
         *       text: 'Create',
         *     },
         *     blocks: [
         *       {
         *         type: 'input',
         *         blockId: 'a_block_id',
         *         label: {
         *           type: 'plain_text',
         *           text: 'A simple label',
         *           emoji: true,
         *         },
         *         optional: false,
         *         element: {
         *           type: 'plain_text_input',
         *           actionId: 'an_action_id',
         *         },
         *       },
         *     ],
         *     privateMetadata: 'Shh it is a secret',
         *     callbackId: 'identify_your_modals',
         *     externalId: '',
         *     state: {
         *       values: [],
         *     },
         *     hash: '156772938.1827394',
         *     clearOnClose: false,
         *     notifyOnClose: false,
         *   },
         * });
         * ```
         */
        push: (options: SlackTypes.PushViewOptions) => Promise<SlackTypes.OAuthAPIResponse>;
        /**
         * Update an existing view.
         *
         * @returns Typical success response includes the updated view payload.
         *
         * @see https://api.slack.com/methods/views.update
         *
         * @example
         *
         * ```js
         * await client.views.update({
         *   externalId: 'bmarley_view2',
         *   view: {
         *     id: 'VMHU10V25',
         *     teamId: 'T8N4K1JN',
         *     type: 'modal',
         *     title: {
         *       type: 'plain_text',
         *       text: 'Quite a plain modal',
         *     },
         *     submit: {
         *       type: 'plain_text',
         *       text: 'Create',
         *     },
         *     blocks: [
         *       {
         *         type: 'input',
         *         blockId: 'a_block_id',
         *         label: {
         *           type: 'plain_text',
         *           text: 'A simple label',
         *           emoji: true,
         *         },
         *         optional: false,
         *         element: {
         *           type: 'plain_text_input',
         *           actionId: 'an_action_id',
         *         },
         *       },
         *     ],
         *     privateMetadata: 'Shh it is a secret',
         *     callbackId: 'identify_your_modals',
         *     externalId: '',
         *     state: {
         *       values: [],
         *     },
         *     hash: '156772938.1827394',
         *     clearOnClose: false,
         *     notifyOnClose: false,
         *   },
         * });
         * ```
         */
        update: (options: SlackTypes.UpdateViewOptions) => Promise<SlackTypes.OAuthAPIResponse>;
    };
    /**
     * The callback to be called when receiving requests.
     */
    private onRequest?;
    constructor(config: SlackTypes.ClientConfig);
    callMethod(method: SlackTypes.AvailableMethod, inputBody?: Record<string, any>): Promise<SlackTypes.OAuthAPIResponse>;
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
    getChannelInfo(channelId: string, options?: SlackTypes.GetInfoOptions): Promise<SlackTypes.Channel>;
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
    getConversationInfo(channelId: string, options?: SlackTypes.GetInfoOptions): Promise<SlackTypes.Channel>;
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
    getConversationMembers(channelId: string, options?: SlackTypes.ConversationMembersOptions): Promise<{
        members: string[];
        next?: string;
    }>;
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
    getAllConversationMembers(channelId: string, options?: Omit<SlackTypes.ConversationMembersOptions, 'cursor'>): Promise<string[]>;
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
    getConversationList(options?: SlackTypes.ConversationListOptions): Promise<{
        channels: SlackTypes.Channel[];
        next?: string;
    }>;
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
    getAllConversationList(options?: Omit<SlackTypes.ConversationListOptions, 'cursor'>): Promise<SlackTypes.Channel[]>;
    postMessage(channel: string, inputMessage: SlackTypes.Message | string, options?: SlackTypes.PostMessageOptionalOptions): Promise<SlackTypes.OAuthAPIResponse>;
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
    private _postMessage;
    /**
     * Sends an ephemeral message to a user in a channel.
     *
     * @see https://api.slack.com/methods/chat.postEphemeral
     */
    postEphemeral(channel: string, user: string, inputMessage: SlackTypes.Message | string, options?: SlackTypes.PostEphemeralOptionalOptions): Promise<SlackTypes.OAuthAPIResponse>;
    /**
     * Sends an ephemeral message to a user in the channel.
     *
     * @see https://api.slack.com/methods/chat.postEphemeral
     *
     */
    private _postEphemeral;
    /**
     * Updates a message.
     *
     * @see https://api.slack.com/methods/chat.update
     */
    private _updateMessage;
    /**
     * Deletes a message.
     *
     * @see https://api.slack.com/methods/chat.delete
     */
    private _deleteMessage;
    /**
     * Share a me message into a channel.
     *
     * @see https://api.slack.com/methods/chat.meMessage
     */
    private _meMessage;
    /**
     * Retrieve a permalink URL for a specific extant message
     *
     * @see https://api.slack.com/methods/chat.getPermalink
     */
    private _getPermalink;
    /**
     * Schedules a message to be sent to a channel.
     *
     * @see https://api.slack.com/methods/chat.scheduleMessage
     */
    private _scheduleMessage;
    /**
     * Deletes a pending scheduled message from the queue.
     *
     * @see https://api.slack.com/methods/chat.deleteScheduledMessage
     */
    private _deleteScheduledMessage;
    /**
     * Returns a list of scheduled messages.
     *
     * @see https://api.slack.com/methods/chat.scheduledMessages.list
     */
    private _getScheduledMessages;
    /**
     * Provide custom unfurl behavior for user-posted URLs
     *
     * @see https://api.slack.com/methods/chat.unfurl
     */
    private _unfurl;
    /**
     * Open a view for a user.
     *
     * @see https://api.slack.com/methods/views.open
     */
    private _openView;
    /**
     * Publish a static view for a User.
     *
     * @see https://api.slack.com/methods/views.publish
     */
    private _publishView;
    /**
     * Update an existing view.
     *
     * @see https://api.slack.com/methods/views.update
     */
    private _updateView;
    /**
     * Push a view onto the stack of a root view.
     *
     * @see https://api.slack.com/methods/views.push
     */
    private _pushView;
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
    getUserInfo(userId: string, options?: SlackTypes.UserInfoOptions): Promise<SlackTypes.User>;
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
    getUserList(options?: SlackTypes.UserListOptions): Promise<{
        members: SlackTypes.User[];
        next?: string;
    }>;
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
    getAllUserList(options?: Omit<SlackTypes.UserListOptions, 'cursor'>): Promise<SlackTypes.User[]>;
}
//# sourceMappingURL=SlackOAuthClient.d.ts.map