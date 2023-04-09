"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MenuModule = void 0;
var common_1 = require("@nestjs/common");
var menu_controller_1 = require("./menu.controller");
var menu_service_1 = require("./menu.service");
var typeorm_1 = require("@nestjs/typeorm");
var menu_1 = require("./model/menu");
var menu_role_map_tree_1 = require("./model/menu-role-map-tree");
var menu_role_map_1 = require("./model/menu-role-map");
var menu_resolver_1 = require("./resolvers/menu.resolver");
var menus_resolver_1 = require("@modules/menu/resolvers/menus.resolver");
var MenuModule = /** @class */ (function () {
    function MenuModule() {
    }
    MenuModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([menu_1.Menu, menu_role_map_1.MenuRoleMap, menu_role_map_tree_1.MenuRoleMapTree])],
            controllers: [menu_controller_1.MenuController],
            providers: [menu_service_1.MenuService, menu_resolver_1.MenuResolver, menus_resolver_1.MenusResolver]
        })
    ], MenuModule);
    return MenuModule;
}());
exports.MenuModule = MenuModule;
