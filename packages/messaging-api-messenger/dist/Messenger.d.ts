import FormData from 'form-data';
import * as MessengerTypes from './MessengerTypes';
export declare function createMessage(payload: MessengerTypes.Message, options?: {
    quickReplies?: MessengerTypes.QuickReply[];
}): MessengerTypes.Message;
export declare function createText(text: string, options?: {
    quickReplies?: MessengerTypes.QuickReply[];
}): MessengerTypes.Message;
export declare function createMessageFormData(payload: MessengerTypes.FileDataMediaAttachmentMessage, filedata: MessengerTypes.FileData, options?: {
    quickReplies?: MessengerTypes.QuickReply[];
}): FormData;
export declare function createAttachment(attachment: MessengerTypes.Attachment, options?: {
    quickReplies?: MessengerTypes.QuickReply[];
}): MessengerTypes.Message;
export declare function createAttachmentFormData(attachment: MessengerTypes.FileDataMediaAttachment, filedata: MessengerTypes.FileData, options?: {
    quickReplies?: MessengerTypes.QuickReply[];
}): FormData;
export declare function createAudio(audio: string | MessengerTypes.MediaAttachmentPayload, options?: {
    quickReplies?: MessengerTypes.QuickReply[];
}): MessengerTypes.Message;
export declare function createAudioFormData(audio: MessengerTypes.FileData, options?: {
    quickReplies?: MessengerTypes.QuickReply[];
}): FormData;
export declare function createImage(image: string | MessengerTypes.MediaAttachmentPayload, options?: {
    quickReplies?: MessengerTypes.QuickReply[];
}): MessengerTypes.Message;
export declare function createImageFormData(image: MessengerTypes.FileData, options?: {
    quickReplies?: MessengerTypes.QuickReply[];
}): FormData;
export declare function createVideo(video: string | MessengerTypes.MediaAttachmentPayload, options?: {
    quickReplies?: MessengerTypes.QuickReply[];
}): MessengerTypes.Message;
export declare function createVideoFormData(video: MessengerTypes.FileData, options?: {
    quickReplies?: MessengerTypes.QuickReply[];
}): FormData;
export declare function createFile(file: string | MessengerTypes.MediaAttachmentPayload, options?: {
    quickReplies?: MessengerTypes.QuickReply[];
}): MessengerTypes.Message;
export declare function createFileFormData(file: MessengerTypes.FileData, options?: {
    quickReplies?: MessengerTypes.QuickReply[];
}): FormData;
export declare function createTemplate(payload: MessengerTypes.TemplateAttachmentPayload, options?: {
    quickReplies?: MessengerTypes.QuickReply[];
}): MessengerTypes.Message;
export declare function createButtonTemplate(text: string, buttons: MessengerTypes.TemplateButton[], options?: {
    quickReplies?: MessengerTypes.QuickReply[];
}): MessengerTypes.Message;
export declare function createGenericTemplate(elements: MessengerTypes.TemplateElement[], options?: {
    imageAspectRatio?: 'horizontal' | 'square';
    quickReplies?: MessengerTypes.QuickReply[];
}): MessengerTypes.Message;
export declare function createMediaTemplate(elements: MessengerTypes.MediaElement[], options?: {
    quickReplies?: MessengerTypes.QuickReply[];
}): MessengerTypes.Message;
export declare function createReceiptTemplate(receipt: MessengerTypes.ReceiptAttributes, options?: {
    quickReplies?: MessengerTypes.QuickReply[];
}): MessengerTypes.Message;
export declare function createAirlineBoardingPassTemplate(attrs: MessengerTypes.AirlineBoardingPassAttributes, options?: {
    quickReplies?: MessengerTypes.QuickReply[];
}): MessengerTypes.Message;
export declare function createAirlineCheckinTemplate(attrs: MessengerTypes.AirlineCheckinAttributes, options?: {
    quickReplies?: MessengerTypes.QuickReply[];
}): MessengerTypes.Message;
export declare function createAirlineItineraryTemplate(attrs: MessengerTypes.AirlineItineraryAttributes, options?: {
    quickReplies?: MessengerTypes.QuickReply[];
}): MessengerTypes.Message;
export declare function createAirlineUpdateTemplate(attrs: MessengerTypes.AirlineUpdateAttributes, options?: {
    quickReplies?: MessengerTypes.QuickReply[];
}): MessengerTypes.Message;
export declare function createOneTimeNotifReqTemplate(attrs: MessengerTypes.OneTimeNotifReqAttributes, options?: {
    quickReplies?: MessengerTypes.QuickReply[];
}): MessengerTypes.Message;
//# sourceMappingURL=Messenger.d.ts.map