import { JsonObject } from 'type-fest';
export declare type BatchRequestOptions = {
    name?: string;
    dependsOn?: string;
};
export declare type BatchRequest = {
    method: string;
    relativeUrl: string;
    name?: string;
    body?: JsonObject;
    responseAccessPath?: string;
} & BatchRequestOptions;
export declare type QueueItem = {
    request: BatchRequest;
    resolve: (value?: unknown) => void;
    reject: (reason?: any) => void;
    retry?: number;
};
export declare type BatchResponse<T extends JsonObject = JsonObject> = {
    code: number;
    headers?: {
        name: string;
        value: string;
    }[];
    body: T;
};
export declare type BatchErrorResponse = BatchResponse<{
    error: {
        type: string;
        message: string;
        code: number;
    };
}>;
export declare type BatchRequestErrorInfo = {
    request: BatchRequest;
    response: BatchErrorResponse;
};
export declare type BatchConfig = {
    delay?: number;
    shouldRetry?: (err: BatchRequestErrorInfo) => boolean;
    retryTimes?: number;
    includeHeaders?: boolean;
};
//# sourceMappingURL=types.d.ts.map