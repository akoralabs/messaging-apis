import { OnRequestFunction } from 'messaging-api-common';
export declare type Attachment = {
    fallback: string;
    pretext?: string;
    color?: string;
    authorName?: string;
    authorLink?: string;
    authorIcon?: string;
    title?: string;
    titleLink?: string;
    text?: string;
    fields?: {
        title: string;
        value: string;
        short: boolean;
    }[];
    imageUrl?: string;
    thumbUrl?: string;
    footer?: string;
    footerIcon?: string;
    callbackId?: string;
    attachmentType?: string;
    actions: {
        name?: string;
        text?: string;
        type?: string;
        value?: string;
        style?: string;
        options?: {
            text: string;
            value: string;
        }[];
        confirm?: {
            title?: string;
            text?: string;
            okText?: string;
            dismissText?: string;
        };
    }[];
    ts?: number;
};
export declare type Message = {
    text?: string;
    attachments?: Attachment[] | string;
    blocks?: MessageBlock[] | string;
};
export declare type CompositionObject = TextObject | ConfirmObject | OptionObject;
export declare type TextObject = PlainTextObject | MrkdwnObject;
export declare type PlainTextObject = {
    type: 'plain_text';
    text: string;
    emoji?: boolean;
};
export declare type MrkdwnObject = {
    type: 'mrkdwn';
    text: string;
    verbatim?: boolean;
};
export declare type ConfirmObject = {
    title: PlainTextObject;
    text: TextObject;
    confirm: PlainTextObject;
    deny: PlainTextObject;
};
export declare type OptionObject = {
    text: PlainTextObject;
    value: string;
    url?: string;
};
export declare type OptionGroupObject = {
    label: PlainTextObject;
    options: OptionObject[];
};
export declare type BlockElement = ButtonElement | DatepickerElement | ImageElement | MultiSelectElement | OverflowElement | PlainTextInputElement | RadioButtonsElement | SelectElement;
export declare type ButtonElement = {
    type: 'button';
    text: PlainTextObject;
    actionId: string;
    url?: string;
    value?: string;
    style?: 'primary' | 'danger';
    confirm?: ConfirmObject;
};
export declare type DatepickerElement = {
    type: 'datepicker';
    actionId: string;
    placeholder?: PlainTextObject;
    initialDate?: string;
    confirm?: ConfirmObject;
};
export declare type ImageElement = {
    type: 'image';
    imageUrl: string;
    altText: string;
};
export declare type MultiSelectElement = MultiStaticSelectElement | MultiExternalSelectElement | MultiUsersSelectElement | MultiConversationsSelectElement | MultiChannelsSelectElement;
export declare type MultiStaticSelectElement = {
    type: 'multi_static_select';
    placeholder: PlainTextObject;
    actionId: string;
    options: OptionObject[];
    optionGroups?: OptionGroupObject[];
    initialOptions?: OptionObject[];
    confirm?: ConfirmObject;
};
export declare type MultiExternalSelectElement = {
    type: 'multi_external_select';
    placeholder: PlainTextObject;
    actionId: string;
    minQueryLength?: number;
    initialOptions?: OptionObject[];
    confirm?: ConfirmObject;
};
export declare type MultiUsersSelectElement = {
    type: 'multi_users_select';
    placeholder: PlainTextObject;
    actionId: string;
    initialUsers?: string[];
    confirm?: ConfirmObject;
};
export declare type MultiConversationsSelectElement = {
    type: 'multi_conversations_select';
    placeholder: PlainTextObject;
    actionId: string;
    initialConversations?: string[];
    confirm?: ConfirmObject;
};
export declare type MultiChannelsSelectElement = {
    type: 'multi_channels_select';
    placeholder: PlainTextObject;
    actionId: string;
    initialChannels?: string[];
    confirm?: ConfirmObject;
};
export declare type OverflowElement = {
    type: 'overflow';
    actionId: string;
    options: OptionObject[];
    confirm?: ConfirmObject;
};
export declare type PlainTextInputElement = {
    type: 'plain_text_input';
    actionId: string;
    placeholder?: PlainTextObject;
    initialValue: string;
    multiline?: boolean;
    minLength?: number;
    maxLength?: number;
};
export declare type RadioButtonsElement = {
    type: 'radio_buttons';
    actionId: string;
    options: OptionObject[];
    initialOption?: OptionObject;
    confirm?: ConfirmObject;
};
export declare type SelectElement = StaticSelectElement | ExternalSelectElement | UsersSelectElement | ConversationsSelectElement | ChannelsSelectElement;
export declare type StaticSelectElement = {
    type: 'static_select';
    placeholder: PlainTextObject;
    actionId: string;
    options: OptionObject[];
    optionGroups?: OptionGroupObject[];
    initialOption?: OptionObject;
    confirm?: ConfirmObject;
};
export declare type ExternalSelectElement = {
    type: 'external_select';
    placeholder: PlainTextObject;
    actionId: string;
    minQueryLength?: number;
    initialOption?: OptionObject;
    confirm?: ConfirmObject;
};
export declare type UsersSelectElement = {
    type: 'users_select';
    placeholder: PlainTextObject;
    actionId: string;
    initialUser?: string;
    confirm?: ConfirmObject;
};
export declare type ConversationsSelectElement = {
    type: 'conversations_select';
    placeholder: PlainTextObject;
    actionId: string;
    initialConversation?: string;
    confirm?: ConfirmObject;
};
export declare type ChannelsSelectElement = {
    type: 'channels_select';
    placeholder: PlainTextObject;
    actionId: string;
    initialChannel?: string;
    confirm?: ConfirmObject;
};
export declare type MessageBlock = ActionsBlock | ContextBlock | DividerBlock | FileBlock | ImageBlock | SectionBlock;
export declare type ModalBlock = ActionsBlock | ContextBlock | DividerBlock | ImageBlock | InputBlock | SectionBlock;
export declare type HomeBlock = ActionsBlock | ContextBlock | DividerBlock | ImageBlock | SectionBlock;
export declare type ActionsBlockElement = ButtonElement | SelectElement | OverflowElement | DatepickerElement;
export declare type ActionsBlock = {
    type: 'actions';
    elements: ActionsBlockElement[];
    blockId?: string;
};
export declare type ContextBlockElement = TextObject | ImageElement;
export declare type ContextBlock = {
    type: 'context';
    elements: ContextBlockElement[];
    blockId?: string;
};
export declare type DividerBlock = {
    type: 'divider';
    blockId?: string;
};
export declare type FileBlock = {
    type: 'file';
    externalId: string;
    source: string;
    blockId?: string;
};
export declare type ImageBlock = {
    type: 'image';
    imageUrl: string;
    altText: string;
    title?: PlainTextObject;
    blockId?: string;
};
export declare type InputBlockElement = PlainTextInputElement | SelectElement | MultiSelectElement | DatepickerElement;
export declare type InputBlock = {
    type: 'input';
    label: PlainTextObject;
    element: InputBlockElement;
    blockId?: string;
    hint?: PlainTextObject;
    optional?: boolean;
};
export declare type SectionBlock = {
    type: 'section';
    text: TextObject;
    blockId?: string;
    fields?: TextObject[];
    accessory?: BlockElement;
};
export declare type ViewCommon = {
    privateMetadata?: string;
    callbackId?: string;
    externalId?: string;
};
export declare type ModalView = {
    type: 'modal';
    title: PlainTextObject;
    blocks: ModalBlock[];
    close?: PlainTextObject;
    submit?: PlainTextObject;
    clearOnClose?: boolean;
    notifyOnClose?: boolean;
} & ViewCommon;
export declare type HomeView = {
    type: 'home';
    blocks: HomeBlock[];
} & ViewCommon;
export declare type View = ModalView | HomeView;
export declare type SendMessageSuccessResponse = 'ok';
export declare type OAuthAPIResponse = Record<string, any> & {
    ok: boolean;
};
export declare type AvailableMethod = 'api.test' | 'apps.permissions.info' | 'apps.permissions.request' | 'auth.revoke' | 'auth.test' | 'bots.info' | 'channels.archive' | 'channels.create' | 'channels.history' | 'channels.info' | 'channels.invite' | 'channels.join' | 'channels.kick' | 'channels.leave' | 'channels.list' | 'channels.mark' | 'channels.rename' | 'channels.replies' | 'channels.setPurpose' | 'channels.setTopic' | 'channels.unarchive' | 'chat.delete' | 'chat.meMessage' | 'chat.postEphemeral' | 'chat.postMessage' | 'chat.getPermalink' | 'chat.scheduleMessage' | 'chat.deleteScheduledMessage' | 'chat.scheduledMessages.list' | 'chat.unfurl' | 'chat.update' | 'conversations.archive' | 'conversations.close' | 'conversations.create' | 'conversations.history' | 'conversations.info' | 'conversations.invite' | 'conversations.join' | 'conversations.kick' | 'conversations.leave' | 'conversations.list' | 'conversations.members' | 'conversations.open' | 'conversations.rename' | 'conversations.replies' | 'conversations.setPurpose' | 'conversations.setTopic' | 'conversations.unarchive' | 'dnd.endDnd' | 'dnd.endSnooze' | 'dnd.info' | 'dnd.setSnooze' | 'dnd.teamInfo' | 'emoji.list' | 'files.comments.add' | 'files.comments.delete' | 'files.comments.edit' | 'files.delete' | 'files.info' | 'files.list' | 'files.revokePublicURL' | 'files.sharedPublicURL' | 'files.upload' | 'groups.archive' | 'groups.create' | 'groups.createChild' | 'groups.history' | 'groups.info' | 'groups.invite' | 'groups.kick' | 'groups.leave' | 'groups.list' | 'groups.mark' | 'groups.open' | 'groups.rename' | 'groups.replies' | 'groups.setPurpose' | 'groups.setTopic' | 'groups.unarchive' | 'im.close' | 'im.history' | 'im.list' | 'im.mark' | 'im.open' | 'im.replies' | 'oauth.access' | 'oauth.token' | 'pins.add' | 'pins.list' | 'pins.remove' | 'reactions.add' | 'reactions.get' | 'reactions.list' | 'reactions.remove' | 'reminders.add' | 'reminders.complete' | 'reminders.delete' | 'reminders.info' | 'reminders.list' | 'rtm.connect' | 'rtm.start' | 'search.all' | 'search.files' | 'search.messages' | 'stars.add' | 'stars.list' | 'stars.remove' | 'team.accessLogs' | 'team.billableInfo' | 'team.info' | 'team.integrationLogs' | 'team.profile.get' | 'usergroups.create' | 'usergroups.disable' | 'usergroups.enable' | 'usergroups.list' | 'usergroups.update' | 'usergroups.users.list' | 'usergroups.users.update' | 'users.deletePhoto' | 'users.getPresence' | 'users.identity' | 'users.info' | 'users.list' | 'users.setActive' | 'users.setPhoto' | 'users.setPresence' | 'users.profile.get' | 'users.profile.set' | 'views.open' | 'views.publish' | 'views.update' | 'views.push';
export interface User {
    id: string;
    name: string;
    realName: string;
}
export declare type Channel = {
    id: string;
    name: string;
    members?: User[];
};
export declare type GetInfoOptions = {
    includeLocale?: boolean;
};
export declare type UserInfoOptions = {
    includeLocale?: boolean;
};
export declare type PostMessageOptionalOptions = {
    asUser?: boolean;
    attachments?: string | Attachment[];
    iconEmoji?: string;
    iconUrl?: string;
    linkNames?: boolean;
    parse?: 'none' | 'full';
    replyBroadcast?: boolean;
    threadTs?: string;
    unfurlLinks?: boolean;
    unfurlMedia?: boolean;
    username?: string;
};
export declare type PostEphemeralOptionalOptions = {
    /**
     * Pass true to post the message as the authed user. Defaults to true if the chat:write:bot scope is not included. Otherwise, defaults to false.
     */
    asUser?: boolean;
    /**
     * A JSON-based array of structured attachments, presented as a URL-encoded string.
     */
    attachments?: string | Attachment[];
    /**
     * Find and link channel names and usernames.
     */
    linkNames?: boolean;
    /**
     * Change how messages are treated. Defaults to `none`. See below.
     */
    parse?: 'none' | 'full';
};
export declare type PostMessageOptions = PostMessageOptionalOptions & Message & {
    channel: string;
};
export declare type PostEphemeralOptions = PostEphemeralOptionalOptions & Message & {
    /**
     * Channel, private group, or IM channel to send message to. Can be an encoded ID, or a name.
     */
    channel: string;
    /**
     * `id` of the user who will receive the ephemeral message. The user should be in the `channel` specified by the channel argument.
     */
    user: string;
};
export declare type UpdateMessageOptions = Message & {
    /**
     * Channel containing the message to be updated.
     */
    channel: string;
    /**
     * Timestamp of the message to be updated.
     */
    ts: string;
    /**
     * Pass true to update the message as the authed user. Bot users in this context are considered authed users.
     */
    asUser?: boolean;
    /**
     * A JSON-based array of structured attachments, presented as a URL-encoded string. This field is required when not presenting text. If you don't include this field, the message's previous attachments will be retained. To remove previous attachments, include an empty array for this field.
     */
    attachments?: string | Attachment[];
    /**
     * A JSON-based array of structured blocks, presented as a URL-encoded string. If you don't include this field, the message's previous blocks will be retained. To remove previous blocks, include an empty array for this field.
     */
    blocks?: any;
    /**
     * Find and link channel names and usernames. Defaults to none. If you do not specify a value for this field, the original value set for the message will be overwritten with the default, none.
     */
    linkNames?: boolean;
    /**
     * Change how messages are treated. Defaults to client, unlike chat.postMessage. Accepts either none or full. If you do not specify a value for this field, the original value set for the message will be overwritten with the default, client.
     */
    parse?: 'none' | 'full';
    /**
     * New text for the message, using the default formatting rules. It's not required when presenting blocks or attachments.
     */
    text?: string;
};
export declare type DeleteMessageOptions = {
    /**
     * Channel containing the message to be deleted.
     */
    channel: string;
    /**
     * Timestamp of the message to be deleted.
     */
    ts: string;
    /**
     * Pass true to delete the message as the authed user with chat:write:user scope. Bot users in this context are considered authed users. If unused or false, the message will be deleted with chat:write:bot scope.
     */
    asUser?: boolean;
};
export declare type GetPermalinkOptions = {
    /**
     * The ID of the conversation or channel containing the message
     */
    channel: string;
    /**
     * A message's ts value, uniquely identifying it within a channel
     */
    messageTs: string;
};
export declare type MeMessageOptions = {
    /**
     * Channel to send message to. Can be a public channel, private group or IM channel. Can be an encoded ID, or a name.
     */
    channel: string;
    /**
     * Text of the message to send.
     */
    text: string;
};
export declare type DeleteScheduledMessageOptions = {
    /**
     * The channel the scheduled message is posting to
     */
    channel: string;
    /**
     * `scheduledMessageId` returned from call to chat.scheduleMessage
     */
    scheduledMessageId: string;
    /**
     * Pass true to delete the message as the authed user with chat:write:user scope. Bot users in this context are considered authed users. If unused or false, the message will be deleted with chat:write:bot scope.
     */
    asUser?: boolean;
};
export declare type ScheduleMessageOptions = Message & {
    /**
     * Channel, private group, or DM channel to send message to. Can be an encoded ID, or a name. See below for more details.
     */
    channel: string;
    /**
     * Pass true to post the message as the authed user, instead of as a bot. Defaults to false. See chat.postMessage.
     */
    asUser?: boolean;
    /**
     * A JSON-based array of structured attachments, presented as a URL-encoded string.
     */
    attachments?: string | Attachment[];
    /**
     * Find and link channel names and usernames.
     */
    linkNames?: boolean;
    /**
     * Change how messages are treated. Defaults to none. See chat.postMessage.
     */
    parse?: 'none' | 'full';
    /**
     * Used in conjunction with thread_ts and indicates whether reply should be made visible to everyone in the channel or conversation. Defaults to false.
     */
    replyBroadcast?: boolean;
    /**
     * Provide another message's ts value to make this message a reply. Avoid using a reply's ts value; use its parent instead.
     */
    threadTs?: string;
    /**
     * Pass true to enable unfurling of primarily text-based content.
     */
    unfurlLinks?: boolean;
    /**
     * Pass false to disable unfurling of media content.
     */
    unfurlMedia?: boolean;
    /**
     * Unix EPOCH timestamp of time in future to send the message.
     */
    postAt?: string;
};
export declare type GetScheduledMessagesOptions = {
    /**
     * The channel of the scheduled messages
     */
    channel?: string;
    /**
     * For pagination purposes, this is the `cursor` value returned from a previous call to `chat.scheduledmessages.list` indicating where you want to start this call from.
     */
    cursor?: string;
    /**
     * A UNIX timestamp of the latest value in the time range
     */
    latest?: string;
    /**
     * Maximum number of original entries to return.
     */
    limit?: number;
    /**
     * A UNIX timestamp of the oldest value in the time range
     */
    oldest?: string;
};
export declare type ConversationMembersOptions = {
    cursor?: string;
    limit?: number;
};
export declare type ConversationListOptions = {
    cursor?: string;
    excludeArchived?: boolean;
    limit?: number;
    types?: string;
};
export declare type UserListOptions = {
    cursor?: string;
    includeLocale?: boolean;
    limit?: number;
};
export declare type ClientConfig = {
    accessToken: string;
    origin?: string;
    onRequest?: OnRequestFunction;
};
export declare type UnfurlOptions = {
    /**
     * Channel ID of the message
     */
    channel: string;
    /**
     * Timestamp of the message to add unfurl behavior to.
     */
    ts: string;
    /**
     * URL-encoded JSON map with keys set to URLs featured in the the message, pointing to their unfurl blocks or message attachments.
     */
    unfurls: Record<string, any>;
    /**
     * Provide a simply-formatted string to send as an ephemeral message to the user as invitation to authenticate further and enable full unfurling behavior
     */
    userAuthMessage?: string;
    /**
     * Set to true or 1 to indicate the user must install your Slack app to trigger unfurls for this domain
     */
    userAuthRequired?: boolean;
    /**
     * Send users to this custom URL where they will complete authentication in your app to fully trigger unfurling. Value should be properly URL-encoded.
     */
    userAuthUrl?: string;
};
export declare type OpenViewOptions = {
    /**
     * Exchange a trigger to post to the user.
     */
    triggerId: string;
    /**
     * A view payload.
     */
    view: View;
};
export declare type PublishViewOptions = {
    /**
     * `id` of the user you want publish a view to.
     */
    userId: string;
    /**
     * A view payload.
     */
    view: View;
    /**
     * A string that represents view state to protect against possible race conditions.
     */
    hash?: string;
};
export declare type UpdateViewOptions = {
    /**
     * A view object.
     */
    view: View;
    /**
     * A unique identifier of the view set by the developer. Must be unique for all views on a team. Max length of 255 characters. Either viewId or externalId is required.
     */
    externalId?: string;
    /**
     * A string that represents view state to protect against possible race conditions.
     */
    hash?: string;
    /**
     * A unique identifier of the view to be updated. Either viewId or externalId is required.
     */
    viewId?: string;
};
export declare type PushViewOptions = {
    /**
     * Exchange a trigger to post to the user.
     */
    triggerId: string;
    /**
     * A view payload.
     */
    view: View;
};
//# sourceMappingURL=SlackTypes.d.ts.map