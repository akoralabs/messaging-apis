import { AxiosRequestConfig, Method } from 'axios';
export declare type RequestPayload = {
    method?: Method;
    url: string;
    headers: Record<string, string>;
    body: any;
};
export declare type OnRequestFunction = (request: RequestPayload) => void;
declare function defaultOnRequest(request: RequestPayload): void;
declare function createRequestInterceptor({ onRequest, }?: {
    onRequest?: OnRequestFunction;
}): (config: AxiosRequestConfig) => AxiosRequestConfig;
export * from './case';
export { defaultOnRequest as onRequest, createRequestInterceptor };
//# sourceMappingURL=index.d.ts.map