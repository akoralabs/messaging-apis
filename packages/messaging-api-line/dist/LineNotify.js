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
const querystring_1 = __importDefault(require("querystring"));
const axios_error_1 = __importDefault(require("axios-error"));
const axios_1 = __importDefault(require("axios"));
const warning_1 = __importDefault(require("warning"));
function handleError(err) {
    if (err.response && err.response.data && err.response.data.error) {
        const { message } = err.response.data.error;
        const msg = `LINE Notify API - ${message}`;
        throw new axios_error_1.default(msg, err);
    }
    throw new axios_error_1.default(err.message, err);
}
function throwWhenNotSuccess(res) {
    if (res.data.status !== 200) {
        const { status, message } = res.data;
        const msg = `LINE NOTIFY API - ${status} ${message}`;
        throw new axios_error_1.default(msg, {
            response: res,
            config: res.config,
            request: res.request,
        });
    }
    return res.data;
}
/**
 * LINE Notify
 */
class LineNotify {
    /**
     * constructor
     *
     * @param config - LINE Notify configuration from LINE Notify services website.
     */
    constructor(config) {
        /**
         * The origin of the notify-bot.line.me APIs.
         */
        this.origin = 'https://notify-bot.line.me/';
        /**
         * The origin of the notify-api.line.me APIs.
         */
        this.apiOrigin = 'https://notify-api.line.me/';
        this.clientId = config.clientId;
        this.clientSecret = config.clientSecret;
        this.redirectUri = config.redirectUri;
        this.origin = config.origin || this.origin;
        this.apiOrigin = config.apiOrigin || this.apiOrigin;
        this.axios = axios_1.default.create({
            baseURL: this.origin,
        });
        this.apiAxios = axios_1.default.create({
            baseURL: this.apiOrigin,
        });
    }
    /**
     * @deprecated Use `new LineNotify(...)` instead.
     */
    static connect(config) {
        (0, warning_1.default)(false, '`LineNotify.connect(...)` is deprecated. Use `new LineNotify(...)` instead.');
        return new LineNotify(config);
    }
    /**
     * Get Auth Link
     *
     * Get The OAuth2 authorization endpoint URI.
     *
     * @param state - Assigns a token that can be used for responding to CSRF attacks
     *
     * CSRF attacks are typically countered by assigning a hash value generated from a user's session ID, and then verifying the state parameter variable when it attempts to access redirect_uri.
     *
     * LINE Notify is designed with web applications in mind, and requires state parameter variables.
     * @returns The OAuth2 authorization endpoint URI
     */
    getAuthLink(state) {
        const data = {
            scope: 'notify',
            response_type: 'code',
            client_id: this.clientId,
            redirect_uri: this.redirectUri,
            state,
        };
        return `${this.origin}oauth/authorize?${querystring_1.default.encode(data)}`;
    }
    /**
     * Get Token
     *
     * The OAuth2 token endpoint.
     *
     * @param code - Assigns a code parameter value generated during redirection
     * @returns An access token for authentication.
     */
    getToken(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
            };
            const formData = {
                grant_type: 'authorization_code',
                client_id: this.clientId,
                client_secret: this.clientSecret,
                redirect_uri: this.redirectUri,
                code,
            };
            return this.axios
                .post('/oauth/token', querystring_1.default.encode(formData), { headers })
                .then((res) => res.data.access_token, handleError);
        });
    }
    /**
     * Get Status
     *
     * An API for checking connection status. You can use this API to check the validity of an access token. Acquires the names of related users or groups if acquiring them is possible.
     *
     * On the connected service side, it's used to see which groups are configured with a notification and which user the notifications will be sent to. There is no need to check the status with this API before calling /api/notify or /api/revoke.
     *
     * If this API receives a status code 401 when called, the access token will be deactivated on LINE Notify (disabled by the user in most cases). Connected services will also delete the connection information.
     *
     * ## Expected use cases
     * If a connected service wishes to check the connection status of a certain user
     *
     * As LINE Notify also provides the same feature, support for this API is optional.
     *
     * @param accessToken - the accessToken you want to revoke
     * @returns
     * - status: Value according to HTTP status code.
     * - message: Message visible to end-user.
     * - targetType: If the notification target is a user: "USER". If the notification target is a group: "GROUP".
     * - target: If the notification target is a user, displays user name. If acquisition fails, displays "null". If the notification target is a group, displays group name. If the target user has already left the group, displays "null".
     */
    getStatus(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                Authorization: `Bearer ${accessToken}`,
            };
            return this.apiAxios
                .get('/api/status', { headers })
                .then(throwWhenNotSuccess, handleError);
        });
    }
    /**
     * Send Notify
     *
     * Sends notifications to users or groups that are related to an access token.
     *
     * If this API receives a status code 401 when called, the access token will be deactivated on LINE Notify (disabled by the user in most cases). Connected services will also delete the connection information.
     *
     * Requests use POST method with application/x-www-form-urlencoded (Identical to the default HTML form transfer type).
     *
     * ## Expected use cases
     * When a connected service has an event that needs to send a notification to LINE
     *
     * @param accessToken - An access token related to users or groups
     * @param message - The notification content
     * @param options - Other optional parameters
     * @returns
     * - status: Value according to HTTP status code
     * - message: Message visible to end-user
     */
    sendNotify(accessToken, message, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${accessToken}`,
            };
            const formData = Object.assign({ message }, options);
            return this.apiAxios
                .post('/api/notify', querystring_1.default.encode(formData), { headers })
                .then(throwWhenNotSuccess, handleError);
        });
    }
    /**
     * Revoke Token
     *
     * An API used on the connected service side to revoke notification configurations. Using this API will revoke all used access tokens, disabling the access tokens from accessing the API.
     *
     * The revocation process on the connected service side is as follows
     *
     * 1. Call /api/revoke
     * 2. If step 1 returns status code 200, the request is accepted, revoking all access tokens and ending the process
     * 3. If step 1 returns status code 401, the access tokens have already been revoked and the connection will be d
     * 4. If step 1 returns any other status code, the process will end (you can try again at a later time)
     *
     * ### Expected use cases
     * When the connected service wishes to end a connection with a user
     *
     * As LINE Notify also provides the same feature, support for this API is optional.
     *
     * @param accessToken - the accessToken you want to revoke
     * @returns
     * - status: Value according to HTTP status code
     * - message: Message visible to end-user
     */
    revokeToken(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${accessToken}`,
            };
            return this.apiAxios
                .post('/api/revoke', {}, { headers })
                .then(throwWhenNotSuccess, handleError);
        });
    }
}
exports.default = LineNotify;
//# sourceMappingURL=LineNotify.js.map