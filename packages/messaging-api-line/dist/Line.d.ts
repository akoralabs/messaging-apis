import * as LineTypes from './LineTypes';
export declare function createText(text: string, options?: LineTypes.MessageOptions & {
    emojis?: LineTypes.Emoji[];
}): LineTypes.TextMessage;
export declare function createImage(image: {
    originalContentUrl: string;
    previewImageUrl?: string;
}, options?: LineTypes.MessageOptions): LineTypes.ImageMessage;
export declare function createVideo(video: {
    originalContentUrl: string;
    previewImageUrl: string;
}, options?: LineTypes.MessageOptions): LineTypes.VideoMessage;
export declare function createAudio(audio: {
    originalContentUrl: string;
    duration: number;
}, options?: LineTypes.MessageOptions): LineTypes.AudioMessage;
export declare function createLocation({ title, address, latitude, longitude }: LineTypes.Location, options?: LineTypes.MessageOptions): LineTypes.LocationMessage;
export declare function createSticker(sticker: Omit<LineTypes.StickerMessage, 'type'>, options?: LineTypes.MessageOptions): LineTypes.StickerMessage;
export declare function createImagemap(altText: string, { baseUrl, baseSize, video, actions, }: Omit<LineTypes.ImagemapMessage, 'type' | 'altText'>, options?: LineTypes.MessageOptions): LineTypes.ImagemapMessage;
export declare function createTemplate<T extends LineTypes.Template>(altText: string, template: T, options?: LineTypes.MessageOptions): LineTypes.TemplateMessage<T>;
export declare function createButtonTemplate(altText: string, { thumbnailImageUrl, imageAspectRatio, imageSize, imageBackgroundColor, title, text, defaultAction, actions, }: {
    thumbnailImageUrl?: string;
    imageAspectRatio?: 'rectangle' | 'square';
    imageSize?: 'cover' | 'contain';
    imageBackgroundColor?: string;
    title?: string;
    text: string;
    defaultAction?: LineTypes.Action;
    actions: LineTypes.Action[];
}, options?: LineTypes.MessageOptions): LineTypes.TemplateMessage<LineTypes.ButtonsTemplate>;
export declare function createButtonsTemplate(altText: string, { thumbnailImageUrl, imageAspectRatio, imageSize, imageBackgroundColor, title, text, defaultAction, actions, }: {
    thumbnailImageUrl?: string;
    imageAspectRatio?: 'rectangle' | 'square';
    imageSize?: 'cover' | 'contain';
    imageBackgroundColor?: string;
    title?: string;
    text: string;
    defaultAction?: LineTypes.Action;
    actions: LineTypes.Action[];
}, options?: LineTypes.MessageOptions): LineTypes.TemplateMessage<LineTypes.ButtonsTemplate>;
export declare function createConfirmTemplate(altText: string, { text, actions, }: {
    text: string;
    actions: LineTypes.Action[];
}, options?: LineTypes.MessageOptions): LineTypes.TemplateMessage<LineTypes.ConfirmTemplate>;
export declare function createCarouselTemplate(altText: string, columns: LineTypes.ColumnObject[], { imageAspectRatio, imageSize, quickReply, }?: {
    imageAspectRatio?: 'rectangle' | 'square';
    imageSize?: 'cover' | 'contain';
    quickReply?: LineTypes.QuickReply;
}): LineTypes.TemplateMessage<LineTypes.CarouselTemplate>;
export declare function createImageCarouselTemplate(altText: string, columns: LineTypes.ImageCarouselColumnObject[], options?: LineTypes.MessageOptions): LineTypes.TemplateMessage<LineTypes.ImageCarouselTemplate>;
export declare function createFlex(altText: string, contents: LineTypes.FlexContainer, options?: LineTypes.MessageOptions): LineTypes.FlexMessage;
//# sourceMappingURL=Line.d.ts.map