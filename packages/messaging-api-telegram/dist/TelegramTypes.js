"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseMode = exports.ChatAction = exports.InputMediaType = void 0;
var InputMediaType;
(function (InputMediaType) {
    InputMediaType["Photo"] = "photo";
    InputMediaType["Video"] = "video";
    InputMediaType["Animation"] = "animation";
    InputMediaType["Audio"] = "audio";
    InputMediaType["Document"] = "document";
})(InputMediaType = exports.InputMediaType || (exports.InputMediaType = {}));
var ChatAction;
(function (ChatAction) {
    ChatAction["Typing"] = "typing";
    ChatAction["UploadPhoto"] = "upload_photo";
    ChatAction["RecordVideo"] = "record_video";
    ChatAction["UploadVideo"] = "upload_video";
    ChatAction["RecordAudio"] = "record_audio";
    ChatAction["UploadAudio"] = "upload_audio";
    ChatAction["UploadDocument"] = "upload_document";
    ChatAction["FindLocation"] = "find_location";
    ChatAction["RecordVideoNote"] = "record_video_note";
    ChatAction["UploadVideoNote"] = "upload_video_note";
})(ChatAction = exports.ChatAction || (exports.ChatAction = {}));
var ParseMode;
(function (ParseMode) {
    ParseMode["Markdown"] = "Markdown";
    ParseMode["HTML"] = "HTML";
})(ParseMode = exports.ParseMode || (exports.ParseMode = {}));
//# sourceMappingURL=TelegramTypes.js.map