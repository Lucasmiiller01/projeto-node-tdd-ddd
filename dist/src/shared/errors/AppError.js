"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Error = /** @class */ (function () {
    function Error(message, statusCode) {
        if (statusCode === void 0) { statusCode = 400; }
        this.statusCode = statusCode;
        this.message = message;
    }
    return Error;
}());
exports.default = Error;
