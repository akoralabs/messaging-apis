"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isError613 = exports.getErrorMessage = void 0;
function getErrorMessage(errInfo) {
    var _a, _b;
    try {
        const message = (_b = (_a = errInfo.response.body) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.message;
        return message;
    }
    catch (_) {
        return '';
    }
}
exports.getErrorMessage = getErrorMessage;
function isError613(errInfo) {
    const message = getErrorMessage(errInfo);
    return /#613/.test(message);
}
exports.isError613 = isError613;
//# sourceMappingURL=utils.js.map