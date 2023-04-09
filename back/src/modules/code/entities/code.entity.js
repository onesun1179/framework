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
exports.Code = void 0;
var typeorm_1 = require("typeorm");
var common_entity_1 = require("@common/entity/common.entity");
var code_map_entity_1 = require("./code-map.entity");
var graphql_1 = require("@nestjs/graphql");
var util_field_1 = require("@common/utils/util.field");
var Code = /** @class */ (function (_super) {
    __extends(Code, _super);
    function Code() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({
            comment: util_field_1.UtilField.getFieldComment('seqNo')
        }),
        (0, graphql_1.Field)(function () { return graphql_1.Int; }, {
            description: util_field_1.UtilField.getFieldComment('seqNo')
        })
    ], Code.prototype, "seqNo");
    __decorate([
        (0, typeorm_1.Column)({
            comment: util_field_1.UtilField.getFieldComment('name')
        }),
        (0, graphql_1.Field)({
            description: util_field_1.UtilField.getFieldComment('name')
        })
    ], Code.prototype, "name");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return code_map_entity_1.CodeMap; }, function (o) { return o.child; }),
        (0, graphql_1.Field)(function () { return [code_map_entity_1.CodeMap]; })
    ], Code.prototype, "children");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return code_map_entity_1.CodeMap; }, function (o) { return o.parent; }),
        (0, graphql_1.Field)(function () { return [code_map_entity_1.CodeMap]; })
    ], Code.prototype, "parents");
    Code = __decorate([
        (0, typeorm_1.Entity)(),
        (0, graphql_1.ObjectType)('GqlCode', {
            description: util_field_1.UtilField.getFieldComment('code')
        })
    ], Code);
    return Code;
}(common_entity_1.CommonEntity));
exports.Code = Code;
