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
exports.AllFrontComponent = void 0;
var typeorm_1 = require("typeorm");
var common_entity_1 = require("@common/entity/common.entity");
var graphql_1 = require("@nestjs/graphql");
var front_component_entity_1 = require("@modules/front-component/entities/front-component.entity");
var role_front_component_map_1 = require("@modules/role/model/role-front-component-map");
var util_field_1 = require("@common/utils/util.field");
var AllFrontComponent = /** @class */ (function (_super) {
    __extends(AllFrontComponent, _super);
    function AllFrontComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)({
            comment: util_field_1.UtilField.getFieldComment('id')
        }),
        (0, graphql_1.Field)({
            description: util_field_1.UtilField.getFieldComment('id')
        })
    ], AllFrontComponent.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true,
            comment: util_field_1.UtilField.getFieldComment('front', 'component', 'id')
        }),
        (0, graphql_1.Field)({
            nullable: true,
            description: util_field_1.UtilField.getFieldComment('front', 'component', 'id')
        })
    ], AllFrontComponent.prototype, "frontComponentId");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return front_component_entity_1.FrontComponent; }, function (o) { return o.allFrontComponents; }, {
            nullable: true
        }),
        (0, typeorm_1.JoinColumn)({
            name: 'front_component_id'
        })
    ], AllFrontComponent.prototype, "frontComponent");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return role_front_component_map_1.RoleFrontComponentMap; }, function (o) { return o.allFrontComponent; })
    ], AllFrontComponent.prototype, "roleFrontComponentMaps");
    AllFrontComponent = __decorate([
        (0, typeorm_1.Entity)(),
        (0, graphql_1.InputType)({
            isAbstract: true
        }),
        (0, graphql_1.ObjectType)('GqlAllFrontComponent', {
            description: util_field_1.UtilField.getFieldComment('all', 'front', 'component')
        })
    ], AllFrontComponent);
    return AllFrontComponent;
}(common_entity_1.CommonEntity));
exports.AllFrontComponent = AllFrontComponent;
