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
exports.RoleFrontComponentMap = void 0;
var typeorm_1 = require("typeorm");
var common_entity_1 = require("@common/entity/common.entity");
var graphql_1 = require("@nestjs/graphql");
var role_1 = require("@modules/role/model/role");
var front_component_entity_1 = require("@modules/front-component/entities/front-component.entity");
var all_front_component_entity_1 = require("@modules/front-component/entities/all-front-component.entity");
var util_field_1 = require("@common/utils/util.field");
var RoleFrontComponentMap = /** @class */ (function (_super) {
    __extends(RoleFrontComponentMap, _super);
    function RoleFrontComponentMap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)({
            comment: util_field_1.UtilField.getFieldComment('role', 'seqNo')
        }),
        (0, graphql_1.Field)(function () { return graphql_1.Int; }, {
            description: util_field_1.UtilField.getFieldComment('role', 'seqNo')
        })
    ], RoleFrontComponentMap.prototype, "roleSeqNo");
    __decorate([
        (0, typeorm_1.PrimaryColumn)({
            comment: util_field_1.UtilField.getFieldComment('front', 'component', 'id')
        }),
        (0, graphql_1.Field)(function () { return String; }, {
            description: util_field_1.UtilField.getFieldComment('front', 'component', 'id')
        })
    ], RoleFrontComponentMap.prototype, "frontComponentId");
    __decorate([
        (0, typeorm_1.Column)({
            comment: util_field_1.UtilField.getFieldComment('all', 'front', 'component', 'id')
        }),
        (0, graphql_1.Field)(function () { return String; }, {
            description: util_field_1.UtilField.getFieldComment('all', 'front', 'component', 'id')
        })
    ], RoleFrontComponentMap.prototype, "allFrontComponentId");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return role_1.Role; }, function (r) { return r.roleFrontComponentMaps; }),
        (0, typeorm_1.JoinColumn)({
            name: 'role_seq_no'
        })
    ], RoleFrontComponentMap.prototype, "role");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return front_component_entity_1.FrontComponent; }, function (r) { return r.roleFrontComponentMaps; }),
        (0, typeorm_1.JoinColumn)({
            name: 'front_component_id'
        })
    ], RoleFrontComponentMap.prototype, "frontComponent");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return all_front_component_entity_1.AllFrontComponent; }, function (o) { return o.roleFrontComponentMaps; }),
        (0, typeorm_1.JoinColumn)({
            name: 'all_front_component_id'
        })
    ], RoleFrontComponentMap.prototype, "allFrontComponent");
    RoleFrontComponentMap = __decorate([
        (0, typeorm_1.Entity)(),
        (0, graphql_1.InputType)({
            isAbstract: true
        }),
        (0, graphql_1.ObjectType)('GqlRoleFrontComponentMap', {
            description: util_field_1.UtilField.getFieldComment('role', 'front', 'component', 'map')
        })
    ], RoleFrontComponentMap);
    return RoleFrontComponentMap;
}(common_entity_1.CommonEntity));
exports.RoleFrontComponentMap = RoleFrontComponentMap;
