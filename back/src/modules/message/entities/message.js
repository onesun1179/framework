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
exports.Message = void 0;
var typeorm_1 = require("typeorm");
var common_entity_1 = require("@common/entity/common.entity");
var message_group_1 = require("./message-group");
var graphql_1 = require("@nestjs/graphql");
var util_field_1 = require("@common/utils/util.field");
var class_validator_1 = require("class-validator");
var Message = /** @class */ (function (_super) {
    __extends(Message, _super);
    function Message() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({
            comment: util_field_1.UtilField.getFieldComment('seqNo')
        }),
        (0, graphql_1.Field)({
            description: util_field_1.UtilField.getFieldComment('seqNo')
        }),
        (0, class_validator_1.IsInt)()
    ], Message.prototype, "seqNo");
    __decorate([
        (0, typeorm_1.Column)({
            type: 'char',
            length: '4',
            comment: util_field_1.UtilField.getFieldComment('code')
        }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(4),
        (0, class_validator_1.MinLength)(4),
        (0, graphql_1.Field)({
            description: util_field_1.UtilField.getFieldComment('code')
        })
    ], Message.prototype, "code");
    __decorate([
        (0, typeorm_1.Column)({
            comment: util_field_1.UtilField.getFieldComment('name')
        }),
        (0, graphql_1.Field)({
            description: util_field_1.UtilField.getFieldComment('name')
        }),
        (0, class_validator_1.IsString)()
    ], Message.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)({
            comment: util_field_1.UtilField.getFieldComment('text')
        }),
        (0, graphql_1.Field)({
            description: util_field_1.UtilField.getFieldComment('text')
        }),
        (0, class_validator_1.IsString)()
    ], Message.prototype, "text");
    __decorate([
        (0, typeorm_1.Column)({
            comment: util_field_1.UtilField.getFieldComment('group', 'code'),
            nullable: true
        }),
        (0, graphql_1.Field)({
            description: util_field_1.UtilField.getFieldComment('group', 'code'),
            nullable: true
        }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], Message.prototype, "groupCode");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return message_group_1.MessageGroup; }, function (o) { return o.messages; }, {
            nullable: true
        }),
        (0, typeorm_1.JoinColumn)({
            name: 'group_code'
        })
    ], Message.prototype, "group");
    Message = __decorate([
        (0, typeorm_1.Entity)(),
        (0, graphql_1.InputType)({
            isAbstract: true
        }),
        (0, graphql_1.ObjectType)('GqlMessage', {
            description: util_field_1.UtilField.getFieldComment('message')
        }),
        (0, typeorm_1.Unique)(['code', 'groupCode'])
    ], Message);
    return Message;
}(common_entity_1.CommonEntity));
exports.Message = Message;
