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
exports.Role = void 0;
var typeorm_1 = require("typeorm");
var common_entity_1 = require("@common/entity/common.entity");
var user_1 = require("@modules/user/models/user");
var graphql_1 = require("@nestjs/graphql");
var role_group_1 = require("./role-group");
var role_route_map_1 = require("@modules/role/model/role-route-map");
var menu_role_map_1 = require("@modules/menu/model/menu-role-map");
var role_front_component_map_1 = require("@modules/role/model/role-front-component-map");
var Role = /** @class */ (function (_super) {
    __extends(Role, _super);
    function Role() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        (0, graphql_1.Field)(function () { return graphql_1.Int; })
    ], Role.prototype, "seqNo");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, graphql_1.Field)()
    ], Role.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true,
            update: false
        }),
        (0, graphql_1.Field)({
            nullable: true
        })
    ], Role.prototype, "identifier");
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        (0, graphql_1.Field)(function () { return graphql_1.Int; }, {
            nullable: true
        })
    ], Role.prototype, "roleGroupSeqNo");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return role_group_1.RoleGroup; }, function (o) { return o.roles; }, {
            nullable: true
        }),
        (0, typeorm_1.JoinColumn)({
            name: 'role_group_seq_no'
        })
    ], Role.prototype, "roleGroup");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return user_1.User; }, function (o) { return o.role; })
    ], Role.prototype, "users");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return menu_role_map_1.MenuRoleMap; }, function (o) { return o.role; })
    ], Role.prototype, "menuRoleMaps");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return role_route_map_1.RoleRouteMap; }, function (o) { return o.route; })
    ], Role.prototype, "roleRouteMaps");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return role_front_component_map_1.RoleFrontComponentMap; }, function (o) { return o.role; })
    ], Role.prototype, "roleFrontComponentMaps");
    Role = __decorate([
        (0, typeorm_1.Entity)(),
        (0, graphql_1.InputType)({
            isAbstract: true
        }),
        (0, graphql_1.ObjectType)('GqlRole')
    ], Role);
    return Role;
}(common_entity_1.CommonEntity));
exports.Role = Role;
