/// <reference types="node" />
import fs from 'fs';
import { OnRequestFunction } from 'messaging-api-common';
export declare type ClientConfig = {
    accessToken: string;
    appId?: string;
    appSecret?: string;
    version?: string;
    origin?: string;
    onRequest?: OnRequestFunction;
    skipAppSecretProof?: boolean;
};
/**
 * Page Scoped User ID (PSID) of the message recipient.
 */
export declare type RecipientWithID = {
    id: string;
};
/**
 * Used for Customer Matching. (Closed Beta)
 */
export declare type RecipientWithPhoneNumber = {
    phoneNumber: string;
    name?: Record<string, any>;
};
/**
 * Used for the checkbox plugin.
 */
export declare type RecipientWithUserRef = {
    userRef: string;
};
/**
 * Used for Private Replies to reference the visitor post to reply to.
 */
export declare type RecipientWithPostId = {
    postId: string;
};
/**
 * Used for Private Replies to reference the post comment to reply to.
 */
export declare type RecipientWithCommentId = {
    commentId: string;
};
/**
 * Used for the Messenger Platform's One-Time Notification API.
 */
export declare type RecipientWithOneTimeNotifToken = {
    oneTimeNotifToken: string;
};
/**
 * Description of the message recipient. All requests must include one to identify the recipient.
 */
export declare type Recipient = RecipientWithID | RecipientWithPhoneNumber | RecipientWithUserRef | RecipientWithPostId | RecipientWithCommentId | RecipientWithOneTimeNotifToken;
/**
 * Description of the message recipient. If a string is provided, it will be recognized as a psid.
 */
