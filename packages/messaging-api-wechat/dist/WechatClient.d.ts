/// <reference types="node" />
import fs from 'fs';
import { AxiosInstance } from 'axios';
import * as WechatTypes from './WechatTypes';
export default class WechatClient {
    /**
     * @deprecated Use `new WechatClient(...)` instead.
     */
    static connect(config: WechatTypes.ClientConfig): WechatClient;
    /**
     * The underlying axios instance.
     */
    readonly axios: AxiosInstance;
    /**
     * The current access token used by the client.
     */
    accessToken: string;
    /**
     * The callback to be called when receiving requests.
     */
    private onRequest?;
    /**
     * The app ID used by the client.
     */
    private appId;
    /**
     * The app secret used by the client.
     */
    private appSecret;
    /**
     * The timestamp of the token expired time.
     */
    private tokenExpiresAt;
    constructor(config: WechatTypes.ClientConfig);
    private refreshToken;
    private refreshTokenWhenExpired;
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
    getAccessToken(): Promise<WechatTypes.AccessToken>;
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
    uploadMedia(type: WechatTypes.MediaType, media: Buffer | fs.ReadStream): Promise<WechatTypes.UploadedMedia>;
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
    getMedia(mediaId: string): Promise<WechatTypes.Media>;
    /**
     * 发送消息-客服消息
     *
     * @internal
     *
     * @see https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Service_Center_messages.html#7
     */
    sendRawBody(body: {
        touser: string;
    } & WechatTypes.SendMessageOptions & ({
        msgtype: 'text';
        text: {
            content: string;
        };
    } | {
        msgtype: 'image';
        image: {
            mediaId: string;
        };
    } | {
        msgtype: 'voice';
        voice: {
            mediaId: string;
        };
    } | {
        msgtype: 'video';
        video: WechatTypes.Video;
    } | {
        msgtype: 'music';
        music: WechatTypes.Music;
    } | {
        msgtype: 'news';
        news: WechatTypes.News;
    } | {
        msgtype: 'mpnews';
        mpnews: {
            mediaId: string;
        };
    } | {
        msgtype: 'msgmenu';
        msgmenu: WechatTypes.MsgMenu;
    } | {
        msgtype: 'wxcard';
        wxcard: {
            cardId: string;
        };
    } | {
        msgtype: 'miniprogrampage';
        miniprogrampage: WechatTypes.MiniProgramPage;
    })): Promise<WechatTypes.SucceededResponseData>;
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
    sendText(userId: string, text: string, options?: WechatTypes.SendMessageOptions): Promise<WechatTypes.SucceededResponseData>;
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
    sendImage(userId: string, mediaId: string, options?: WechatTypes.SendMessageOptions): Promise<WechatTypes.SucceededResponseData>;
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
    sendVoice(userId: string, mediaId: string, options?: WechatTypes.SendMessageOptions): Promise<WechatTypes.SucceededResponseData>;
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
    sendVideo(userId: string, video: WechatTypes.Video, options?: WechatTypes.SendMessageOptions): Promise<WechatTypes.SucceededResponseData>;
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
    sendMusic(userId: string, music: WechatTypes.Music, options?: WechatTypes.SendMessageOptions): Promise<WechatTypes.SucceededResponseData>;
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
    sendNews(userId: string, news: WechatTypes.News, options?: WechatTypes.SendMessageOptions): Promise<WechatTypes.SucceededResponseData>;
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
    sendMPNews(userId: string, mediaId: string, options?: WechatTypes.SendMessageOptions): Promise<WechatTypes.SucceededResponseData>;
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
    sendMsgMenu(userId: string, msgMenu: WechatTypes.MsgMenu, options?: WechatTypes.SendMessageOptions): Promise<WechatTypes.SucceededResponseData>;
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
    sendWXCard(userId: string, cardId: string, options?: WechatTypes.SendMessageOptions): Promise<WechatTypes.SucceededResponseData>;
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
    sendMiniProgramPage(userId: string, miniProgramPage: WechatTypes.MiniProgramPage, options?: WechatTypes.SendMessageOptions): Promise<WechatTypes.SucceededResponseData>;
}
//# sourceMappingURL=WechatClient.d.ts.map