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
exports.Route = void 0;
var typeorm_1 = require("typeorm");
var common_entity_1 = require("@common/entity/common.entity");
var graphql_1 = require("@nestjs/graphql");
var role_route_map_1 = require("@modules/role/model/role-route-map");
var menu_1 = require("@modules/menu/model/menu");
var front_component_entity_1 = require("@modules/front-component/entities/front-component.entity");
var Route = /** @class */ (function (_super) {
    __extends(Route, _super);
    function Route() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Route_1 = Route;
    var Route_1;
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        (0, graphql_1.Field)(function () { return graphql_1.Int; })
    ], Route.prototype, "seqNo");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, graphql_1.Field)()
    ], Route.prototype, "path");
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        (0, graphql_1.Field)(function () { return String; }, {
            nullable: true
        })
    ], Route.prototype, "frontComponentId");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return front_component_entity_1.FrontComponent; }, function (o) { return o.routes; }, {
            nullable: true
        }),
        (0, typeorm_1.JoinColumn)({
            name: 'front_component_id'
        })
    ], Route.prototype, "frontComponent");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Route_1; }, function (o) { return o.parent; }, {
            nullable: true
        })
    ], Route.prototype, "children");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Route_1; }, function (o) { return o.children; }, {
            nullable: true
        }),
        (0, typeorm_1.JoinColumn)({
            name: 'parent_seq_no'
        })
    ], Route.prototype, "parent");
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        (0, graphql_1.Field)(function () { return graphql_1.Int; }, {
            nullable: true
        })
    ], Route.prototype, "parentSeqNo");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return role_route_map_1.RoleRouteMap; }, function (o) { return o.route; }, {
            nullable: true
        })
    ], Route.prototype, "roleRouteMaps");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return menu_1.Menu; }, function (o) { return o.route; }, {
            nullable: true
        })
    ], Route.prototype, "menus");
    Route = Route_1 = __decorate([
        (0, typeorm_1.Entity)(),
        (0, graphql_1.InputType)({
            isAbstract: true
        }),
        (0, graphql_1.ObjectType)("GqlRoute")
    ], Route);
    return Route;
}(common_entity_1.CommonEntity));
exports.Route = Route;
