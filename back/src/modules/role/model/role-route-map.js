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
exports.RoleRouteMap = void 0;
var typeorm_1 = require("typeorm");
var graphql_1 = require("@nestjs/graphql");
var common_entity_1 = require("@common/entity/common.entity");
var route_1 = require("@modules/route/models/route");
var role_1 = require("@modules/role/model/role");
var RoleRouteMap = /** @class */ (function (_super) {
    __extends(RoleRouteMap, _super);
    function RoleRouteMap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        (0, graphql_1.Field)(function () { return graphql_1.Int; })
    ], RoleRouteMap.prototype, "roleSeqNo");
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        (0, graphql_1.Field)(function () { return graphql_1.Int; })
    ], RoleRouteMap.prototype, "routeSeqNo");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return role_1.Role; }, function (o) { return o.roleRouteMaps; }),
        (0, graphql_1.Field)(function () { return role_1.Role; }),
        (0, typeorm_1.JoinColumn)({
            name: 'role_seq_no'
        })
    ], RoleRouteMap.prototype, "role");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return route_1.Route; }, function (o) { return o.roleRouteMaps; }),
        (0, graphql_1.Field)(function () { return route_1.Route; }),
        (0, typeorm_1.JoinColumn)({
            name: 'route_seq_no'
        })
    ], RoleRouteMap.prototype, "route");
    RoleRouteMap = __decorate([
        (0, typeorm_1.Entity)(),
        (0, graphql_1.InputType)({
            isAbstract: true
        }),
        (0, graphql_1.ObjectType)('GqlRoleRouteMap')
    ], RoleRouteMap);
    return RoleRouteMap;
}(common_entity_1.CommonEntity));
exports.RoleRouteMap = RoleRouteMap;
