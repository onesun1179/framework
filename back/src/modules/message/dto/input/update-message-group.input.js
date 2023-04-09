"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateMessageGroupInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var message_group_1 = require("@modules/message/entities/message-group");
var util_field_1 = require("@common/utils/util.field");
var insert_message_group_input_1 = require("@modules/message/dto/input/insert-message-group.input");
var UpdateMessageGroupInput = /** @class */ (function (_super) {
    __extends(UpdateMessageGroupInput, _super);
    function UpdateMessageGroupInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UpdateMessageGroupInput = __decorate([
        (0, graphql_1.InputType)({
            description: util_field_1.UtilField.getFieldComment('message', 'group', 'update', 'input')
        }),
        (0, graphql_1.ArgsType)()
    ], UpdateMessageGroupInput);
    return UpdateMessageGroupInput;
}((0, graphql_1.IntersectionType)((0, graphql_1.PickType)(message_group_1.MessageGroup, ['code']), (0, graphql_1.PartialType)((0, graphql_1.PickType)(insert_message_group_input_1.InsertMessageGroupInput, ['name', 'messageSeqNos'])))));
exports.UpdateMessageGroupInput = UpdateMessageGroupInput;