export declare type PsidOrRecipient = string | Recipient;
export declare type UrlMediaAttachmentPayload = {
    url: string;
    isReusable?: boolean;
};
export declare type AttachmentIdAttachmentPayload = {
    attachmentId: string;
};
export declare type MediaAttachmentPayload = UrlMediaAttachmentPayload | AttachmentIdAttachmentPayload;
export declare type MediaAttachmentType = 'audio' | 'video' | 'image' | 'file';
export declare type FileDataAttachmentPayload = {
    isReusable?: boolean;
};
export declare type FileDataMediaAttachment = {
    type: MediaAttachmentType;
    payload: FileDataAttachmentPayload;
};
export declare type FileDataMediaAttachmentMessage = {
    attachment: FileDataMediaAttachment;
    quickReplies?: QuickReply[];
};
export declare type MediaAttachment = {
    type: MediaAttachmentType;
    payload: MediaAttachmentPayload;
};
export declare type TemplateAttachmentPayload = {
    templateType: 'button' | 'generic' | 'media' | 'receipt' | 'airline_boardingpass' | 'airline_checkin' | 'airline_itinerary' | 'airline_update' | 'one_time_notif_req';
    [key: string]: any;
};
export declare type TemplateAttachment = {
    type: 'template';
    payload: TemplateAttachmentPayload;
};
export declare type Attachment = MediaAttachment | TemplateAttachment;
export declare type TextQuickReply = {
    contentType: 'text';
    title: string;
    payload: string;
    imageUrl?: string;
};
export declare type UserPhoneNumberQuickReply = {
    contentType: 'user_phone_number';
};
export declare type UserEmailQuickReply = {
    contentType: 'user_email';
};
export declare type QuickReply = TextQuickReply | UserPhoneNumberQuickReply | UserEmailQuickReply;
export declare type TextMessage = {
    text?: string;
    quickReplies?: QuickReply[];
};
export declare type AttachmentMessage = {
    attachment?: Attachment;
    quickReplies?: QuickReply[];
};
export declare type Message = TextMessage | AttachmentMessage;
export declare type MessagingType = 'RESPONSE' | 'UPDATE' | 'MESSAGE_TAG' | 'NON_PROMOTIONAL_SUBSCRIPTION';
export declare type MessageTag = 'CONFIRMED_EVENT_UPDATE' | 'POST_PURCHASE_UPDATE' | 'ACCOUNT_UPDATE' | 'HUMAN_AGENT';
export declare type InsightMetric = 'page_messages_blocked_conversations_unique' | 'page_messages_reported_conversations_unique' | 'page_messages_total_messaging_connections' | 'page_messages_new_conversations_unique';
export declare type InsightOptions = {
    since?: number;
    until?: number;
};
export declare type SendOption = {
    messagingType?: MessagingType;
    tag?: MessageTag;
    quickReplies?: QuickReply[];
    personaId?: string;
};
export declare type SenderActionOption = {
    personaId?: string;
};
export declare type UploadOption = {
    filename?: string;
    isReusable?: boolean;
};
export declare type TemplateButton = {
    type: string;
    title: string;
    url?: string;
    payload?: string;
    webviewHeightRatio?: 'compact' | 'tall' | 'full';
};
export declare type MenuItem = TemplateButton;
export declare type TemplateElement = {
    title: string;
    imageUrl?: string;
    subtitle?: string;
    defaultAction?: {
        type: string;
        url: string;
        messengerExtensions?: boolean;
        webviewHeightRatio?: string;
        fallbackUrl?: string;
    };
    buttons?: TemplateButton[];
};
export declare type MediaElement = {
    mediaType: 'image' | 'video';
    attachmentId?: string;
    url?: string;
    buttons?: TemplateButton[];
};
export declare type Address = {
    street1: string;
    street2?: string;
    city: string;
    postalCode: string;
    state: string;
    country: string;
};
export declare type Summary = {
    subtotal?: number;
    shippingCost?: number;
    totalTax?: number;
    totalCost: number;
};
export declare type Adjustment = {
    name?: string;
    amount?: number;
};
export declare type ReceiptElement = {
    title: string;
    subtitle?: string;
    quantity?: number;
    price: number;
    currency?: string;
    imageUrl: string;
};
export declare type ReceiptAttributes = {
    recipientName: string;
    merchantName?: string;
    orderNumber: string;
    currency: string;
    paymentMethod: string;
    timestamp?: string;
    orderUrl?: string;
    elements?: ReceiptElement[];
    address?: Address;
    summary: Summary;
    adjustments?: Adjustment[];
};
export declare type Airport = {
    airportCode: string;
    city: string;
    terminal?: string;
    gate?: string;
};
export declare type FlightSchedule = {
    boardingTime?: string;
    departureTime: string;
    arrivalTime?: string;
};
export declare type FlightInfo = {
    connectionId: string;
    segmentId: string | PassengerSegmentInfo;
    flightNumber: string;
    aircraftType?: string;
    departureAirport: Airport;
    arrivalAirport: Airport;
    flightSchedule: FlightSchedule;
    travelClass: 'economy' | 'business' | 'first_class';
};
export declare type Field = {
    label: string;
    value: string;
};
export declare type BoardingPass = {
    passengerName: string;
    pnrNumber: string;
    travelClass?: string;
    seat?: string;
    auxiliaryFields?: Field[];
    secondaryFields?: Field[];
    logoImageUrl: string;
    headerImageUrl?: string;
    headerTextField?: Field;
    qrCode?: string;
    barcodeImageUrl?: string;
    aboveBarCodeImageUrl: string;
    flightInfo: FlightInfo;
};
export declare type AirlineBoardingPassAttributes = {
    introMessage: string;
    locale: string;
    boardingPass: BoardingPass[];
};
export declare type PassengerInfo = {
    passengerId: string;
    ticketNumber?: string;
    name: string;
};
export declare type ProductInfo = {
    title: string;
    value: string;
};
export declare type PassengerSegmentInfo = {
    segmentId: string;
    passengerId: string;
    seat: string;
    seatType: string;
    productInfo?: ProductInfo[];
};
export declare type PriceInfo = {
    title: string;
    amount: string;
    currency?: string;
};
export declare type AirlineCheckinAttributes = {
    introMessage: string;
    locale: string;
    pnrNumber?: string;
    checkinUrl: string;
    flightInfo: FlightInfo[];
};
export declare type AirlineItineraryAttributes = {
    introMessage: string;
    locale: string;
    themeColor?: string;
    pnrNumber: string;
    passengerInfo: PassengerInfo[];
    flightInfo: FlightInfo[];
    passengerSegmentInfo: PassengerSegmentInfo[];
    priceInfo?: PriceInfo[];
    basePrice?: string;
    tax?: string;
    totalPrice: string;
    currency: string;
};
export declare type UpdateFlightInfo = {
    flightNumber: string;
    departureAirport: Airport;
    arrivalAirport: Airport;
    flightSchedule: FlightSchedule;
};
export declare type AirlineUpdateAttributes = {
    introMessage: string;
    themeColor?: string;
    updateType: 'delay' | 'gate_change' | 'cancellation';
    locale: string;
    pnrNumber?: string;
    updateFlightInfo: UpdateFlightInfo;
};
export declare type OneTimeNotifReqAttributes = {
    title: string;
    payload: string;
};
export declare type SenderAction = 'mark_seen' | 'typing_on' | 'typing_off';
/**
 * Fields can be retrieved from a person's profile information
 */
