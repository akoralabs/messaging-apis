"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const util_1 = __importDefault(require("util"));
function indent(str) {
    return str
        .split('\n')
        .map((s) => (s ? `  ${s}` : ''))
        .join('\n');
}
function json(data) {
    return JSON.stringify(data, null, 2);
}
class AxiosError extends Error {
    constructor(messageOrError, error) {
        let err;
        if (typeof messageOrError === 'string') {
            super(messageOrError);
            err = error;
        }
        else {
            super(messageOrError.message);
            err = messageOrError;
        }
        const { config, request, response } = err;
        this.config = config;
        this.request = request;
        this.response = response;
        if (response && response.status) {
            this.status = response.status;
        }
        this.name = 'AxiosError';
    }
    [util_1.default.inspect.custom]() {
        let requestMessage = '';
        if (this.config) {
            let { data } = this.config;
            try {
                data = JSON.parse(data);
            }
            catch (_) { } // eslint-disable-line
            let requestData = '';
            if (this.config.data) {
                requestData = `
Request Data -
${indent(json(data))}`;
            }
            requestMessage = `
Request -
  ${this.config.method ? this.config.method.toUpperCase() : ''} ${this.config.url}
${requestData}`;
        }
        let responseMessage = '';
        if (this.response) {
            let responseData;
            if (this.response.data) {
                responseData = `
Response Data -
${indent(json(this.response.data))}`;
            }
            responseMessage = `
Response -
  ${this.response.status} ${this.response.statusText}
${responseData}`;
        }
        return `
${this.stack}

Error Message -
  ${this.message}
${requestMessage}
${responseMessage}
`;
    }
}
module.exports = AxiosError;
//# sourceMappingURL=index.js.map