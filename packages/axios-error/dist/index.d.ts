/// <reference types="node" />
import util from 'util';
import { AxiosError as BaseAxiosError } from 'axios';
declare class AxiosError extends Error {
    config: BaseAxiosError['config'];
    request?: BaseAxiosError['request'];
    response?: BaseAxiosError['response'];
    status?: number;
    /**
     * @example
     * ```js
     * new AxiosError(errorThrownByAxios)
     * ```
     */
    constructor(error: BaseAxiosError);
    /**
     * @example
     * ```js
     * new AxiosError('error message', errorThrownByAxios)
     * ```
     */
    constructor(message: string, error: BaseAxiosError);
    /**
     * @example
     * ```js
     * new AxiosError('error message', { config, request, response })
     * ```
     */
    constructor(message: string, error: Pick<BaseAxiosError, 'config' | 'request' | 'response'>);
    [util.inspect.custom](): string;
}
export = AxiosError;
//# sourceMappingURL=index.d.ts.map