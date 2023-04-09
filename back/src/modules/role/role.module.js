"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RoleModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var role_service_1 = require("./role.service");
var role_1 = require("./model/role");
var role_resolver_1 = require("./resolvers/role.resolver");
var user_module_1 = require("../user/user.module");
var role_controller_1 = require("./role.controller");
var role_group_1 = require("./model/role-group");
var roles_resolver_1 = require("./resolvers/roles.resolver");
var role_group_resolver_1 = require("./resolvers/role-group.resolver");
var role_front_component_map_resolver_1 = require("@modules/role/resolvers/role-front-component-map.resolver");
var role_front_component_map_1 = require("@modules/role/model/role-front-component-map");
var role_route_map_1 = require("@modules/role/model/role-route-map");
var RoleModule = /** @class */ (function () {
    function RoleModule() {
    }
    RoleModule = __decorate([
        (0, common_1.Global)(),
        (0, common_1.Module)({
            imports: [
                user_module_1.UserModule,
                typeorm_1.TypeOrmModule.forFeature([
                    role_1.Role,
                    role_group_1.RoleGroup,
                    role_front_component_map_1.RoleFrontComponentMap,
                    role_route_map_1.RoleRouteMap,
                ]),
            ],
            exports: [role_service_1.RoleService],
            controllers: [role_controller_1.RoleController],
            providers: [
                role_service_1.RoleService,
                role_resolver_1.RoleResolver,
                roles_resolver_1.RolesResolver,
                role_group_resolver_1.RoleGroupResolver,
                role_front_component_map_resolver_1.RoleFrontComponentMapResolver,
            ]
        })
    ], RoleModule);
    return RoleModule;
}());
exports.RoleModule = RoleModule;
