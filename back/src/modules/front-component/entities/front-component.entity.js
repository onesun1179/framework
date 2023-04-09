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
exports.FrontComponent = void 0;
var typeorm_1 = require("typeorm");
var common_entity_1 = require("@common/entity/common.entity");
var graphql_1 = require("@nestjs/graphql");
var role_front_component_map_1 = require("@modules/role/model/role-front-component-map");
var route_1 = require("@modules/route/models/route");
var all_front_component_entity_1 = require("@modules/front-component/entities/all-front-component.entity");
var util_field_1 = require("@common/utils/util.field");
var FrontComponent = /** @class */ (function (_super) {
    __extends(FrontComponent, _super);
    function FrontComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)({
            comment: util_field_1.UtilField.getFieldComment('id')
        }),
        (0, graphql_1.Field)({
            description: util_field_1.UtilField.getFieldComment('id')
        })
    ], FrontComponent.prototype, "id");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return all_front_component_entity_1.AllFrontComponent; }, function (o) { return o.frontComponent; }, {
            nullable: true
        })
    ], FrontComponent.prototype, "allFrontComponents");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return role_front_component_map_1.RoleFrontComponentMap; }, function (o) { return o.frontComponent; }, {
            nullable: true
        })
    ], FrontComponent.prototype, "roleFrontComponentMaps");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return route_1.Route; }, function (o) { return o.frontComponent; }, {
            nullable: true
        })
    ], FrontComponent.prototype, "routes");
    FrontComponent = __decorate([
        (0, typeorm_1.Entity)(),
        (0, graphql_1.InputType)({
            isAbstract: true
        }),
        (0, graphql_1.ObjectType)('GqlFrontComponent', {
            description: util_field_1.UtilField.getFieldComment('front', 'component')
        })
    ], FrontComponent);
    return FrontComponent;
}(common_entity_1.CommonEntity));
exports.FrontComponent = FrontComponent;
