"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOneTimeNotifReqTemplate = exports.createAirlineUpdateTemplate = exports.createAirlineItineraryTemplate = exports.createAirlineCheckinTemplate = exports.createAirlineBoardingPassTemplate = exports.createReceiptTemplate = exports.createMediaTemplate = exports.createGenericTemplate = exports.createButtonTemplate = exports.createTemplate = exports.createFileFormData = exports.createFile = exports.createVideoFormData = exports.createVideo = exports.createImageFormData = exports.createImage = exports.createAudioFormData = exports.createAudio = exports.createAttachmentFormData = exports.createAttachment = exports.createMessageFormData = exports.createText = exports.createMessage = void 0;
const form_data_1 = __importDefault(require("form-data"));
const omit_1 = __importDefault(require("lodash/omit"));
const messaging_api_common_1 = require("messaging-api-common");
function createMessage(payload, options = {}) {
    const message = Object.assign({}, payload);
    // snakecase support for backward compatibility
    const quickReplies = options.quickReplies ||
        // @ts-expect-error
        options.quick_replies;
    if (quickReplies && Array.isArray(quickReplies) && quickReplies.length >= 1) {
        message.quickReplies = quickReplies;
    }
    return (0, messaging_api_common_1.camelcaseKeysDeep)(message);
}
exports.createMessage = createMessage;
function createText(text, options) {
    return createMessage({ text }, options);
}
exports.createText = createText;
function createMessageFormData(payload, filedata, options = {}) {
    const message = Object.assign({}, payload);
    // snakecase support for backward compatibility
    const quickReplies = options.quickReplies ||
        // @ts-expect-error
        options.quick_replies;
    if (quickReplies && Array.isArray(quickReplies) && quickReplies.length >= 1) {
        message.quickReplies = quickReplies;
    }
    const formdata = new form_data_1.default();
    formdata.append('message', JSON.stringify((0, messaging_api_common_1.snakecaseKeysDeep)(message)));
    formdata.append('filedata', filedata, 
    // FIXME: use pick for formdata options
    (0, omit_1.default)(options, ['quickReplies']));
    return formdata;
}
exports.createMessageFormData = createMessageFormData;
function createAttachment(attachment, options) {
    return createMessage({
        attachment,
    }, options);
}
exports.createAttachment = createAttachment;
function createAttachmentFormData(attachment, filedata, options) {
    return createMessageFormData({
        attachment,
    }, filedata, options);
}
exports.createAttachmentFormData = createAttachmentFormData;
function createAudio(audio, options) {
    if (typeof audio === 'string') {
        const attachment = {
            type: 'audio',
            payload: {
                url: audio,
            },
        };
        return createAttachment(attachment, options);
    }
    const attachment = {
        type: 'audio',
        payload: audio,
    };
    return createAttachment(attachment, options);
}
exports.createAudio = createAudio;
function createAudioFormData(audio, options) {
    const attachment = {
        type: 'audio',
        payload: {},
    };
    return createAttachmentFormData(attachment, audio, options);
}
exports.createAudioFormData = createAudioFormData;
function createImage(image, options) {
    if (typeof image === 'string') {
        const attachment = {
            type: 'image',
            payload: {
                url: image,
            },
        };
        return createAttachment(attachment, options);
    }
    const attachment = {
        type: 'image',
        payload: image,
    };
    return createAttachment(attachment, options);
}
exports.createImage = createImage;
function createImageFormData(image, options) {
    const attachment = {
        type: 'image',
        payload: {},
    };
    return createAttachmentFormData(attachment, image, options);
}
exports.createImageFormData = createImageFormData;
function createVideo(video, options) {
    if (typeof video === 'string') {
        const attachment = {
            type: 'video',
            payload: {
                url: video,
            },
        };
        return createAttachment(attachment, options);
    }
    const attachment = {
        type: 'video',
        payload: video,
    };
    return createAttachment(attachment, options);
}
exports.createVideo = createVideo;
function createVideoFormData(video, options) {
    const attachment = {
        type: 'video',
        payload: {},
    };
    return createAttachmentFormData(attachment, video, options);
}
exports.createVideoFormData = createVideoFormData;
function createFile(file, options) {
    if (typeof file === 'string') {
        const attachment = {
            type: 'file',
            payload: {
                url: file,
            },
        };
        return createAttachment(attachment, options);
    }
    const attachment = {
        type: 'file',
        payload: file,
    };
    return createAttachment(attachment, options);
}
exports.createFile = createFile;
function createFileFormData(file, options) {
    const attachment = {
        type: 'file',
        payload: {},
    };
    return createAttachmentFormData(attachment, file, options);
}
exports.createFileFormData = createFileFormData;
function createTemplate(payload, options) {
    return createAttachment({
        type: 'template',
        payload,
    }, options);
}
exports.createTemplate = createTemplate;
function createButtonTemplate(text, buttons, options) {
    return createTemplate({
        templateType: 'button',
        text,
        buttons,
    }, options);
}
exports.createButtonTemplate = createButtonTemplate;
function createGenericTemplate(elements, options = {}) {
    return createTemplate(Object.assign({ templateType: 'generic', elements }, (options.imageAspectRatio
        ? { imageAspectRatio: options.imageAspectRatio }
        : {})), options);
}
exports.createGenericTemplate = createGenericTemplate;
function createMediaTemplate(elements, options) {
    return createTemplate({
        templateType: 'media',
        elements,
    }, options);
}
exports.createMediaTemplate = createMediaTemplate;
function createReceiptTemplate(receipt, options) {
    return createTemplate(Object.assign({ templateType: 'receipt' }, receipt), options);
}
exports.createReceiptTemplate = createReceiptTemplate;
function createAirlineBoardingPassTemplate(attrs, options) {
    return createTemplate(Object.assign({ templateType: 'airline_boardingpass' }, attrs), options);
}
exports.createAirlineBoardingPassTemplate = createAirlineBoardingPassTemplate;
function createAirlineCheckinTemplate(attrs, options) {
    return createTemplate(Object.assign({ templateType: 'airline_checkin' }, attrs), options);
}
exports.createAirlineCheckinTemplate = createAirlineCheckinTemplate;
function createAirlineItineraryTemplate(attrs, options) {
    return createTemplate(Object.assign({ templateType: 'airline_itinerary' }, attrs), options);
}
exports.createAirlineItineraryTemplate = createAirlineItineraryTemplate;
function createAirlineUpdateTemplate(attrs, options) {
    return createTemplate(Object.assign({ templateType: 'airline_update' }, attrs), options);
}
exports.createAirlineUpdateTemplate = createAirlineUpdateTemplate;
function createOneTimeNotifReqTemplate(attrs, options) {
    return createTemplate(Object.assign({ templateType: 'one_time_notif_req' }, attrs), options);
}
exports.createOneTimeNotifReqTemplate = createOneTimeNotifReqTemplate;
//# sourceMappingURL=Messenger.js.map