"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRequestInterceptor = exports.onRequest = void 0;
const debug_1 = __importDefault(require("debug"));
const omit_1 = __importDefault(require("lodash/omit"));
const url_join_1 = __importDefault(require("url-join"));
const debugRequest = (0, debug_1.default)('messaging-api:request');
function defaultOnRequest(request) {
    debugRequest(`${request.method} - ${request.url}`);
    if (request.body) {
        debugRequest('Outgoing request body:');
        if (Buffer.isBuffer(request.body)) {
            debugRequest(request.body);
        }
        else {
            debugRequest(JSON.stringify(request.body, null, 2));
        }
    }
}
exports.onRequest = defaultOnRequest;
function createRequestInterceptor({ onRequest = defaultOnRequest, } = {}) {
    return (config) => {
        onRequest({
            method: config.method,
            url: (0, url_join_1.default)(config.baseURL || '', config.url || '/'),
            headers: Object.assign(Object.assign(Object.assign({}, config.headers.common), (config.method ? config.headers[config.method] : {})), (0, omit_1.default)(config.headers, [
                'common',
                'get',
                'post',
                'put',
                'patch',
                'delete',
                'head',
            ])),
            body: config.data,
        });
        return config;
    };
}
exports.createRequestInterceptor = createRequestInterceptor;
__exportStar(require("./case"), exports);
//# sourceMappingURL=index.js.map