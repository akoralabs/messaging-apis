import * as MessengerTypes from './MessengerTypes';
export declare function sendRequest(body: object, options?: MessengerTypes.BatchRequestOptions): MessengerTypes.BatchItem;
export declare function sendMessage(psidOrRecipient: MessengerTypes.PsidOrRecipient, msg: MessengerTypes.Message, options?: MessengerTypes.SendOption & MessengerTypes.BatchRequestOptions): MessengerTypes.BatchItem;
export declare function sendText(psidOrRecipient: MessengerTypes.PsidOrRecipient, text: string, options?: MessengerTypes.SendOption & MessengerTypes.BatchRequestOptions): MessengerTypes.BatchItem;
export declare function sendAttachment(psidOrRecipient: MessengerTypes.PsidOrRecipient, attachment: MessengerTypes.Attachment, options?: MessengerTypes.SendOption & MessengerTypes.BatchRequestOptions): MessengerTypes.BatchItem;
export declare function sendAudio(psidOrRecipient: MessengerTypes.PsidOrRecipient, audio: string | MessengerTypes.MediaAttachmentPayload, options?: MessengerTypes.SendOption & MessengerTypes.BatchRequestOptions): MessengerTypes.BatchItem;
export declare function sendImage(psidOrRecipient: MessengerTypes.PsidOrRecipient, image: string | MessengerTypes.MediaAttachmentPayload, options?: MessengerTypes.SendOption & MessengerTypes.BatchRequestOptions): MessengerTypes.BatchItem;
export declare function sendVideo(psidOrRecipient: MessengerTypes.PsidOrRecipient, video: string | MessengerTypes.MediaAttachmentPayload, options?: MessengerTypes.SendOption & MessengerTypes.BatchRequestOptions): MessengerTypes.BatchItem;
export declare function sendFile(psidOrRecipient: MessengerTypes.PsidOrRecipient, file: string | MessengerTypes.MediaAttachmentPayload, options?: MessengerTypes.SendOption & MessengerTypes.BatchRequestOptions): MessengerTypes.BatchItem;
export declare function sendTemplate(psidOrRecipient: MessengerTypes.PsidOrRecipient, payload: MessengerTypes.TemplateAttachmentPayload, options?: MessengerTypes.SendOption & MessengerTypes.BatchRequestOptions): MessengerTypes.BatchItem;
export declare function sendButtonTemplate(psidOrRecipient: MessengerTypes.PsidOrRecipient, text: string, buttons: MessengerTypes.TemplateButton[], options?: MessengerTypes.SendOption & MessengerTypes.BatchRequestOptions): MessengerTypes.BatchItem;
export declare function sendGenericTemplate(psidOrRecipient: MessengerTypes.PsidOrRecipient, elements: MessengerTypes.TemplateElement[], { imageAspectRatio, ...options }?: {
    imageAspectRatio?: 'horizontal' | 'square';
} & MessengerTypes.SendOption): MessengerTypes.BatchItem;
export declare function sendReceiptTemplate(psidOrRecipient: MessengerTypes.PsidOrRecipient, receipt: MessengerTypes.ReceiptAttributes, options?: MessengerTypes.SendOption & MessengerTypes.BatchRequestOptions): MessengerTypes.BatchItem;
export declare function sendMediaTemplate(psidOrRecipient: MessengerTypes.PsidOrRecipient, elements: MessengerTypes.MediaElement[], options?: MessengerTypes.SendOption & MessengerTypes.BatchRequestOptions): MessengerTypes.BatchItem;
export declare function sendAirlineBoardingPassTemplate(psidOrRecipient: MessengerTypes.PsidOrRecipient, attrs: MessengerTypes.AirlineBoardingPassAttributes, options?: MessengerTypes.SendOption & MessengerTypes.BatchRequestOptions): MessengerTypes.BatchItem;
export declare function sendAirlineCheckinTemplate(psidOrRecipient: MessengerTypes.PsidOrRecipient, attrs: MessengerTypes.AirlineCheckinAttributes, options?: MessengerTypes.SendOption & MessengerTypes.BatchRequestOptions): MessengerTypes.BatchItem;
export declare function sendAirlineItineraryTemplate(psidOrRecipient: MessengerTypes.PsidOrRecipient, attrs: MessengerTypes.AirlineItineraryAttributes, options?: MessengerTypes.SendOption & MessengerTypes.BatchRequestOptions): MessengerTypes.BatchItem;
export declare function sendAirlineUpdateTemplate(psidOrRecipient: MessengerTypes.PsidOrRecipient, attrs: MessengerTypes.AirlineUpdateAttributes, options?: MessengerTypes.SendOption & MessengerTypes.BatchRequestOptions): MessengerTypes.BatchItem;
export declare function sendOneTimeNotifReqTemplate(psidOrRecipient: MessengerTypes.PsidOrRecipient, attrs: MessengerTypes.OneTimeNotifReqAttributes, options?: MessengerTypes.SendOption & MessengerTypes.BatchRequestOptions): MessengerTypes.BatchItem;
export declare function getUserProfile(userId: string, options?: {
    fields?: MessengerTypes.UserProfileField[];
    accessToken?: string;
} & MessengerTypes.BatchRequestOptions): MessengerTypes.BatchItem;
export declare function getUserPersistentMenu(userId: string, options?: {
    accessToken?: string;
} & MessengerTypes.BatchRequestOptions): MessengerTypes.BatchItem;
export declare function setUserPersistentMenu(userId: string, menuItems: MessengerTypes.MenuItem[] | MessengerTypes.PersistentMenuItem[], options?: {
    accessToken?: string;
} & MessengerTypes.BatchRequestOptions): MessengerTypes.BatchItem;
export declare function deleteUserPersistentMenu(userId: string, options?: {
    accessToken?: string;
} & MessengerTypes.BatchRequestOptions): MessengerTypes.BatchItem;
export declare function sendSenderAction(psidOrRecipient: MessengerTypes.PsidOrRecipient, senderAction: MessengerTypes.SenderAction, options?: MessengerTypes.SenderActionOption & MessengerTypes.BatchRequestOptions): MessengerTypes.BatchItem;
export declare function typingOn(idOrRecipient: MessengerTypes.PsidOrRecipient, options?: MessengerTypes.SenderActionOption & MessengerTypes.BatchRequestOptions): MessengerTypes.BatchItem;
export declare function typingOff(idOrRecipient: MessengerTypes.PsidOrRecipient, options?: MessengerTypes.SenderActionOption & MessengerTypes.BatchRequestOptions): MessengerTypes.BatchItem;
export declare function markSeen(idOrRecipient: MessengerTypes.PsidOrRecipient, options?: MessengerTypes.BatchRequestOptions): MessengerTypes.BatchItem;
export declare function passThreadControl(recipientId: string, targetAppId: number, metadata?: string, options?: {
    accessToken?: string;
} & MessengerTypes.BatchRequestOptions): MessengerTypes.BatchItem;
export declare function passThreadControlToPageInbox(recipientId: string, metadata?: string, options?: {
    accessToken?: string;
} & MessengerTypes.BatchRequestOptions): MessengerTypes.BatchItem;
export declare function takeThreadControl(recipientId: string, metadata?: string, options?: {
    accessToken?: string;
} & MessengerTypes.BatchRequestOptions): MessengerTypes.BatchItem;
export declare function requestThreadControl(recipientId: string, metadata?: string, options?: {
    accessToken?: string;
} & MessengerTypes.BatchRequestOptions): MessengerTypes.BatchItem;
export declare function getThreadOwner(recipientId: string, options?: {
    accessToken?: string;
} & MessengerTypes.BatchRequestOptions): MessengerTypes.BatchItem;
export declare function associateLabel(userId: string, labelId: number, options?: {
    accessToken?: string;
} & MessengerTypes.BatchRequestOptions): MessengerTypes.BatchItem;
export declare function dissociateLabel(userId: string, labelId: number, options?: {
    accessToken?: string;
} & MessengerTypes.BatchRequestOptions): MessengerTypes.BatchItem;
export declare function getAssociatedLabels(userId: string, options?: {
    accessToken?: string;
} & MessengerTypes.BatchRequestOptions): MessengerTypes.BatchItem;
//# sourceMappingURL=MessengerBatch.d.ts.map