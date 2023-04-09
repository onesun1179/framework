"use strict";
exports.__esModule = true;
exports.UtilMessage = void 0;
var lodash_1 = require("lodash");
var UtilMessage = /** @class */ (function () {
    function UtilMessage() {
    }
    UtilMessage.text = function (text, data) {
        if (data === void 0) { data = []; }
        // 0 - 999
        return text.replace(/{{([0-9]|[1-9][0-9]|[1-9][0-9][0-9])}}/g, function (s, a) {
            var num = a * 1;
            if ((0, lodash_1.isInteger)(num) && !!data[num]) {
                return data[num] + '';
            }
            return s;
        });
    };
    return UtilMessage;
}());
exports.UtilMessage = UtilMessage;
