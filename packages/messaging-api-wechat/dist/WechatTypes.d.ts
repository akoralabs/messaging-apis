import { OnRequestFunction } from 'messaging-api-common';
export declare type ClientConfig = {
    appId: string;
    appSecret: string;
    origin?: string;
    onRequest?: OnRequestFunction;
};
export declare type SucceededResponseData = {
    errcode: 0;
    errmsg: 'ok';
};
export declare type FailedResponseData = {
    errcode: number;
    errmsg: string;
};
export declare type ResponseData = SucceededResponseData | FailedResponseData;
export declare type AccessToken = {
    accessToken: string;
    expiresIn: number;
};
export declare type UploadedMedia = {
    type: string;
    mediaId: string;
    createdAt: number;
};
export declare type Media = {
    videoUrl: string;
};
export declare type Video = {
    mediaId: string;
    thumbMediaId: string;
    title: string;
    description: string;
};
export declare type Music = {
    title: string;
    description: string;
    musicurl: string;
    hqmusicurl: string;
    thumbMediaId: string;
};
export declare type Article = {
    title: string;
    description: string;
    url: string;
    picurl: string;
};
export declare type News = {
    articles: Article[];
};
export declare type MsgMenu = {
    headContent: string;
    list: {
        id: string;
        content: string;
    }[];
    tailContent: string;
};
export declare type MiniProgramPage = {
    title: string;
    appid: string;
    pagepath: string;
    thumbMediaId: string;
};
export declare enum MediaType {
    Image = "image",
    Voice = "voice",
    Video = "video",
    Thumb = "thumb"
}
export declare type SendMessageOptions = {
    customservice?: {
        kfAccount: string;
    };
};
//# sourceMappingURL=WechatTypes.d.ts.map