"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_error_1 = __importDefault(require("axios-error"));
const form_data_1 = __importDefault(require("form-data"));
const axios_1 = __importDefault(require("axios"));
const ts_invariant_1 = __importDefault(require("ts-invariant"));
const warning_1 = __importDefault(require("warning"));
const messaging_api_common_1 = require("messaging-api-common");
function throwErrorIfAny(response) {
    const { errcode, errmsg } = response.data;
    if (!errcode || errcode === 0)
        return response;
    const msg = `WeChat API - ${errcode} ${errmsg}`;
    throw new axios_error_1.default(msg, {
        response,
        config: response.config,
        request: response.request,
    });
}
class WechatClient {
    constructor(config) {
        /**
         * The current access token used by the client.
         */
        this.accessToken = '';
        /**
         * The timestamp of the token expired time.
         */
        this.tokenExpiresAt = 0;
        (0, ts_invariant_1.default)(typeof config !== 'string', `WechatClient: do not allow constructing client with ${config} string. Use object instead.`);
        this.appId = config.appId;
        this.appSecret = config.appSecret;
        this.onRequest = config.onRequest || messaging_api_common_1.onRequest;
        const { origin } = config;
        this.axios = axios_1.default.create({
            baseURL: `${origin || 'https://api.weixin.qq.com'}/cgi-bin/`,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        this.axios.interceptors.request.use((0, messaging_api_common_1.createRequestInterceptor)({
            onRequest: this.onRequest,
        }));
    }
    /**
     * @deprecated Use `new WechatClient(...)` instead.
     */
    static connect(config) {
        (0, warning_1.default)(false, '`WechatClient.connect(...)` is deprecated. Use `new WechatClient(...)` instead.');
        return new WechatClient(config);
    }
    refreshToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const { accessToken, expiresIn } = yield this.getAccessToken();
            this.accessToken = accessToken;
            this.tokenExpiresAt = Date.now() + expiresIn * 1000;
        });
    }
    refreshTokenWhenExpired() {
        return __awaiter(this, void 0, void 0, function* () {
            if (Date.now() > this.tokenExpiresAt) {
                yield this.refreshToken();
            }
        });
    }
    /**
     * 获取 access_token
     *
     * @returns Access token info
     *
     * @see https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140183
     *
     * @example
     *
     * ```js
     * await client.getAccessToken();
     * // {
     * //   accessToken: "ACCESS_TOKEN",
     * //   expiresIn: 7200
     * // }
     * ```
     */
    getAccessToken() {
        return this.axios
            .get(`/token?grant_type=client_credential&appid=${this.appId}&secret=${this.appSecret}`)
            .then(throwErrorIfAny)
            .then((res) => (0, messaging_api_common_1.camelcaseKeys)(res.data, {
            deep: true,
        }));
    }
    /**
     * 临时素材
     *
     * 媒体文件保存时间为 3 天，即 3 天后 media_id 失效。
     *
     * 图片（image）- 2M，支持 PNG,JPEG,JPG,GIF 格式
     * 语音（voice）- 2M，播放长度不超过 60s，支持 AMR,MP3 格式
     * 视频（video）- 10MB，支持 MP4 格式
     * 缩略图（thumb）- 64KB，支持 JPG 格式
     */
    /**
     * 多媒体文件上传接口
     *
     * @param type - Type of the media to upload.
     * @param media - Buffer or stream of the media to upload.
     * @returns Info of the uploaded media.
     *
     * @see https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738726
     *
     * @example
     *
     * ```js
     * const fs = require('fs');
     *
     * const buffer = fs.readFileSync('test.jpg');
     *
     * await client.uploadMedia('image', buffer);
     * // {
     * //   type: 'image',
     * //   mediaId: 'MEDIA_ID',
     * //   createdAt: 123456789
     * // }
     * ```
     */
    uploadMedia(type, media) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.refreshTokenWhenExpired();
            const form = new form_data_1.default();
            form.append('media', media);
            return this.axios
                .post(`/media/upload?access_token=${this.accessToken}&type=${type}`, form, {
                headers: form.getHeaders(),
            })
                .then(throwErrorIfAny)
                .then((res) => (0, messaging_api_common_1.camelcaseKeys)(res.data, {
                deep: true,
            }));
        });
    }
    /**
     * 下载多媒体文件接口
     *
     * @param mediaId - ID of the media to get.
     * @returns Info of the media.
     *
     * @see https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738727
     *
     * @example
     *
     * ```js
     * await client.getMedia(MEDIA_ID);
     * // {
     * //   videoUrl: "..."
     * // }
     * ```
     */
    getMedia(mediaId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.refreshTokenWhenExpired();
            return this.axios
                .get(`/media/get?access_token=${this.accessToken}&media_id=${mediaId}`)
                .then(throwErrorIfAny)
                .then((res) => (0, messaging_api_common_1.camelcaseKeys)(res.data, {
                deep: true,
            }));
        });
    }
    /**
     * 发送消息-客服消息
     *
     * @internal
     *
     * @see https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Service_Center_messages.html#7
     */
    sendRawBody(body) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.refreshTokenWhenExpired();
            return this.axios
                .post(`/message/custom/send?access_token=${this.accessToken}`, (0, messaging_api_common_1.snakecaseKeys)(body, { deep: true }))
                .then(throwErrorIfAny)
                .then((res) => (0, messaging_api_common_1.camelcaseKeys)(res.data, {
                deep: true,
            }));
        });
    }
    /**
     * 发送文本消息
     *
     * @param userId - User ID of the recipient
     * @param text - Text to be sent.
     * @param options - The other parameters.
     * @returns Error code and error message.
     *
     * @see https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Service_Center_messages.html#7
     *
     * @example
     *
     * ```js
     * await client.sendText(USER_ID, 'Hello!');
     * ```
     */
    sendText(userId, text, options) {
        return this.sendRawBody(Object.assign({ touser: userId, msgtype: 'text', text: {
                content: text,
            } }, options));
    }
    /**
     * 发送图片消息
     *
     * @param userId - User ID of the recipient
     * @param mediaId - ID of the media to be sent.
     * @param options - The other parameters.
     * @returns Error code and error message.
     *
     * @see https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Service_Center_messages.html#7
     *
     * @example
     *
     * ```js
     * await client.sendImage(USER_ID, 'MEDIA_ID');
     * ```
     */
    sendImage(userId, mediaId, options) {
        return this.sendRawBody(Object.assign({ touser: userId, msgtype: 'image', image: {
                mediaId,
            } }, options));
    }
    /**
     * 发送语音消息
     *
     * @param userId - User ID of the recipient
     * @param mediaId - ID of the media to be sent.
     * @param options - The other parameters.
     * @returns Error code and error message.
     *
     * @see https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Service_Center_messages.html#7
     *
     * @example
     *
     * ```js
     * await client.sendVoice(USER_ID, 'MEDIA_ID');
     * ```
     */
    sendVoice(userId, mediaId, options) {
        return this.sendRawBody(Object.assign({ touser: userId, msgtype: 'voice', voice: {
                mediaId,
            } }, options));
    }
    /**
     * 发送视频消息
     *
     * @param userId - User ID of the recipient
     * @param video - Info of the video to be sent.
     * @param options - The other parameters.
     * @returns Error code and error message.
     *
     * @see https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Service_Center_messages.html#7
     *
     * @example
     *
     * ```js
     * await client.sendVideo(USER_ID, {
     *   mediaId: 'MEDIA_ID',
     *   thumbMediaId: 'THUMB_MEDIA_ID',
     *   title: 'VIDEO_TITLE',
     *   description: 'VIDEO_DESCRIPTION',
     * });
     * ```
     */
    sendVideo(userId, video, options) {
        return this.sendRawBody(Object.assign({ touser: userId, msgtype: 'video', video }, options));
    }
    /**
     * 发送音乐消息
     *
     * @param userId - User ID of the recipient
     * @param news - Data of the music to be sent.
     * @param options - The other parameters.
     * @returns Error code and error message.
     *
     * @see https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Service_Center_messages.html#7
     *
     * @example
     *
     * ```js
     * await client.sendMusic(USER_ID, {
     *   musicurl: 'MUSIC_URL',
     *   hqmusicurl: 'HQ_MUSIC_URL',
     *   thumbMediaId: 'THUMB_MEDIA_ID',
     *   title: 'MUSIC_TITLE',
     *   description: 'MUSIC_DESCRIPTION',
     * });
     * ```
     */
    sendMusic(userId, music, options) {
        return this.sendRawBody(Object.assign({ touser: userId, msgtype: 'music', music }, options));
    }
    /**
     * 发送图文消息（点击跳转到外链）
     *
     * 图文消息条数限制在 8 条以内，注意，如果图文数超过 8，则将会无响应。
     *
     * @param userId - User ID of the recipient
     * @param news - Data of the news to be sent.
     * @param options - The other parameters.
     * @returns Error code and error message.
     *
     * @see https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Service_Center_messages.html#7
     *
     * @example
     *
     * ```js
     * await client.sendNews(USER_ID, {
     *   articles: [
     *     {
     *       title: 'Happy Day',
     *       description: 'Is Really A Happy Day',
     *       url: 'URL',
     *       picurl: 'PIC_URL',
     *     },
     *     {
     *       title: 'Happy Day',
     *       description: 'Is Really A Happy Day',
     *       url: 'URL',
     *       picurl: 'PIC_URL',
     *     },
     *   ],
     * });
     * ```
     */
    sendNews(userId, news, options) {
        return this.sendRawBody(Object.assign({ touser: userId, msgtype: 'news', news }, options));
    }
    /**
     * 发送图文消息（点击跳转到图文消息页面）
     *
     * 图文消息条数限制在 8 条以内，注意，如果图文数超过 8，则将会无响应。
     *
     * @param userId - User ID of the recipient
     * @param mediaId - ID of the media to be sent.
     * @param options - The other parameters.
     * @returns Error code and error message.
     *
     * @see https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Service_Center_messages.html#7
     *
     * @example
     *
     * ```js
     * await client.sendMPNews(USER_ID, 'MEDIA_ID');
     * ```
     */
    sendMPNews(userId, mediaId, options) {
        return this.sendRawBody(Object.assign({ touser: userId, msgtype: 'mpnews', mpnews: {
                mediaId,
            } }, options));
    }
    /**
     * 发送菜单消息
     *
     * @param userId - User ID of the recipient
     * @param msgMenu - Data of the msg menu to be sent.
     * @param options - The other parameters.
     * @returns Error code and error message.
     *
     * @see https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Service_Center_messages.html#7
     *
     * @example
     *
     * ```js
     * await client.sendMsgMenu(USER_ID, {
     *   headContent: 'HEAD',
     *   list: [
     *     {
     *       id: '101',
     *       content: 'Yes',
     *     },
     *     {
     *       id: '102',
     *       content: 'No',
     *     },
     *   ],
     *   'tailContent': 'Tail',
     * });
     * ```
     */
    sendMsgMenu(userId, msgMenu, options) {
        return this.sendRawBody(Object.assign({ touser: userId, msgtype: 'msgmenu', msgmenu: msgMenu }, options));
    }
    /**
     * 发送卡券
     *
     * @param userId - User ID of the recipient
     * @param cardId - ID of the card to be sent.
     * @param options - The other parameters.
     * @returns Error code and error message.
     *
     * @see https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Service_Center_messages.html#7
     *
     * @example
     *
     * ```js
     * await client.sendWXCard(USER_ID, '123dsdajkasd231jhksad');
     * ```
     */
    sendWXCard(userId, cardId, options) {
        return this.sendRawBody(Object.assign({ touser: userId, msgtype: 'wxcard', wxcard: {
                cardId,
            } }, options));
    }
    /**
     * 发送小程序卡片（要求小程序与公众号已关联）
     *
     * @param userId - User ID of the recipient
     * @param miniProgramPage - Info of the mini program page to be sent.
     * @param options - The other parameters.
     * @returns Error code and error message.
     *
     * @see https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Service_Center_messages.html#7
     *
     * @example
     *
     * ```js
     * await client.sendMiniProgramPage(USER_ID, {
     *   title: 'title',
     *   appid: 'appid',
     *   pagepath: 'pagepath',
     *   thumbMediaId: 'thumb_media_id',
     * });
     * ```
     */
    sendMiniProgramPage(userId, miniProgramPage, options) {
        return this.sendRawBody(Object.assign({ touser: userId, msgtype: 'miniprogrampage', miniprogrampage: miniProgramPage }, options));
    }
}
exports.default = WechatClient;
//# sourceMappingURL=WechatClient.js.map