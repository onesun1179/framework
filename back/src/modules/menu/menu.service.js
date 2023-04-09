"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.MenuService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var menu_1 = require("./model/menu");
var menu_role_map_tree_1 = require("./model/menu-role-map-tree");
var MenuService = /** @class */ (function () {
    function MenuService(menuRepository, menuTreeRepository) {
        this.menuRepository = menuRepository;
        this.menuTreeRepository = menuTreeRepository;
        this.logger = new common_1.Logger(MenuService_1.name);
    }
    MenuService_1 = MenuService;
    MenuService.prototype.getMenuRepository = function () {
        return this.menuRepository;
    };
    MenuService.prototype.getMenuTreeRepository = function () {
        return this.menuTreeRepository;
    };
    var MenuService_1;
    MenuService = MenuService_1 = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(menu_1.Menu)),
        __param(1, (0, typeorm_1.InjectRepository)(menu_role_map_tree_1.MenuRoleMapTree))
    ], MenuService);
    return MenuService;
}());
exports.MenuService = MenuService;
