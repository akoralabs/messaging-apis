"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFlex = exports.createImageCarouselTemplate = exports.createCarouselTemplate = exports.createConfirmTemplate = exports.createButtonsTemplate = exports.createButtonTemplate = exports.createTemplate = exports.createImagemap = exports.createSticker = exports.createLocation = exports.createAudio = exports.createVideo = exports.createImage = exports.createText = void 0;
function createText(text, options = {}) {
    return Object.assign({ type: 'text', text }, options);
}
exports.createText = createText;
function createImage(image, options = {}) {
    return Object.assign({ type: 'image', originalContentUrl: image.originalContentUrl, previewImageUrl: image.previewImageUrl || image.originalContentUrl }, options);
}
exports.createImage = createImage;
function createVideo(video, options = {}) {
    return Object.assign({ type: 'video', originalContentUrl: video.originalContentUrl, previewImageUrl: video.previewImageUrl }, options);
}
exports.createVideo = createVideo;
function createAudio(audio, options = {}) {
    return Object.assign({ type: 'audio', originalContentUrl: audio.originalContentUrl, duration: audio.duration }, options);
}
exports.createAudio = createAudio;
function createLocation({ title, address, latitude, longitude }, options = {}) {
    return Object.assign({ type: 'location', title,
        address,
        latitude,
        longitude }, options);
}
exports.createLocation = createLocation;
function createSticker(sticker, options = {}) {
    return Object.assign({ type: 'sticker', packageId: sticker.packageId, stickerId: sticker.stickerId }, options);
}
exports.createSticker = createSticker;
function createImagemap(altText, { baseUrl, baseSize, video, actions, }, options = {}) {
    return Object.assign({ type: 'imagemap', baseUrl,
        altText,
        baseSize,
        video,
        actions }, options);
}
exports.createImagemap = createImagemap;
function createTemplate(altText, template, options = {}) {
    return Object.assign({ type: 'template', altText,
        template }, options);
}
exports.createTemplate = createTemplate;
function createButtonTemplate(altText, { thumbnailImageUrl, imageAspectRatio, imageSize, imageBackgroundColor, title, text, defaultAction, actions, }, options = {}) {
    return createTemplate(altText, {
        type: 'buttons',
        thumbnailImageUrl,
        imageAspectRatio,
        imageSize,
        imageBackgroundColor,
        title,
        text,
        defaultAction,
        actions,
    }, options);
}
exports.createButtonTemplate = createButtonTemplate;
function createButtonsTemplate(altText, { thumbnailImageUrl, imageAspectRatio, imageSize, imageBackgroundColor, title, text, defaultAction, actions, }, options = {}) {
    return createTemplate(altText, {
        type: 'buttons',
        thumbnailImageUrl,
        imageAspectRatio,
        imageSize,
        imageBackgroundColor,
        title,
        text,
        defaultAction,
        actions,
    }, options);
}
exports.createButtonsTemplate = createButtonsTemplate;
function createConfirmTemplate(altText, { text, actions, }, options = {}) {
    return createTemplate(altText, {
        type: 'confirm',
        text,
        actions,
    }, options);
}
exports.createConfirmTemplate = createConfirmTemplate;
function createCarouselTemplate(altText, columns, { imageAspectRatio, imageSize, quickReply, } = {}) {
    return createTemplate(altText, {
        type: 'carousel',
        columns,
        imageAspectRatio,
        imageSize,
    }, { quickReply });
}
exports.createCarouselTemplate = createCarouselTemplate;
function createImageCarouselTemplate(altText, columns, options = {}) {
    return createTemplate(altText, {
        type: 'image_carousel',
        columns,
    }, options);
}
exports.createImageCarouselTemplate = createImageCarouselTemplate;
function createFlex(altText, contents, options = {}) {
    return Object.assign({ type: 'flex', altText,
        contents }, options);
}
exports.createFlex = createFlex;
//# sourceMappingURL=Line.js.map