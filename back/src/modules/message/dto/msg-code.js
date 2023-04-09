"use strict";
exports.__esModule = true;
exports.MsgCode = void 0;
var Util_message_1 = require("@common/utils/Util.message");
var MsgCode = /** @class */ (function () {
    function MsgCode(groupCode, code, data) {
        if (data === void 0) { data = []; }
        this.data = [];
        this.groupCode = groupCode;
        this.code = code;
        this.data = data;
    }
    MsgCode.prototype.text = function (text) {
        return Util_message_1.UtilMessage.text(text, this.data);
    };
    return MsgCode;
}());
exports.MsgCode = MsgCode;
