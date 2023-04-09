"use strict";
exports.__esModule = true;
exports.UtilField = void 0;
var field_comment_constant_1 = require("../constants/field-comment.constant");
var UtilField = /** @class */ (function () {
    function UtilField() {
    }
    UtilField.getFieldComment = function () {
        var fields = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fields[_i] = arguments[_i];
        }
        return fields.map(function (field) { return field_comment_constant_1.FieldCommentConstant[field]; }).join(' ');
    };
    return UtilField;
}());
exports.UtilField = UtilField;