export declare type UserProfileField = 'id' | 'name' | 'first_name' | 'last_name' | 'profile_pic' | 'locale' | 'timezone' | 'gender';
/**
 * The User Profile API allows you to use a Page-scoped ID (PSID) to retrieve user profile information in this format
 */
export declare type User = {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    profilePic: string;
    locale?: string;
    timezone?: number;
    gender?: string;
};
export declare type PersistentMenuItem = {
    locale: string;
    composerInputDisabled: boolean;
    callToActions: MenuItem[];
};
export declare type PersistentMenu = PersistentMenuItem[];
export declare type GreetingConfig = {
    locale: string;
    text: string;
};
export declare type IceBreaker = {
    question: string;
    payload: string;
};
export declare type UserPersistentMenu = {
    userLevelPersistentMenu?: PersistentMenu;
    pageLevelPersistentMenu?: PersistentMenu;
};
export declare type MessengerProfile = {
    getStarted?: {
        payload: string;
    };
    persistentMenu?: PersistentMenu;
    greeting?: {
        locale: string;
        text: string;
    }[];
    iceBreakers?: IceBreaker[];
    whitelistedDomains?: string[];
    accountLinkingUrl?: string;
    paymentSettings?: {
        privacyUrl?: string;
        publicKey?: string;
        testUsers?: string[];
    };
    homeUrl?: {
        url: string;
        webviewHeightRatio: 'tall';
        webviewShareButton?: 'hide' | 'show';
        inTest: boolean;
    };
};
export declare type MessengerProfileResponse = {
    data: MessengerProfile[];
};
export declare type MutationSuccessResponse = {
    result: string;
};
export declare type SendMessageSuccessResponse = {
    recipientId: string;
    messageId: string;
};
export declare type SendSenderActionResponse = {
    recipientId: string;
};
export declare type MessageTagResponse = {
    tag: MessageTag;
    description: string;
}[];
export declare type FileData = Buffer | fs.ReadStream;
export declare type BatchRequestOptions = {
    name?: string;
    dependsOn?: string;
    omitResponseOnSuccess?: boolean;
};
export declare type Model = 'CUSTOM' | 'CHINESE' | 'CROATIAN' | 'DANISH' | 'DUTCH' | 'ENGLISH' | 'FRENCH_STANDARD' | 'GERMAN_STANDARD' | 'HEBREW' | 'HUNGARIAN' | 'IRISH' | 'ITALIAN_STANDARD' | 'KOREAN' | 'NORWEGIAN_BOKMAL' | 'POLISH' | 'PORTUGUESE' | 'ROMANIAN' | 'SPANISH' | 'SWEDISH' | 'VIETNAMESE';
export declare type MessengerNLPConfig = {
    nlpEnabled?: boolean;
    model?: Model;
    customToken?: string;
    verbose?: boolean;
    nBest?: number;
};
export declare type PageInfo = {
    name: string;
    id: string;
};
declare type Scope = string;
export declare type TokenInfo = {
    appId: string;
    type: 'PAGE' | 'APP' | 'USER';
    application: string;
    dataAccessExpiresAt: number;
    expiresAt: number;
    isValid: true;
    issuedAt?: number;
    profileId: string;
    scopes: Scope[];
    userId: string;
};
export declare type MessagingFeatureReview = {
    feature: string;
    status: 'pending' | 'rejected' | 'approved' | 'limited';
};
export declare type Persona = {
    name: string;
    profilePictureUrl: string;
};
export declare type SubscriptionFields = {
    name: string;
    version: string;
};
export declare type MessengerSubscription = {
    object: string;
    callbackUrl: string;
    active: boolean;
    fields: SubscriptionFields[];
};
export declare type BatchItem = {
    method: string;
    relativeUrl: string;
    name?: string;
    body?: Record<string, any>;
    responseAccessPath?: string;
} & BatchRequestOptions;
export {};
//# sourceMappingURL=MessengerTypes.d.ts.map