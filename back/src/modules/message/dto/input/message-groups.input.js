"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MessageGroupsInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var util_field_1 = require("@common/utils/util.field");
var MessageGroupsInput = /** @class */ (function () {
    function MessageGroupsInput() {
    }
    __decorate([
        (0, graphql_1.Field)(function () { return String; }, {
            description: util_field_1.UtilField.getFieldComment('code'),
            nullable: true
        })
    ], MessageGroupsInput.prototype, "code");
    __decorate([
        (0, graphql_1.Field)(function () { return [String]; }, {
            nullable: true,
            description: util_field_1.UtilField.getFieldComment('code', 's')
        })
    ], MessageGroupsInput.prototype, "codes");
    __decorate([
        (0, graphql_1.Field)(function () { return String; }, {
            nullable: true,
            description: util_field_1.UtilField.getFieldComment('name')
        })
    ], MessageGroupsInput.prototype, "name");
    MessageGroupsInput = __decorate([
        (0, graphql_1.InputType)({
            description: util_field_1.UtilField.getFieldComment('message', 'group', 's', 'input')
        }),
        (0, graphql_1.ArgsType)()
    ], MessageGroupsInput);
    return MessageGroupsInput;
}());
exports.MessageGroupsInput = MessageGroupsInput;
