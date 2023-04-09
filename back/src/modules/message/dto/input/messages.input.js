"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MessagesInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var message_groups_input_1 = require("@modules/message/dto/input/message-groups.input");
var string_search_input_1 = require("@common/dto/inputs/string-search.input");
var MessagesInput = /** @class */ (function () {
    function MessagesInput() {
    }
    __decorate([
        (0, graphql_1.Field)(function () { return [graphql_1.Int]; }, {
            nullable: true
        })
    ], MessagesInput.prototype, "seqNos");
    __decorate([
        (0, graphql_1.Field)(function () { return message_groups_input_1.MessageGroupsInput; }, {
            nullable: true
        })
    ], MessagesInput.prototype, "groupsInput");
    __decorate([
        (0, graphql_1.Field)(function () { return string_search_input_1.StringSearchInput; }, {
            nullable: true
        })
    ], MessagesInput.prototype, "text");
    MessagesInput = __decorate([
        (0, graphql_1.InputType)(),
        (0, graphql_1.ArgsType)()
    ], MessagesInput);
    return MessagesInput;
}());
exports.MessagesInput = MessagesInput;
