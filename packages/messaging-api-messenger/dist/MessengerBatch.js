"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getAssociatedLabels = exports.dissociateLabel = exports.associateLabel = exports.getThreadOwner = exports.requestThreadControl = exports.takeThreadControl = exports.passThreadControlToPageInbox = exports.passThreadControl = exports.markSeen = exports.typingOff = exports.typingOn = exports.sendSenderAction = exports.deleteUserPersistentMenu = exports.setUserPersistentMenu = exports.getUserPersistentMenu = exports.getUserProfile = exports.sendOneTimeNotifReqTemplate = exports.sendAirlineUpdateTemplate = exports.sendAirlineItineraryTemplate = exports.sendAirlineCheckinTemplate = exports.sendAirlineBoardingPassTemplate = exports.sendMediaTemplate = exports.sendReceiptTemplate = exports.sendGenericTemplate = exports.sendButtonTemplate = exports.sendTemplate = exports.sendFile = exports.sendVideo = exports.sendImage = exports.sendAudio = exports.sendAttachment = exports.sendText = exports.sendMessage = exports.sendRequest = void 0;
const omit_1 = __importDefault(require("lodash/omit"));
const pick_1 = __importDefault(require("lodash/pick"));
const Messenger = __importStar(require("./Messenger"));
function omitUndefinedFields(obj = {}) {
    return JSON.parse(JSON.stringify(obj));
}
function pickBatchOptions(options) {
    return (0, pick_1.default)(options, ['name', 'dependsOn', 'omitResponseOnSuccess']);
}
function omitBatchOptions(options) {
    return (0, omit_1.default)(options, ['name', 'dependsOn', 'omitResponseOnSuccess']);
}
function sendRequest(body, options) {
    return Object.assign({ method: 'POST', relativeUrl: 'me/messages', body }, options);
}
exports.sendRequest = sendRequest;
function sendMessage(psidOrRecipient, msg, options = {}) {
    const recipient = typeof psidOrRecipient === 'string'
        ? {
            id: psidOrRecipient,
        }
        : psidOrRecipient;
    let messagingType = 'UPDATE';
    if (options.messagingType) {
        messagingType = options.messagingType;
    }
    else if (options.tag) {
        messagingType = 'MESSAGE_TAG';
    }
    const batchRequestOptions = pickBatchOptions(options);
    return sendRequest(Object.assign({ messagingType,
        recipient, message: Messenger.createMessage(msg, options) }, omitUndefinedFields(omitBatchOptions(options))), batchRequestOptions);
}
exports.sendMessage = sendMessage;
function sendText(psidOrRecipient, text, options) {
    return sendMessage(psidOrRecipient, Messenger.createText(text, options), options);
}
exports.sendText = sendText;
function sendAttachment(psidOrRecipient, attachment, options) {
    return sendMessage(psidOrRecipient, Messenger.createAttachment(attachment, options), options);
}
exports.sendAttachment = sendAttachment;
function sendAudio(psidOrRecipient, audio, options) {
    return sendMessage(psidOrRecipient, Messenger.createAudio(audio, options), options);
}
exports.sendAudio = sendAudio;
function sendImage(psidOrRecipient, image, options) {
    return sendMessage(psidOrRecipient, Messenger.createImage(image, options), options);
}
exports.sendImage = sendImage;
function sendVideo(psidOrRecipient, video, options) {
    return sendMessage(psidOrRecipient, Messenger.createVideo(video, options), options);
}
exports.sendVideo = sendVideo;
function sendFile(psidOrRecipient, file, options) {
    return sendMessage(psidOrRecipient, Messenger.createFile(file, options), options);
}
exports.sendFile = sendFile;
function sendTemplate(psidOrRecipient, payload, options) {
    return sendMessage(psidOrRecipient, Messenger.createTemplate(payload, options), options);
}
exports.sendTemplate = sendTemplate;
function sendButtonTemplate(psidOrRecipient, text, buttons, options) {
    return sendMessage(psidOrRecipient, Messenger.createButtonTemplate(text, buttons, options), options);
}
exports.sendButtonTemplate = sendButtonTemplate;
function sendGenericTemplate(psidOrRecipient, elements, _a = {}) {
    var { imageAspectRatio = 'horizontal' } = _a, options = __rest(_a, ["imageAspectRatio"]);
    return sendMessage(psidOrRecipient, Messenger.createGenericTemplate(elements, Object.assign(Object.assign({}, options), { imageAspectRatio })), options);
}
exports.sendGenericTemplate = sendGenericTemplate;
function sendReceiptTemplate(psidOrRecipient, receipt, options) {
    return sendMessage(psidOrRecipient, Messenger.createReceiptTemplate(receipt, options), options);
}
exports.sendReceiptTemplate = sendReceiptTemplate;
function sendMediaTemplate(psidOrRecipient, elements, options) {
    return sendMessage(psidOrRecipient, Messenger.createMediaTemplate(elements, options), options);
}
exports.sendMediaTemplate = sendMediaTemplate;
function sendAirlineBoardingPassTemplate(psidOrRecipient, attrs, options) {
    return sendMessage(psidOrRecipient, Messenger.createAirlineBoardingPassTemplate(attrs, options), options);
}
exports.sendAirlineBoardingPassTemplate = sendAirlineBoardingPassTemplate;
function sendAirlineCheckinTemplate(psidOrRecipient, attrs, options) {
    return sendMessage(psidOrRecipient, Messenger.createAirlineCheckinTemplate(attrs, options), options);
}
exports.sendAirlineCheckinTemplate = sendAirlineCheckinTemplate;
function sendAirlineItineraryTemplate(psidOrRecipient, attrs, options) {
    return sendMessage(psidOrRecipient, Messenger.createAirlineItineraryTemplate(attrs, options), options);
}
exports.sendAirlineItineraryTemplate = sendAirlineItineraryTemplate;
function sendAirlineUpdateTemplate(psidOrRecipient, attrs, options) {
    return sendMessage(psidOrRecipient, Messenger.createAirlineUpdateTemplate(attrs, options), options);
}
exports.sendAirlineUpdateTemplate = sendAirlineUpdateTemplate;
function sendOneTimeNotifReqTemplate(psidOrRecipient, attrs, options) {
    return sendMessage(psidOrRecipient, Messenger.createOneTimeNotifReqTemplate(attrs, options), options);
}
exports.sendOneTimeNotifReqTemplate = sendOneTimeNotifReqTemplate;
function getUserProfile(userId, options = {}) {
    const batchRequestOptions = pickBatchOptions(options);
    const fields = options.fields || [
        'id',
        'name',
        'first_name',
        'last_name',
        'profile_pic',
    ];
    return Object.assign({ method: 'GET', relativeUrl: `${userId}?fields=${fields.join(',')}`.concat(options.accessToken ? `&access_token=${options.accessToken}` : '') }, batchRequestOptions);
}
exports.getUserProfile = getUserProfile;
function getUserPersistentMenu(userId, options = {}) {
    const batchRequestOptions = pickBatchOptions(options);
    return Object.assign({ method: 'GET', relativeUrl: `/me/custom_user_settings?psid=${userId}`.concat(options.accessToken ? `&access_token=${options.accessToken}` : '') }, batchRequestOptions);
}
exports.getUserPersistentMenu = getUserPersistentMenu;
function setUserPersistentMenu(userId, menuItems, options = {}) {
    const batchRequestOptions = pickBatchOptions(options);
    if (menuItems.some((item) => 'locale' in item && item.locale === 'default')) {
        return Object.assign({ method: 'POST', relativeUrl: `/me/custom_user_settings`.concat(options.accessToken ? `?access_token=${options.accessToken}` : ''), body: {
                psid: userId,
                persistentMenu: menuItems,
            } }, batchRequestOptions);
    }
    return Object.assign({ method: 'POST', relativeUrl: `/me/custom_user_settings`.concat(options.accessToken ? `?access_token=${options.accessToken}` : ''), body: {
            psid: userId,
            persistentMenu: [
                {
                    locale: 'default',
                    composerInputDisabled: false,
                    callToActions: menuItems,
                },
            ],
        } }, batchRequestOptions);
}
exports.setUserPersistentMenu = setUserPersistentMenu;
function deleteUserPersistentMenu(userId, options = {}) {
    const batchRequestOptions = pickBatchOptions(options);
    return Object.assign({ method: 'DELETE', relativeUrl: `/me/custom_user_settings?psid=${userId}&params=[%22persistent_menu%22]`.concat(options.accessToken ? `&access_token=${options.accessToken}` : '') }, batchRequestOptions);
}
exports.deleteUserPersistentMenu = deleteUserPersistentMenu;
function sendSenderAction(psidOrRecipient, senderAction, options = {}) {
    const recipient = typeof psidOrRecipient === 'string'
        ? {
            id: psidOrRecipient,
        }
        : psidOrRecipient;
    const batchRequestOptions = pickBatchOptions(options);
    return sendRequest(Object.assign({ recipient,
        senderAction }, omitUndefinedFields(omitBatchOptions(options))), batchRequestOptions);
}
exports.sendSenderAction = sendSenderAction;
function typingOn(idOrRecipient, options) {
    return sendSenderAction(idOrRecipient, 'typing_on', options);
}
exports.typingOn = typingOn;
function typingOff(idOrRecipient, options) {
    return sendSenderAction(idOrRecipient, 'typing_off', options);
}
exports.typingOff = typingOff;
function markSeen(idOrRecipient, options) {
    return sendSenderAction(idOrRecipient, 'mark_seen', options);
}
exports.markSeen = markSeen;
function passThreadControl(recipientId, targetAppId, metadata, options = {}) {
    const batchRequestOptions = pickBatchOptions(options);
    return Object.assign({ method: 'POST', relativeUrl: 'me/pass_thread_control', body: Object.assign({ recipient: { id: recipientId }, targetAppId,
            metadata }, omitUndefinedFields(omitBatchOptions(options))) }, batchRequestOptions);
}
exports.passThreadControl = passThreadControl;
function passThreadControlToPageInbox(recipientId, metadata, options = {}) {
    return passThreadControl(recipientId, 263902037430900, metadata, options);
}
exports.passThreadControlToPageInbox = passThreadControlToPageInbox;
function takeThreadControl(recipientId, metadata, options = {}) {
    const batchRequestOptions = pickBatchOptions(options);
    return Object.assign({ method: 'POST', relativeUrl: 'me/take_thread_control', body: Object.assign({ recipient: { id: recipientId }, metadata }, omitUndefinedFields(omitBatchOptions(options))) }, batchRequestOptions);
}
exports.takeThreadControl = takeThreadControl;
function requestThreadControl(recipientId, metadata, options = {}) {
    const batchRequestOptions = pickBatchOptions(options);
    return Object.assign({ method: 'POST', relativeUrl: 'me/request_thread_control', body: Object.assign({ recipient: { id: recipientId }, metadata }, omitUndefinedFields(omitBatchOptions(options))) }, batchRequestOptions);
}
exports.requestThreadControl = requestThreadControl;
function getThreadOwner(recipientId, options = {}) {
    const batchRequestOptions = pickBatchOptions(options);
    return Object.assign({ method: 'GET', relativeUrl: `me/thread_owner?recipient=${recipientId}`.concat(options.accessToken ? `&access_token=${options.accessToken}` : ''), responseAccessPath: 'data[0].threadOwner' }, batchRequestOptions);
}
exports.getThreadOwner = getThreadOwner;
function associateLabel(userId, labelId, options = {}) {
    const batchRequestOptions = pickBatchOptions(options);
    return Object.assign({ method: 'POST', relativeUrl: `${labelId}/label`, body: Object.assign({ user: userId }, omitUndefinedFields(omitBatchOptions(options))) }, batchRequestOptions);
}
exports.associateLabel = associateLabel;
function dissociateLabel(userId, labelId, options = {}) {
    const batchRequestOptions = pickBatchOptions(options);
    return Object.assign({ method: 'DELETE', relativeUrl: `${labelId}/label`, body: Object.assign({ user: userId }, omitUndefinedFields(omitBatchOptions(options))) }, batchRequestOptions);
}
exports.dissociateLabel = dissociateLabel;
function getAssociatedLabels(userId, options = {}) {
    const batchRequestOptions = pickBatchOptions(options);
    return Object.assign({ method: 'GET', relativeUrl: `${userId}/custom_labels`.concat(options.accessToken ? `?access_token=${options.accessToken}` : '') }, batchRequestOptions);
}
exports.getAssociatedLabels = getAssociatedLabels;
//# sourceMappingURL=MessengerBatch.js.map